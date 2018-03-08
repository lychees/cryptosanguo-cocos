// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var CityConfig = require('CityConfig').CityConfig;
var CityData = require('CityData');
var Game = require('Game');
cc.Class({
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
        cityNameItemPrefab: cc.Prefab,
        cityListContent: cc.Node,
        curCity: -1,
        nameItemList: [],
        cityIdList: [],
    },

    init: function(cities)
    {
        // cc.log(cities);
        this.nameItemList.splice(0, this.nameItemList.length);
        this.cityIdList.splice(0, this.cityIdList.length);
        this.curCity = -1;
        this.cityListContent.removeAllChildren();
        this.node.getChildByName('attackCityInfo').active = false;
        for (var i = 0,len = cities.length;i < len;++i)
        {
            var cityNameItem = cc.instantiate(this.cityNameItemPrefab);
            cityNameItem.getComponent('CityNameItem').init(i, cities[i], this);
            this.cityListContent.addChild(cityNameItem);
            this.nameItemList.push(cityNameItem);
            this.cityIdList.push(cities[i]);
        }
    },

    chooseCity: function(index)
    {
        if (this.curCity != -1)
        {
            this.nameItemList[this.curCity].getComponent('CityNameItem').refreshColor(false);
        }
        this.curCity = index;
        this.nameItemList[index].getComponent('CityNameItem').refreshColor(true);
        this.node.getChildByName('attackCityInfo').active = true;
        this.node.getChildByName('attackCityInfo').getChildByName('cityNameLabel').getComponent(cc.Label).string = CityConfig.features[this.cityIdList[index]].properties.name;
        this.maxSoldier = CityData.cityList[this.cityIdList[index]].owner_info.soldier;
        this.node.getChildByName('attackCityInfo').getChildByName('totalSoldierLabel').getComponent(cc.Label).string = CityData.cityList[this.cityIdList[index]].owner_info.soldier;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var thiz = this;
        this.node.getChildByName('closeBtn').on('mouseup', function(event, data){
            thiz.node.active = false;
        });
        this.node.getChildByName('attackCityInfo').getChildByName('attackBtn').on('mouseup', function(event, data){
            var txt = thiz.node.getChildByName('attackCityInfo').getChildByName('chooseSoldierEditBox').getComponent(cc.EditBox).string;
            var useSoldier = parseInt(txt);
            var msg = "";
            do{
                if (isNaN(useSoldier) || useSoldier.toString() != txt)
                {
                    msg = "请输入整数";
                    break;
                }
                if (useSoldier <= 0)
                {
                    msg = "出兵数不能小于0";
                    break;
                }
                if (useSoldier > thiz.maxSoldier)
                {
                    msg = "不能大于已有总兵数";
                    break;
                }
            }while(false);
            if (msg.length != 0)
            {
                thiz.node.getChildByName('attackCityInfo').getChildByName('errorTips').getComponent(cc.Label).string = msg;
            }
            else
            {
                thiz.node.active = false;
                Game.instance.attack(thiz.cityIdList[thiz.curCity], useSoldier);
            }
        });
    },

    start () {

    },

    // update (dt) {},
});
