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
        loginLabel: cc.EditBox,
        loginBtn: cc.Button,
        testBtn: cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var thiz = this;
        var oldUsername = cc.sys.localStorage.getItem("username");
        if (oldUsername != null)
        {
            this.loginLabel.string = oldUsername;
        }
        this.loginBtn.node.on("mouseup",function(){
            if (thiz.loginLabel.string != "")
            {
                cc.sys.localStorage.setItem("username", thiz.loginLabel.string);
                cc.director.loadScene("main");
            }
        });
        this.testBtn.node.on("mouseup",function(){
            cc.log("test");
            cc.log(getAddress());
        });
        
        var addr = "1234567";
        try{
            addr = getAddress();
            
        }
        catch(err)
        {

        }
        cc.sys.localStorage.setItem("username", addr);
        cc.director.loadScene("main");
    },

    start () {

    },

    // update (dt) {},
});
