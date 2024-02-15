#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
};
async function welcome() {
    let rainbowTitle = chalkAnimation.rainbow('Lets start Calculation');
    await sleep();
    rainbowTitle.stop();
    console.log(chalk.rgb(36, 113, 163)(`
         _____________________
        |  _________________  |
        | | JO           0. | |
        | |_________________| |
        |  ___ ___ ___   ___  |
        | | 7 | 8 | 9 | | + | |
        | |___|___|___| |___| |
        | | 4 | 5 | 6 | | - | |
        | |___|___|___| |___| |
        | | 1 | 2 | 3 | | x | |
        | |___|___|___| |___| |
        | | . | 0 | = | | / | |
        | |___|___|___| |___| |
        |_____________________|

  `));
}
await welcome();
async function askQuestion() {
    const question = [
        {
            type: "list",
            name: "operator",
            message: chalk.rgb(204, 102, 153)("Which operation you want to perform?: \n"),
            choices: [
                "Addition",
                "Subtraction",
                "Multiplication",
                "Division",
            ],
        },
        {
            type: "number",
            name: "num1",
            message: chalk.rgb(255, 153, 51)("Enter any value: "),
            validate: (answer:any) => {
                // console.log(Number.isNaN(answer)); //return false if there is number and return true if string is provided
                // console.log(isNaN(answer)); //return false for number
                if (isNaN(answer)) {
                    return chalk.red(`☠️☠️ Please enter a valid number!!`);
                }
                return true;
            },
        },
        {
            type: "number",
            name: "num2",
            message: chalk.rgb(255, 153, 51)("Enter aother value: "),
            validate: (answer:any) => {
                if (isNaN(answer)) {
                    return chalk.red(`☠️☠️ Please enter a valid number!!`);
                }
                return true;
            },
        },
    ];
    await inquirer
        .prompt(question)
        .then((answers) => {
        if (answers.operator == "Addition") {
            console.log(chalk.rgb(39, 174, 96)(`${answers.num1} + ${answers.num2} = ${chalk.rgb(39, 174, 96)(answers.num1 + answers.num2)}`));
        }
        else if (answers.operator == "Subtraction") {
            console.log(chalk.rgb(39, 174, 96)(`${answers.num1} - ${answers.num2} = ${chalk.rgb(39, 174, 96)(answers.num1 - answers.num2)}`));
        }
        else if (answers.operator == "Multiplication") {
            console.log(chalk.rgb(39, 174, 96)(`${answers.num1} * ${answers.num2} = ${chalk.rgb(39, 174, 96)(answers.num1 * answers.num2)}`));
        }
        else if (answers.operator == "Division") {
            console.log(chalk.rgb(39, 174, 96)(`${answers.num1} / ${answers.num2} = ${chalk.rgb(39, 174, 96)(answers.num1 / answers.num2)}`));
        }
    });
}
// await askQuestion();
async function startAgain() {
    do {
        await askQuestion();
        var playAgain = await inquirer
            .prompt({
            type: 'input',
            name: 'restart',
            message: chalk.rgb(204, 102, 153)('Do you want to restart your calcualtion? Press y or n: ')
        });
    } while (playAgain.restart == 'y' || playAgain.restart == 'Y' || playAgain.restart == 'yes' || playAgain.restart == 'YES');
}
startAgain();
