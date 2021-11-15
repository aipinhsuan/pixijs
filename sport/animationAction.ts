namespace animation{
    export class animationAction{
        public _isSpriteSheet:boolean=false;
        public _quantity:number=0;
        public _speed:number=1;
        public _polygon:number=0;
        public _fps:number=60;  
        public _animationId:number=0; 
        public _objectList:any[]=[]; 
        //public _reuseObjectList:any[]=[];
        public _reuseObj1:any[]=[];
        public _reuseObj2:any[]=[];

        public displayWithFps(currentsport:string):void{
            var str=currentsport;
            this._animationId=setTimeout(() => {
                this.displayWithFps(str);
            }, 1000/this._fps);
            for(let i:number=0;i<this._objectList.length;i++){
                var obj=this._objectList[i]; 
                obj.animationSpeed=0.5*this._fps/60;
            }
            switch(str){
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
        }

        public getFunction(e:any):void{
            switch(e.type){
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
        }

        private lineSport():void{
            for(let i:number=0;i<this._objectList.length;i++){
                var obj=this._objectList[i];  
                if(obj.theta===undefined){
                    obj.theta=Math.random()*360;
                }
                if(obj.status===undefined){
                    obj.status=1;
                }
                if(obj.directionOfx===undefined || obj.directionOfy===undefined){
                    obj.directionOfx=Math.sin(obj.theta*Math.PI/180);
                    obj.directionOfy=Math.cos(obj.theta*Math.PI/180);
                }
                if(this._fps!==0){
                    obj.x+=obj.directionOfx*this._speed*60/this._fps;
                    obj.y+=obj.directionOfy*this._speed*60/this._fps; 
                }       
                if(obj.x>580 || obj.x<10){                      
                    obj.directionOfx=-obj.directionOfx;              
                }
                if(obj.y>470 || obj.y<10){
                    obj.directionOfy=-obj.directionOfy; 
                }
                if(obj.x>600 || obj.x<-10 || obj.y>490 || obj.y<-10){
                    obj.x=295;
                    obj.y=240;
                    obj.x+=i*2.5;
                }
            }
        }
        //(x-h)^2=4*c*(y-k) 頂點為(h,k),焦距為|c|
        private parabolaSport():void{
            for(let i:number=0;i<this._objectList.length;i++){
                var obj=this._objectList[i];
                if(obj.status===undefined){
                    obj.status=1;
                    obj.x+=i*2.5;
                }
                if(this._fps!==0){
                    if(obj.status){
                        obj.x+=1*this._speed*60/this._fps;
                        obj.y=Math.pow(obj.x-295,2)/4/100+240;
                        if(obj.x>580 || obj.y>470){
                            obj.status=0;
                        }
                    }
                    else{
                        obj.x-=1*this._speed*60/this._fps;
                        obj.y=Math.pow(obj.x-295,2)/4/100+240;
                        if(obj.x<10 || obj.y>470){
                            obj.status=1;
                        }
                    }
                    if(obj.x>590 || obj.x<0 || obj.y>480){
                        obj.x=295;
                        obj.y=240;
                        obj.status=1;
                        obj.x+=i*2.5;
                    }
                }
            }
        }
        // (x-h)^2 +(y-k)^2 = r^2 圓心為(h,k),半徑為r => 參數化 x=h+r*cos(t) , y=k+r*sin(t)
        private circularSport():void{    
            for(let i:number=0;i<this._objectList.length;i++){
                var obj=this._objectList[i]; 
                if(obj.status===undefined){
                    obj.status=1;
                }
                if(obj.theta===undefined){
                    obj.theta=Math.random()*360;
                }
                else{
                    if(this._fps!==0){
                        obj.theta+=this._speed*60/this._fps;
                    }
                }                  
                obj.x=Math.sin((obj.theta)*Math.PI/180)*100+295;
                obj.y=Math.cos((obj.theta)*Math.PI/180)*100+240;
            }
        }
        // (x-h)^2 / a^2 + (y-k)^2 / b^2 = 1 中心為(h,k),半長軸為a,半短軸為b => 參數化 x=h+a*cos(t) , y=k+b*sin(t)
        private ovalSport():void{
            for(let i:number=0;i<this._objectList.length;i++){
                var obj=this._objectList[i];
                if(obj.theta===undefined){
                    obj.theta=Math.random()*360;
                }
                if(obj.status===undefined){
                    obj.status=1;
                }
                else{
                    if(this._fps!==0){
                        obj.theta+=this._speed*60/this._fps;
                    }
                }                
                obj.x=140*Math.cos(obj.theta*Math.PI/180)+295;
                obj.y=-70*Math.sin(obj.theta*Math.PI/180)+240;
            }
        }
        // y=a*sin(x) 震幅為a
        private sineSport():void{ 
            for(let i:number=0;i<this._objectList.length;i++){
                var obj=this._objectList[i];
                if(obj.status===undefined){
                    obj.status=1;
                    obj.x+=i*2.5;
                }
                if(this._fps!==0){
                    if(obj.status){  
                        obj.x+=this._speed*60/this._fps*0.5;                   
                        if (obj.x>580){                      
                            obj.status=0;                     
                        }
                    }   
                    else{
                        obj.x-=this._speed*60/this._fps*0.5;                  
                        if(obj.x<10){
                            obj.status=1;
                        }
                    }
                }
                if(obj.x>590 || obj.x<0){
                    obj.x=295;
                    obj.y=240;
                    obj.status=undefined;
                }  
                obj.y=-100*Math.sin((obj.x-295)/25)+240;
            }
        }
        // y=a*cos(x) 震幅為a
        private cosineSport():void{ 
            for(let i:number=0;i<this._objectList.length;i++){
                var obj=this._objectList[i];
                if(obj.status===undefined){
                    obj.status=1;
                    obj.x+=i*2.5;
                }
                if(this._fps!==0){
                    if(obj.status){ 
                        obj.x+=this._speed*60/this._fps*0.5;                  
                        if (obj.x>580){                      
                            obj.status=0;                     
                        }
                    }   
                    else{
                        obj.x-=this._speed*60/this._fps*0.5;               
                        if(obj.x<10){
                            obj.status=1;
                        }
                    } 
                }
                if(obj.x>590 || obj.x<0){
                    obj.x=295;
                    obj.y=240;
                    obj.status=undefined;
                } 
                obj.y=-100*Math.cos((obj.x-295)/25)+240;
            }
        }
      
        private frictionSport():void{
            for(let i:number=0;i<this._objectList.length;i++){
                var obj=this._objectList[i];
                if(obj.status===undefined){
                    obj.status=1;
                    obj.x=10+Math.random()*570;
                    obj.y=10+Math.random()*460;
                }
                obj.frictionOfVx*=obj.friction;
                if(this._fps!==0){
                    if(obj.status){
                        obj.x+=obj.frictionOfVx*this._speed*0.1*60/this._fps;
                        if(obj.x+obj.frictionOfVx>580){
                            obj.status=0;
                        }
                    }
                    else{
                        obj.x-=obj.frictionOfVx*this._speed*0.2*60/this._fps;
                        if(obj.x+obj.frictionOfVx<10){
                            obj.status=1;
                        }
                    }
                }
                if(obj.x>600 || obj.x<-10){
                    obj.x=295;
                    obj.y=240;
                    obj.status=undefined;
                } 
            }
        }
      
        private bounceSport():void{
            for(let i:number=0;i<this._objectList.length;i++){
                var obj=this._objectList[i];
                if(obj.bounceOfVy===undefined){
                    obj.bounceOfVy=2;
                }
                if(obj.status===undefined){
                    obj.status=1;
                    obj.x=10+Math.random()*570;
                    obj.y=10+Math.random()*460;
                }
                if(this._speed!==0 && this._fps!==0){
                    obj.y+=obj.bounceOfVy;
                    obj.bounceOfVy*=0.99;
                    obj.bounceOfVy+=0.1*this._speed*this._fps/60;
                    if(obj.y+obj.bounceOfVy>470 || obj.y+obj.bounceOfVy<10){
                        obj.bounceOfVy=-obj.bounceOfVy;
                    }
                }
                if(obj.y>480 || obj.y<0){
                    obj.x=295;
                    obj.y=240;
                    obj.status=undefined;
                    obj.bounceOfVy=2;
                }
            }
        }
      
        private collisionSport():void{
            for(let i:number=0;i<this._objectList.length;i++){                
                var obj=this._objectList[i];  
                if(obj.theta===undefined){
                    obj.theta=Math.random()*360;
                }
                if(obj.status===undefined){
                    obj.x=10+Math.random()*570;
                    obj.y=10+Math.random()*460;
                    obj.status=1;
                }
                if(obj.vx===undefined || obj.vy===undefined){
                    obj.vx=Math.sin(obj.theta*Math.PI/180);
                    obj.vy=Math.cos(obj.theta*Math.PI/180);
                } 
                if(this._fps!==0){
                    obj.x+=obj.vx*this._speed*60/this._fps;
                    obj.y+=obj.vy*this._speed*60/this._fps;
                }                                         
                if(obj.x>580 || obj.x<10){                      
                    obj.vx=-obj.vx;              
                }
                if(obj.y>470 || obj.y<10){
                    obj.vy=-obj.vy; 
                }
                if(obj.x>590 || obj.x<0 || obj.y>480 || obj.y<0){
                    obj.x=295+i*2.5;
                    obj.y=240;
                    obj.vx=Math.sin(obj.theta*Math.PI/180);
                    obj.vy=Math.cos(obj.theta*Math.PI/180);
                }
            }
            this.detectCollisions();
        }

      
        private setSpeed(sign:string):void{
            if(sign==="+"){
                if(this._speed<15){
                    this._speed++;
                } 
            }
            else{
                if(this._speed>0){
                    this._speed--;
                }
            }
        }
      
        private setQuantity(sign:string):void{
            if(sign==="+"){
                if(this._quantity<100){
                    this._quantity++;
                } 
            }
            else{
                if(this._quantity>0){
                    this._quantity--;
                }
            }
        }
      
        private setPolygon(sign:string):void{
            if(sign==="+"){
                if(this._polygon===0){
                    this._polygon=3;
                }
                else{
                    this._polygon ++;
                }
            }
            else{
                if(this._polygon===3)
                {
                    this._polygon=0;
                }
                else if(this._polygon>0){
                    this._polygon--;
                }             
            }
        }
      
        private setFps(sign:string):void{
            if(sign==="+"){
                if(this._fps<60){
                this._fps+=5;
                }
            }
            else{
                if(this._fps>0)
                {
                   this._fps-=5;
                }
            }
        }

        private spriteSheet():void{
            this._isSpriteSheet=!this._isSpriteSheet;
        }

        private circleIntersect(x1:number,y1:number,r1:number,x2:number,y2:number,r2:number):boolean{
            let squareDistance:number=(x1-x2)*(x1-x2)+(y1-y2)*(y1-y2);
            return squareDistance<=(r1+r2)*(r1+r2);
        }

        private detectCollisions():void{
            let obj1:any;
            let obj2:any;
            for(let i:number=0;i<this._objectList.length;i++){
                obj1=this._objectList[i];
                for(let j:number=i+1;j<this._objectList.length;j++){
                    obj2=this._objectList[j];
                    if(this.circleIntersect(obj1.x,obj1.y,obj1.width/2,obj2.x,obj2.y,obj2.width/2)){
                        let vCollision={x:obj2.x-obj1.x,y:obj2.y-obj1.y};
                        let distance:number=Math.sqrt((obj2.x-obj1.x)*(obj2.x-obj1.x)+(obj2.y-obj1.y)*(obj2.y-obj1.y));
                        let vCollisionNorm={x:vCollision.x/distance,y:vCollision.y/distance};
                        let vRelativeVelocity={x:obj1.vx-obj2.vx,y:obj1.vy-obj2.vy};
                        let speed:number=vRelativeVelocity.x*vCollisionNorm.x+vRelativeVelocity.y*vCollisionNorm.y;
                        if(speed<0){
                            break;
                        }
                        obj1.vx-=(speed*vCollisionNorm.x);
                        obj1.vy-=(speed*vCollisionNorm.y);
                        obj2.vx+=(speed*vCollisionNorm.x);
                        obj2.vy+=(speed*vCollisionNorm.y);
                    }
                }
            }
        }
    }
}