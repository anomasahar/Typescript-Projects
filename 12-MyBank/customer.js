import { BankAccount } from "./account.js";
export class Customer {
    constructor(name, age, contactNumber, pin) {
        this.name = name;
        this.age = age;
        this.contactNumber = contactNumber;
        this.pin = pin;
        this.bankAccount = new BankAccount();
    }
}
