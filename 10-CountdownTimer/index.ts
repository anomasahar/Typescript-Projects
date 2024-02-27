#!/usr/bin/env node

import chalk from "chalk";
import boxen from "boxen";
import inquirer from "inquirer";
import { clear } from "console";
import chalkAnimation from "chalk-animation";
import { differenceInMilliseconds } from "date-fns";

const sleep = (ms:number) => {
    return new Promise((res) => {
        setTimeout(res, ms);
    });
};

async function welcome() {
    let rainbowTitle = chalkAnimation.rainbow('✨ Welcome to Our Countdown Timer ✨');
    await sleep(2000);
    rainbowTitle.stop();
}

async function startCountdown(endDate: Date) {

    while (true) {
        const dateNow = new Date();
        if (dateNow >= endDate) {
            const msg = chalk.rgb(102, 255, 102)(`The target date has already passed`);
            const boxedMessage = boxen(`${msg}`,
                { padding: 1, margin: 1, borderStyle: "classic", textAlignment: "center"});
            console.log(boxedMessage);
            break;
        }else{

            let difference = differenceInMilliseconds(endDate, dateNow);
            const seconds: number = Math.floor(difference / 1000);
            const minutes: number = Math.floor(seconds / 60);
            const hours: number = Math.floor(minutes / 60);
            const days: number = Math.floor(hours / 24);
            const remainingHours: number = Math.floor(hours % 24);
            const remainingMinutes: number = Math.floor(minutes % 60);
            const remainingSeconds: number = Math.floor(seconds % 60);

            const msg = chalk.underline.bold('CountDown Timer');
            const msg1 = chalk.rgb(255, 153, 51)(`${days} Days`);
            const msg2 = chalk.rgb(255, 153, 51)(`${remainingHours} Hours`);
            const msg3 = chalk.rgb(255, 153, 51)(`${remainingMinutes} Minutes`);
            const msg4 = chalk.rgb(255, 153, 51)(`${remainingSeconds} Seconds`);
            const boxedMessage = boxen(
                `${msg}\n\n${msg1} | ${msg2} | ${msg3} | ${msg4}`,
                { padding: 1, margin: 1, borderStyle: "classic", textAlignment: "center"});
            clear();
            console.log(boxedMessage);
            await sleep(1000);
        }
    }      
}


async function main() {
    await welcome();

    const userInput = await inquirer.prompt([
        {
            name: "endTime",
            type: "input",
            message: `Enter the end time for the countdown in the format (YYYY-MM-DD HH:MM:SS):`,
            validate: (input) => {
                // Basic validation to ensure input matches the required format
                const pattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
                if (!pattern.test(input)) {
                    return chalk.red("Please enter a valid date and time in the specified format.");
                }
                return true;
            }
        }
    ]);
    const endDate = new Date(userInput.endTime);
    startCountdown(endDate);
}

main();