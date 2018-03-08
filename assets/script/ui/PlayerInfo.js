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

cc.Class({
    extends: cc.Component,

    properties: {
    },

    init: function() {
        if (PlayerData.address != null && PlayerData.address.length > 6)
        {
            this.node.getChildByName('nameLabel').getComponent(cc.Label).string = PlayerData.address.substr(-6);
        }
        this.node.getChildByName('cityNumLabel').getComponent(cc.Label).string = PlayerData.cities.length;
        this.node.getChildByName('heroNumLabel').getComponent(cc.Label).string = PlayerData.heroes.length;
        this.node.getChildByName('heroPowerLabel').getComponent(cc.Label).string = PlayerData.getTotalHeroPower();
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
