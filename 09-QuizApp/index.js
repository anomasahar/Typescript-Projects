#!/usr/bin/env node
import chalk from "chalk";
import boxen from "boxen";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
};
async function welcome() {
    let rainbowTitle = chalkAnimation.rainbow('✨ Welcome to Our Quiz App ✨');
    await sleep();
    rainbowTitle.stop();
}
function displayInstructions() {
    const msg = chalk.underline.bold('INSTRUCTIONS');
    const msg1 = chalk.rgb(240, 249, 112)(`You can only attempt the quiz once, so choose your answers wisely.`);
    const msg2 = chalk.rgb(240, 249, 112)(`Once you start the quiz, you cannot go back or change your answers.`);
    const msg3 = chalk.rgb(240, 249, 112)('Good luck!');
    const boxedMessage = boxen(`${msg}\n\n${msg1}\n${msg2}\n${msg3}`, { padding: 1, margin: 1, borderStyle: 'double', textAlignment: "center", borderColor: "green" });
    console.log(boxedMessage);
}
class QuizApp {
    constructor() {
        this.userScore = 0;
        this.questions = [
            {
                question: "What is TypeScript?",
                options: [
                    "A programming language",
                    "A superset of JavaScript",
                    "A database management system",
                    "A web browser"
                ],
                correctAnswer: "A superset of JavaScript"
            },
            {
                question: "Which keyword is used to declare a variable with a fixed type in TypeScript?",
                options: [
                    "var",
                    "let",
                    "const",
                    "int"
                ],
                correctAnswer: "const"
            },
            {
                question: "What is the purpose of TypeScript?",
                options: [
                    "To add static typing to JavaScript",
                    "To remove all types from JavaScript",
                    "To replace JavaScript entirely",
                    "To make JavaScript run faster"
                ],
                correctAnswer: "To add static typing to JavaScript"
            },
            {
                question: "What is the result of the expression 5 + '5' in TypeScript?",
                options: [
                    "10",
                    "55",
                    "TypeError",
                    "Compiler Error"
                ],
                correctAnswer: "55"
            },
            {
                question: "Which of the following statements is true about TypeScript's type system?",
                options: [
                    "TypeScript enforces strong typing",
                    "TypeScript supports dynamic typing",
                    "TypeScript allows implicit type conversion",
                    "TypeScript doesn't have a type system"
                ],
                correctAnswer: "TypeScript enforces strong typing"
            },
            {
                question: "How do you declare a variable with a specific type in TypeScript?",
                options: [
                    "let x: string = 10;",
                    "let x = 10;",
                    "let x = '10';",
                    "let x: number = 10;"
                ],
                correctAnswer: "let x: number = 10;"
            },
            {
                question: "Which symbol is used to specify the type of a function's return value in TypeScript?",
                options: [
                    "->",
                    "=>",
                    ":",
                    ":>"
                ],
                correctAnswer: ":"
            },
            {
                question: "What is the purpose of TypeScript interfaces?",
                options: [
                    "To define classes",
                    "To define object types",
                    "To define function types",
                    "To define array types"
                ],
                correctAnswer: "To define object types"
            },
            {
                question: "Which of the following is NOT a valid TypeScript variable name?",
                options: [
                    "myVariable",
                    "_variable",
                    "123variable",
                    "variable123"
                ],
                correctAnswer: "123variable"
            },
            {
                question: "How do you define an optional property in a TypeScript interface?",
                options: [
                    "property?",
                    "property!: type",
                    "property?: type",
                    "property!: type | undefined",
                ],
                correctAnswer: "property?: type",
            },
        ];
    }
    async startQuiz() {
        displayInstructions();
        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "userAnswer",
                message: "Are Your Ready For Quiz?",
                choices: ["Yes", "No"]
            }
        ]);
        console.log(); // Add an empty line for spacing 
        if (answer.userAnswer === "Yes") {
            for (const questionData of this.questions) {
                const { question, options, correctAnswer } = questionData;
                console.log(chalk.rgb(255, 153, 51)(question));
                const answer = await inquirer.prompt([
                    {
                        type: "list",
                        name: "userAnswer",
                        message: "Choose the correct option:",
                        choices: options
                    }
                ]);
                if (answer.userAnswer === correctAnswer) {
                    this.userScore++;
                }
                console.log(); // Add an empty line for spacing 
            }
            // Evaluate the user's performance
            if (this.userScore <= 5) {
                const msg = chalk.underline.bold('QUIZ ENDED');
                const msg1 = chalk(chalk.redBright(`Your score: ${this.userScore}/${this.questions.length}`));
                const msg2 = chalk(chalk.redBright('You failed the test. Better luck next time'));
                const boxedMessage = boxen(`${msg}\n\n${msg1}\n${msg2}`, { padding: 1, margin: 1, borderStyle: "classic", textAlignment: "center" });
                console.log(boxedMessage);
            }
            else if (this.userScore >= 6 && this.userScore <= 8) {
                const msg = chalk.underline.bold('QUIZ ENDED');
                const msg1 = chalk(chalk.rgb(102, 255, 102)(`Your score: ${this.userScore}/${this.questions.length}`));
                const msg2 = chalk(chalk.rgb(102, 255, 102)('Congratulations! You did pretty well'));
                const boxedMessage = boxen(`${msg}\n\n${msg1}\n${msg2}`, { padding: 1, margin: 1, borderStyle: "classic", textAlignment: "center" });
                console.log(boxedMessage);
            }
            else {
                const msg = chalk.underline.bold('QUIZ ENDED');
                const msg1 = chalk(chalk.rgb(255, 0, 127)(`Your score: ${this.userScore}/${this.questions.length}`));
                const msg2 = chalk(chalk.rgb(255, 0, 127)('Congratulations! You did a brilliant job! 😃'));
                const boxedMessage = boxen(`${msg}\n\n${msg1}\n${msg2}`, { padding: 1, margin: 1, borderStyle: "classic", textAlignment: "center" });
                console.log(boxedMessage);
            }
        }
        else {
            const msg = chalk.bold(chalk.rgb(204, 102, 153)('Alright, take your time and come back when you feel ready! 😃'));
            const boxedMessage = boxen(msg, { padding: 1, margin: 1, borderStyle: 'double', textAlignment: "center", borderColor: "magenta" });
            console.log(boxedMessage);
        }
    }
}
async function main() {
    const quizApp = new QuizApp();
    await welcome();
    await quizApp.startQuiz();
}
main();
