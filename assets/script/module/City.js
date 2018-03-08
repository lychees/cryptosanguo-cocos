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

cc.Class({
    extends: cc.Component,

    properties: {
        index: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    

    init: function(_index, points)
    {
        this.index = _index;
        this.name = "city_" + _index;
        var ctx = this.getComponent(cc.Graphics);
        ctx.moveTo(Utils.fixX(points[0][0]), Utils.fixY(points[0][1]));
        
        for (var i = 1, len = points.length; i < len; ++i)
        {
            ctx.lineTo(Utils.fixX(points[i][0]), Utils.fixY(points[i][1]));
        }
        ctx.stroke();
        ctx.fill();
    },

    onLoad () {

    },

    start ()
    {

    },

    // update (dt) {},
});
