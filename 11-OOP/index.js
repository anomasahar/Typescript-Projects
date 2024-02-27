#!/usr/bin/env node
import chalk from "chalk";
import boxen from "boxen";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import { Person } from "./person.js";
import { Student } from "./student.js";
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
};
async function welcome() {
    let rainbowTitle = chalkAnimation.rainbow('✨ Welcome to My OOP Project ✨');
    await sleep();
    rainbowTitle.stop();
}
class Main {
    async main() {
        try {
            const answer = await inquirer.prompt({
                name: "UserPersonality",
                type: "input",
                message: "Type 1 If You like to talk to others \n  Type 2 If You would rather keep to yourself:",
            });
            const userInput = parseInt(answer.UserPersonality);
            const myperson = new Person();
            myperson.askQustion(userInput);
            const msg = (chalk.rgb(0, 204, 204)(`You Are An ${myperson.getPersonality()}`));
            const boxedMessage = boxen(`${msg}`, { padding: 1, margin: 1, borderStyle: "classic", textAlignment: "center" });
            console.log(boxedMessage);
            const answer2 = await inquirer.prompt({
                name: "UserName",
                type: "input",
                message: "Enter Your Name:",
            });
            const mystudent = new Student();
            mystudent.setName(answer2.UserName);
            const msg1 = (chalk.rgb(255, 153, 204)(`Your Name Is: ${mystudent.getName()}`));
            const msg2 = (chalk.rgb(255, 153, 204)(`And Your Personality Type Is : ${mystudent.getPersonality()}`));
            const boxedMessage2 = boxen(`${msg1}\n${msg2}`, { padding: 1, margin: 1, borderStyle: "classic", textAlignment: "center" });
            console.log(boxedMessage2);
        }
        catch (error) {
            console.log('Please Enter An Interger Value!');
        }
    }
}
const myObj = new Main();
await welcome();
myObj.main();
