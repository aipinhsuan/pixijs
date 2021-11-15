namespace Calculator{
    export class logic{
        private _operand_1:string = "0";
        private _operand_2:string = "";
        private _operator:string = "";
        public _displayString:string = "";
        private _isFirst:boolean;
        public _result:string="0";
        private _op_count:number=1;
        private _operatorTable:string[] = ['+','-','*','/'];
        private _prevDisplay:string="";
        private _temp:string="";
        private _isAccumulation:boolean = false;
        private _accumulationBase:number = 0;
        private _memoryArray:string[] = [];
        private _isMemoryNumber:boolean=false;

        constructor(){
            this._isFirst = true;
        }

        public percent():void{
            if(this._result==="無法除以零" || this._result==="無效的輸入"){
                this.clear();
                return;
            }
    
            //若什麼運算子都沒輸入直接輸出0
            if (this._operator === ""){
                this._operand_1 = "0";
                this._operand_2 = "0";
                this._result = "0";
                this._displayString = "0";
                return;    
            }
    
            if (this._operator !== "" && this._operand_2 === "" && (this._operator === "+" || this._operator === "-")){
                this._operand_2 = (+this._operand_1) / 100 * (+this._operand_1) +"";
                this._displayString += (+this._operand_1 )/ 100 * (+this._operand_1) + "";
                return;    
            }
            else if (this._operator !== "" && (this._operator === "+" || this._operator === "-")) {  
                this._prevDisplay = this._displayString.slice(0,-this._operand_2.length);   
                this._operand_2 = (+this._result / 100 * +this._operand_2) +"";    
                if (this._prevDisplay.includes("+") || 
                    this._prevDisplay.includes("-") || 
                    this._prevDisplay.includes("*") ||
                    this._prevDisplay.includes("/")){
                    this._displayString = this._prevDisplay + this._operand_2;
                }
                else{
                    this._displayString = this._prevDisplay+this._operator + this._operand_2;
                }
                return;   
            }
    
            if (this._operator !== "" && this._operand_2 === "" && (this._operator === "*" || this._operator === "/")){
                this._operand_2 = (+this._operand_1 / 100) +"";
                this._displayString += (+this._operand_1 / 100) + "";
                return;
                
            }
            else if (this._operator !== "" && (this._operator === "*" || this._operator === "/")){
                this._prevDisplay = this._displayString.slice(0,-this._operand_2.length);   
                this._operand_2 = (+this._result / 100) +"";    
                if (this._prevDisplay.includes("+") || 
                    this._prevDisplay.includes("-") || 
                    this._prevDisplay.includes("*") ||
                    this._prevDisplay.includes("/")){
                    this._displayString = this._prevDisplay + this._operand_2;
                }
                else{
                    this._displayString = this._prevDisplay+this._operator + this._operand_2;
                }
            }
        }

        public clear():void{       
            this._operand_1 = "0";
            this._operand_2 = "";
            this._operator = "";
            this._displayString = "";
            this._isFirst = true;
            this._result="0";
            this._op_count=1;
            this._prevDisplay="";
        }

        public delete():void{
            if(this._result==="無法除以零" || this._result==="無效的輸入"){
                this.clear();
                return;
            }
    
            if(this._operatorTable.indexOf(this._displayString.slice(-1)) !== -1 || this._displayString.slice(-1)===")" ||this._displayString.slice(-1)==="=" || this._isMemoryNumber===true){
                return;
            }
            else if(this._operand_2!=="" && (+this._operand_2)>-10 && (+this._operand_2<0)){
                this._operand_2="0";
                this._displayString=this._displayString.slice(0,-2)+this._operand_2;
            }
            else if(this._operand_2!==""){
                this._prevDisplay= this._displayString.slice(0,-this._operand_2.length);
                this._operand_2 =this._operand_2.slice(0,-1);       
                this._displayString = this._prevDisplay+this._operand_2;
                this._prevDisplay="";
            }
            else if(this._operand_1!=="" && (+this._operand_1)>-10 && (+this._operand_1<0)){
                this._operand_1="0";
                this._displayString=this._displayString.slice(0,-2)+this._operand_1;
            }
            else{
                this._operand_1 =this._operand_1.slice(0,-1);       
                this._displayString = this._operand_1;
                this._result=this._displayString;
            }
        }

        public ce():void{
            if(this._result==="無法除以零" || this._result==="無效的輸入"){
                this.clear();
                return;
            }
    
            if(this._operatorTable.indexOf(this._displayString.slice(-1)) !== -1){
                return;
            }
            else if(this._operand_2!==""){
                this._result=this._operand_1;
                this._prevDisplay=this._displayString.slice(0,-this._operand_2.length);
                this._operand_2 ="";
                this._displayString = this._prevDisplay+this._operand_2;
                this._prevDisplay="";     
            } 
            else{
                this._result="0";
                this._operand_1 ="0";       
                this._displayString ="";                
            }
        }

        public power(pow:string):void{ 
            var obj:object={
                "2":"sqr",
                "0.5":"√",
                "-1":"1/"
            }
    
            if(this._result==="無法除以零" || this._result==="無效的輸入"){
                this.clear();
                return;
            }
    
            if(this._operand_2!==""){
                this._temp=this._operand_2;
                this._displayString=this._displayString.slice(0,-(+this._temp.length));
                this._displayString=this._displayString+obj[pow]+"("+this._operand_2+")";
                if(pow==="0.5" && (+this._operand_2)<0){
                    this._result="無效的輸入";
                    return;
                }
    
                if(pow==="-1" && this._operand_2==="0"){
                    this._result="無法除以零";
                    return;
                }
                this._operand_2=Math.pow(+this._operand_2,+pow)+"";
                this._temp=obj[pow]+"("+this._operand_2+")";
            }
            else if(this._operand_2 === "" && this._operatorTable.indexOf(this._displayString.slice(-1)) !== -1){
                this._operand_2=this._operand_1;
                this._temp=this._operand_2;
                this._displayString=this._displayString.slice(0,-(+this._temp.length));
                this._displayString=this._displayString+obj[pow]+"("+this._operand_2+")";
                this._operand_2=Math.pow(+this._operand_2,+pow)+"";
                this._temp=obj[pow]+"("+this._operand_2+")";
            }
            else if(this._operand_1!=="" && this._operand_1!=="0"){
                this._displayString =obj[pow]+"("+this._operand_1+")"; 
                if(pow==="0.5" && (+this._operand_1)<0){
                    this._result="無效的輸入";
                    return;
                }  
                this._operand_1=Math.pow(+this._operand_1,+pow)+"";
                this._result=this._operand_1;
                
            }
            else if(pow==="-1"){
                this._displayString="1/(0)";
                this._result="無法除以零";
            }
            else{
                this._displayString=obj[pow]+"(0)";
                this._result=Math.pow(0,+pow)+"";
            }
        } 

        public numberButton(num:string):void{
            if(this._result==="無法除以零" ||this._result==="無效的輸入"){
                this.clear();
            }
    
            if (this._displayString === ""){
                this._displayString = "";
            } 
    
            if(this._isMemoryNumber){
                if(this._operand_2!==""){
                    this._displayString=this._displayString.slice(0,-this._operand_2.length);
                    if(num==="."){
                        this._operand_2="0.";
                    }
                    else{
                        this._operand_2=num;
                    }
                    this._displayString+=this._operand_2;
                }
                else{
                    this._displayString=this._displayString.slice(0,-this._operand_1.length);
                    if(num==="."){
                        this._operand_1="0.";
                    }
                    else{
                        this._operand_1=num;
                    }
                    this._displayString+=this._operand_1;
                    this._result=this._displayString;
                }
                this._isMemoryNumber=false;
                return;
            }
    
            if (this._isFirst){ 
                if(this._operand_1.length>15 && !this._operand_1.includes('.')){
                    return;
                }
                else if(this._operand_1.length>16 && this._operand_1.includes('.')){
                    return;
                }
    
                if (num === '.' && this._operand_1.includes('.')){
                    return;
                }
    
                if ((this._operand_1 === "0" && num === '.')){
                    this._operand_1 = "0.";   
                    this._displayString = "0.";             
                }
                else if(this._operand_1==="0" && num!=="."){
                    this._operand_1=num;
                    this._displayString=this._operand_1;
                }
                else{
                    this._operand_1 += num; 
                    this._displayString += num;    
                }  
                this._result = this._operand_1;    
            }
            else {  
                if(this._operand_2.length>15 && !this._operand_2.includes('.')){
                    return;
                }
                else if(this._operand_2.length>16 && this._operand_2.includes('.')){
                    return;
                }
    
                if (num === '.' && this._operand_2.includes('.')){
                    return;
                }
    
                if (this._operand_2 === "" && num === '.'){
                    this._operand_2 = "0.";
                    this._displayString += "0."; 
                }
                else if(this._operand_2==="0" && num!=="."){
                    this._operand_2=num;
                    this._displayString=this._displayString.slice(0,-1)+this._operand_2;
                }
                else{
                    this._operand_2 += num;
                    this._displayString += num;  
                }       
            }
        }

        public setOperator(op:string):void{
            this._isMemoryNumber=false;
    
            if(this._result==="無法除以零" || this._result==="無效的輸入"){
                this.clear();
                return;
            }
    
            this._op_count+=1;
            if(this._operatorTable.indexOf(this._displayString.slice(-1)) != -1){
                this._displayString = this._displayString.slice(0,-1) + op;
                this._operator = op;
                return;
            }
    
            if(this._op_count>1){         
                this._result = this._operand_1;
                this.equal(""); 
            }
            this._isFirst = false;
            this._displayString +=op;   
            this._operator = op;    
        }

        public sign():void{
            if(this._result==="無法除以零" || this._result==="無效的輸入"){
                this.clear();
                return;
            }
    
            if(this._operand_2!==""){
                this._prevDisplay= this._displayString.slice(0,-this._operand_2.length);
                this._operand_2 = (+this._operand_2*-1) + "";       
                this._displayString = this._prevDisplay+this._operand_2;
                this._prevDisplay="";
            }
            else if(this._operand_2 === "" && this._operatorTable.indexOf(this._displayString.slice(-1)) !== -1){
                this._operand_2=(+this._operand_1)*-1+"";         
            }
            else{
                this._operand_1 = (+this._operand_1*-1) + "";      
                this._displayString = this._operand_1;
                this._result=this._displayString;
            }
        }

        public equal(eq:string):void{ 
            if(this._result==="無法除以零" || this._result==="無效的輸入"){
                this.clear();
                return;
            } 
    
            if(eq==="=" && this._displayString.slice(-1)!=="="){
                this._displayString+="=";
            }
    
            if(eq==="=" && this._displayString.slice(-1)==="=" && this._operand_2===""){
                this._accumulationBase = +this._operand_1;  
                this._isAccumulation = true;          
            } 
    
            if (this._isAccumulation){
                this._operand_2 = this._accumulationBase + "";
            }
            this._isAccumulation = false;
            var operand_1:number = +this._operand_1;
            var operand_2:number = +this._operand_2;
            switch(this._operator){
                case "+":
                    this._result = operand_1 + operand_2+"";
                    break;
                case "-":
                    this._result = operand_1 - operand_2+"";
                    break;
                case "*":
                    this._result = operand_1 * operand_2+"";
                    break;
                case "/":
                    if(this._operand_2===""){
                        operand_2=operand_1
                    }
                    else if(operand_2===0){
                        this._result="無法除以零";
                        break;
                    }
                    this._result = operand_1 / operand_2+"";
                    break;
                default:
                    break;
            }
            this._operand_1=this._result;
            if (eq !== "="){
                this._operand_2 = "";
            }
        }

        public mc():void{
            if(this._result==="無法除以零" || this._result==="無效的輸入"){
                return;
            }
            this._memoryArray=[];
        }

        public mr():void{
            if (this._memoryArray.length===0 || this._result==="無法除以零" || this._result==="無效的輸入"){
                return;
            }
            var getMemoryLast:string=this._memoryArray[this._memoryArray.length-1];

            if(this._operand_2!=="" && this._displayString.slice(-1)==="="){
                this._operand_1=getMemoryLast;
                this._displayString=this._operand_1;
                this._result=this._operand_1;
            }

            else if(this._operand_2!==""){
                this._displayString=this._displayString.slice(0,-this._operand_2.length)+getMemoryLast;
                this._operand_2=getMemoryLast;
            }
            else if(this._operand_2==="" && this._operatorTable.indexOf(this._displayString.slice(-1)) !== -1 ){
                this._operand_2=getMemoryLast;
                this._displayString+=getMemoryLast;
            }
            else{
                this._operand_1=getMemoryLast;
                this._displayString=this._operand_1;
                this._result=this._operand_1;
            }
            this._isMemoryNumber=true;    
        }

        public mAdd():void{
            if(this._result==="無法除以零" || this._result==="無效的輸入"){
                return;
            }
    
            if(this._memoryArray.length===0){
                this.ms();
                return;
            }
    
            if(this._displayString.slice(-1)!=="=" && this._operand_2!==""){
                this._memoryArray[this._memoryArray.length-1]=(+this._memoryArray[this._memoryArray.length-1])+(+this._operand_2)+"";
            }
            else if(this._displayString.slice(-1)==="=" || this._operatorTable.indexOf(this._displayString.slice(-1)) !== -1){
                this._memoryArray[this._memoryArray.length-1]=(+this._memoryArray[this._memoryArray.length-1])+(+this._result)+"";
            }
            else{
                this._memoryArray[this._memoryArray.length-1]=(+this._memoryArray[this._memoryArray.length-1])+(+this._operand_1)+"";
            }
        }

        public mSub():void{
            if(this._result==="無法除以零" || this._result==="無效的輸入"){
                return;
            }
    
            if(this._memoryArray.length===0){
                this.ms();
                return;
            }
    
            if(this._displayString.slice(-1)!=="=" && this._operand_2!==""){
                this._memoryArray[this._memoryArray.length-1]=(+this._memoryArray[this._memoryArray.length-1])-(+this._operand_2)+"";
            }
            else if(this._displayString.slice(-1)==="=" || this._operatorTable.indexOf(this._displayString.slice(-1)) !== -1){
                this._memoryArray[this._memoryArray.length-1]=(+this._memoryArray[this._memoryArray.length-1])-(+this._result)+"";
            }
            else{
                this._memoryArray[this._memoryArray.length-1]=(+this._memoryArray[this._memoryArray.length-1])-(+this._operand_1)+"";
            }
        }

        public ms():void{
            if(this._result==="無法除以零" || this._result==="無效的輸入"){
                return;
            }
    
            if(this._displayString.slice(-1)!=="=" && this._operand_2!==""){
                this._memoryArray.push(this._operand_2);
            }
            else if(this._displayString.slice(-1)==="=" || this._operatorTable.indexOf(this._displayString.slice(-1)) !== -1){
                this._memoryArray.push(this._result);
                if(this._displayString.slice(-1)==="="){
                    this._displayString=this._result;   
                }
            }
            else{
                this._memoryArray.push(this._operand_1);
            }
        }

        public m():void{
            var i:number;
            console.log(this._memoryArray);
        }
    }
}