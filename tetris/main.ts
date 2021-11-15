///<reference path="./tetrisAction.ts"/>
///<reference path="./view.ts"/>
document.addEventListener("DOMContentLoaded",function(){new animationController();},false);

class colorRankData{
   public color:string = "0";
   public count:number = 0;
}

class animationController{
   private _tetrisActions:tetris.tetrisAction;
   private _view:tetris.tetrisView;
   public _isNewTetromino: boolean = false;
   private _refreshID:number=0;
   public _colorRank:colorRankData[] = [];
   public _specialCountOf1:number=0;
   public _specialCountOf2:number=0;
   private _isTurnOn1:boolean=false;
   private _isTurnOn2:boolean=false;
   
   constructor(){ 
      this._tetrisActions=new tetris.tetrisAction();
      this._view=new tetris.tetrisView();
      this._view.on("playEvent",this.caller);
      //document.addEventListener('keyup', this.keyControl,false);
      document.addEventListener('keydown', this.keyControl,false);
      this.addObject();
      this.draw();
      this.refreshPerformance();
   }

   private caller=(e:any):void=>{
      if(e.data==="Play"){
         this.displayWithFps();
         this._tetrisActions._isPause=false;
      }
      if(e.data==="Pause"){
         clearTimeout(this._tetrisActions._setTimeoutId);
         this._tetrisActions._isPause=true;
      }
      if(e.data==="特殊功能1"){
         if(this._isTurnOn2===true){
            this._isTurnOn2=false;
            this._specialCountOf2--;
         }
         if(this._isTurnOn1===false){
            this._tetrisActions._currentTetromino[0].type.isSpecial=true;
            this._tetrisActions._currentTetromino[0].type.specialType=1;
            this._tetrisActions._currentTetromino[0].type.color="0xa6a600";
            this.changeToSpecialColor("0xa6a600");
            this._specialCountOf1++;
            this._isTurnOn1=!this._isTurnOn1;
         }
      }
      if(e.data==="特殊功能2"){
         if(this._isTurnOn1===true){
            this._isTurnOn1=false;
            this._specialCountOf1--;
         }
         if(this._isTurnOn2===false){
            this._tetrisActions._currentTetromino[0].type.isSpecial=true;
            this._tetrisActions._currentTetromino[0].type.specialType=2;
            this._tetrisActions._currentTetromino[0].type.color="0xffffff";
            this.changeToSpecialColor("0xffffff");
            this._specialCountOf2++;
            this._isTurnOn2=!this._isTurnOn2;
         }
      }
      console.log(this._isTurnOn1+"+"+this._specialCountOf1+"+"+this._isTurnOn2+"+"+this._specialCountOf2);
   }

   private refreshPerformance(){ 
      this._refreshID=setTimeout(() => {
         this.refreshPerformance();       
      }, 1000/60); 
      if(this._isNewTetromino){
         this._view._performance.addChild(this._tetrisActions._currentTetromino[0]);
      }
      if (this._tetrisActions.isCollision(this._tetrisActions._currentTetromino[0])) {
         this.gameover();
      }
      
      for(var x=0;x<12;x++){
         for(var y=0;y<24;y++){        
            if (this._tetrisActions._gridData[x][y] !== 0){      
               for(var k=0;k<this._view._block.length;k++){                 
                  if (this._view._block[k].x === x*25 && this._view._block[k].y === y*25){ 
                     this._isNewTetromino = true;
                     if (this._tetrisActions._nextTetromino.length === 0){
                        this._tetrisActions._nextTetromino.push(this.newTetromino());
                        this._view._nextTetrisContainer.addChild(this._tetrisActions._nextTetromino[0]);
                     }  
                  }
               } 
            }        
         }
      }
   }
   private gameover():void{    
      for(var x=0;x<12;x++){
         for(var y=0;y<24;y++){        
            if (this._tetrisActions._gridData[x][y] !== 0){       
               this._tetrisActions._gridData[x][y] = 0;
            }        
         }
      }
           
      for(var k=0;k<this._view._block.length;k++){ 
         this._view._block[k] = undefined;    
      }   
 
      this._tetrisActions._nextTetromino.push(this.newTetromino());
      this._view._nextTetrisContainer.addChild(this._tetrisActions._nextTetromino[0]);
      this._tetrisActions._specialCount = 1;
      this._colorRank = [];
      this._tetrisActions._currentScore=0;
      this._view._scoreText.text="Score:0";
      this._specialCountOf1=0;
      this._specialCountOf2=0;
      this.draw();
   }
   

   private keyControl=(e:any):void=>{
      switch (e.keyCode) {
         case 37:
            this._tetrisActions.left();
            break;
         case 38:
            this._tetrisActions.spin();
            this.rotationOfTetris();
            break;
         case 32:
            this._tetrisActions.spin();
            this.rotationOfTetris();      
            break;
         case 39:
            this._tetrisActions.right();
            break;
         case 40:
            this.down();
            break;
      }
   }
   
   private addObject():void{       
      var newObject = this.newTetromino();
      newObject.x=4*25;
      this._tetrisActions._currentTetromino.push(newObject);
      this._view._performance.addChild(newObject);

      if (this._tetrisActions._nextTetromino.length === 0){
         this._tetrisActions._nextTetromino.push(this.newTetromino());
         this._view._nextTetrisContainer.addChild(this._tetrisActions._nextTetromino[0]);
      }      
   }

   private newTetromino():PIXI.Graphics{
      var graphics=new PIXI.Graphics()as any;
      var type=this._tetrisActions.randomType();    
      graphics.type=type;
      
      for(var i=0;i<type.size;i++){
         for(var j=0;j<type.size;j++){
            if(type.shapes[this._tetrisActions._rotation][j][i]===1){
               graphics.lineStyle(1, 0x3c3c3c, 1);
               graphics.beginFill(type.color);
               graphics.drawRect(i*25,j*25,25,25);
               graphics.endFill();
            }
         }
      }
      graphics.y=0;
      return graphics;
   }

   private rotationOfTetris():void{       
      this._tetrisActions._currentTetromino[0].clear();
      var graphic=this._tetrisActions._currentTetromino[0]; 
      for(var i=0;i<graphic.type.size;i++){
         for(var j=0;j<graphic.type.size;j++){
            if(graphic.type.shapes[this._tetrisActions._rotation][j][i]===1){
               graphic.lineStyle(1, 0x3c3c3c, 1);
               graphic.beginFill(graphic.type.color);
               graphic.drawRect(i*25,j*25,25,25);
               graphic.endFill();
            }
         }
      }
   }

   public down():void{
      if(this._tetrisActions._isPause===false){
         this._tetrisActions._currentTetromino[0].y+=1*25; 
         if(this._tetrisActions.isCollision(this._tetrisActions._currentTetromino[0])){
         
            this._tetrisActions._currentTetromino[0].y-=1*25;   
            var line=this.unite(this._tetrisActions._currentTetromino[0]); 
            this._tetrisActions.calculateScore(line);
            this._view._performance.removeChild(this._tetrisActions._currentTetromino[0]);
            this._tetrisActions._currentTetromino.pop();
            var getNext=this._tetrisActions._nextTetromino.pop();
            getNext.x=4*25;
            this._tetrisActions._rotation=0;
            this._tetrisActions._currentTetromino.push(getNext);

            this.colorCounter(); 
            
            var nospecialcolor1=true;
            for(var i=0;i<this._colorRank.length;i++){
               if(this._colorRank[i].color==="0xa6a600"){
                  nospecialcolor1=false;
                  break;
               }
            }
            var nospecialcolor2=true;
            for(var i=0;i<this._colorRank.length;i++){
               if(this._colorRank[i].color==="0xffffff"){
                  nospecialcolor2=false;
                  break;
               }
            }

            if(this._specialCountOf1>0 && nospecialcolor1) {
               var random=Math.floor(Math.random()*this._colorRank.length);
               if(this._colorRank[random].color==="0xffffff"){
                  var randomColorCount=this._colorRank[random-1].count;
                  var randomColor=this._colorRank[random-1].color;
               }
               else{
                  var randomColorCount=this._colorRank[random].count;
                  var randomColor=this._colorRank[random].color;
               }
               this.mopColor(randomColor);
               this._tetrisActions.specialCalculateScore(randomColorCount);
               this._specialCountOf1=0;
            }
            if(this._specialCountOf2>0 && nospecialcolor2) {
               var mostColorCount=this._colorRank[0].count;
               var mostColor=this._colorRank[0].color;
               this.mopColor(mostColor);
               this._tetrisActions.specialCalculateScore(mostColorCount);
               this._specialCountOf2=0;
            }

            if (this._tetrisActions._currentTetromino[0].type.specialType===2){
               this.changeToSpecialColor("0xffffff");
               this._specialCountOf2++;
            }
            if (this._tetrisActions._currentTetromino[0].type.specialType===1){
               this.changeToSpecialColor("0xa6a600");
               this._specialCountOf1++;
            }
            this._view._scoreText.text="Score:"+this._tetrisActions._currentScore;
            this.draw();            
         }
      }
   } 

   public colorCounter():void{
      this._colorRank = [];
      for(var x=0;x<12;x++){
         for(var y=0;y<24;y++){        
            if (this._tetrisActions._gridData[x][y] !== 0){      
               var color = this._tetrisActions._gridData[x][y]+"";
               var colorObject = this._colorRank.filter(x => x.color === color);
               if (colorObject.length !== 0){
                  colorObject[0].count++;
               }
               else{
                  var newColor = new colorRankData();
                  newColor.color = this._tetrisActions._gridData[x][y]+"";
                  newColor.count = 1;
                 this._colorRank.push(newColor);
               } 
            }        
         }
      }
      this._colorRank.sort((a,b) => a.count > b.count? -1 : a.count < b.count ? 1:0);
   }

   public displayWithFps():void{
      this._tetrisActions._setTimeoutId=setTimeout(() => {
         this.displayWithFps();
      }, 300);            
      this.down();
   }

   public unite(tetromino:any):number{
      var clearedLines = 0;

      for (let y = 0; y < tetromino.type.size; y++) {
         for (let x = 0; x < tetromino.type.size; x++) {
            if (tetromino.x/25 + x < 12 && tetromino.x/25 + x >= 0 && tetromino.type.shapes[this._tetrisActions._rotation][y][x]===1) {                
            this._tetrisActions._gridData[tetromino.x/25 + x][tetromino.y/25 + y] = tetromino.type.color;
            this._isTurnOn1=false;
            this._isTurnOn2=false;
            }
         }
      }      
      for (let y = 0; y < tetromino.type.size; y++) {
         var eraseLine = true;
         if (y + tetromino.y/25 >= 24) {
            eraseLine = false;
         } 
         else {
            for (let x = 0; x < 12; x++) {
               if (this._tetrisActions._gridData[x][y + tetromino.y/25] === 0) {
                  eraseLine = false;
                  break;
               }
            }
         }

        
         if (eraseLine) {
            clearedLines++;
            for (let yy = y + tetromino.y/25; yy >= 0; yy--) {
               for (let x = 0; x < 12; x++) {
                  if (yy > 0) {
                     this._tetrisActions._gridData[x][yy] = this._tetrisActions._gridData[x][yy-1];
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
   }
    
   public draw() {  
      var i:number = 0;
      for (let x = 0; x < 12; x++) {
         for (let y = 0; y < 24; y++) {
            if (this._tetrisActions._gridData[x][y] !== 0) { 
               this._view._performance.removeChild(this._view._block[i]);
               var elementBlock=new PIXI.Graphics();
               elementBlock.lineStyle(1, 0x3c3c3c, 1);
               elementBlock.beginFill(this._tetrisActions._gridData[x][y]);
               elementBlock.drawRect(0,0,25,25);
               elementBlock.endFill();
               this._view._block[i]=elementBlock;
               this._view._block[i].x=x*25;
               this._view._block[i].y=y*25;               
               this._view._performance.addChild(elementBlock);             
            }  
            else if (this._view._block[i] === undefined) {              
               var elementBlock=new PIXI.Graphics();
               elementBlock.lineStyle(1, 0x3c3c3c, 1);
               elementBlock.beginFill(0x000000);
               elementBlock.drawRect(0,0,25,25);
               elementBlock.endFill();
               this._view._block[i]=elementBlock;
               this._view._block[i].x=x*25;
               this._view._block[i].y=y*25;               
               this._view._performance.addChild(elementBlock);   
            }
            i++;
         }
      }
   }  
   
   public mopColor(color:string):void{
      var i:number = 0;
      for (let x = 0; x < 12; x++) {
         for (let y = 0; y < 24; y++) {
            if (this._tetrisActions._gridData[x][y] !== 0 && (this._tetrisActions._gridData[x][y]+"") === color) {  
               this._tetrisActions._gridData[x][y] = 0;
               this._view._block[i] = undefined;             
            }        
            i++;           
         }
      }      
   }

   public changeToSpecialColor(colorcode:string){
      this._tetrisActions._currentTetromino[0].clear();
      var graphic=this._tetrisActions._currentTetromino[0]; 
      for(var i=0;i<graphic.type.size;i++){
         for(var j=0;j<graphic.type.size;j++){
            if(graphic.type.shapes[this._tetrisActions._rotation][j][i]===1){
               graphic.lineStyle(1, 0x3c3c3c, 1);
               graphic.beginFill(colorcode);
               graphic.drawRect(i*25,j*25,25,25);
               graphic.endFill();
               graphic.type.color=colorcode;
            }
         }
      }
   }
   
}