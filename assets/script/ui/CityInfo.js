// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

var CityData = require('CityData');
var PlayerData = require('PlayerData');
var CityConfig = require('CityConfig').CityConfig;
var Game = require('Game');
var CityName = require('Utils').CityName;

cc.Class({
    extends: cc.Component,

    properties: {
    },

    init: function(index) {
        this.cityId = index;
        this.node.getChildByName('cityNameLabel').getComponent(cc.Label).string = CityName[index];
        var isMy = false;
        if (CityData.cityList[index].owner_info.address != null)
        {
            this.node.getChildByName('citySoldierLabel').active = true;
            this.node.getChildByName('citySoldierTextLabel').active = true;
            this.node.getChildByName('cityOwnerLabel').getComponent(cc.Label).string = CityData.cityList[index].owner_info.address.substr(-6);
            this.node.getChildByName('citySoldierLabel').getComponent(cc.Label).string = CityData.cityList[index].owner_info.soldier;
            if (CityData.cityList[index].owner_info.address == PlayerData.address)
            {
                isMy = true;
            }
        }
        else
        {
            this.node.getChildByName('citySoldierLabel').active = false;
            this.node.getChildByName('citySoldierTextLabel').active = false;
            this.node.getChildByName('cityOwnerLabel').getComponent(cc.Label).string = '无';
        }
        this.node.getChildByName('cityDefenceLabel').getComponent(cc.Label).string = CityData.cityList[index].defence;
        this.node.getChildByName('cityDefAddLabel').getComponent(cc.Label).string = CityData.cityList[index].defence_add;
        

        
        if (isMy)
        {
            this.node.getChildByName('attackBtn').active = false;
        }
        else
        {
            this.node.getChildByName('attackBtn').active = true;
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var thiz = this;
        this.node.getChildByName('attackBtn').on('mouseup',function(){
            Game.instance.attackCity(thiz.cityId);
        });
    },

    start () {

    },

    // update (dt) {},
});
