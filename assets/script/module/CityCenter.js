// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

var Utils = require('Utils');
var CityShift = Utils.CityShift;
var Game = require('Game');
var CityData = require('CityData');
var PlayerData = require('PlayerData');

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
        index: 0,
        cityName: "",
    },

    init: function(_index, _name, points) {
        this.index = _index;
        this.cityName = _name;
        this.name = "cityCenter_" + _index; 

        if (_index == 0)
        {

        }
        var cx = Utils.fixX(points[0][0]);
        var cy = Utils.fixY(points[0][1]);
        for (var i = 1, len = points.length; i < len; ++i)
        {
            cx += Utils.fixX(points[i][0]);
            cy += Utils.fixY(points[i][1]);
        }
        cx /= points.length;
        cy /= points.length;

        this.node.getChildByName('label').getComponent(cc.Label).string = _name;
        if (CityShift.length <= _index)
        {
            CityShift[_index] = [0, 0];
        }
        this.node.position = cc.p(cx + CityShift[_index][0], cy + CityShift[_index][1]);
    },

    refreshColor: function()
    {
        var newColor;
        if (Game.instance.chooseCity == this.index)
        {
            newColor = cc.color(255,255,0);
        }
        else
        {
            if (Game.instance.targetCity == this.index)
            {
                newColor = cc.color(255,255,0);
            }
            else
            {
                if (CityData.cityList == null || CityData.cityList[this.index] == null || CityData.cityList[this.index].owner_info.address == null)
                {
                    newColor = cc.color(120,120,120);
                }
                else if (CityData.cityList[this.index].owner_info.address == PlayerData.address)
                {
                    newColor = cc.color(0,255,0);
                }
                else
                {
                    newColor = cc.color(255,0,0);
                }
            }
        }
        this.node.getChildByName('center').color = newColor;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var target = this.node.getChildByName('center');
        var thiz = this;
        target.on('mouseenter', function (event){
            Game.instance.showCityInfo(thiz.index);
        }, target);
        target.on('mouseleave', function (event){
            Game.instance.showPlayerInfo(thiz.index);
        }, target);
        target.on('mouseup', function (event){
            Game.instance.selectCity(thiz.index);
        }, target);
    },

    start () {
        
    },

    // update (dt) {},
});
