///<reference path="pixi.js.d.ts"/>

namespace animation{
    class BtnKeyValue{
        public Name:string="";
        public TextValue:string="";
    }
    export class animationView extends PIXI.utils.EventEmitter{
        private _app:PIXI.Application;
        public _performance:PIXI.Graphics=new PIXI.Graphics;
        public _informationOfQuantity:PIXI.Text=new PIXI.Text();
        public _informationOfPolygon:PIXI.Text=new PIXI.Text();
        public _informationOfSpeed:PIXI.Text=new PIXI.Text();
        public _informationOfFps:PIXI.Text=new PIXI.Text();
        public _spriteSheetFrames:PIXI.Texture[]=[];         
        private _textstyle=new PIXI.TextStyle({
            fontSize:20,
            fontWeight:'bold',
        });
        private _informationText=new PIXI.TextStyle({
            fontSize:15,
        });
       
        private sportMap:BtnKeyValue[]=[
            {Name:"lineSport",TextValue:"直線"},{Name:"parabolaSport",TextValue:"拋物線"},
            {Name:"circularSport",TextValue:"圓形"},{Name:"ovalSport",TextValue:"橢圓形"},
            {Name:"sine",TextValue:"正弦"},{Name:"cosine",TextValue:"餘弦"},
            {Name:"frictionSport",TextValue:"摩擦"},{Name:"bounceSport",TextValue:"彈跳"},
            {Name:"collisionSport",TextValue:"碰撞"}]; 
        private setOption:BtnKeyValue[]=[{Name:"setQuantity",TextValue:"數量"},{Name:"setSpeed",TextValue:"速度"},{Name:"setPolygon",TextValue:"邊數"},{Name:"setFps",TextValue:"FPS"}];
        private playMap:BtnKeyValue[]=[{Name:"spriteSheet",TextValue:"Sprite Sheet"},{Name:"play",TextValue:"播放"},{Name:"stop",TextValue:"暫停"},{Name:"clear",TextValue:"清除"}]
        
        constructor()
        {
            super();//---繼承後在建構式使用


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
            this._app=new PIXI.Application({
                width:710,
                height:640
            });
            document.body.appendChild(this._app.view);
            this._app.loader.add("./fighter.json")
            this._app.loader.load(()=>{this.addOperationButtons();});    
        }     

        private addOperationButtons():void
        {
            //建spriteSheetFrames
            for (let i:number=0;i<30;i++) {
                const val=i<10? `0${i}`:i;
                var texture=PIXI.Texture.from(`rollSequence00${val}.png`);             
                this._spriteSheetFrames.push(texture);
                
            }

            //運動呈現區
            const originPoint=new PIXI.Graphics();
            originPoint.beginFill(0x66FF6F);
            originPoint.drawCircle(0,0,5);
            originPoint.endFill();
            originPoint.pivot.set(0.5);
            originPoint.x=295;
            originPoint.y=240;
            var i:number=1;
            this._informationOfQuantity=new PIXI.Text("物件數量:0",this._informationText);    
            this._informationOfSpeed=new PIXI.Text("速度:1",this._informationText);  
            this._informationOfSpeed.y=20;
            this._informationOfPolygon=new PIXI.Text("邊數:0",this._informationText);  
            this._informationOfPolygon.y=40;
            this._informationOfFps=new PIXI.Text("FPS:60",this._informationText);  
            this._informationOfFps.y=60;      
            this._performance.beginFill(0xFFFFFF);
            this._performance.drawRoundedRect(0, 0, 590, 480, 10);
            this._performance.endFill();
            this._performance.x=110;
            this._performance.y=10;
            this._performance.addChild(this._informationOfQuantity);
            this._performance.addChild(this._informationOfPolygon);
            this._performance.addChild(this._informationOfSpeed);
            this._performance.addChild(this._informationOfFps);
            this._performance.addChild(originPoint);     
            this._app.stage.addChild(this._performance); 
           
            //運動按鈕
            for(i=0;i<9;i++){
                const text=new PIXI.Text(this.sportMap[i].TextValue,this._textstyle);
                text.anchor.set(0.5);
                text.x=45;
                text.y=30;
                const sportButton=new PIXI.Graphics() as any;
                sportButton.beginFill(0xFFCC5A);
                sportButton.drawRoundedRect(0, 0, 90, 60, 5);
                sportButton.endFill();
                sportButton.pivot.set(0);
                sportButton.x=10;
                sportButton.y=10+i*70;
                sportButton.Name=this.sportMap[i].Name;
                sportButton.interactive=true;
                sportButton.buttonMode=true;
                sportButton.on("pointertap",()=>{
                    this.emit("sportEvent",{
                        type:sportButton.Name
                    });
                })
                sportButton.addChild(text);
                this._app.stage.addChild(sportButton);
            }
            //可調式按鈕:數量.數度.邊數.FPS
            for(i=0;i<4;i++){
                const text=new PIXI.Text(this.setOption[i].TextValue,this._textstyle);
                text.anchor.set(0.5);
                text.x=70;
                text.y=30;
                const addButton=new PIXI.Graphics();
                addButton.beginFill(0xFF8040);
                addButton.drawCircle(0,0,15);
                addButton.pivot.set(0.5);
                addButton.x=120;
                addButton.y=30;
                addButton.interactive=true;
                addButton.buttonMode=true;
                const addSign=new PIXI.Text("+",this._textstyle);
                addSign.anchor.set(0.5);
                addButton.addChild(addSign);
                const subButton=new PIXI.Graphics();
                subButton.beginFill(0xFF8040);
                subButton.drawCircle(0,0,15);
                subButton.pivot.set(0.5);
                subButton.x=20;
                subButton.y=30;
                const subSign=new PIXI.Text("-",this._textstyle);
                subSign.anchor.set(0.5);
                subButton.addChild(subSign);
                const setButton=new PIXI.Graphics() as any;
                setButton.beginFill(0xFFAD86);
                setButton.drawRoundedRect(0, 0, 140, 60, 10);
                setButton.endFill();
                setButton.pivot.set(0);
                setButton.x=110+150*i;
                setButton.y=570;
                setButton.Name=this.setOption[i].Name;
                subButton.interactive=true;
                subButton.buttonMode=true;
                addButton.on("pointertap",()=>{
                    this.emit("elseEvent",{
                        type:setButton.Name,
                        data:"+"
                    });
                });
                subButton.on("pointertap",()=>{
                    this.emit("elseEvent",{
                        type:setButton.Name,
                        data:"-"
                    });
                });
                setButton.addChild(addButton);
                setButton.addChild(subButton);
                setButton.addChild(text);
                this._app.stage.addChild(setButton);
            }
                
            //播放.暫停.清除.SpriteSheet
            for(i=0;i<4;i++){
                const text=new PIXI.Text(this.playMap[i].TextValue,this._textstyle);
                text.anchor.set(0.5);
                text.x=70;
                text.y=30;
                const playButton=new PIXI.Graphics() as any;
                playButton.beginFill(0xFF7575);
                playButton.drawRoundedRect(0,0,140,60,10);
                playButton.endFill();
                playButton.pivot.set(0);
                playButton.x=110+150*i;
                playButton.y=500;
                playButton.Name=this.playMap[i].Name;
                playButton.interactive=true;
                playButton.buttonMode=true;
                playButton.on("pointertap",()=>{
                    this.emit("elseEvent",{
                        type:playButton.Name
                    });
                });
                playButton.addChild(text);
                this._app.stage.addChild(playButton);
            }
        }    
    }
}