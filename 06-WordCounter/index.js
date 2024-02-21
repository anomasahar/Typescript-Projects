#!/usr/bin/env node
import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
};
async function welcome() {
    let rainbowTitle = chalkAnimation.rainbow('✨ Welcome to the Word Counter App ✨');
    await sleep();
    rainbowTitle.stop();
}
await welcome();
async function wordcount() {
    const answer = await inquirer.prompt({
        type: 'input',
        name: 'paragraph',
        message: 'Enter a paragraph:',
        validate: (input) => {
            if (input.trim() === "") {
                return chalk.red("Please enter a non-empty paragraph.");
            }
            return true;
        },
    });
    const paragraph = answer.paragraph;
    // Count words (without whitespaces)
    let paragraphList = paragraph.trim().split(" ");
    let wordCounter = paragraphList.length;
    const msg = chalk.rgb(255, 128, 0)(`Total words are:`, wordCounter);
    const boxedMessage = boxen(msg, { padding: 1, margin: 1, borderStyle: 'double', textAlignment: "center", borderColor: "white" });
    console.log(boxedMessage);
    await continueOrExit();
}
async function continueOrExit() {
    const answer = await inquirer.prompt({
        type: 'list',
        name: 'continueOrexit',
        message: 'Do you want to continue or exit?',
        choices: ['Continue', 'Exit']
    });
    if (answer.continueOrexit === 'Continue') {
        await wordcount();
    }
    else {
        const msg = chalk.bold(chalk.rgb(204, 102, 153)('Thanks For Using Our Word Counter App😃'));
        const boxedMessage = boxen(msg, { padding: 1, margin: 1, borderStyle: 'double', textAlignment: "center", borderColor: "magenta" });
        console.log(boxedMessage);
    }
}
await wordcount();
