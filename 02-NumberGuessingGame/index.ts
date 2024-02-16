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
    let rainbowTitle = chalkAnimation.rainbow('Welcome to the Number Guessing Game!');
    await sleep();
    rainbowTitle.stop();
}
async function result() {
    let rainbowTitle = chalkAnimation.neon("oops! You didn't get it right!");
    await sleep();
    rainbowTitle.stop();
}
await welcome();

function generateRandomNumber(min:number,max:number):number{
    return Math.floor(Math.random()*(max-min+1)+min)
    }

async function numberguessingame():Promise<void>{
    const min = 1;
    const max = 100;
    const answer = await inquirer.prompt({
        type:'input',
        name:'guess',
        message:chalk.blue('Guess any number(1-100):'),
    });
    let guess = answer.guess;
    let secretNumber = generateRandomNumber(min,max);

    if(guess === secretNumber){
        console.log(chalk.rgb(39, 174, 96)("Congratulations! You have guessed the number"));
    }else{
        await result();
        // console.log(chalk.red("oops! You didn't get it right!"));
        await startAgain();
    }
}

async function startGame():Promise<void> {
    const answer = await inquirer.prompt({
        type:'input',
        name:'game',
        message:chalk.rgb(255, 153, 51)('Want to play a Guessing Game:'),
    });
    let game = answer.game;
    if(game == 'y' || game == 'Y' || game == 'yes' || game == 'YES'){
        await numberguessingame();
    }else{
        console.log(chalk.rgb(204, 102, 153).bold("Thank You"));
    }
}

async function startAgain() {
    const playAgain = await inquirer.prompt({
        type: 'input',
        name: 'restart',
        message: (chalk.blue('Do you want to play again: ')), 
    });
    let restart = playAgain.restart; 
    if (restart == 'y' || restart == 'Y' || restart == 'yes' || restart == 'YES') { 
        await numberguessingame(); 
    } else {
        console.log(chalk.rgb(204, 102, 153).bold("Thank You")); 
    }
}

await startGame();

