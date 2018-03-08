// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

var PlayerData = require('PlayerData');
var CityData = require('CityData');
var CityConfig = require('CityConfig').CityConfig;
// var commonApi = require('commonApi');
var HttpAction = require('HttpAction');
var CityName = require('Utils').CityName;

var Game = cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        cityPrefab: cc.Prefab,
        cityNamePrefab: cc.Prefab,
        mapLayer: cc.Node,
        uiLayer: cc.Node,
        targetCity: -1,
        chooseCity: -1,
        centerArr: [],
        tickCnt: 0,
    },

    statics: {
        instance: null
    },

    refreshInfo: function() {
        if (this.targetCity == -1)
        {
            if (this.chooseCity == -1)
            {
                this.uiLayer.getChildByName('CityInfo').active = false;
                this.uiLayer.getChildByName('PlayerInfo').active = true;
                this.uiLayer.getChildByName('PlayerInfo').getComponent('PlayerInfo').init();
            }
            else
            {
                this.uiLayer.getChildByName('CityInfo').active = true;
                this.uiLayer.getChildByName('PlayerInfo').active = false;
                this.uiLayer.getChildByName('CityInfo').getComponent('CityInfo').init(this.chooseCity, this.chooseCity);
            }
        }
        else
        {
            this.uiLayer.getChildByName('CityInfo').active = true;
            this.uiLayer.getChildByName('PlayerInfo').active = false;
            this.uiLayer.getChildByName('CityInfo').getComponent('CityInfo').init(this.targetCity, this.chooseCity);
        }
    },

    showCityInfo: function(index) {
        this.targetCity = index;
        this.refreshColor(index);
        this.refreshInfo();
    },

    showPlayerInfo: function(index) {
        var oldCity = this.targetCity;
        this.targetCity = -1;
        if (oldCity != -1)
        {
            this.refreshColor(oldCity);
        }
        this.refreshInfo();
    },

    selectCity: function(index) {
        var oldCity = this.chooseCity;
        this.chooseCity = index;
        if (oldCity != -1)
        {
            this.refreshColor(oldCity);
        }
        if (index != -1)
        {
            this.refreshColor(index);
        }
        this.refreshInfo();
    },

    refreshColor: function(index) {
        this.centerArr[index].getComponent('CityCenter').refreshColor();
    },

    initData: function(data) {
        // cc.log(data);
        PlayerData.name = data.player_info.name;
        PlayerData.address = data.player_info.address;
        PlayerData.heroes = data.player_info.heroes;
        PlayerData.cities = data.player_info.cities;
        PlayerData.soldier = data.player_info.soldier;

        CityData.cityList = [{}];
        for (var i = 0, len = data.map_info.length;i < len;++i)
        {
            CityData.cityList.push(data.map_info[i]);
            this.refreshColor(i + 1);
        }

        this.refreshInfo();
    },

    attackCity: function(cityId){
        this.atkCity = cityId;
        this.uiLayer.getChildByName('AttackLayer').active = true;
        var cityList = [];
        for (var i = 0,len = PlayerData.cities.length;i < len;i++)
        {
            cityList.push(PlayerData.cities[i].id);
        }
        this.uiLayer.getChildByName('AttackLayer').getComponent('CityListView').init(cityList);
    },

    attack: function(fromCity, soldier){
        cc.log(fromCity, this.atkCity, soldier);
        var thiz = this;
        HttpAction.attack(fromCity, this.atkCity, soldier, function(data) {
            // cc.log(data);
            thiz.refreshAll();
        });
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Game.instance = this;

        this.showPlayerInfo(-1);
        for (var i = 0, len = CityConfig.features.length; i < len; ++i)
        {
            var cityNode = cc.instantiate(this.cityPrefab);
            var cityNameLabel = cc.instantiate(this.cityNamePrefab);
            this.centerArr.push(cityNameLabel);
            if (i == 0)
            {
                continue;
            }
            cityNode.getComponent("City").init(i, CityConfig.features[i].geometry.coordinates[0]);
            cityNameLabel.getComponent("CityCenter").init(i, CityName[i], CityConfig.features[i].geometry.coordinates[0]);
            this.mapLayer.addChild(cityNode);
            this.mapLayer.addChild(cityNameLabel, 100 + i);
            this.refreshColor(i);
        }

        var bg = this.mapLayer.getChildByName('MapBackgroud');
        bg.on('mouseup', function (event){
            Game.instance.selectCity(-1);
        }, bg);
    },

    start () {
        var addr = cc.sys.localStorage.getItem("username");
        var thiz = this;
        HttpAction.login(addr, function(data){
            if (data.player_info.state == 0 && data.player_info.heroes.length == 0)
            {
                HttpAction.get_my_hero(function(data){
                    cc.log(data);
                    HttpAction.login(addr, function(data){
                        thiz.initData(data);
                    });
                });
            }
            else
            {
                thiz.initData(data);
            }
        });
    },

    update (dt) 
    {
        this.tickCnt++;
        if (this.tickCnt == 600)
        {
            this.tickCnt = 0;
            this.refreshAll();
        }
    },

    refreshAll:function()
    {
        var thiz = this;
        HttpAction.refreshInfo(function(data){
            thiz.initData(data);
        });
    },
});
