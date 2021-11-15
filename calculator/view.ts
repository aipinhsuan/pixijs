///<reference path="pixi.js.d.ts"/>
namespace Calculator{
    class BtnKeyValue{
        public Name:string="";
        public TextValue:string="";
        public Value:string="";
    }
    export class view extends PIXI.utils.EventEmitter{
        private _container=new PIXI.Container();
        private _app:PIXI.Application;
        private _texture1:PIXI.Texture;
        //private _callback1:any;
        //private _callback2:any;
        private _background:PIXI.Sprite;
        public _display_text:PIXI.Text;
        public _result_text:PIXI.Text;      
        private _displayStyle=new PIXI.TextStyle({
            fontSize: 12,
            wordWrap: true,//自動換行,沒有空格即使超過長度也不會拆開單詞換行
            breakWords: true,//拆單詞
            wordWrapWidth: 300,
            lineJoin: 'round'
        });
        private _resultStyle=new PIXI.TextStyle({
            fontSize: 32,
            fontWeight: 'bold',
        });
        private _textstyle=new PIXI.TextStyle({
            fontSize: 16,
            fontWeight: 'bold',
        });  
        
        private btnKeyValueMap:BtnKeyValue[][] = [
            [{Name:"Sign",TextValue:"+/-",Value:""},{Name:"NumberButton",TextValue:"0",Value:"0"},{Name:"NumberButton",TextValue:".",Value:"."},{Name:"Equal",TextValue:"=",Value:"="}],
            [{Name:"NumberButton",TextValue:"1",Value:"1"},{Name:"NumberButton",TextValue:"2",Value:"2"},{Name:"NumberButton",TextValue:"3",Value:"3"},{Name:"SetOperator",TextValue:"-",Value:"-"}],
            [{Name:"NumberButton",TextValue:"4",Value:"4"},{Name:"NumberButton",TextValue:"5",Value:"5"},{Name:"NumberButton",TextValue:"6",Value:"6"},{Name:"SetOperator",TextValue:"+",Value: "+"}],
            [{Name:"NumberButton",TextValue:"7",Value:"7"},{Name:"NumberButton",TextValue:"8",Value:"8"},{Name:"NumberButton",TextValue:"9",Value:"9"},{Name:"SetOperator",TextValue:"*",Value:"*"}],
            [{Name:"Power",TextValue:"1/x",Value:"-1"},{Name:"Power",TextValue:"x²",Value:"2"},{Name:"Power",TextValue:"√x",Value:"0.5"},{Name:"SetOperator",TextValue:"/",Value:"/"}],
            [{Name:"Percent",TextValue:"%",Value:""},{Name:"CE",TextValue:"CE",Value:""},{Name:"Clear",TextValue:"C",Value:""},{Name:"Delete",TextValue:"DEL",Value:""}]
        ]; 
        private memoryKeyValueMap:BtnKeyValue[]=[{Name:"MC",TextValue:"MC",Value:""},{Name:"MR",TextValue:"MR",Value:""},{Name:"MAdd",TextValue:"M+",Value:""},{Name:"MSub",TextValue:"M-",Value:""},{Name:"MS",TextValue:"MS",Value:""},{Name:"M",TextValue:"M▾",Value:""}];

        //constructor(callback1:any,callback2:any)
        constructor()
        {
            super();//---繼承後在建構式使用
            this._app=new PIXI.Application({
                width:320,
                height:531
            });
            document.body.appendChild(this._app.view); 
            this._app.loader.add("./hw5source.json")
            this._app.loader.load(()=>{this.onAssetsLoaded();});
            //this._callback1 = callback1;
            //this._callback2 = callback2;
        }     

        private onAssetsLoaded():void
        {
            let i:number=0;
            let j:number=0;
            
            const texture0=PIXI.Texture.from('background0000');
            this._texture1=PIXI.Texture.from('btn_up0000');
            this._background=new PIXI.Sprite(texture0);
            //this._background.on("KeyBoadrEvent",this._callback1);
            //this._background.on("memoryKeyBoadrEvent",this._callback2);
            this._app.stage.addChild(this._background);
            
            this._display_text=new PIXI.Text("0",this._displayStyle);
            this._display_text.anchor.set(1);
            this._display_text.x=315;
            this._display_text.y=100;
            this._app.stage.addChild(this._display_text);
            this._result_text=new PIXI.Text("0" ,this._resultStyle);
            this._result_text.anchor.set(1);
            this._result_text.x=315;
            this._result_text.y=150;
            this._app.stage.addChild(this._result_text);

            for(i=0;i<6;i++){
                for(j=0;j<4;j++){
                    const text=new PIXI.Text(this.btnKeyValueMap[i][j].TextValue,this._textstyle);
                    text.anchor.set(0.5);
                    text.x=39.5+j*80;
                    text.y=(475+26.5)-55*i;

                    const btn=new PIXI.Sprite(this._texture1) as any;
                    btn.interactive=true;
                    btn.buttonMode=true;
                    btn.Name = this.btnKeyValueMap[i][j].Name;
                    btn.Value = this.btnKeyValueMap[i][j].Value;
                    btn.x=1+j*80;
                    btn.y=475-55*i;
                    btn.on("pointerover", this.pointerOver);
                    btn.on("pointerover", this.pointerOver);
                    btn.on("pointerout", this.pointerOut);              
                    btn.on("pointertap",(e) => {                  
                       this.emit("KeyboardEvent",{
                        detail:{
                            type:btn.Name,
                            data:{target:btn.Value}
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
                    this._app.stage.addChild(btn);
                    this._app.stage.addChild(text);
                }
            }
            //記憶體系列
            for(i=0;i<6;i++){
                var text2=new PIXI.Text(this.memoryKeyValueMap[i].TextValue,this._textstyle);
                text2.anchor.set(0.5);
                text2.x=27+i*53;
                text2.y=475-55*6+53*2/5+16;

                const btn=new PIXI.Sprite(this._texture1) as any;
                btn.interactive=true;
                btn.buttonMode=true;
                btn.Name = this.memoryKeyValueMap[i].Name;
                btn.Value = this.memoryKeyValueMap[i].Value;
                btn.width=77*4/6;
                btn.height=53*4/6;
                btn.x=2+i*53;
                btn.y=475-55*6+53*2/6;
                btn.on("pointerover", this.pointerOver);
                btn.on("pointerout", this.pointerOut);
                btn.on("pointertap",(e) => { 
                    //console.log("@@@@@@@@",this);
                    this.emit("memoryKeyBoadrEvent",{
                        detail:{
                            type:btn.Name,
                            data:{target:btn.Value}
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
                this._app.stage.addChild(btn);
                this._app.stage.addChild(text2);
            }
        }
        private pointerOver(this:PIXI.Sprite):void{
            var texture2=PIXI.Texture.from('btn_down0000');
            this.texture = texture2;
        }

        private pointerOut(this:PIXI.Sprite):void{
            var texture1=PIXI.Texture.from('btn_up0000');
            this.texture = texture1;
        }

        public display(displayString:string,resultString:string):void{
            this._display_text.text=displayString;
            this._result_text.text=resultString;
        }
    }
}