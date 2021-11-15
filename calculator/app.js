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
var Calculator;
(function (Calculator) {
    var logic = /** @class */ (function () {
        function logic() {
            this._operand_1 = "0";
            this._operand_2 = "";
            this._operator = "";
            this._displayString = "";
            this._result = "0";
            this._op_count = 1;
            this._operatorTable = ['+', '-', '*', '/'];
            this._prevDisplay = "";
            this._temp = "";
            this._isAccumulation = false;
            this._accumulationBase = 0;
            this._memoryArray = [];
            this._isMemoryNumber = false;
            this._isFirst = true;
        }
        logic.prototype.percent = function () {
            if (this._result === "無法除以零" || this._result === "無效的輸入") {
                this.clear();
                return;
            }
            //若什麼運算子都沒輸入直接輸出0
            if (this._operator === "") {
                this._operand_1 = "0";
                this._operand_2 = "0";
                this._result = "0";
                this._displayString = "0";
                return;
            }
            if (this._operator !== "" && this._operand_2 === "" && (this._operator === "+" || this._operator === "-")) {
                this._operand_2 = (+this._operand_1) / 100 * (+this._operand_1) + "";
                this._displayString += (+this._operand_1) / 100 * (+this._operand_1) + "";
                return;
            }
            else if (this._operator !== "" && (this._operator === "+" || this._operator === "-")) {
                this._prevDisplay = this._displayString.slice(0, -this._operand_2.length);
                this._operand_2 = (+this._result / 100 * +this._operand_2) + "";
                if (this._prevDisplay.includes("+") ||
                    this._prevDisplay.includes("-") ||
                    this._prevDisplay.includes("*") ||
                    this._prevDisplay.includes("/")) {
                    this._displayString = this._prevDisplay + this._operand_2;
                }
                else {
                    this._displayString = this._prevDisplay + this._operator + this._operand_2;
                }
                return;
            }
            if (this._operator !== "" && this._operand_2 === "" && (this._operator === "*" || this._operator === "/")) {
                this._operand_2 = (+this._operand_1 / 100) + "";
                this._displayString += (+this._operand_1 / 100) + "";
                return;
            }
            else if (this._operator !== "" && (this._operator === "*" || this._operator === "/")) {
                this._prevDisplay = this._displayString.slice(0, -this._operand_2.length);
                this._operand_2 = (+this._result / 100) + "";
                if (this._prevDisplay.includes("+") ||
                    this._prevDisplay.includes("-") ||
                    this._prevDisplay.includes("*") ||
                    this._prevDisplay.includes("/")) {
                    this._displayString = this._prevDisplay + this._operand_2;
                }
                else {
                    this._displayString = this._prevDisplay + this._operator + this._operand_2;
                }
            }
        };
        logic.prototype.clear = function () {
            this._operand_1 = "0";
            this._operand_2 = "";
            this._operator = "";
            this._displayString = "";
            this._isFirst = true;
            this._result = "0";
            this._op_count = 1;
            this._prevDisplay = "";
        };
        logic.prototype.delete = function () {
            if (this._result === "無法除以零" || this._result === "無效的輸入") {
                this.clear();
                return;
            }
            if (this._operatorTable.indexOf(this._displayString.slice(-1)) !== -1 || this._displayString.slice(-1) === ")" || this._displayString.slice(-1) === "=" || this._isMemoryNumber === true) {
                return;
            }
            else if (this._operand_2 !== "" && (+this._operand_2) > -10 && (+this._operand_2 < 0)) {
                this._operand_2 = "0";
                this._displayString = this._displayString.slice(0, -2) + this._operand_2;
            }
            else if (this._operand_2 !== "") {
                this._prevDisplay = this._displayString.slice(0, -this._operand_2.length);
                this._operand_2 = this._operand_2.slice(0, -1);
                this._displayString = this._prevDisplay + this._operand_2;
                this._prevDisplay = "";
            }
            else if (this._operand_1 !== "" && (+this._operand_1) > -10 && (+this._operand_1 < 0)) {
                this._operand_1 = "0";
                this._displayString = this._displayString.slice(0, -2) + this._operand_1;
            }
            else {
                this._operand_1 = this._operand_1.slice(0, -1);
                this._displayString = this._operand_1;
                this._result = this._displayString;
            }
        };
        logic.prototype.ce = function () {
            if (this._result === "無法除以零" || this._result === "無效的輸入") {
                this.clear();
                return;
            }
            if (this._operatorTable.indexOf(this._displayString.slice(-1)) !== -1) {
                return;
            }
            else if (this._operand_2 !== "") {
                this._result = this._operand_1;
                this._prevDisplay = this._displayString.slice(0, -this._operand_2.length);
                this._operand_2 = "";
                this._displayString = this._prevDisplay + this._operand_2;
                this._prevDisplay = "";
            }
            else {
                this._result = "0";
                this._operand_1 = "0";
                this._displayString = "";
            }
        };
        logic.prototype.power = function (pow) {
            var obj = {
                "2": "sqr",
                "0.5": "√",
                "-1": "1/"
            };
            if (this._result === "無法除以零" || this._result === "無效的輸入") {
                this.clear();
                return;
            }
            if (this._operand_2 !== "") {
                this._temp = this._operand_2;
                this._displayString = this._displayString.slice(0, -(+this._temp.length));
                this._displayString = this._displayString + obj[pow] + "(" + this._operand_2 + ")";
                if (pow === "0.5" && (+this._operand_2) < 0) {
                    this._result = "無效的輸入";
                    return;
                }
                if (pow === "-1" && this._operand_2 === "0") {
                    this._result = "無法除以零";
                    return;
                }
                this._operand_2 = Math.pow(+this._operand_2, +pow) + "";
                this._temp = obj[pow] + "(" + this._operand_2 + ")";
            }
            else if (this._operand_2 === "" && this._operatorTable.indexOf(this._displayString.slice(-1)) !== -1) {
                this._operand_2 = this._operand_1;
                this._temp = this._operand_2;
                this._displayString = this._displayString.slice(0, -(+this._temp.length));
                this._displayString = this._displayString + obj[pow] + "(" + this._operand_2 + ")";
                this._operand_2 = Math.pow(+this._operand_2, +pow) + "";
                this._temp = obj[pow] + "(" + this._operand_2 + ")";
            }
            else if (this._operand_1 !== "" && this._operand_1 !== "0") {
                this._displayString = obj[pow] + "(" + this._operand_1 + ")";
                if (pow === "0.5" && (+this._operand_1) < 0) {
                    this._result = "無效的輸入";
                    return;
                }
                this._operand_1 = Math.pow(+this._operand_1, +pow) + "";
                this._result = this._operand_1;
            }
            else if (pow === "-1") {
                this._displayString = "1/(0)";
                this._result = "無法除以零";
            }
            else {
                this._displayString = obj[pow] + "(0)";
                this._result = Math.pow(0, +pow) + "";
            }
        };
        logic.prototype.numberButton = function (num) {
            if (this._result === "無法除以零" || this._result === "無效的輸入") {
                this.clear();
            }
            if (this._displayString === "") {
                this._displayString = "";
            }
            if (this._isMemoryNumber) {
                if (this._operand_2 !== "") {
                    this._displayString = this._displayString.slice(0, -this._operand_2.length);
                    if (num === ".") {
                        this._operand_2 = "0.";
                    }
                    else {
                        this._operand_2 = num;
                    }
                    this._displayString += this._operand_2;
                }
                else {
                    this._displayString = this._displayString.slice(0, -this._operand_1.length);
                    if (num === ".") {
                        this._operand_1 = "0.";
                    }
                    else {
                        this._operand_1 = num;
                    }
                    this._displayString += this._operand_1;
                    this._result = this._displayString;
                }
                this._isMemoryNumber = false;
                return;
            }
            if (this._isFirst) {
                if (this._operand_1.length > 15 && !this._operand_1.includes('.')) {
                    return;
                }
                else if (this._operand_1.length > 16 && this._operand_1.includes('.')) {
                    return;
                }
                if (num === '.' && this._operand_1.includes('.')) {
                    return;
                }
                if ((this._operand_1 === "0" && num === '.')) {
                    this._operand_1 = "0.";
                    this._displayString = "0.";
                }
                else if (this._operand_1 === "0" && num !== ".") {
                    this._operand_1 = num;
                    this._displayString = this._operand_1;
                }
                else {
                    this._operand_1 += num;
                    this._displayString += num;
                }
                this._result = this._operand_1;
            }
            else {
                if (this._operand_2.length > 15 && !this._operand_2.includes('.')) {
                    return;
                }
                else if (this._operand_2.length > 16 && this._operand_2.includes('.')) {
                    return;
                }
                if (num === '.' && this._operand_2.includes('.')) {
                    return;
                }
                if (this._operand_2 === "" && num === '.') {
                    this._operand_2 = "0.";
                    this._displayString += "0.";
                }
                else if (this._operand_2 === "0" && num !== ".") {
                    this._operand_2 = num;
                    this._displayString = this._displayString.slice(0, -1) + this._operand_2;
                }
                else {
                    this._operand_2 += num;
                    this._displayString += num;
                }
            }
        };
        logic.prototype.setOperator = function (op) {
            this._isMemoryNumber = false;
            if (this._result === "無法除以零" || this._result === "無效的輸入") {
                this.clear();
                return;
            }
            this._op_count += 1;
            if (this._operatorTable.indexOf(this._displayString.slice(-1)) != -1) {
                this._displayString = this._displayString.slice(0, -1) + op;
                this._operator = op;
                return;
            }
            if (this._op_count > 1) {
                this._result = this._operand_1;
                this.equal("");
            }
            this._isFirst = false;
            this._displayString += op;
            this._operator = op;
        };
        logic.prototype.sign = function () {
            if (this._result === "無法除以零" || this._result === "無效的輸入") {
                this.clear();
                return;
            }
            if (this._operand_2 !== "") {
                this._prevDisplay = this._displayString.slice(0, -this._operand_2.length);
                this._operand_2 = (+this._operand_2 * -1) + "";
                this._displayString = this._prevDisplay + this._operand_2;
                this._prevDisplay = "";
            }
            else if (this._operand_2 === "" && this._operatorTable.indexOf(this._displayString.slice(-1)) !== -1) {
                this._operand_2 = (+this._operand_1) * -1 + "";
            }
            else {
                this._operand_1 = (+this._operand_1 * -1) + "";
                this._displayString = this._operand_1;
                this._result = this._displayString;
            }
        };
        logic.prototype.equal = function (eq) {
            if (this._result === "無法除以零" || this._result === "無效的輸入") {
                this.clear();
                return;
            }
            if (eq === "=" && this._displayString.slice(-1) !== "=") {
                this._displayString += "=";
            }
            if (eq === "=" && this._displayString.slice(-1) === "=" && this._operand_2 === "") {
                this._accumulationBase = +this._operand_1;
                this._isAccumulation = true;
            }
            if (this._isAccumulation) {
                this._operand_2 = this._accumulationBase + "";
            }
            this._isAccumulation = false;
            var operand_1 = +this._operand_1;
            var operand_2 = +this._operand_2;
            switch (this._operator) {
                case "+":
                    this._result = operand_1 + operand_2 + "";
                    break;
                case "-":
                    this._result = operand_1 - operand_2 + "";
                    break;
                case "*":
                    this._result = operand_1 * operand_2 + "";
                    break;
                case "/":
                    if (this._operand_2 === "") {
                        operand_2 = operand_1;
                    }
                    else if (operand_2 === 0) {
                        this._result = "無法除以零";
                        break;
                    }
                    this._result = operand_1 / operand_2 + "";
                    break;
                default:
                    break;
            }
            this._operand_1 = this._result;
            if (eq !== "=") {
                this._operand_2 = "";
            }
        };
        logic.prototype.mc = function () {
            if (this._result === "無法除以零" || this._result === "無效的輸入") {
                return;
            }
            this._memoryArray = [];
        };
        logic.prototype.mr = function () {
            if (this._memoryArray.length === 0 || this._result === "無法除以零" || this._result === "無效的輸入") {
                return;
            }
            var getMemoryLast = this._memoryArray[this._memoryArray.length - 1];
            if (this._operand_2 !== "" && this._displayString.slice(-1) === "=") {
                this._operand_1 = getMemoryLast;
                this._displayString = this._operand_1;
                this._result = this._operand_1;
            }
            else if (this._operand_2 !== "") {
                this._displayString = this._displayString.slice(0, -this._operand_2.length) + getMemoryLast;
                this._operand_2 = getMemoryLast;
            }
            else if (this._operand_2 === "" && this._operatorTable.indexOf(this._displayString.slice(-1)) !== -1) {
                this._operand_2 = getMemoryLast;
                this._displayString += getMemoryLast;
            }
            else {
                this._operand_1 = getMemoryLast;
                this._displayString = this._operand_1;
                this._result = this._operand_1;
            }
            this._isMemoryNumber = true;
        };
        logic.prototype.mAdd = function () {
            if (this._result === "無法除以零" || this._result === "無效的輸入") {
                return;
            }
            if (this._memoryArray.length === 0) {
                this.ms();
                return;
            }
            if (this._displayString.slice(-1) !== "=" && this._operand_2 !== "") {
                this._memoryArray[this._memoryArray.length - 1] = (+this._memoryArray[this._memoryArray.length - 1]) + (+this._operand_2) + "";
            }
            else if (this._displayString.slice(-1) === "=" || this._operatorTable.indexOf(this._displayString.slice(-1)) !== -1) {
                this._memoryArray[this._memoryArray.length - 1] = (+this._memoryArray[this._memoryArray.length - 1]) + (+this._result) + "";
            }
            else {
                this._memoryArray[this._memoryArray.length - 1] = (+this._memoryArray[this._memoryArray.length - 1]) + (+this._operand_1) + "";
            }
        };
        logic.prototype.mSub = function () {
            if (this._result === "無法除以零" || this._result === "無效的輸入") {
                return;
            }
            if (this._memoryArray.length === 0) {
                this.ms();
                return;
            }
            if (this._displayString.slice(-1) !== "=" && this._operand_2 !== "") {
                this._memoryArray[this._memoryArray.length - 1] = (+this._memoryArray[this._memoryArray.length - 1]) - (+this._operand_2) + "";
            }
            else if (this._displayString.slice(-1) === "=" || this._operatorTable.indexOf(this._displayString.slice(-1)) !== -1) {
                this._memoryArray[this._memoryArray.length - 1] = (+this._memoryArray[this._memoryArray.length - 1]) - (+this._result) + "";
            }
            else {
                this._memoryArray[this._memoryArray.length - 1] = (+this._memoryArray[this._memoryArray.length - 1]) - (+this._operand_1) + "";
            }
        };
        logic.prototype.ms = function () {
            if (this._result === "無法除以零" || this._result === "無效的輸入") {
                return;
            }
            if (this._displayString.slice(-1) !== "=" && this._operand_2 !== "") {
                this._memoryArray.push(this._operand_2);
            }
            else if (this._displayString.slice(-1) === "=" || this._operatorTable.indexOf(this._displayString.slice(-1)) !== -1) {
                this._memoryArray.push(this._result);
                if (this._displayString.slice(-1) === "=") {
                    this._displayString = this._result;
                }
            }
            else {
                this._memoryArray.push(this._operand_1);
            }
        };
        logic.prototype.m = function () {
            var i;
            console.log(this._memoryArray);
        };
        return logic;
    }());
    Calculator.logic = logic;
})(Calculator || (Calculator = {}));
///<reference path="pixi.js.d.ts"/>
var Calculator;
///<reference path="pixi.js.d.ts"/>
(function (Calculator) {
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
        //constructor(callback1:any,callback2:any)
        function view() {
            var _this = _super.call(this) || this;
            _this._container = new PIXI.Container();
            _this._displayStyle = new PIXI.TextStyle({
                fontSize: 12,
                wordWrap: true,
                breakWords: true,
                wordWrapWidth: 300,
                lineJoin: 'round'
            });
            _this._resultStyle = new PIXI.TextStyle({
                fontSize: 32,
                fontWeight: 'bold',
            });
            _this._textstyle = new PIXI.TextStyle({
                fontSize: 16,
                fontWeight: 'bold',
            });
            _this.btnKeyValueMap = [
                [{ Name: "Sign", TextValue: "+/-", Value: "" }, { Name: "NumberButton", TextValue: "0", Value: "0" }, { Name: "NumberButton", TextValue: ".", Value: "." }, { Name: "Equal", TextValue: "=", Value: "=" }],
                [{ Name: "NumberButton", TextValue: "1", Value: "1" }, { Name: "NumberButton", TextValue: "2", Value: "2" }, { Name: "NumberButton", TextValue: "3", Value: "3" }, { Name: "SetOperator", TextValue: "-", Value: "-" }],
                [{ Name: "NumberButton", TextValue: "4", Value: "4" }, { Name: "NumberButton", TextValue: "5", Value: "5" }, { Name: "NumberButton", TextValue: "6", Value: "6" }, { Name: "SetOperator", TextValue: "+", Value: "+" }],
                [{ Name: "NumberButton", TextValue: "7", Value: "7" }, { Name: "NumberButton", TextValue: "8", Value: "8" }, { Name: "NumberButton", TextValue: "9", Value: "9" }, { Name: "SetOperator", TextValue: "*", Value: "*" }],
                [{ Name: "Power", TextValue: "1/x", Value: "-1" }, { Name: "Power", TextValue: "x²", Value: "2" }, { Name: "Power", TextValue: "√x", Value: "0.5" }, { Name: "SetOperator", TextValue: "/", Value: "/" }],
                [{ Name: "Percent", TextValue: "%", Value: "" }, { Name: "CE", TextValue: "CE", Value: "" }, { Name: "Clear", TextValue: "C", Value: "" }, { Name: "Delete", TextValue: "DEL", Value: "" }]
            ];
            _this.memoryKeyValueMap = [{ Name: "MC", TextValue: "MC", Value: "" }, { Name: "MR", TextValue: "MR", Value: "" }, { Name: "MAdd", TextValue: "M+", Value: "" }, { Name: "MSub", TextValue: "M-", Value: "" }, { Name: "MS", TextValue: "MS", Value: "" }, { Name: "M", TextValue: "M▾", Value: "" }];
            _this._app = new PIXI.Application({
                width: 320,
                height: 531
            });
            document.body.appendChild(_this._app.view);
            _this._app.loader.add("./hw5source.json");
            _this._app.loader.load(function () { _this.onAssetsLoaded(); });
            return _this;
            //this._callback1 = callback1;
            //this._callback2 = callback2;
        }
        view.prototype.onAssetsLoaded = function () {
            var _this = this;
            var i = 0;
            var j = 0;
            var texture0 = PIXI.Texture.from('background0000');
            this._texture1 = PIXI.Texture.from('btn_up0000');
            this._background = new PIXI.Sprite(texture0);
            //this._background.on("KeyBoadrEvent",this._callback1);
            //this._background.on("memoryKeyBoadrEvent",this._callback2);
            this._app.stage.addChild(this._background);
            this._display_text = new PIXI.Text("0", this._displayStyle);
            this._display_text.anchor.set(1);
            this._display_text.x = 315;
            this._display_text.y = 100;
            this._app.stage.addChild(this._display_text);
            this._result_text = new PIXI.Text("0", this._resultStyle);
            this._result_text.anchor.set(1);
            this._result_text.x = 315;
            this._result_text.y = 150;
            this._app.stage.addChild(this._result_text);
            for (i = 0; i < 6; i++) {
                var _loop_1 = function () {
                    var text = new PIXI.Text(this_1.btnKeyValueMap[i][j].TextValue, this_1._textstyle);
                    text.anchor.set(0.5);
                    text.x = 39.5 + j * 80;
                    text.y = (475 + 26.5) - 55 * i;
                    var btn = new PIXI.Sprite(this_1._texture1);
                    btn.interactive = true;
                    btn.buttonMode = true;
                    btn.Name = this_1.btnKeyValueMap[i][j].Name;
                    btn.Value = this_1.btnKeyValueMap[i][j].Value;
                    btn.x = 1 + j * 80;
                    btn.y = 475 - 55 * i;
                    btn.on("pointerover", this_1.pointerOver);
                    btn.on("pointerover", this_1.pointerOver);
                    btn.on("pointerout", this_1.pointerOut);
                    btn.on("pointertap", function (e) {
                        _this.emit("KeyboardEvent", {
                            detail: {
                                type: btn.Name,
                                data: { target: btn.Value }
                            }
                        });
                        /*
                        this._background.emit("KeyBoadrEvent",{
                            detail:{
                                type:btn.Name,
                                data:{target:btn.Value}
                            }
                        }); */
                    });
                    this_1._app.stage.addChild(btn);
                    this_1._app.stage.addChild(text);
                };
                var this_1 = this;
                for (j = 0; j < 4; j++) {
                    _loop_1();
                }
            }
            var _loop_2 = function () {
                text2 = new PIXI.Text(this_2.memoryKeyValueMap[i].TextValue, this_2._textstyle);
                text2.anchor.set(0.5);
                text2.x = 27 + i * 53;
                text2.y = 475 - 55 * 6 + 53 * 2 / 5 + 16;
                var btn = new PIXI.Sprite(this_2._texture1);
                btn.interactive = true;
                btn.buttonMode = true;
                btn.Name = this_2.memoryKeyValueMap[i].Name;
                btn.Value = this_2.memoryKeyValueMap[i].Value;
                btn.width = 77 * 4 / 6;
                btn.height = 53 * 4 / 6;
                btn.x = 2 + i * 53;
                btn.y = 475 - 55 * 6 + 53 * 2 / 6;
                btn.on("pointerover", this_2.pointerOver);
                btn.on("pointerout", this_2.pointerOut);
                btn.on("pointertap", function (e) {
                    //console.log("@@@@@@@@",this);
                    _this.emit("memoryKeyBoadrEvent", {
                        detail: {
                            type: btn.Name,
                            data: { target: btn.Value }
                        }
                    });
                    /*
                    this._background.emit("memoryKeyBoadrEvent",{
                        detail:{
                            type:btn.Name,
                            data:{target:btn.Value}
                        }
                    }); */
                });
                this_2._app.stage.addChild(btn);
                this_2._app.stage.addChild(text2);
            };
            var this_2 = this, text2;
            //記憶體系列
            for (i = 0; i < 6; i++) {
                _loop_2();
            }
        };
        view.prototype.pointerOver = function () {
            var texture2 = PIXI.Texture.from('btn_down0000');
            this.texture = texture2;
        };
        view.prototype.pointerOut = function () {
            var texture1 = PIXI.Texture.from('btn_up0000');
            this.texture = texture1;
        };
        view.prototype.display = function (displayString, resultString) {
            this._display_text.text = displayString;
            this._result_text.text = resultString;
        };
        return view;
    }(PIXI.utils.EventEmitter));
    Calculator.view = view;
})(Calculator || (Calculator = {}));
///<reference path="logic.ts"/>
///<reference path="view.ts"/>
document.addEventListener("DOMContentLoaded", function () { new Main(); }, false);
var Main = /** @class */ (function () {
    function Main() {
        var _this = this;
        /*
        private helolo():void{
           
    
        }
    
        private helolo2():void{
           
    
        }*/
        this.getLogic = function (e) {
            //console.log("hello_callbackone",e);
            switch (e.detail.type) {
                case "NumberButton":
                    _this._logic.numberButton(e.detail.data.target);
                    break;
                case "CE":
                    _this._logic.ce();
                    break;
                case "Clear":
                    _this._logic.clear();
                    break;
                case "Delete":
                    _this._logic.delete();
                    break;
                case "SetOperator":
                    _this._logic.setOperator(e.detail.data.target);
                    break;
                case "Power":
                    _this._logic.power(e.detail.data.target);
                    break;
                case "Percent":
                    _this._logic.percent();
                    break;
                case "Sign":
                    _this._logic.sign();
                    break;
                case "Equal":
                    _this._logic.equal(e.detail.data.target);
                    break;
            }
            _this._view.display(_this._logic._displayString, _this._logic._result);
        };
        /*  private getLogic=(e:any)=>
           {
               //---獲取的資料-----
               //var source:any=
               
               var result:number=this._logic.doSomething(source);
               this._view.showSomething(result);
           }
        */
        /*private equalTap=(e:any)=>{
            console.log("equalTap",e.detail.data.target);
            this._logic.equal("=");
            this._view.display(this._logic._displayString,this._logic._result);
        }*/
        this.memoryGetLogic = function (e) {
            //console.log("hello_memoryKeyBoadrEvent",e);
            switch (e.detail.type) {
                case "MC":
                    _this._logic.mc();
                    break;
                case "MR":
                    _this._logic.mr();
                    _this._view.display(_this._logic._displayString, _this._logic._result);
                    break;
                case "MAdd":
                    _this._logic.mAdd();
                    break;
                case "MSub":
                    _this._logic.mSub();
                    break;
                case "MS":
                    _this._logic.ms();
                    _this._view.display(_this._logic._displayString, _this._logic._result);
                    break;
                case "M":
                    _this._logic.m();
                    break;
            }
        };
        //this._view=new Calculator.view(this.helolo,this.helolo2);   
        this._view = new Calculator.view();
        this._view.on("KeyboardEvent", this.getLogic);
        this._view.on("memoryKeyBoadrEvent", this.memoryGetLogic);
        this._logic = new Calculator.logic();
    }
    return Main;
}());
//# sourceMappingURL=app.js.map