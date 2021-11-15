///<reference path="pixi.js.d.ts"/>

namespace tetris{
    export class tetrisView extends PIXI.utils.EventEmitter{
        private _app:PIXI.Application;
        private _displayContainer:PIXI.Container=new PIXI.Container();
        public _performance:PIXI.Graphics=new PIXI.Graphics; 
        public _scoreText:PIXI.Text=new PIXI.Text();
        public _nextTetrisContainer:PIXI.Graphics=new PIXI.Graphics();      
        public _block:any[]=[];
        
        constructor()
        {
            super();
            this._app=new PIXI.Application({
                width:500,
                height:600,
                backgroundColor:0x1099bb
            });
            document.body.appendChild(this._app.view);  
            this._scoreText=new PIXI.Text("Score:0");
            var nextText=new PIXI.Text("Next:");
            nextText.y=30;
            this._nextTetrisContainer.beginFill(0xffffff);
            this._nextTetrisContainer.drawRect(0,0,100,100);
            this._nextTetrisContainer.endFill();
            this._nextTetrisContainer.x=50;
            this._nextTetrisContainer.y=70;
            this._displayContainer.addChild(this._nextTetrisContainer);
            this._displayContainer.addChild(this._scoreText);
            this._displayContainer.addChild(nextText);
            const playText=new PIXI.Text("Play");
            playText.anchor.set(0.5);
            playText.x=100;
            playText.y=25;
            const playButton=new PIXI.Graphics();
            playButton.beginFill(0xFFCC5A);
            playButton.drawRect(0,0,200,50);
            playButton.endFill();
            playButton.x=0;
            playButton.y=550;
            playButton.interactive=true;
            playButton.buttonMode=true;
            playButton.on("pointertap",()=>{
                this.emit("playEvent",{
                    data:playText.text
                });
                if(playText.text==="Play"){
                    playText.text="Pause";
                }
                else{
                    playText.text="Play";
                }
            });
            const specialText1=new PIXI.Text("特殊功能1");
            specialText1.anchor.set(0.5);
            specialText1.x=100;
            specialText1.y=25;
            const specialButton1=new PIXI.Graphics();
            specialButton1.beginFill(0xFFA042);
            specialButton1.drawRect(0,0,200,50);
            specialButton1.endFill();
            specialButton1.x=0;
            specialButton1.y=450;
            specialButton1.interactive=true;
            specialButton1.buttonMode=true;
            specialButton1.on("pointertap",()=>{
                this.emit("playEvent",{
                    data:specialText1.text
                });
            });
            specialButton1.addChild(specialText1);
            this._displayContainer.addChild(specialButton1);
            
            const specialText2=new PIXI.Text("特殊功能2");
            specialText2.anchor.set(0.5);
            specialText2.x=100;
            specialText2.y=25;
            const specialButton2=new PIXI.Graphics();
            specialButton2.beginFill(0xFFAF60);
            specialButton2.drawRect(0,0,200,50);
            specialButton2.endFill();
            specialButton2.x=0;
            specialButton2.y=500;
            specialButton2.interactive=true;
            specialButton2.buttonMode=true;
            specialButton2.on("pointertap",()=>{
                this.emit("playEvent",{
                    data:specialText2.text
                });
            });
            specialButton2.addChild(specialText2);
            this._displayContainer.addChild(specialButton2);

            playButton.addChild(playText);
            this._displayContainer.addChild(playButton);
            this._app.stage.addChild(this._displayContainer);
        
            var i=0;
            for(var x=0;x<12;x++){
                for(var y=0;y<24;y++){
                    var per =new PIXI.Graphics();
                    per.lineStyle(1, 0x3c3c3c, 1);
                    per.beginFill(0x000000);
                    per.drawRect(0,0,25,25);
                    per.endFill();     
                    this._block.push(per);
                    this._block[i].x=x*25;
                    this._block[i].y=y*25;
                    this._performance.addChild(this._block[i]);
                    i++;
                }
            }
            this._performance.x=200;
            this._performance.y=0;
            this._app.stage.addChild(this._performance);
        }     
    }
}