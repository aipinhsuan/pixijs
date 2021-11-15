///<reference path="logic.ts"/>
///<reference path="view.ts"/>

document.addEventListener("DOMContentLoaded",function(){new Main();},false);

class Main
{
   private _view:Calculator.view;
   private _logic:Calculator.logic;
   
    constructor()
    {
       //this._view=new Calculator.view(this.helolo,this.helolo2);   
       this._view=new Calculator.view();
       this._view.on("KeyboardEvent",this.getLogic);
       this._view.on("memoryKeyBoadrEvent",this.memoryGetLogic);
       this._logic=new Calculator.logic();

    }

    /*
    private helolo():void{
       

    }

    private helolo2():void{
       

    }*/
    private getLogic=(e:any)=>{
        //console.log("hello_callbackone",e);
        switch(e.detail.type){
            case "NumberButton":
                this._logic.numberButton(e.detail.data.target);
                break;
            case "CE":
                this._logic.ce();
                break;
            case "Clear":
                this._logic.clear();
                break;
            case "Delete":
                this._logic.delete();
                break;
            case "SetOperator":
                this._logic.setOperator(e.detail.data.target);
                break;
            case "Power":
                this._logic.power(e.detail.data.target);
                break;
            case "Percent":
                this._logic.percent();
                break;
            case "Sign":
                this._logic.sign();
                break;
            case "Equal":
                this._logic.equal(e.detail.data.target);
                break;
        }
        this._view.display(this._logic._displayString,this._logic._result);
    }
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
    private memoryGetLogic=(e:any)=>{
        //console.log("hello_memoryKeyBoadrEvent",e);
        switch(e.detail.type){
            case "MC":
                this._logic.mc();
                break;
            case "MR":
                this._logic.mr();
                this._view.display(this._logic._displayString,this._logic._result);
                break;
            case "MAdd":
                this._logic.mAdd();
                break;
            case "MSub":
                this._logic.mSub();
                break;
            case "MS":
                this._logic.ms();
                this._view.display(this._logic._displayString,this._logic._result);
                break;
            case "M":
                this._logic.m();
                break;
        }
    }
}