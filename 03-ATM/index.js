#!/usr/bin/env node
import inquirer from "inquirer";
import boxen from "boxen";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
let accountBalance = 1000;
let userInfo;
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
};
async function welcome() {
    let rainbowTitle = chalkAnimation.rainbow('Welcome to the ATM Machine!');
    await sleep();
    rainbowTitle.stop();
}
await welcome();
// Function to simulate user authentication
async function authenticateUser() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'username',
            message: ('Enter Your Username:')
        },
        {
            type: 'password',
            name: 'pin',
            message: ('Enter Your 4-digit PIN:'),
            validate: (value) => {
                // Check if the input is a 4-digit number
                if (/^\d{4}$/.test(value)) {
                    return true;
                }
                return chalk.red('PIN must be a 4-digit number.');
            }
        }
    ]);
}
async function display(userInfo) {
    const msg = chalk.rgb(255, 153, 51).bold.underline(`Welcome ${userInfo.username}`);
    const boxedMessage = boxen(`${msg}`, { padding: 1, margin: 1, borderStyle: 'double', textAlignment: "center" });
    console.log(boxedMessage);
}
async function withDraw(accountBalance) {
    const withdrawAmount = await inquirer.prompt({
        type: 'number',
        name: 'withdrawAmount',
        message: ('Enter the amount you want to withdraw:'),
        validate: (input) => {
            if (input > 0 && input <= accountBalance) {
                return true;
            }
            return chalk.red('Insufficient funds or invalid input');
        }
    });
    const value = withdrawAmount.withdrawAmount;
    accountBalance -= value;
    // Display transfer confirmation
    console.log(chalk.green(`You have successfully withdraw $${value}.`));
    return accountBalance;
}
async function deposit(accountBalance) {
    const depositAmount = await inquirer.prompt({
        type: 'number',
        name: 'depositAmount',
        message: ('Enter the amount you want to deposit:'),
        validate: (input) => {
            if (input > 0) {
                return true;
            }
            return chalk.red('Invalid input');
        }
    });
    // Update the account balance
    const value = depositAmount.depositAmount;
    accountBalance += value;
    // Display transfer confirmation
    console.log(chalk.green(`You have successfully deposit $${value}.`));
    return accountBalance;
}
async function accountInfo(accountBalance, userInfo) {
    const msg = chalk.underline('Account Information:');
    const msg1 = chalk.blue(`Username: ${userInfo.username}`);
    const msg2 = chalk.blue(`Account ID: 0x9243...`);
    const msg3 = chalk.blue(`Account Type: Current`);
    const msg4 = chalk.blue(`Balance: ${accountBalance}`);
    const boxedMessage = boxen(`${msg}\n\n${msg1}\n${msg2}\n${msg3}`, { padding: 1, margin: 1, borderStyle: 'double', textAlignment: "center" });
    console.log(boxedMessage);
}
async function transfer(accountBalance) {
    const transferDetails = await inquirer.prompt([
        {
            type: 'input',
            name: 'recipientAccount',
            message: ('Enter the recipient\'s account number:')
        },
        {
            type: 'number',
            name: 'transferAmount',
            message: ('Enter the amount you want to transfer:'),
            validate: (input) => {
                if (input > 0 && input <= accountBalance) {
                    return true;
                }
                return chalk.red('Invalid amount or insufficient funds.');
            }
        }
    ]);
    const { recipientAccount, transferAmount } = transferDetails;
    // Deduct the transfer amount from the account balance
    accountBalance -= transferAmount;
    // Display transfer confirmation
    console.log(chalk.green(`Successfully transferred $${transferAmount} to account number ${recipientAccount}.`));
    return accountBalance;
}
async function generateReceipt(userInfo, remainingBalance) {
    const msg = chalk.underline('Here is your receipt:');
    const msg1 = chalk.blue(`Username: ${userInfo.username}`);
    const msg2 = chalk.blue(`Your Balance: $${remainingBalance}`);
    const msg3 = chalk.bold(chalk.rgb(204, 102, 153)('Thanks For Using Our ATM'));
    const boxedMessage = boxen(`${msg}\n\n${msg1}\n${msg2}\n\n${msg3}`, { padding: 1, margin: 1, borderStyle: 'double', textAlignment: "center" });
    console.log(boxedMessage);
}
async function promptReceiptGeneration() {
    const answer = await inquirer.prompt({
        type: 'confirm',
        name: 'generateReceipt',
        message: 'Do you want to generate a receipt?',
        default: true
    });
    return answer.generateReceipt;
}
async function startAtm(accountBalance) {
    const answer = await inquirer.prompt({
        type: 'list',
        name: 'atm',
        message: "Which option would you like to choose? \n",
        choices: [
            "Withdraw",
            "Deposit",
            "Account Information",
            "Transfer"
        ],
    });
    if (answer.atm === "Withdraw") {
        accountBalance = await withDraw(accountBalance);
    }
    else if (answer.atm === "Deposit") {
        accountBalance = await deposit(accountBalance);
    }
    else if (answer.atm === "Account Information") {
        await accountInfo(accountBalance, userInfo);
    }
    else if (answer.atm === "Transfer") {
        accountBalance = await transfer(accountBalance);
    }
    await continueOrExit(accountBalance);
}
async function continueOrExit(accountBalance) {
    const answer = await inquirer.prompt({
        type: 'list',
        name: 'continueOrexit',
        message: 'Do you want to continue or exit?',
        choices: ['Continue', 'Exit']
    });
    if (answer.continueOrexit === 'Continue') {
        await startAtm(accountBalance);
    }
    else {
        const generateReceiptOption = await promptReceiptGeneration();
        if (generateReceiptOption) {
            await generateReceipt(userInfo, accountBalance);
        }
        else {
            const msg = chalk.bold(chalk.rgb(204, 102, 153)('Thanks For Using Our ATM'));
            const boxedMessage = boxen(msg, { padding: 1, margin: 1, borderStyle: 'double', textAlignment: "center" });
            console.log(boxedMessage);
        }
    }
}
userInfo = await authenticateUser();
display(userInfo);
startAtm(accountBalance);
