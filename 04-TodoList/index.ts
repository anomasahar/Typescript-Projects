#!/usr/bin/env node

import inquirer from "inquirer";
import boxen from "boxen";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const todoList: string[] = [];

const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
};

async function welcome() {
    let rainbowTitle = chalkAnimation.rainbow('✨ Welcome to the TODO App ✨');
    await sleep();
    rainbowTitle.stop();
}
await welcome();

async function addTask() {
    const { task } = await inquirer.prompt({
        type: 'input',
        name: 'task',
        message: chalk.rgb(255, 153, 51)("Enter the list of the tasks you want todo:"),
    });
    todoList.push(task);
    console.log(chalk.green.bold("Task added successfully!"));
}

async function viewTasks() {
    const msg = chalk.underline.bold('Your Todo List:');
    const tasks = todoList.map((task, index) => chalk.cyan(`${index + 1}. ${task}`)).join('\n');
    const boxedMessage = boxen(msg + '\n\n' + tasks, { padding: 1, margin: 1, borderStyle: 'double' ,borderColor:"blue"});
    console.log(boxedMessage);
}

async function updateTask() {
    const { taskIndex }: { taskIndex: number } = await inquirer.prompt({
        type: 'number',
        name: 'taskIndex',
        message: chalk.rgb(255, 153, 51)("Enter the index of the task you want to update:"),
    });
    if (taskIndex >= 1 && taskIndex <= todoList.length) {
        const { newTask } = await inquirer.prompt({
            type: 'input',
            name: 'newTask',
            message: chalk.rgb(255, 153, 51)("Enter the new task:"),
        });
        todoList[taskIndex - 1] = newTask;
        console.log(chalk.green.bold("Task updated successfully!"));
    } else {
        console.log(chalk.red.bold("Invalid task index."));
    }
}

async function deleteTask() {
    const { taskIndex }: { taskIndex: number } = await inquirer.prompt({
        type: 'number',
        name: 'taskIndex',
        message: chalk.rgb(255, 153, 51)("Enter the index of the task you want to delete:"),
    });
    if (taskIndex >= 1 && taskIndex <= todoList.length) {
        todoList.splice(taskIndex - 1, 1);
        console.log(chalk.green.bold("Task deleted successfully!"));
    } else {
        console.log(chalk.red.bold("Invalid task index."));
    }
}

async function start():Promise<void>{
    let exit = false;
    while(!exit){
        const answer = await inquirer.prompt({
            type:'list',
            name:'list',
            message:"Which operation would you like to perform?",
            choices: [
                "Add",
                "View",
                "Update",
                "Delete","Exit"
            ],
        });
        switch (answer.list) {
            case "Add":
                await addTask();
                break;
            case "View":
                await viewTasks();
                break;
            case "Update":
                await updateTask();
                break;
            case "Delete":
                await deleteTask();
                break;
            case "Exit":
                const msg = chalk.bold(chalk.rgb(204, 102, 153)('Thanks For Using Our Todo App😃'));
                const boxedMessage = boxen(msg, { padding: 1, margin: 1, borderStyle: 'double', textAlignment: "center",borderColor:"magenta" });
                console.log(boxedMessage);
                exit = true;
                break;
            default:
                console.log("Invalid choice");
                break;
        }
    }
}
start();