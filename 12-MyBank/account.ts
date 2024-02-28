export class BankAccount{
    // Generate a random 10-digit account number for each new account
    accountNumber = Math.floor(Math.random() * (9 * Math.pow(10, 10))) + Math.pow(10, 10);

    accountBalance: number;
    constructor() {
        this.accountBalance = 1000;
    }
    transactionHistory: {
        type: "Credit" | "Debit";
        amount: number;
        date: string;
        fee: number}[] = [];

    Debit(amount: number) {
        // Get the current date and time
        let index = String(new Date()).lastIndexOf(":") + 3;
        let date = String(new Date()).slice(0, index);
    
        // Update accountBalance and record the transaction in transactionHistory
        this.accountBalance -= amount;
        this.transactionHistory.push({
            type: "Debit",
            amount: amount,
            date: date,
            fee: 0,
        });
    }
      
    Credit(amount: number) {
        // Get the current date and time
        let index = String(new Date()).lastIndexOf(":") + 3;
        let date = String(new Date()).slice(0, index);
    
        // Update accountBalance and record the transaction in transactionHistory
        if (amount > 100) {
            this.accountBalance += amount - 1;
            this.transactionHistory.push({
                type: "Credit",
                amount: amount,
                date: date,
                fee: 1,
            });
        } else {
            this.accountBalance += amount;
            this.transactionHistory.push({
                type: "Credit",
                amount: amount,
                date: date,
                fee: 0
            });
        }
    }
}