import { BankAccount } from "./account.js";

export class Customer{
    name: string;
    age: number;
    contactNumber: string;
    pin: number;
    bankAccount: BankAccount;

    constructor(name: string,age: number,contactNumber: string,pin: number)
    {
        this.name = name;
        this.age = age;
        this.contactNumber = contactNumber;
        this.pin = pin;

        this.bankAccount = new BankAccount();
    }
}