///<reference path="./animationAction.ts"/>
///<reference path="./view.ts"/>

document.addEventListener("DOMContentLoaded",function(){new animationController();},false);

class animationController{
   private _animationActions:animation.animationAction;
   private _view:animation.animationView;
   private _currentSport:string=""; 
   private _isPlay:boolean=false;

   constructor(){ 
      this._animationActions=new animation.animationAction();
      this._view=new animation.animationView();
      this._view.on("elseEvent",this.caller);
      this._view.on("sportEvent",this.sportCaller);
   }

   private sportCaller=(e:any):void=>{
      clearTimeout(this._animationActions._animationId);       
      this._currentSport=e.type;
      this._isPlay=true;
      this._animationActions.displayWithFps(this._currentSport);
      if(e.type==="frictionSport"){
         this.reset();
      }
   }

   private caller=(e:any):void=>{
      switch(e.type){
         case "play":
            if(this._isPlay===false){
               this._isPlay=true;
               this._animationActions.displayWithFps(this._currentSport);
            }
            break;
         case "stop":
            this._isPlay=false; 
            clearTimeout(this._animationActions._animationId);
            break;
         case "clear":          
            this.clear();
            break;
         default:
            this._animationActions.getFunction(e);
            switch(e.type){
               case "setQuantity":
                  if (e.data==="-"){
                     this.removeLastObject();
                  }
                  else{   
                     this.addObject();
                     this.reset();
                  }
                  this.refreshInformation();
                  break;
               case "setSpeed":
               this.refreshInformation();
                  break;
               case "setPolygon":         
                  this.changePolygon();
                  this.refreshInformation();
                  break;
               case "setFps":
                  for (let i:number=0;i<this._animationActions._objectList.length;i++){
                     var obj=this._animationActions._objectList[i]; 
                     obj.animationSpeed =0.5*this._animationActions._fps/60;
                  }
                  this.refreshInformation();
                  break;
            } 
      }
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

   private clear():void{  
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
         if(this._animationActions._objectList[i-1].pluginName==="sprite"){
            this._animationActions._reuseObj2.push(this._animationActions._objectList.pop());
         }
         else{
            this._animationActions._reuseObj1.push(this._animationActions._objectList.pop());
         }
      }  
      this._animationActions._quantity=0;
      this._animationActions._speed=1;
      this._animationActions._polygon=0;
      this._animationActions._fps=60;
      this.refreshInformation();
   }

   private removeLastObject():void{
      if(this._animationActions._objectList.length>0){
         if(this._animationActions._objectList[this._animationActions._objectList.length-1].pluginName==="sprite"){
         this._animationActions._reuseObj2.push(this._animationActions._objectList.pop());
         }
         else{
         this._animationActions._reuseObj1.push(this._animationActions._objectList.pop());
         }
         if (this._view._performance.children.length!==5){
            this._view._performance.removeChildAt(this._view._performance.children.length-1);
         }  
      }
   }
   private addObject():void{   
      if(this._animationActions._objectList.length<100){
         if (this._animationActions._isSpriteSheet){
            if(this._animationActions._reuseObj2.length===0){
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
               var reuseAnim=this._animationActions._reuseObj2.pop();
               reuseAnim.x=295;
               reuseAnim.y=240;
               reuseAnim.animationSpeed =0.5*this._animationActions._fps/60;
               this._animationActions._objectList.push(reuseAnim);
               this._view._performance.addChild(reuseAnim); 
            }
         }
         else{   
            if(this._animationActions._reuseObj1.length===0){         
               var graphic:PIXI.Graphics=new PIXI.Graphics();  
               this.drawObject(graphic);
               graphic.x=295;
               graphic.y=240;     
               this._animationActions._objectList.push(graphic); 
               this._view._performance.addChild(graphic); 
            } 
            else{               
               var reuseGraphic=this._animationActions._reuseObj1.pop();
               reuseGraphic.x=295;
               reuseGraphic.y=240;
               reuseGraphic.frictionOfVx=8;
               this._animationActions._objectList.push(reuseGraphic);
               this._view._performance.addChild(reuseGraphic);
            } 
         }
      }  
   }

   private refreshInformation():void{
      this._view._informationOfQuantity.text="物件數量:"+this._animationActions._quantity;
      this._view._informationOfSpeed.text="速度:"+this._animationActions._speed;  
      this._view._informationOfPolygon.text="邊數:"+this._animationActions._polygon;               
      this._view._informationOfFps.text="FPS:"+this._animationActions._fps; 
   }

   //修改所有圖案邊數
   private changePolygon():void{                  
      for(var i:number=0;i<this._animationActions._objectList.length;i++){ 
         //改變不是SpriteSheet的圖案邊數
         if (this._animationActions._objectList[i].clear!==undefined) {
            this._animationActions._objectList[i].clear();
            this.drawObject(this._animationActions._objectList[i]); 
         }   
      }
   }

   private drawObject(graphic:PIXI.Graphics):void{
      if (this._animationActions._polygon===0){                                
         graphic.beginFill(0xe74c3c*Math.random());   
         graphic.drawCircle(0,0,10);
         graphic.endFill();
      } 
      else{
         //多邊形
         this.drawPolygon(graphic);       
      } 
   }
   
   private drawPolygon(obj:PIXI.Graphics):void{     
      var r:number=10;
      var mX:number=0;
      var mY:number=0;
      //計算多邊形的座標
      var path:number[]=[];
      for(var i:number=0;i<=this._animationActions._polygon;i++){
         var alpha:number=(2/this._animationActions._polygon*i-0.5)*Math.PI;
         var nextX:number=mX+r*Math.cos(alpha);
         var nextY:number=mY+r*Math.sin(alpha);
         path.push(nextX);
         path.push(nextY);  
      }
      obj.beginFill(0xe74c3c*Math.random());
      obj.drawPolygon(path);
      obj.endFill();
   }

   private reset():void{
      for (let i:number=0;i<this._animationActions._objectList.length;i++){
         var obj:any=this._animationActions._objectList[i];
         obj.frictionOfVx=8;
         obj.friction=0.98;
      }
   }
}