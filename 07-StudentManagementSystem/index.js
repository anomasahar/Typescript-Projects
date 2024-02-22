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
    let rainbowTitle = chalkAnimation.rainbow('✨ Welcome to the Student Management System ✨');
    await sleep();
    rainbowTitle.stop();
}
class StudentManager {
    constructor() {
        this.students = [];
    }
    async addNewStudent() {
        const { name } = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: 'Enter student name:'
        });
        const studentId = this.generateStudentId();
        const newStudent = {
            name: name,
            studentId: studentId,
            courses: [],
            balance: 10000
        };
        this.students.push(newStudent);
        console.log(chalk.green.bold(`Student ${newStudent.name} added successfully.`));
    }
    async enrollStudentInCourse() {
        // Step 1: Prompt the user to select a student
        const studentName = await this.selectStudent();
        // Step 2: Find the student object from the list of students based on the selected name
        const student = this.students.find((s) => s.name === studentName);
        // Step 3: If the student is not found, display an error message and return
        if (!student) {
            console.log(chalk.red.bold("Student not found."));
            return;
        }
        // Step 4: Prompt the user to enter the course to enroll the student in
        const { course } = await inquirer.prompt({
            type: 'input',
            name: 'course',
            message: `Enter course to enroll ${student.name} in:`
        });
        student.courses.push(course);
        console.log(chalk.green.bold(`${student.name} enrolled in ${course} successfully.`));
    }
    async viewBalance() {
        // Step 1: Prompt the user to select a student
        const studentName = await this.selectStudent();
        // Step 2: Find the student object from the list of students based on the selected name
        const student = this.students.find((s) => s.name === studentName);
        // Step 3: If the student is not found, display an error message and return
        if (!student) {
            console.log(chalk.red.bold("Student not found."));
            return;
        }
        // Step 4: Display the student's balance
        const msg = chalk.rgb(255, 153, 51)(`${student.name}'s balance: $${student.balance}`);
        const boxedMessage = boxen(msg, { padding: 1, margin: 1, borderStyle: 'double', textAlignment: "center" });
        console.log(boxedMessage);
    }
    async payTuitionFees() {
        // Step 1: Prompt the user to select a student
        const studentName = await this.selectStudent();
        // Step 2: Find the student object from the list of students based on the selected name
        const student = this.students.find((s) => s.name === studentName);
        // Step 3: If the student is not found, display an error message and return
        if (!student) {
            console.log(chalk.red.bold("Student not found."));
            return;
        }
        // Step 4: Prompt the user to enter the amount to pay
        const { amount } = await inquirer.prompt({
            type: 'number',
            name: 'amount',
            message: `Enter the amount to pay for ${student.name}:`
        });
        // Step 5: Check if the student has enough balance to cover the payment
        if (student.balance < amount) {
            console.log(chalk.red.bold("Insufficient balance."));
            return;
        }
        // Step 6: Deduct the paid amount from the student's balance
        student.balance -= amount;
        // Step 7: Display a success message
        console.log(chalk.green.bold(`Payment of $${amount} for ${student.name} successful.`));
    }
    async showStatus() {
        // Step 1: Prompt the user to select a student
        const studentName = await this.selectStudent();
        // Step 2: Find the student object from the list of students based on the selected name
        const student = this.students.find((s) => s.name === studentName);
        // Step 3: If the student is not found, display an error message and return
        if (!student) {
            console.log(chalk.red.bold("Student not found."));
            return;
        }
        // Step 4: Display the student's details including name, student ID, courses, and balance
        const msg = chalk.underline.bold('Student Details:');
        const msg1 = chalk.cyan(`Name: ${student.name}`);
        const msg2 = chalk.cyan(`Student ID: ${student.studentId}`);
        const msg3 = chalk.cyan(`Enrolled Courses: ${student.courses.length > 0 ? student.courses.join(", ") : "None"}`);
        const msg4 = chalk.cyan(`Balance: $${student.balance}`);
        const boxedMessage = boxen(`${msg}\n\n${msg1}\n${msg2}\n${msg3}\n${msg4}`, { padding: 1, margin: 1, borderStyle: 'double', textAlignment: "center", borderColor: "blue" });
        console.log(boxedMessage);
    }
    async selectStudent() {
        // Step 1: Create an array of student names from the list of students
        const choices = this.students.map((student) => student.name);
        // Step 2: Prompt the user to select a student from the list of choices
        const { studentName } = await inquirer.prompt({
            type: 'list',
            name: 'studentName',
            message: 'Select student:',
            choices: choices
        });
        return studentName;
    }
    generateStudentId() {
        // Logic to generate a unique 5-digit student ID
        // You can use random numbers or any other logic here
        return Math.floor(10000 + Math.random() * 90000).toString();
    }
}
async function main() {
    const studentManager = new StudentManager();
    let shouldExit = false;
    while (!shouldExit) {
        const answer = await inquirer.prompt({
            type: 'list',
            name: 'choice',
            message: 'What would you like to choose:',
            choices: [
                'Add New Student',
                'Enroll Student in Course',
                'View Balance',
                'Pay Tuition Fees',
                'Show Status',
                'Exit'
            ]
        });
        switch (answer.choice) {
            case 'Add New Student':
                await studentManager.addNewStudent();
                break;
            case 'Enroll Student in Course':
                await studentManager.enrollStudentInCourse();
                break;
            case 'View Balance':
                await studentManager.viewBalance();
                break;
            case 'Pay Tuition Fees':
                await studentManager.payTuitionFees();
                break;
            case 'Show Status':
                await studentManager.showStatus();
                break;
            case 'Exit':
                const msg = chalk.bold(chalk.rgb(204, 102, 153)('Thanks For Your Visit😃'));
                const boxedMessage = boxen(msg, { padding: 1, margin: 1, borderStyle: 'double', textAlignment: "center", borderColor: "magenta" });
                console.log(boxedMessage);
                shouldExit = true;
                break;
            default:
                console.log("Invalid choice. Please try again.");
                break;
        }
    }
}
await welcome();
await main();
