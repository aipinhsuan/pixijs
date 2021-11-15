///<reference path="pixi.js.d.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
document.addEventListener("DOMContentLoaded", function () { new obj(); }, false);
var basic = /** @class */ (function () {
    function basic() {
        this.color = "";
        this.text = "";
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.hight = 0;
        this.id = 0;
        this.type = "";
        //public btn:PIXI.Graphics | PIXI.Sprite;
    }
    return basic;
}());
var basicbtn = /** @class */ (function (_super) {
    __extends(basicbtn, _super);
    function basicbtn(texture) {
        var _this = _super.call(this, texture) || this;
        _this.color = "";
        _this.text = "";
        _this.x = 0;
        _this.y = 0;
        _this.width = 0;
        _this.hight = 0;
        _this.id = 0;
        _this.type = "";
        return _this;
    }
    basicbtn.prototype.creatGraphic = function (sx, sy, w, h) {
        var gr = new PIXI.Graphics();
        gr.drawRect(sx, sy, w, h);
        this.addChild(gr);
    };
    basicbtn.prototype.createtextureBtn = function (value) {
        //this.texture=value;
    };
    return basicbtn;
}(PIXI.Sprite));
var obj = /** @class */ (function () {
    function obj() {
        var _this = this;
        this._objList = [];
        this._app = new PIXI.Application({
            width: 560,
            height: 300,
            backgroundColor: 0x77ddff
        });
        document.body.appendChild(this._app.view);
        /*
         var btn:basicbtn=new basicbtn();
         btn.creatGraphic(0,0,100,100);
         this._app.stage.addChild(btn);
         */
        //this._display=new PIXI.Text("");
        //this._display.y=250;
        //this._app.stage.addChild(this._display);
        for (var i = 0; i < 5; i++) {
            var object = new basic;
            object.color = "0xffffff";
            object.text = "按鈕:" + i;
            object.x = i;
            object.width = 100;
            object.hight = 50;
            object.id = i;
            object.type = "rect";
            this._objList.push(object);
        }
        console.log(this._objList);
        var _loop_1 = function () {
            console.log(this_1._objList[i].id);
            var button = new PIXI.Graphics();
            button.beginFill(this_1._objList[i].color);
            //button.drawRect(10+this._objList[i].x*110,10+this._objList[i].y*60,this._objList[i].width,this._objList[i].hight);
            button.drawRect(10, 10, 100, 100);
            button.endFill();
            var buttonText = new PIXI.Text(this_1._objList[i].text);
            //console.log("check_textWidth",buttonText.width,"check_textHight",buttonText.height);
            //console.log("check_point",buttonText.anchor);
            button.pivot.set(10, 10);
            //buttonText.style.ba
            //button.addChild(buttonText);
            //buttonText.x=10+i*110;
            //buttonText.y=20;
            button.interactive = true;
            button.buttonMode = true;
            button.id = this_1._objList[i].id;
            button.on("pointertap", function () {
                _this._display.text = "按鈕" + button.id + "被按了";
            });
            this_1._app.stage.addChild(button);
            button.x = 0;
            button.y = 0;
        };
        var this_1 = this;
        // for(var i=0;i<this._objList.length;i++){
        for (var i = 0; i < 1; i++) {
            _loop_1();
        }
    }
    return obj;
}());
