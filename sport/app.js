"use strict";
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
var animation;
(function (animation) {
    var animationAction = /** @class */ (function () {
        function animationAction() {
            this._isSpriteSheet = false;
            this._quantity = 0;
            this._speed = 1;
            this._polygon = 0;
            this._fps = 60;
            this._animationId = 0;
            this._objectList = [];
            //public _reuseObjectList:any[]=[];
            this._reuseObj1 = [];
            this._reuseObj2 = [];
        }
        animationAction.prototype.displayWithFps = function (currentsport) {
            var _this = this;
            var str = currentsport;
            this._animationId = setTimeout(function () {
                _this.displayWithFps(str);
            }, 1000 / this._fps);
            for (var i = 0; i < this._objectList.length; i++) {
                var obj = this._objectList[i];
                obj.animationSpeed = 0.5 * this._fps / 60;
            }
            switch (str) {
                case "lineSport":
                    this.lineSport();
                    break;
                case "parabolaSport":
                    this.parabolaSport();
                    break;
                case "circularSport":
                    this.circularSport();
                    break;
                case "ovalSport":
                    this.ovalSport();
                    break;
                case "sine":
                    this.sineSport();
                    break;
                case "cosine":
                    this.cosineSport();
                    break;
                case "frictionSport":
                    this.frictionSport();
                    break;
                case "bounceSport":
                    this.bounceSport();
                    break;
                case "collisionSport":
                    this.collisionSport();
                    break;
            }
        };
        animationAction.prototype.getFunction = function (e) {
            switch (e.type) {
                case "setQuantity":
                    this.setQuantity(e.data);
                    break;
                case "setSpeed":
                    this.setSpeed(e.data);
                    break;
                case "setPolygon":
                    this.setPolygon(e.data);
                    break;
                case "setFps":
                    this.setFps(e.data);
                    break;
                case "spriteSheet":
                    this.spriteSheet();
                    break;
            }
        };
        animationAction.prototype.lineSport = function () {
            for (var i = 0; i < this._objectList.length; i++) {
                var obj = this._objectList[i];
                if (obj.theta === undefined) {
                    obj.theta = Math.random() * 360;
                }
                if (obj.status === undefined) {
                    obj.status = 1;
                }
                if (obj.directionOfx === undefined || obj.directionOfy === undefined) {
                    obj.directionOfx = Math.sin(obj.theta * Math.PI / 180);
                    obj.directionOfy = Math.cos(obj.theta * Math.PI / 180);
                }
                if (this._fps !== 0) {
                    obj.x += obj.directionOfx * this._speed * 60 / this._fps;
                    obj.y += obj.directionOfy * this._speed * 60 / this._fps;
                }
                if (obj.x > 580 || obj.x < 10) {
                    obj.directionOfx = -obj.directionOfx;
                }
                if (obj.y > 470 || obj.y < 10) {
                    obj.directionOfy = -obj.directionOfy;
                }
                if (obj.x > 600 || obj.x < -10 || obj.y > 490 || obj.y < -10) {
                    obj.x = 295;
                    obj.y = 240;
                    obj.x += i * 2.5;
                }
            }
        };
        //(x-h)^2=4*c*(y-k) 頂點為(h,k),焦距為|c|
        animationAction.prototype.parabolaSport = function () {
            for (var i = 0; i < this._objectList.length; i++) {
                var obj = this._objectList[i];
                if (obj.status === undefined) {
                    obj.status = 1;
                    obj.x += i * 2.5;
                }
                if (this._fps !== 0) {
                    if (obj.status) {
                        obj.x += 1 * this._speed * 60 / this._fps;
                        obj.y = Math.pow(obj.x - 295, 2) / 4 / 100 + 240;
                        if (obj.x > 580 || obj.y > 470) {
                            obj.status = 0;
                        }
                    }
                    else {
                        obj.x -= 1 * this._speed * 60 / this._fps;
                        obj.y = Math.pow(obj.x - 295, 2) / 4 / 100 + 240;
                        if (obj.x < 10 || obj.y > 470) {
                            obj.status = 1;
                        }
                    }
                    if (obj.x > 590 || obj.x < 0 || obj.y > 480) {
                        obj.x = 295;
                        obj.y = 240;
                        obj.status = 1;
                        obj.x += i * 2.5;
                    }
                }
            }
        };
        // (x-h)^2 +(y-k)^2 = r^2 圓心為(h,k),半徑為r => 參數化 x=h+r*cos(t) , y=k+r*sin(t)
        animationAction.prototype.circularSport = function () {
            for (var i = 0; i < this._objectList.length; i++) {
                var obj = this._objectList[i];
                if (obj.status === undefined) {
                    obj.status = 1;
                }
                if (obj.theta === undefined) {
                    obj.theta = Math.random() * 360;
                }
                else {
                    if (this._fps !== 0) {
                        obj.theta += this._speed * 60 / this._fps;
                    }
                }
                obj.x = Math.sin((obj.theta) * Math.PI / 180) * 100 + 295;
                obj.y = Math.cos((obj.theta) * Math.PI / 180) * 100 + 240;
            }
        };
        // (x-h)^2 / a^2 + (y-k)^2 / b^2 = 1 中心為(h,k),半長軸為a,半短軸為b => 參數化 x=h+a*cos(t) , y=k+b*sin(t)
        animationAction.prototype.ovalSport = function () {
            for (var i = 0; i < this._objectList.length; i++) {
                var obj = this._objectList[i];
                if (obj.theta === undefined) {
                    obj.theta = Math.random() * 360;
                }
                if (obj.status === undefined) {
                    obj.status = 1;
                }
                else {
                    if (this._fps !== 0) {
                        obj.theta += this._speed * 60 / this._fps;
                    }
                }
                obj.x = 140 * Math.cos(obj.theta * Math.PI / 180) + 295;
                obj.y = -70 * Math.sin(obj.theta * Math.PI / 180) + 240;
            }
        };
        // y=a*sin(x) 震幅為a
        animationAction.prototype.sineSport = function () {
            for (var i = 0; i < this._objectList.length; i++) {
                var obj = this._objectList[i];
                if (obj.status === undefined) {
                    obj.status = 1;
                    obj.x += i * 2.5;
                }
                if (this._fps !== 0) {
                    if (obj.status) {
                        obj.x += this._speed * 60 / this._fps * 0.5;
                        if (obj.x > 580) {
                            obj.status = 0;
                        }
                    }
                    else {
                        obj.x -= this._speed * 60 / this._fps * 0.5;
                        if (obj.x < 10) {
                            obj.status = 1;
                        }
                    }
                }
                if (obj.x > 590 || obj.x < 0) {
                    obj.x = 295;
                    obj.y = 240;
                    obj.status = undefined;
                }
                obj.y = -100 * Math.sin((obj.x - 295) / 25) + 240;
            }
        };
        // y=a*cos(x) 震幅為a
        animationAction.prototype.cosineSport = function () {
            for (var i = 0; i < this._objectList.length; i++) {
                var obj = this._objectList[i];
                if (obj.status === undefined) {
                    obj.status = 1;
                    obj.x += i * 2.5;
                }
                if (this._fps !== 0) {
                    if (obj.status) {
                        obj.x += this._speed * 60 / this._fps * 0.5;
                        if (obj.x > 580) {
                            obj.status = 0;
                        }
                    }
                    else {
                        obj.x -= this._speed * 60 / this._fps * 0.5;
                        if (obj.x < 10) {
                            obj.status = 1;
                        }
                    }
                }
                if (obj.x > 590 || obj.x < 0) {
                    obj.x = 295;
                    obj.y = 240;
                    obj.status = undefined;
                }
                obj.y = -100 * Math.cos((obj.x - 295) / 25) + 240;
            }
        };
        animationAction.prototype.frictionSport = function () {
            for (var i = 0; i < this._objectList.length; i++) {
                var obj = this._objectList[i];
                if (obj.status === undefined) {
                    obj.status = 1;
                    obj.x = 10 + Math.random() * 570;
                    obj.y = 10 + Math.random() * 460;
                }
                obj.frictionOfVx *= obj.friction;
                if (this._fps !== 0) {
                    if (obj.status) {
                        obj.x += obj.frictionOfVx * this._speed * 0.1 * 60 / this._fps;
                        if (obj.x + obj.frictionOfVx > 580) {
                            obj.status = 0;
                        }
                    }
                    else {
                        obj.x -= obj.frictionOfVx * this._speed * 0.2 * 60 / this._fps;
                        if (obj.x + obj.frictionOfVx < 10) {
                            obj.status = 1;
                        }
                    }
                }
                if (obj.x > 600 || obj.x < -10) {
                    obj.x = 295;
                    obj.y = 240;
                    obj.status = undefined;
                }
            }
        };
        animationAction.prototype.bounceSport = function () {
            for (var i = 0; i < this._objectList.length; i++) {
                var obj = this._objectList[i];
                if (obj.bounceOfVy === undefined) {
                    obj.bounceOfVy = 2;
                }
                if (obj.status === undefined) {
                    obj.status = 1;
                    obj.x = 10 + Math.random() * 570;
                    obj.y = 10 + Math.random() * 460;
                }
                if (this._speed !== 0 && this._fps !== 0) {
                    obj.y += obj.bounceOfVy;
                    obj.bounceOfVy *= 0.99;
                    obj.bounceOfVy += 0.1 * this._speed * this._fps / 60;
                    if (obj.y + obj.bounceOfVy > 470 || obj.y + obj.bounceOfVy < 10) {
                        obj.bounceOfVy = -obj.bounceOfVy;
                    }
                }
                if (obj.y > 480 || obj.y < 0) {
                    obj.x = 295;
                    obj.y = 240;
                    obj.status = undefined;
                    obj.bounceOfVy = 2;
                }
            }
        };
        animationAction.prototype.collisionSport = function () {
            for (var i = 0; i < this._objectList.length; i++) {
                var obj = this._objectList[i];
                if (obj.theta === undefined) {
                    obj.theta = Math.random() * 360;
                }
                if (obj.status === undefined) {
                    obj.x = 10 + Math.random() * 570;
                    obj.y = 10 + Math.random() * 460;
                    obj.status = 1;
                }
                if (obj.vx === undefined || obj.vy === undefined) {
                    obj.vx = Math.sin(obj.theta * Math.PI / 180);
                    obj.vy = Math.cos(obj.theta * Math.PI / 180);
                }
                if (this._fps !== 0) {
                    obj.x += obj.vx * this._speed * 60 / this._fps;
                    obj.y += obj.vy * this._speed * 60 / this._fps;
                }
                if (obj.x > 580 || obj.x < 10) {
                    obj.vx = -obj.vx;
                }
                if (obj.y > 470 || obj.y < 10) {
                    obj.vy = -obj.vy;
                }
                if (obj.x > 590 || obj.x < 0 || obj.y > 480 || obj.y < 0) {
                    obj.x = 295 + i * 2.5;
                    obj.y = 240;
                    obj.vx = Math.sin(obj.theta * Math.PI / 180);
                    obj.vy = Math.cos(obj.theta * Math.PI / 180);
                }
            }
            this.detectCollisions();
        };
        animationAction.prototype.setSpeed = function (sign) {
            if (sign === "+") {
                if (this._speed < 15) {
                    this._speed++;
                }
            }
            else {
                if (this._speed > 0) {
                    this._speed--;
                }
            }
        };
        animationAction.prototype.setQuantity = function (sign) {
            if (sign === "+") {
                if (this._quantity < 100) {
                    this._quantity++;
                }
            }
            else {
                if (this._quantity > 0) {
                    this._quantity--;
                }
            }
        };
        animationAction.prototype.setPolygon = function (sign) {
            if (sign === "+") {
                if (this._polygon === 0) {
                    this._polygon = 3;
                }
                else {
                    this._polygon++;
                }
            }
            else {
                if (this._polygon === 3) {
                    this._polygon = 0;
                }
                else if (this._polygon > 0) {
                    this._polygon--;
                }
            }
        };
        animationAction.prototype.setFps = function (sign) {
            if (sign === "+") {
                if (this._fps < 60) {
                    this._fps += 5;
                }
            }
            else {
                if (this._fps > 0) {
                    this._fps -= 5;
                }
            }
        };
        animationAction.prototype.spriteSheet = function () {
            this._isSpriteSheet = !this._isSpriteSheet;
        };
        animationAction.prototype.circleIntersect = function (x1, y1, r1, x2, y2, r2) {
            var squareDistance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
            return squareDistance <= (r1 + r2) * (r1 + r2);
        };
        animationAction.prototype.detectCollisions = function () {
            var obj1;
            var obj2;
            for (var i = 0; i < this._objectList.length; i++) {
                obj1 = this._objectList[i];
                for (var j = i + 1; j < this._objectList.length; j++) {
                    obj2 = this._objectList[j];
                    if (this.circleIntersect(obj1.x, obj1.y, obj1.width / 2, obj2.x, obj2.y, obj2.width / 2)) {
                        var vCollision = { x: obj2.x - obj1.x, y: obj2.y - obj1.y };
                        var distance = Math.sqrt((obj2.x - obj1.x) * (obj2.x - obj1.x) + (obj2.y - obj1.y) * (obj2.y - obj1.y));
                        var vCollisionNorm = { x: vCollision.x / distance, y: vCollision.y / distance };
                        var vRelativeVelocity = { x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy };
                        var speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
                        if (speed < 0) {
                            break;
                        }
                        obj1.vx -= (speed * vCollisionNorm.x);
                        obj1.vy -= (speed * vCollisionNorm.y);
                        obj2.vx += (speed * vCollisionNorm.x);
                        obj2.vy += (speed * vCollisionNorm.y);
                    }
                }
            }
        };
        return animationAction;
    }());
    animation.animationAction = animationAction;
})(animation || (animation = {}));
///<reference path="pixi.js.d.ts"/>
var animation;
///<reference path="pixi.js.d.ts"/>
(function (animation) {
    var BtnKeyValue = /** @class */ (function () {
        function BtnKeyValue() {
            this.Name = "";
            this.TextValue = "";
        }
        return BtnKeyValue;
    }());
    var animationView = /** @class */ (function (_super) {
        __extends(animationView, _super);
        function animationView() {
            var _this = _super.call(this) || this;
            _this._performance = new PIXI.Graphics;
            _this._informationOfQuantity = new PIXI.Text();
            _this._informationOfPolygon = new PIXI.Text();
            _this._informationOfSpeed = new PIXI.Text();
            _this._informationOfFps = new PIXI.Text();
            _this._spriteSheetFrames = [];
            _this._textstyle = new PIXI.TextStyle({
                fontSize: 20,
                fontWeight: 'bold',
            });
            _this._informationText = new PIXI.TextStyle({
                fontSize: 15,
            });
            _this.sportMap = [
                { Name: "lineSport", TextValue: "直線" }, { Name: "parabolaSport", TextValue: "拋物線" },
                { Name: "circularSport", TextValue: "圓形" }, { Name: "ovalSport", TextValue: "橢圓形" },
                { Name: "sine", TextValue: "正弦" }, { Name: "cosine", TextValue: "餘弦" },
                { Name: "frictionSport", TextValue: "摩擦" }, { Name: "bounceSport", TextValue: "彈跳" },
                { Name: "collisionSport", TextValue: "碰撞" }
            ];
            _this.setOption = [{ Name: "setQuantity", TextValue: "數量" }, { Name: "setSpeed", TextValue: "速度" }, { Name: "setPolygon", TextValue: "邊數" }, { Name: "setFps", TextValue: "FPS" }];
            _this.playMap = [{ Name: "spriteSheet", TextValue: "Sprite Sheet" }, { Name: "play", TextValue: "播放" }, { Name: "stop", TextValue: "暫停" }, { Name: "clear", TextValue: "清除" }];
            /*var obj:any={};
            //var obj:Object=new Object();
            obj.id="hello";
            obj.id1="hello1";
            obj.id2="hello2";
            obj.id3="hello3";
            obj.id4="hello4";
            obj.id5="hello5";
            obj.id6="hello6";
            //--利用for 撈出來~~
            for (const key in obj) {
                console.log( obj[key]);
            }
            
            //var obj:Object={};*/
            _this._app = new PIXI.Application({
                width: 710,
                height: 640
            });
            document.body.appendChild(_this._app.view);
            _this._app.loader.add("./fighter.json");
            _this._app.loader.load(function () { _this.addOperationButtons(); });
            return _this;
        }
        animationView.prototype.addOperationButtons = function () {
            var _this = this;
            //建spriteSheetFrames
            for (var i_1 = 0; i_1 < 30; i_1++) {
                var val = i_1 < 10 ? "0" + i_1 : i_1;
                var texture = PIXI.Texture.from("rollSequence00" + val + ".png");
                this._spriteSheetFrames.push(texture);
            }
            //運動呈現區
            var originPoint = new PIXI.Graphics();
            originPoint.beginFill(0x66FF6F);
            originPoint.drawCircle(0, 0, 5);
            originPoint.endFill();
            originPoint.pivot.set(0.5);
            originPoint.x = 295;
            originPoint.y = 240;
            var i = 1;
            this._informationOfQuantity = new PIXI.Text("物件數量:0", this._informationText);
            this._informationOfSpeed = new PIXI.Text("速度:1", this._informationText);
            this._informationOfSpeed.y = 20;
            this._informationOfPolygon = new PIXI.Text("邊數:0", this._informationText);
            this._informationOfPolygon.y = 40;
            this._informationOfFps = new PIXI.Text("FPS:60", this._informationText);
            this._informationOfFps.y = 60;
            this._performance.beginFill(0xFFFFFF);
            this._performance.drawRoundedRect(0, 0, 590, 480, 10);
            this._performance.endFill();
            this._performance.x = 110;
            this._performance.y = 10;
            this._performance.addChild(this._informationOfQuantity);
            this._performance.addChild(this._informationOfPolygon);
            this._performance.addChild(this._informationOfSpeed);
            this._performance.addChild(this._informationOfFps);
            this._performance.addChild(originPoint);
            this._app.stage.addChild(this._performance);
            var _loop_1 = function () {
                var text = new PIXI.Text(this_1.sportMap[i].TextValue, this_1._textstyle);
                text.anchor.set(0.5);
                text.x = 45;
                text.y = 30;
                var sportButton = new PIXI.Graphics();
                sportButton.beginFill(0xFFCC5A);
                sportButton.drawRoundedRect(0, 0, 90, 60, 5);
                sportButton.endFill();
                sportButton.pivot.set(0);
                sportButton.x = 10;
                sportButton.y = 10 + i * 70;
                sportButton.Name = this_1.sportMap[i].Name;
                sportButton.interactive = true;
                sportButton.buttonMode = true;
                sportButton.on("pointertap", function () {
                    _this.emit("sportEvent", {
                        type: sportButton.Name
                    });
                });
                sportButton.addChild(text);
                this_1._app.stage.addChild(sportButton);
            };
            var this_1 = this;
            //運動按鈕
            for (i = 0; i < 9; i++) {
                _loop_1();
            }
            var _loop_2 = function () {
                var text = new PIXI.Text(this_2.setOption[i].TextValue, this_2._textstyle);
                text.anchor.set(0.5);
                text.x = 70;
                text.y = 30;
                var addButton = new PIXI.Graphics();
                addButton.beginFill(0xFF8040);
                addButton.drawCircle(0, 0, 15);
                addButton.pivot.set(0.5);
                addButton.x = 120;
                addButton.y = 30;
                addButton.interactive = true;
                addButton.buttonMode = true;
                var addSign = new PIXI.Text("+", this_2._textstyle);
                addSign.anchor.set(0.5);
                addButton.addChild(addSign);
                var subButton = new PIXI.Graphics();
                subButton.beginFill(0xFF8040);
                subButton.drawCircle(0, 0, 15);
                subButton.pivot.set(0.5);
                subButton.x = 20;
                subButton.y = 30;
                var subSign = new PIXI.Text("-", this_2._textstyle);
                subSign.anchor.set(0.5);
                subButton.addChild(subSign);
                var setButton = new PIXI.Graphics();
                setButton.beginFill(0xFFAD86);
                setButton.drawRoundedRect(0, 0, 140, 60, 10);
                setButton.endFill();
                setButton.pivot.set(0);
                setButton.x = 110 + 150 * i;
                setButton.y = 570;
                setButton.Name = this_2.setOption[i].Name;
                subButton.interactive = true;
                subButton.buttonMode = true;
                addButton.on("pointertap", function () {
                    _this.emit("elseEvent", {
                        type: setButton.Name,
                        data: "+"
                    });
                });
                subButton.on("pointertap", function () {
                    _this.emit("elseEvent", {
                        type: setButton.Name,
                        data: "-"
                    });
                });
                setButton.addChild(addButton);
                setButton.addChild(subButton);
                setButton.addChild(text);
                this_2._app.stage.addChild(setButton);
            };
            var this_2 = this;
            //可調式按鈕:數量.數度.邊數.FPS
            for (i = 0; i < 4; i++) {
                _loop_2();
            }
            var _loop_3 = function () {
                var text = new PIXI.Text(this_3.playMap[i].TextValue, this_3._textstyle);
                text.anchor.set(0.5);
                text.x = 70;
                text.y = 30;
                var playButton = new PIXI.Graphics();
                playButton.beginFill(0xFF7575);
                playButton.drawRoundedRect(0, 0, 140, 60, 10);
                playButton.endFill();
                playButton.pivot.set(0);
                playButton.x = 110 + 150 * i;
                playButton.y = 500;
                playButton.Name = this_3.playMap[i].Name;
                playButton.interactive = true;
                playButton.buttonMode = true;
                playButton.on("pointertap", function () {
                    _this.emit("elseEvent", {
                        type: playButton.Name
                    });
                });
                playButton.addChild(text);
                this_3._app.stage.addChild(playButton);
            };
            var this_3 = this;
            //播放.暫停.清除.SpriteSheet
            for (i = 0; i < 4; i++) {
                _loop_3();
            }
        };
        return animationView;
    }(PIXI.utils.EventEmitter));
    animation.animationView = animationView;
})(animation || (animation = {}));
///<reference path="./animationAction.ts"/>
///<reference path="./view.ts"/>
document.addEventListener("DOMContentLoaded", function () { new animationController(); }, false);
var animationController = /** @class */ (function () {
    function animationController() {
        var _this = this;
        this._currentSport = "";
        this._isPlay = false;
        this.sportCaller = function (e) {
            clearTimeout(_this._animationActions._animationId);
            _this._currentSport = e.type;
            _this._isPlay = true;
            _this._animationActions.displayWithFps(_this._currentSport);
            if (e.type === "frictionSport") {
                _this.reset();
            }
        };
        this.caller = function (e) {
            switch (e.type) {
                case "play":
                    if (_this._isPlay === false) {
                        _this._isPlay = true;
                        _this._animationActions.displayWithFps(_this._currentSport);
                    }
                    break;
                case "stop":
                    _this._isPlay = false;
                    clearTimeout(_this._animationActions._animationId);
                    break;
                case "clear":
                    _this.clear();
                    break;
                default:
                    _this._animationActions.getFunction(e);
                    switch (e.type) {
                        case "setQuantity":
                            if (e.data === "-") {
                                _this.removeLastObject();
                            }
                            else {
                                _this.addObject();
                                _this.reset();
                            }
                            _this.refreshInformation();
                            break;
                        case "setSpeed":
                            _this.refreshInformation();
                            break;
                        case "setPolygon":
                            _this.changePolygon();
                            _this.refreshInformation();
                            break;
                        case "setFps":
                            for (var i = 0; i < _this._animationActions._objectList.length; i++) {
                                var obj = _this._animationActions._objectList[i];
                                obj.animationSpeed = 0.5 * _this._animationActions._fps / 60;
                            }
                            _this.refreshInformation();
                            break;
                    }
            }
        };
        this._animationActions = new animation.animationAction();
        this._view = new animation.animationView();
        this._view.on("elseEvent", this.caller);
        this._view.on("sportEvent", this.sportCaller);
    }
    /*private clear():void{
       clearTimeout(this._animationActions._animationId);
       for(let i:number=0;i<this._animationActions._objectList.length;i++){
          if (this._view._performance.children.length>5){
             this._view._performance.removeChildAt(this._view._performance.children.length-1);
          }
       }
       this._currentSport="";
       this._isPlay=false;
       var objectListLenth=this._animationActions._objectList.length;
       for(var i:number=objectListLenth;i>0;i--){
          this._animationActions._reuseObjectList.push(this._animationActions._objectList.pop());
       }
       this._animationActions._quantity=0;
       this._animationActions._speed=1;
       this._animationActions._polygon=0;
       this._animationActions._fps=60;
       this.refreshInformation();
    }
 
    private removeLastObject():void{
       if(this._animationActions._objectList.length>0){
          this._animationActions._reuseObjectList.push(this._animationActions._objectList.pop());
          if (this._view._performance.children.length!==5){
             this._view._performance.removeChildAt(this._view._performance.children.length-1);
          }
       }
    }
    private addObject():void{
       if(this._animationActions._objectList.length<100){
          if (this._animationActions._isSpriteSheet){
             var a=undefined
             if(this._animationActions._reuseObjectList.length!==0){
                for(var i=0;i<this._animationActions._reuseObjectList.length;i++){
                   if(this._animationActions._reuseObjectList[i].pluginName==="sprite"){
                      a=i;
                      break;
                   }
                }
             }
             if(this._animationActions._reuseObjectList.length===0 || a===undefined){
                var anim:PIXI.extras.AnimatedSprite=new PIXI.extras.AnimatedSprite(this._view._spriteSheetFrames);
                anim.scale.set(0.08);
                anim.anchor.set(0.5);
                anim.x=295;
                anim.y=240;
                anim.animationSpeed =0.5*this._animationActions._fps/60;
                anim.play();
                this._animationActions._objectList.push(anim);
                this._view._performance.addChild(anim);
             }
             else{
                var reuseAnim=this._animationActions._reuseObjectList.splice(a,1);
                reuseAnim.x=295;
                reuseAnim.y=240;
                reuseAnim.animationSpeed =0.5*this._animationActions._fps/60;
                this._animationActions._objectList.push(reuseAnim);
                this._view._performance.addChild(reuseAnim);
             }
          }
          else{
             if(this._animationActions._reuseObjectList.length!==0){
                for(var i=0;i<this._animationActions._reuseObjectList.length;i++){
                   if(this._animationActions._reuseObjectList[i].pluginName===undefined){
                      a=i;
                      break;
                   }
                }
             }
             if(this._animationActions._reuseObjectList.length===0 || a===undefined){
                var graphic:PIXI.Graphics=new PIXI.Graphics();
                this.drawObject(graphic);
                graphic.x=295;
                graphic.y=240;
                this._animationActions._objectList.push(graphic);
                this._view._performance.addChild(graphic);
             }
             else{
                var reuseGraphic=this._animationActions._reuseObjectList.splice(a,1);
                reuseGraphic.x=295;
                reuseGraphic.y=240;
                reuseGraphic.frictionOfVx=8;
                this._animationActions._objectList.push(reuseGraphic);
                this._view._performance.addChild(reuseGraphic);
             }
          }
       }
    }*/
    animationController.prototype.clear = function () {
        clearTimeout(this._animationActions._animationId);
        for (var i_2 = 0; i_2 < this._animationActions._objectList.length; i_2++) {
            if (this._view._performance.children.length > 5) {
                this._view._performance.removeChildAt(this._view._performance.children.length - 1);
            }
        }
        this._currentSport = "";
        this._isPlay = false;
        var objectListLenth = this._animationActions._objectList.length;
        for (var i = objectListLenth; i > 0; i--) {
            if (this._animationActions._objectList[i - 1].pluginName === "sprite") {
                this._animationActions._reuseObj2.push(this._animationActions._objectList.pop());
            }
            else {
                this._animationActions._reuseObj1.push(this._animationActions._objectList.pop());
            }
        }
        this._animationActions._quantity = 0;
        this._animationActions._speed = 1;
        this._animationActions._polygon = 0;
        this._animationActions._fps = 60;
        this.refreshInformation();
    };
    animationController.prototype.removeLastObject = function () {
        if (this._animationActions._objectList.length > 0) {
            if (this._animationActions._objectList[this._animationActions._objectList.length - 1].pluginName === "sprite") {
                this._animationActions._reuseObj2.push(this._animationActions._objectList.pop());
            }
            else {
                this._animationActions._reuseObj1.push(this._animationActions._objectList.pop());
            }
            if (this._view._performance.children.length !== 5) {
                this._view._performance.removeChildAt(this._view._performance.children.length - 1);
            }
        }
    };
    animationController.prototype.addObject = function () {
        if (this._animationActions._objectList.length < 100) {
            if (this._animationActions._isSpriteSheet) {
                if (this._animationActions._reuseObj2.length === 0) {
                    var anim = new PIXI.extras.AnimatedSprite(this._view._spriteSheetFrames);
                    anim.scale.set(0.08);
                    anim.anchor.set(0.5);
                    anim.x = 295;
                    anim.y = 240;
                    anim.animationSpeed = 0.5 * this._animationActions._fps / 60;
                    anim.play();
                    this._animationActions._objectList.push(anim);
                    this._view._performance.addChild(anim);
                }
                else {
                    var reuseAnim = this._animationActions._reuseObj2.pop();
                    reuseAnim.x = 295;
                    reuseAnim.y = 240;
                    reuseAnim.animationSpeed = 0.5 * this._animationActions._fps / 60;
                    this._animationActions._objectList.push(reuseAnim);
                    this._view._performance.addChild(reuseAnim);
                }
            }
            else {
                if (this._animationActions._reuseObj1.length === 0) {
                    var graphic = new PIXI.Graphics();
                    this.drawObject(graphic);
                    graphic.x = 295;
                    graphic.y = 240;
                    this._animationActions._objectList.push(graphic);
                    this._view._performance.addChild(graphic);
                }
                else {
                    var reuseGraphic = this._animationActions._reuseObj1.pop();
                    reuseGraphic.x = 295;
                    reuseGraphic.y = 240;
                    reuseGraphic.frictionOfVx = 8;
                    this._animationActions._objectList.push(reuseGraphic);
                    this._view._performance.addChild(reuseGraphic);
                }
            }
        }
    };
    animationController.prototype.refreshInformation = function () {
        this._view._informationOfQuantity.text = "物件數量:" + this._animationActions._quantity;
        this._view._informationOfSpeed.text = "速度:" + this._animationActions._speed;
        this._view._informationOfPolygon.text = "邊數:" + this._animationActions._polygon;
        this._view._informationOfFps.text = "FPS:" + this._animationActions._fps;
    };
    //修改所有圖案邊數
    animationController.prototype.changePolygon = function () {
        for (var i = 0; i < this._animationActions._objectList.length; i++) {
            //改變不是SpriteSheet的圖案邊數
            if (this._animationActions._objectList[i].clear !== undefined) {
                this._animationActions._objectList[i].clear();
                this.drawObject(this._animationActions._objectList[i]);
            }
        }
    };
    animationController.prototype.drawObject = function (graphic) {
        if (this._animationActions._polygon === 0) {
            graphic.beginFill(0xe74c3c * Math.random());
            graphic.drawCircle(0, 0, 10);
            graphic.endFill();
        }
        else {
            //多邊形
            this.drawPolygon(graphic);
        }
    };
    animationController.prototype.drawPolygon = function (obj) {
        var r = 10;
        var mX = 0;
        var mY = 0;
        //計算多邊形的座標
        var path = [];
        for (var i = 0; i <= this._animationActions._polygon; i++) {
            var alpha = (2 / this._animationActions._polygon * i - 0.5) * Math.PI;
            var nextX = mX + r * Math.cos(alpha);
            var nextY = mY + r * Math.sin(alpha);
            path.push(nextX);
            path.push(nextY);
        }
        obj.beginFill(0xe74c3c * Math.random());
        obj.drawPolygon(path);
        obj.endFill();
    };
    animationController.prototype.reset = function () {
        for (var i = 0; i < this._animationActions._objectList.length; i++) {
            var obj = this._animationActions._objectList[i];
            obj.frictionOfVx = 8;
            obj.friction = 0.98;
        }
    };
    return animationController;
}());
//# sourceMappingURL=app.js.map