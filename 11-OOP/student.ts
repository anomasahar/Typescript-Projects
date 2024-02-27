import { Person } from "./person.js";

export class Student extends Person{
    private _name:string;
    
    constructor(){
        super();
        this._name = "";
    }
    getName(){
        return this._name;
    }
    setName(name:string){
        this._name = name;
    }
}