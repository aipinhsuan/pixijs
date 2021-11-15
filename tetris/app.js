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
var tetris;
(function (tetris) {
    var tetrisAction = /** @class */ (function () {
        function tetrisAction() {
            this._setTimeoutId = 0;
            this._rotation = 0;
            this._isPause = true;
            this._currentTetromino = [];
            this._nextTetromino = [];
            this._gridData = [];
            this._specialCount = 1;
            this._currentScore = 0;
            for (var i = 0; i < 12; i++) {
                this._gridData.push([]);
                for (var j = 0; j < 24; j++) {
                    this._gridData[i].push(0);
                }
            }
        }
        tetrisAction.prototype.randomType = function () {
            var tetrominoTypes = {
                I: {
                    name: 'I',
                    color: 0xff8000,
                    size: 4,
                    isSpecial: false,
                    specialType: 0,
                    shapes: [
                        [
                            [0, 0, 0, 0],
                            [1, 1, 1, 1],
                            [0, 0, 0, 0],
                            [0, 0, 0, 0]
                        ],
                        [
                            [0, 0, 1, 0],
                            [0, 0, 1, 0],
                            [0, 0, 1, 0],
                            [0, 0, 1, 0]
                        ],
                        [
                            [0, 0, 0, 0],
                            [0, 0, 0, 0],
                            [1, 1, 1, 1],
                            [0, 0, 0, 0]
                        ],
                        [
                            [0, 1, 0, 0],
                            [0, 1, 0, 0],
                            [0, 1, 0, 0],
                            [0, 1, 0, 0]
                        ]
                    ]
                },
                J: {
                    name: 'J',
                    color: 0x2cc990,
                    size: 3,
                    isSpecial: false,
                    specialType: 0,
                    shapes: [
                        [
                            [1, 0, 0],
                            [1, 1, 1],
                            [0, 0, 0]
                        ],
                        [
                            [0, 1, 1],
                            [0, 1, 0],
                            [0, 1, 0]
                        ],
                        [
                            [0, 0, 0],
                            [1, 1, 1],
                            [0, 0, 1]
                        ],
                        [
                            [0, 1, 0],
                            [0, 1, 0],
                            [1, 1, 0]
                        ]
                    ]
                },
                L: {
                    name: 'L',
                    color: 0xf34344,
                    size: 3,
                    isSpecial: false,
                    specialType: 0,
                    shapes: [
                        [
                            [0, 0, 1],
                            [1, 1, 1],
                            [0, 0, 0]
                        ],
                        [
                            [0, 1, 0],
                            [0, 1, 0],
                            [0, 1, 1]
                        ],
                        [
                            [0, 0, 0],
                            [1, 1, 1],
                            [1, 0, 0]
                        ],
                        [
                            [1, 1, 0],
                            [0, 1, 0],
                            [0, 1, 0]
                        ]
                    ]
                },
                O: {
                    name: 'O',
                    color: 0xffdf00,
                    size: 2,
                    isSpecial: false,
                    specialType: 0,
                    shapes: [
                        [
                            [1, 1],
                            [1, 1]
                        ],
                        [
                            [1, 1],
                            [1, 1]
                        ],
                        [
                            [1, 1],
                            [1, 1]
                        ],
                        [
                            [1, 1],
                            [1, 1]
                        ]
                    ]
                },
                S: {
                    name: 'S',
                    color: 0xffaad5,
                    size: 3,
                    isSpecial: false,
                    specialType: 0,
                    shapes: [
                        [
                            [0, 1, 1],
                            [1, 1, 0],
                            [0, 0, 0]
                        ],
                        [
                            [0, 1, 0],
                            [0, 1, 1],
                            [0, 0, 1]
                        ],
                        [
                            [0, 0, 0],
                            [0, 1, 1],
                            [1, 1, 0]
                        ],
                        [
                            [1, 0, 0],
                            [1, 1, 0],
                            [0, 1, 0]
                        ]
                    ]
                },
                T: {
                    name: 'T',
                    color: 0x008aff,
                    size: 3,
                    isSpecial: false,
                    specialType: 0,
                    shapes: [
                        [
                            [0, 1, 0],
                            [1, 1, 1],
                            [0, 0, 0]
                        ],
                        [
                            [0, 1, 0],
                            [0, 1, 1],
                            [0, 1, 0]
                        ],
                        [
                            [0, 0, 0],
                            [1, 1, 1],
                            [0, 1, 0]
                        ],
                        [
                            [0, 1, 0],
                            [1, 1, 0],
                            [0, 1, 0]
                        ]
                    ]
                },
                Z: {
                    name: 'Z',
                    color: 0xbe77ff,
                    size: 3,
                    isSpecial: false,
                    specialType: 0,
                    shapes: [
                        [
                            [1, 1, 0],
                            [0, 1, 1],
                            [0, 0, 0]
                        ],
                        [
                            [0, 0, 1],
                            [0, 1, 1],
                            [0, 1, 0]
                        ],
                        [
                            [0, 0, 0],
                            [1, 1, 0],
                            [0, 1, 1]
                        ],
                        [
                            [0, 1, 0],
                            [1, 1, 0],
                            [1, 0, 0]
                        ]
                    ]
                }
            };
            var types = [tetrominoTypes.I, tetrominoTypes.J, tetrominoTypes.L, tetrominoTypes.O, tetrominoTypes.S, tetrominoTypes.T, tetrominoTypes.Z];
            var type = types[Math.floor(Math.random() * 7)];
            type.isSpecial = this._specialCount % 20 == 0 ? true : false;
            type.specialType = type.isSpecial ? Math.ceil(Math.random() * 2) : 0;
            this._specialCount++;
            return type;
        };
        tetrisAction.prototype.calculateScore = function (line) {
            if (line === 1) {
                this._currentScore += 100;
            }
            if (line === 2) {
                this._currentScore += 300;
            }
            if (line === 3) {
                this._currentScore += 500;
            }
            if (line === 4) {
                this._currentScore += 800;
            }
        };
        tetrisAction.prototype.specialCalculateScore = function (count) {
            this._currentScore += count * 50;
        };
        tetrisAction.prototype.right = function () {
            if (this._isPause === false) {
                this._currentTetromino[0].x += 1 * 25;
                if (this.isCollision(this._currentTetromino[0])) {
                    this._currentTetromino[0].x -= 1 * 25;
                }
            }
        };
        tetrisAction.prototype.left = function () {
            if (this._isPause === false) {
                this._currentTetromino[0].x -= 1 * 25;
                if (this.isCollision(this._currentTetromino[0])) {
                    this._currentTetromino[0].x += 1 * 25;
                }
            }
        };
        tetrisAction.prototype.spin = function () {
            if (this._isPause === false) {
                this._rotation = (this._rotation + 1) % 4;
                if (this.isCollision(this._currentTetromino[0])) {
                    this._rotation = (this._rotation - 1);
                    if (this._rotation === -1) {
                        this._rotation = 3;
                    }
                }
            }
        };
        tetrisAction.prototype.isCollision = function (tetromino) {
            for (var x = 0; x < tetromino.type.size; x++) {
                for (var y = 0; y < tetromino.type.size; y++) {
                    if (tetromino.x / 25 + x < 0 || tetromino.x / 25 + x >= 12 || y >= 24 || tetromino.y / 25 >= 0 && this._gridData[tetromino.x / 25 + x][tetromino.y / 25 + y] !== 0) {
                        if (tetromino.type.shapes[this._rotation][y][x] === 1) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        return tetrisAction;
    }());
    tetris.tetrisAction = tetrisAction;
})(tetris || (tetris = {}));
///<reference path="pixi.js.d.ts"/>
var tetris;
///<reference path="pixi.js.d.ts"/>
(function (tetris) {
    var tetrisView = /** @class */ (function (_super) {
        __extends(tetrisView, _super);
        function tetrisView() {
            var _this = _super.call(this) || this;
            _this._displayContainer = new PIXI.Container();
            _this._performance = new PIXI.Graphics;
            _this._scoreText = new PIXI.Text();
            _this._nextTetrisContainer = new PIXI.Graphics();
            _this._block = [];
            _this._app = new PIXI.Application({
                width: 500,
                height: 600,
                backgroundColor: 0x1099bb
            });
            document.body.appendChild(_this._app.view);
            _this._scoreText = new PIXI.Text("Score:0");
            var nextText = new PIXI.Text("Next:");
            nextText.y = 30;
            _this._nextTetrisContainer.beginFill(0xffffff);
            _this._nextTetrisContainer.drawRect(0, 0, 100, 100);
            _this._nextTetrisContainer.endFill();
            _this._nextTetrisContainer.x = 50;
            _this._nextTetrisContainer.y = 70;
            _this._displayContainer.addChild(_this._nextTetrisContainer);
            _this._displayContainer.addChild(_this._scoreText);
            _this._displayContainer.addChild(nextText);
            var playText = new PIXI.Text("Play");
            playText.anchor.set(0.5);
            playText.x = 100;
            playText.y = 25;
            var playButton = new PIXI.Graphics();
            playButton.beginFill(0xFFCC5A);
            playButton.drawRect(0, 0, 200, 50);
            playButton.endFill();
            playButton.x = 0;
            playButton.y = 550;
            playButton.interactive = true;
            playButton.buttonMode = true;
            playButton.on("pointertap", function () {
                _this.emit("playEvent", {
                    data: playText.text
                });
                if (playText.text === "Play") {
                    playText.text = "Pause";
                }
                else {
                    playText.text = "Play";
                }
            });
            var specialText1 = new PIXI.Text("特殊功能1");
            specialText1.anchor.set(0.5);
            specialText1.x = 100;
            specialText1.y = 25;
            var specialButton1 = new PIXI.Graphics();
            specialButton1.beginFill(0xFFA042);
            specialButton1.drawRect(0, 0, 200, 50);
            specialButton1.endFill();
            specialButton1.x = 0;
            specialButton1.y = 450;
            specialButton1.interactive = true;
            specialButton1.buttonMode = true;
            specialButton1.on("pointertap", function () {
                _this.emit("playEvent", {
                    data: specialText1.text
                });
            });
            specialButton1.addChild(specialText1);
            _this._displayContainer.addChild(specialButton1);
            var specialText2 = new PIXI.Text("特殊功能2");
            specialText2.anchor.set(0.5);
            specialText2.x = 100;
            specialText2.y = 25;
            var specialButton2 = new PIXI.Graphics();
            specialButton2.beginFill(0xFFAF60);
            specialButton2.drawRect(0, 0, 200, 50);
            specialButton2.endFill();
            specialButton2.x = 0;
            specialButton2.y = 500;
            specialButton2.interactive = true;
            specialButton2.buttonMode = true;
            specialButton2.on("pointertap", function () {
                _this.emit("playEvent", {
                    data: specialText2.text
                });
            });
            specialButton2.addChild(specialText2);
            _this._displayContainer.addChild(specialButton2);
            playButton.addChild(playText);
            _this._displayContainer.addChild(playButton);
            _this._app.stage.addChild(_this._displayContainer);
            var i = 0;
            for (var x = 0; x < 12; x++) {
                for (var y = 0; y < 24; y++) {
                    var per = new PIXI.Graphics();
                    per.lineStyle(1, 0x3c3c3c, 1);
                    per.beginFill(0x000000);
                    per.drawRect(0, 0, 25, 25);
                    per.endFill();
                    _this._block.push(per);
                    _this._block[i].x = x * 25;
                    _this._block[i].y = y * 25;
                    _this._performance.addChild(_this._block[i]);
                    i++;
                }
            }
            _this._performance.x = 200;
            _this._performance.y = 0;
            _this._app.stage.addChild(_this._performance);
            return _this;
        }
        return tetrisView;
    }(PIXI.utils.EventEmitter));
    tetris.tetrisView = tetrisView;
})(tetris || (tetris = {}));
///<reference path="./tetrisAction.ts"/>
///<reference path="./view.ts"/>
document.addEventListener("DOMContentLoaded", function () { new animationController(); }, false);
var colorRankData = /** @class */ (function () {
    function colorRankData() {
        this.color = "0";
        this.count = 0;
    }
    return colorRankData;
}());
var animationController = /** @class */ (function () {
    function animationController() {
        var _this = this;
        this._isNewTetromino = false;
        this._refreshID = 0;
        this._colorRank = [];
        this._specialCountOf1 = 0;
        this._specialCountOf2 = 0;
        this._isTurnOn1 = false;
        this._isTurnOn2 = false;
        this.caller = function (e) {
            if (e.data === "Play") {
                _this.displayWithFps();
                _this._tetrisActions._isPause = false;
            }
            if (e.data === "Pause") {
                clearTimeout(_this._tetrisActions._setTimeoutId);
                _this._tetrisActions._isPause = true;
            }
            if (e.data === "特殊功能1") {
                if (_this._isTurnOn2 === true) {
                    _this._isTurnOn2 = false;
                    _this._specialCountOf2--;
                }
                if (_this._isTurnOn1 === false) {
                    _this._tetrisActions._currentTetromino[0].type.isSpecial = true;
                    _this._tetrisActions._currentTetromino[0].type.specialType = 1;
                    _this._tetrisActions._currentTetromino[0].type.color = "0xa6a600";
                    _this.changeToSpecialColor("0xa6a600");
                    _this._specialCountOf1++;
                    _this._isTurnOn1 = !_this._isTurnOn1;
                }
            }
            if (e.data === "特殊功能2") {
                if (_this._isTurnOn1 === true) {
                    _this._isTurnOn1 = false;
                    _this._specialCountOf1--;
                }
                if (_this._isTurnOn2 === false) {
                    _this._tetrisActions._currentTetromino[0].type.isSpecial = true;
                    _this._tetrisActions._currentTetromino[0].type.specialType = 2;
                    _this._tetrisActions._currentTetromino[0].type.color = "0xffffff";
                    _this.changeToSpecialColor("0xffffff");
                    _this._specialCountOf2++;
                    _this._isTurnOn2 = !_this._isTurnOn2;
                }
            }
            console.log(_this._isTurnOn1 + "+" + _this._specialCountOf1 + "+" + _this._isTurnOn2 + "+" + _this._specialCountOf2);
        };
        this.keyControl = function (e) {
            switch (e.keyCode) {
                case 37:
                    _this._tetrisActions.left();
                    break;
                case 38:
                    _this._tetrisActions.spin();
                    _this.rotationOfTetris();
                    break;
                case 32:
                    _this._tetrisActions.spin();
                    _this.rotationOfTetris();
                    break;
                case 39:
                    _this._tetrisActions.right();
                    break;
                case 40:
                    _this.down();
                    break;
            }
        };
        this._tetrisActions = new tetris.tetrisAction();
        this._view = new tetris.tetrisView();
        this._view.on("playEvent", this.caller);
        //document.addEventListener('keyup', this.keyControl,false);
        document.addEventListener('keydown', this.keyControl, false);
        this.addObject();
        this.draw();
        this.refreshPerformance();
    }
    animationController.prototype.refreshPerformance = function () {
        var _this = this;
        this._refreshID = setTimeout(function () {
            _this.refreshPerformance();
        }, 1000 / 60);
        if (this._isNewTetromino) {
            this._view._performance.addChild(this._tetrisActions._currentTetromino[0]);
        }
        if (this._tetrisActions.isCollision(this._tetrisActions._currentTetromino[0])) {
            this.gameover();
        }
        for (var x = 0; x < 12; x++) {
            for (var y = 0; y < 24; y++) {
                if (this._tetrisActions._gridData[x][y] !== 0) {
                    for (var k = 0; k < this._view._block.length; k++) {
                        if (this._view._block[k].x === x * 25 && this._view._block[k].y === y * 25) {
                            this._isNewTetromino = true;
                            if (this._tetrisActions._nextTetromino.length === 0) {
                                this._tetrisActions._nextTetromino.push(this.newTetromino());
                                this._view._nextTetrisContainer.addChild(this._tetrisActions._nextTetromino[0]);
                            }
                        }
                    }
                }
            }
        }
    };
    animationController.prototype.gameover = function () {
        for (var x = 0; x < 12; x++) {
            for (var y = 0; y < 24; y++) {
                if (this._tetrisActions._gridData[x][y] !== 0) {
                    this._tetrisActions._gridData[x][y] = 0;
                }
            }
        }
        for (var k = 0; k < this._view._block.length; k++) {
            this._view._block[k] = undefined;
        }
        this._tetrisActions._nextTetromino.push(this.newTetromino());
        this._view._nextTetrisContainer.addChild(this._tetrisActions._nextTetromino[0]);
        this._tetrisActions._specialCount = 1;
        this._colorRank = [];
        this._tetrisActions._currentScore = 0;
        this._view._scoreText.text = "Score:0";
        this._specialCountOf1 = 0;
        this._specialCountOf2 = 0;
        this.draw();
    };
    animationController.prototype.addObject = function () {
        var newObject = this.newTetromino();
        newObject.x = 4 * 25;
        this._tetrisActions._currentTetromino.push(newObject);
        this._view._performance.addChild(newObject);
        if (this._tetrisActions._nextTetromino.length === 0) {
            this._tetrisActions._nextTetromino.push(this.newTetromino());
            this._view._nextTetrisContainer.addChild(this._tetrisActions._nextTetromino[0]);
        }
    };
    animationController.prototype.newTetromino = function () {
        var graphics = new PIXI.Graphics();
        var type = this._tetrisActions.randomType();
        graphics.type = type;
        for (var i = 0; i < type.size; i++) {
            for (var j = 0; j < type.size; j++) {
                if (type.shapes[this._tetrisActions._rotation][j][i] === 1) {
                    graphics.lineStyle(1, 0x3c3c3c, 1);
                    graphics.beginFill(type.color);
                    graphics.drawRect(i * 25, j * 25, 25, 25);
                    graphics.endFill();
                }
            }
        }
        graphics.y = 0;
        return graphics;
    };
    animationController.prototype.rotationOfTetris = function () {
        this._tetrisActions._currentTetromino[0].clear();
        var graphic = this._tetrisActions._currentTetromino[0];
        for (var i = 0; i < graphic.type.size; i++) {
            for (var j = 0; j < graphic.type.size; j++) {
                if (graphic.type.shapes[this._tetrisActions._rotation][j][i] === 1) {
                    graphic.lineStyle(1, 0x3c3c3c, 1);
                    graphic.beginFill(graphic.type.color);
                    graphic.drawRect(i * 25, j * 25, 25, 25);
                    graphic.endFill();
                }
            }
        }
    };
    animationController.prototype.down = function () {
        if (this._tetrisActions._isPause === false) {
            this._tetrisActions._currentTetromino[0].y += 1 * 25;
            if (this._tetrisActions.isCollision(this._tetrisActions._currentTetromino[0])) {
                this._tetrisActions._currentTetromino[0].y -= 1 * 25;
                var line = this.unite(this._tetrisActions._currentTetromino[0]);
                this._tetrisActions.calculateScore(line);
                this._view._performance.removeChild(this._tetrisActions._currentTetromino[0]);
                this._tetrisActions._currentTetromino.pop();
                var getNext = this._tetrisActions._nextTetromino.pop();
                getNext.x = 4 * 25;
                this._tetrisActions._rotation = 0;
                this._tetrisActions._currentTetromino.push(getNext);
                this.colorCounter();
                var nospecialcolor1 = true;
                for (var i = 0; i < this._colorRank.length; i++) {
                    if (this._colorRank[i].color === "0xa6a600") {
                        nospecialcolor1 = false;
                        break;
                    }
                }
                var nospecialcolor2 = true;
                for (var i = 0; i < this._colorRank.length; i++) {
                    if (this._colorRank[i].color === "0xffffff") {
                        nospecialcolor2 = false;
                        break;
                    }
                }
                if (this._specialCountOf1 > 0 && nospecialcolor1) {
                    var random = Math.floor(Math.random() * this._colorRank.length);
                    if (this._colorRank[random].color === "0xffffff") {
                        var randomColorCount = this._colorRank[random - 1].count;
                        var randomColor = this._colorRank[random - 1].color;
                    }
                    else {
                        var randomColorCount = this._colorRank[random].count;
                        var randomColor = this._colorRank[random].color;
                    }
                    this.mopColor(randomColor);
                    this._tetrisActions.specialCalculateScore(randomColorCount);
                    this._specialCountOf1 = 0;
                }
                if (this._specialCountOf2 > 0 && nospecialcolor2) {
                    var mostColorCount = this._colorRank[0].count;
                    var mostColor = this._colorRank[0].color;
                    this.mopColor(mostColor);
                    this._tetrisActions.specialCalculateScore(mostColorCount);
                    this._specialCountOf2 = 0;
                }
                if (this._tetrisActions._currentTetromino[0].type.specialType === 2) {
                    this.changeToSpecialColor("0xffffff");
                    this._specialCountOf2++;
                }
                if (this._tetrisActions._currentTetromino[0].type.specialType === 1) {
                    this.changeToSpecialColor("0xa6a600");
                    this._specialCountOf1++;
                }
                this._view._scoreText.text = "Score:" + this._tetrisActions._currentScore;
                this.draw();
            }
        }
    };
    animationController.prototype.colorCounter = function () {
        this._colorRank = [];
        for (var x = 0; x < 12; x++) {
            for (var y = 0; y < 24; y++) {
                if (this._tetrisActions._gridData[x][y] !== 0) {
                    var color = this._tetrisActions._gridData[x][y] + "";
                    var colorObject = this._colorRank.filter(function (x) { return x.color === color; });
                    if (colorObject.length !== 0) {
                        colorObject[0].count++;
                    }
                    else {
                        var newColor = new colorRankData();
                        newColor.color = this._tetrisActions._gridData[x][y] + "";
                        newColor.count = 1;
                        this._colorRank.push(newColor);
                    }
                }
            }
        }
        this._colorRank.sort(function (a, b) { return a.count > b.count ? -1 : a.count < b.count ? 1 : 0; });
    };
    animationController.prototype.displayWithFps = function () {
        var _this = this;
        this._tetrisActions._setTimeoutId = setTimeout(function () {
            _this.displayWithFps();
        }, 300);
        this.down();
    };
    animationController.prototype.unite = function (tetromino) {
        var clearedLines = 0;
        for (var y = 0; y < tetromino.type.size; y++) {
            for (var x = 0; x < tetromino.type.size; x++) {
                if (tetromino.x / 25 + x < 12 && tetromino.x / 25 + x >= 0 && tetromino.type.shapes[this._tetrisActions._rotation][y][x] === 1) {
                    this._tetrisActions._gridData[tetromino.x / 25 + x][tetromino.y / 25 + y] = tetromino.type.color;
                    this._isTurnOn1 = false;
                    this._isTurnOn2 = false;
                }
            }
        }
        for (var y = 0; y < tetromino.type.size; y++) {
            var eraseLine = true;
            if (y + tetromino.y / 25 >= 24) {
                eraseLine = false;
            }
            else {
                for (var x = 0; x < 12; x++) {
                    if (this._tetrisActions._gridData[x][y + tetromino.y / 25] === 0) {
                        eraseLine = false;
                        break;
                    }
                }
            }
            if (eraseLine) {
                clearedLines++;
                for (var yy = y + tetromino.y / 25; yy >= 0; yy--) {
                    for (var x = 0; x < 12; x++) {
                        if (yy > 0) {
                            this._tetrisActions._gridData[x][yy] = this._tetrisActions._gridData[x][yy - 1];
                        }
                        else {
                            this._tetrisActions._gridData[x][yy] = 0;
                        }
                    }
                }
                this._view._block = [];
            }
        }
        return clearedLines;
    };
    animationController.prototype.draw = function () {
        var i = 0;
        for (var x = 0; x < 12; x++) {
            for (var y = 0; y < 24; y++) {
                if (this._tetrisActions._gridData[x][y] !== 0) {
                    this._view._performance.removeChild(this._view._block[i]);
                    var elementBlock = new PIXI.Graphics();
                    elementBlock.lineStyle(1, 0x3c3c3c, 1);
                    elementBlock.beginFill(this._tetrisActions._gridData[x][y]);
                    elementBlock.drawRect(0, 0, 25, 25);
                    elementBlock.endFill();
                    this._view._block[i] = elementBlock;
                    this._view._block[i].x = x * 25;
                    this._view._block[i].y = y * 25;
                    this._view._performance.addChild(elementBlock);
                }
                else if (this._view._block[i] === undefined) {
                    var elementBlock = new PIXI.Graphics();
                    elementBlock.lineStyle(1, 0x3c3c3c, 1);
                    elementBlock.beginFill(0x000000);
                    elementBlock.drawRect(0, 0, 25, 25);
                    elementBlock.endFill();
                    this._view._block[i] = elementBlock;
                    this._view._block[i].x = x * 25;
                    this._view._block[i].y = y * 25;
                    this._view._performance.addChild(elementBlock);
                }
                i++;
            }
        }
    };
    animationController.prototype.mopColor = function (color) {
        var i = 0;
        for (var x = 0; x < 12; x++) {
            for (var y = 0; y < 24; y++) {
                if (this._tetrisActions._gridData[x][y] !== 0 && (this._tetrisActions._gridData[x][y] + "") === color) {
                    this._tetrisActions._gridData[x][y] = 0;
                    this._view._block[i] = undefined;
                }
                i++;
            }
        }
    };
    animationController.prototype.changeToSpecialColor = function (colorcode) {
        this._tetrisActions._currentTetromino[0].clear();
        var graphic = this._tetrisActions._currentTetromino[0];
        for (var i = 0; i < graphic.type.size; i++) {
            for (var j = 0; j < graphic.type.size; j++) {
                if (graphic.type.shapes[this._tetrisActions._rotation][j][i] === 1) {
                    graphic.lineStyle(1, 0x3c3c3c, 1);
                    graphic.beginFill(colorcode);
                    graphic.drawRect(i * 25, j * 25, 25, 25);
                    graphic.endFill();
                    graphic.type.color = colorcode;
                }
            }
        }
    };
    return animationController;
}());
//# sourceMappingURL=app.js.map