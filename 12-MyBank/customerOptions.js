import inquirer from "inquirer";
import boxen from "boxen";
import chalk from "chalk";
// Utility function to introduce a delay
const sleep = () => new Promise((r) => setTimeout(r, 2000));
// Function to display customer information
export function DisplayInfo(customer) {
    const msg1 = chalk.rgb(240, 249, 112)(`Name            : ${customer.name}`);
    const msg2 = chalk.rgb(240, 249, 112)(`Age             : ${customer.age}`);
    const msg3 = chalk.rgb(240, 249, 112)(`Contact Number  : ${customer.contactNumber}`);
    const msg4 = chalk.rgb(240, 249, 112)(`Account Balance : RS: ${customer.bankAccount.accountBalance}`);
    const msg5 = chalk.rgb(240, 249, 112)(`Account Number  : ${customer.bankAccount.accountNumber}`);
    const boxedMessage = boxen(`${msg1}\n${msg2}\n${msg3}\n${msg4}\n${msg5}`, { padding: 1, margin: 1, borderStyle: 'double', borderColor: "green" });
    console.log(boxedMessage);
}
// Function to display customer account balance
export function ShowAccountBalance(customer) {
    const msg1 = (`--------------------------------------`);
    const msg2 = chalk.rgb(255, 153, 51)(`Account Balance : RS: ${customer.bankAccount.accountBalance}`);
    const msg3 = (`--------------------------------------`);
    const boxedMessage = boxen(`${msg1}\n${msg2}\n${msg3}`, { padding: 1, margin: 1, borderStyle: 'double', textAlignment: "center" });
    console.log(boxedMessage);
}
// Function to handle crediting the customer account
export async function Credit(customer) {
    while (true) {
        // Prompt user for the credit amount
        const { amount } = await inquirer.prompt([
            {
                name: "amount",
                message: "Enter Amount : ",
                type: "number",
            },
        ]);
        await sleep(); // Introduce a delay for a more user-friendly experience
        // Validate the entered amount
        if (!amount) {
            console.error(chalk.red(" Enter Correct Amount"));
            continue;
        }
        // Perform credit operation and provide transaction feedback
        customer.bankAccount.Credit(amount);
        if (amount > 100) {
            console.log("Transaction Successful");
        }
        else {
            const msg = chalk.cyan(`Transaction Successful And RS:1 Minus`);
            const boxedMessage = boxen(`${msg}`, { padding: 1, margin: 1, borderStyle: "classic", textAlignment: "center", borderColor: "blue" });
            console.log(boxedMessage);
        }
        return;
    }
}
// Function to handle debiting the customer account
export async function Debit(customer) {
    while (true) {
        // Prompt user for the debit amount
        const { amount } = await inquirer.prompt([
            {
                name: "amount",
                message: "Enter Amount : ",
                type: "number",
            },
        ]);
        await sleep(); // Introduce a delay for a more user-friendly experience
        // Validate the entered amount
        if (!amount) {
            console.error(chalk.red(" Enter Correct Amount"));
            continue;
        }
        // Check if the entered amount exceeds the account balance
        if (amount > customer.bankAccount.accountBalance) {
            console.error(chalk.red(" Amount is Greater than Your Balance"));
            return;
        }
        // Perform debit operation and provide transaction feedback
        customer.bankAccount.Debit(amount);
        const msg = chalk.cyan(`Transaction Successful`);
        const boxedMessage = boxen(`${msg}`, { padding: 1, margin: 1, borderStyle: "classic", textAlignment: "center", borderColor: "blue" });
        console.log(boxedMessage);
        return;
    }
}
// Function to display the transaction history of the customer
export function TransactionHistory(customer) {
    if (!customer.bankAccount.transactionHistory.length) {
        console.log(chalk.red(" No Transaction Available"));
        return;
    }
    // Display transaction history in a tabular format
    console.table(customer.bankAccount.transactionHistory.map((val) => {
        return { ...val, fee: `RS: ${val.fee}`, amount: `RS: ${val.amount}` };
    }));
}
