import { Person } from "./person.js";
export class Student extends Person {
    constructor() {
        super();
        this._name = "";
    }
    getName() {
        return this._name;
    }
    setName(name) {
        this._name = name;
    }
}
