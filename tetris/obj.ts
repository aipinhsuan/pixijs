///<reference path="pixi.js.d.ts"/>

document.addEventListener("DOMContentLoaded",function(){new obj();},false);
class basic{
    public color:string="";
    public text:string="";
    public x:number=0;
    public y:number=0;
    public width:number=0;
    public hight:number=0;
    public id:number=0;
    public type:string="";
    //public btn:PIXI.Graphics | PIXI.Sprite;
}

class basicbtn extends PIXI.Sprite{
    
    public color:string="";
    public text:string="";
    public x:number=0;
    public y:number=0;
    public width:number=0;
    public hight:number=0;
    public id:number=0;
    public type:string="";
    constructor(texture?: PIXI.Texture){
       
        super(texture);
    }


    public creatGraphic(sx:number,sy:number,w:number,h:number):void{
           
         let gr:PIXI.Graphics=new PIXI.Graphics();
         gr.drawRect(sx,sy,w,h);

         this.addChild(gr);

    }

    public createtextureBtn(value:PIXI.Texture):void
    {
        //this.texture=value;


    }


    





}

class obj {
    private _app:PIXI.Application;
    private _objList:any[]=[];
    private _display:PIXI.Text;
             
    constructor(){
        this._app=new PIXI.Application({
            width:560,
            height:300,
            backgroundColor:0x77ddff
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

        for(var i=0;i<5;i++){
            var object=new basic;
            object.color="0xffffff";
            object.text="按鈕:"+i;
            object.x=i;
            object.width=100;
            object.hight=50;
            object.id=i;
            object.type="rect";
            this._objList.push(object);
        } 
        console.log(this._objList);

        // for(var i=0;i<this._objList.length;i++){
        for(var i=0;i<1;i++){
            console.log(this._objList[i].id);
            const button=new PIXI.Graphics();
            button.beginFill(this._objList[i].color);
            //button.drawRect(10+this._objList[i].x*110,10+this._objList[i].y*60,this._objList[i].width,this._objList[i].hight);
            button.drawRect(10,10,100,100);
            button.endFill();
            
            const buttonText=new PIXI.Text(this._objList[i].text);

            //console.log("check_textWidth",buttonText.width,"check_textHight",buttonText.height);
            //console.log("check_point",buttonText.anchor);
            
            button.pivot.set(10,10);

            
            //buttonText.style.ba
            
            //button.addChild(buttonText);
            //buttonText.x=10+i*110;
            //buttonText.y=20;

            button.interactive=true;
            button.buttonMode=true;
            button.id=this._objList[i].id;
            button.on("pointertap",()=>{
                this._display.text="按鈕"+button.id+"被按了";
            })
            this._app.stage.addChild(button);
            button.x=0;button.y=0;
            //var p=button.toLocal(new PIXI.Point(button.x,button.y));
            //console.log("check_btn",p);
            
            //this._app.stage.addChild(buttonText);
        }
    }
}