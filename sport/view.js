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
///<reference path="pixi.js.d.ts"/>
var animationView;
(function (animationView) {
    var BtnKeyValue = /** @class */ (function () {
        function BtnKeyValue() {
            this.Name = "";
            this.TextValue = "";
            this.Value = "";
        }
        return BtnKeyValue;
    }());
    var view = /** @class */ (function (_super) {
        __extends(view, _super);
        function view() {
            var _this = _super.call(this) || this;
            _this._container = new PIXI.Container();
            _this._textstyle = new PIXI.TextStyle({
                fontSize: 20,
                fontWeight: 'bold'
            });
            _this._informationText = new PIXI.TextStyle({
                fontSize: 15
            });
            _this.sportMap = [
                { Name: "lineSport", TextValue: "直線", Value: "" }, { Name: "parabolaSport", TextValue: "拋物線", Value: "" },
                { Name: "circularSport", TextValue: "圓形", Value: "" }, { Name: "ovalSport", TextValue: "橢圓形", Value: "" },
                { Name: "sine", TextValue: "正弦", Value: "" }, { Name: "cosine", TextValue: "餘弦", Value: "" },
                { Name: "frictionSport", TextValue: "摩擦", Value: "" }, { Name: "bounceSport", TextValue: "彈跳", Value: "" },
                { Name: "collisionSport", TextValue: "碰撞", Value: "" }
            ];
            _this.setOption = [{ Name: "quantity", TextValue: "數量", Value: "" }, { Name: "setSpeed", TextValue: "速度", Value: "" }, { Name: "setPolygon", TextValue: "邊數", Value: "" }, { Name: "setFps", TextValue: "FPS", Value: "" }];
            _this.playMap = [{ Name: "spriteSheet", TextValue: "Sprite Sheet", Value: "" }, { Name: "play", TextValue: "播放", Value: "" }, { Name: "stop", TextValue: "暫停", Value: "" }, { Name: "delete", TextValue: "清除", Value: "" }];
            _this._app = new PIXI.Application({
                width: 660,
                height: 550
            });
            document.body.appendChild(_this._app.view);
            _this._app.loader.add("./hw5source.json");
            _this._app.loader.load(function () { _this.onAssetsLoaded(); });
            return _this;
        }
        view.prototype.onAssetsLoaded = function () {
            var i = 1;
            var statusInformation = new PIXI.Text("參數資訊: 數量:" + "，邊數:" + "，速度:" + "，FPS:", this._informationText);
            var performance = new PIXI.Graphics();
            performance.beginFill(0xFFFFFF);
            performance.drawRoundedRect(0, 0, 550, 410, 10);
            performance.endFill();
            performance.x = 100;
            performance.y = 10;
            performance.addChild(statusInformation);
            this._app.stage.addChild(performance);
            //sportButton
            for (i = 0; i < 9; i++) {
                var text = new PIXI.Text(this.sportMap[i].TextValue, this._textstyle);
                text.anchor.set(0.5);
                text.x = 40;
                text.y = 25;
                var sportButton = new PIXI.Graphics();
                sportButton.beginFill(0xFFCC5A);
                sportButton.drawRoundedRect(0, 0, 80, 50, 5);
                sportButton.endFill();
                sportButton.pivot.set(0);
                sportButton.x = 10;
                sportButton.y = 10 + i * 60;
                sportButton.addChild(text);
                this._app.stage.addChild(sportButton);
            }
            //setOptionButton
            for (i = 0; i < 4; i++) {
                var text = new PIXI.Text(this.setOption[i].TextValue, this._textstyle);
                text.anchor.set(0.5);
                text.x = 65;
                text.y = 25;
                var addButton = new PIXI.Graphics();
                addButton.beginFill(0xFF8040);
                addButton.drawCircle(0, 0, 15);
                addButton.pivot.set(0.5);
                addButton.x = 20;
                addButton.y = 25;
                var addSign = new PIXI.Text("+", this._textstyle);
                addSign.anchor.set(0.5);
                addButton.addChild(addSign);
                var subButton = new PIXI.Graphics();
                subButton.beginFill(0xFF8040);
                subButton.drawCircle(0, 0, 15);
                subButton.pivot.set(0.5);
                subButton.x = 110;
                subButton.y = 25;
                var subSign = new PIXI.Text("-", this._textstyle);
                subSign.anchor.set(0.5);
                subButton.addChild(subSign);
                var setButton = new PIXI.Graphics();
                setButton.beginFill(0xFFAD86);
                setButton.drawRoundedRect(0, 0, 130, 50, 5);
                setButton.endFill();
                setButton.pivot.set(0);
                setButton.x = 100 + 140 * i;
                setButton.y = 490;
                setButton.addChild(addButton);
                setButton.addChild(subButton);
                setButton.addChild(text);
                this._app.stage.addChild(setButton);
            }
            //playButton
            for (i = 0; i < 4; i++) {
                var text = new PIXI.Text(this.playMap[i].TextValue, this._textstyle);
                text.anchor.set(0.5);
                text.x = 65;
                text.y = 25;
                var playButton = new PIXI.Graphics();
                playButton.beginFill(0xFF7575);
                playButton.drawRoundedRect(0, 0, 130, 50, 5);
                playButton.endFill();
                playButton.pivot.set(0);
                playButton.x = 100 + 140 * i;
                playButton.y = 430;
                playButton.addChild(text);
                this._app.stage.addChild(playButton);
            }
        };
        return view;
    }(PIXI.utils.EventEmitter));
    animationView.view = view;
})(animationView || (animationView = {}));
