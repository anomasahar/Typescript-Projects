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
    let rainbowTitle = chalkAnimation.rainbow('✨ Welcome to the Adventure Game ✨');
    await sleep();
    rainbowTitle.stop();
}
class AdventureGame {
    constructor() {
        this.sleep = () => new Promise((r) => setTimeout(r, 1000));
        this.game = {
            // Properties for player and enemy stats
            maxEnemyHealth: 75,
            enemyAttackDamage: 50,
            enemiesList: ["Skeleton", "Warrior", "Zombie", "Assassin"],
            // Properties for player and enemy stats
            health: 100,
            attackDamage: 50,
            totalHealthPotions: 3,
            healthPotionHealAmount: 30,
            healthPotionDropChance: 0.5 // 50% chance
        };
    }
}
function displayInstructions(adventureGame) {
    const msg = chalk.underline.bold('INSTRUCTIONS');
    const msg1 = chalk.cyan(`You can damage enemy up to ${adventureGame.game.attackDamage} Health`);
    const msg2 = chalk.cyan(`Enemy can damage you up to ${adventureGame.game.enemyAttackDamage} Health`);
    const boxedMessage = boxen(`${msg}\n\n${msg1}\n${msg2}`, { padding: 1, margin: 1, borderStyle: 'double', textAlignment: "center", borderColor: "blue" });
    console.log(boxedMessage);
}
function displayPlayerAndEnemyHealth(playerHealth, enemy, enemyHealth) {
    const msg1 = chalk.bold('----------------------------');
    const msg2 = chalk.rgb(240, 249, 112)(`Your Health: ${playerHealth}`);
    const msg3 = chalk.bold('----------------------------');
    const msg4 = chalk.rgb(240, 249, 112)(`${enemy.trim()}'s Health: ${enemyHealth}`);
    const msg5 = chalk.bold('----------------------------');
    const boxedMessage = boxen(`${msg1}\n${msg2}\n${msg3}\n${msg4}\n${msg5}`, { padding: 1, margin: 1, borderStyle: 'double', textAlignment: "center", borderColor: "green" });
    console.log(boxedMessage);
}
async function attackEnemy(adventureGame, enemy, enemyHealth) {
    let damageDealt = Math.ceil(Math.random() * adventureGame.game.attackDamage);
    let damageTaken = Math.ceil(Math.random() * adventureGame.game.enemyAttackDamage);
    adventureGame.game.health -= damageTaken;
    enemyHealth -= damageDealt;
    await adventureGame.sleep();
    const msg1 = chalk.rgb(255, 153, 51)(`You strike the ${enemy.trim()} for ${damageDealt} damage`);
    const msg2 = chalk.rgb(255, 153, 51)(`${enemy.trim()} damaged you for ${damageTaken}`);
    const boxedMessage = boxen(`${msg1}\n${msg2}`, { padding: 1, margin: 1, borderStyle: 'bold', textAlignment: "center" });
    console.log(boxedMessage);
    return enemyHealth;
}
async function drinkHealthPotion(adventureGame) {
    if (adventureGame.game.totalHealthPotions > 0) {
        adventureGame.game.totalHealthPotions--;
        adventureGame.game.health += adventureGame.game.healthPotionHealAmount;
        await adventureGame.sleep();
        const msg1 = chalk.rgb(255, 153, 51)(`You drink a health potion, healing yourself for ${adventureGame.game.healthPotionHealAmount}`);
        const msg2 = chalk.rgb(255, 153, 51)(`You now have ${adventureGame.game.health} Health`);
        const msg3 = chalk.rgb(255, 153, 51)(`You have ${adventureGame.game.totalHealthPotions} health potion left`);
        const boxedMessage = boxen(`${msg1}\n${msg2}\n${msg3}`, { padding: 1, margin: 1, borderStyle: 'bold', textAlignment: "center" });
        console.log(boxedMessage);
    }
    else {
        console.log(chalk.red(`You have 0 health potion. Defeat enemies to get a chance for one`));
    }
}
async function runFromEnemy(enemy) {
    const msg = chalk.red(`You ran away from the ${enemy.trim()}`);
    const boxedMessage = boxen(`${msg}`, { padding: 1, margin: 1, borderStyle: 'bold', textAlignment: "center" });
    console.log(boxedMessage);
    await continueOrExit();
}
async function startGame() {
    // Initialize the game
    const adventureGame = new AdventureGame();
    // Display instructions to the player
    displayInstructions(adventureGame);
    let enemyAppeared = true;
    while (enemyAppeared) {
        // Reset enemyAppeared to true
        enemyAppeared = true;
        // Warning the user about enemy appearance
        // let enemy = adventureGame.game.enemiesList[Math.floor(Math.random() * adventureGame.game.enemiesList.length)];
        // let enemyHealth = Math.ceil(Math.random() * adventureGame.game.maxEnemyHealth);
        // console.log(chalk.red(`${`          ${enemy.trim()} Has Appeared`}`));
        let enemy = adventureGame.game.enemiesList[Math.floor(Math.random() * adventureGame.game.enemiesList.length)];
        let maxEnemyHealth = adventureGame.game.maxEnemyHealth;
        if (enemy === "Warrior") {
            // Adjust the health for Warrior
            maxEnemyHealth = Math.floor(Math.random() * (maxEnemyHealth - 50)) + 50; // Random health between 50 and maxEnemyHealth
        }
        else if (enemy === "Skeleton") {
            // Adjust the health for Skeleton
            maxEnemyHealth = Math.floor(Math.random() * (maxEnemyHealth - 100)) + 100; // Random health between 25 and maxEnemyHealth
        }
        else if (enemy === "Zombie") {
            // Adjust the health for Skeleton
            maxEnemyHealth = Math.floor(Math.random() * (maxEnemyHealth - 150)) + 150; // Random health between 25 and maxEnemyHealth
        }
        else {
            maxEnemyHealth = Math.floor(Math.random() * (maxEnemyHealth - 120)) + 120; // Random health between 25 and maxEnemyHealth
        }
        let enemyHealth = maxEnemyHealth;
        console.log(chalk.red(`${`          ${enemy.trim()} Has Appeared`}`));
        while (enemyHealth > 0 && adventureGame.game.health > 0) {
            // Display player and enemy health
            displayPlayerAndEnemyHealth(adventureGame.game.health, enemy, enemyHealth);
            const answer = await inquirer.prompt([
                {
                    name: "choice",
                    message: "What would you like to choose:",
                    type: "list",
                    choices: ["Attack", "Drink Health Potion", "Run"],
                },
            ]);
            switch (answer.choice) {
                case 'Attack':
                    enemyHealth = await attackEnemy(adventureGame, enemy, enemyHealth);
                    break;
                case 'Drink Health Potion':
                    await drinkHealthPotion(adventureGame);
                    break;
                case 'Run':
                    await runFromEnemy(enemy);
                    enemyAppeared = false;
                    break;
                default:
                    console.log("Invalid choice. Please try again.");
                    break;
            }
        }
        if (adventureGame.game.health === enemyHealth) {
            await adventureGame.sleep();
            const msg1 = chalk.bold('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
            const msg2 = chalk.rgb(153, 0, 153)(`${enemy.trim()} dropped BOMB, You Both were killed`);
            const msg3 = chalk.bold('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
            const boxedMessage = boxen(`${msg1}\n${msg2}\n${msg3}`, { padding: 1, margin: 1, borderStyle: "classic", textAlignment: "center", borderColor: "grey" });
            console.log(boxedMessage);
            enemyAppeared = false; // End the battle
            await continueOrExit();
        }
        if (adventureGame.game.health < 1) {
            await adventureGame.sleep();
            const msg1 = chalk.bold('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
            const msg2 = chalk.rgb(153, 0, 153)(`You were defeated by the ${enemy.trim()}`);
            const msg3 = chalk.bold('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
            const boxedMessage = boxen(`${msg1}\n${msg2}\n${msg3}`, { padding: 1, margin: 1, borderStyle: "classic", textAlignment: "center", borderColor: "grey" });
            console.log(boxedMessage);
            enemyAppeared = false; // End the battle
            await continueOrExit();
        }
        if (enemyHealth < 1) {
            await adventureGame.sleep();
            const msg1 = chalk.bold('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
            const msg2 = chalk.rgb(102, 255, 102)(`${enemy.trim()} was defeated !!!`);
            const msg3 = chalk.rgb(102, 255, 102)(` You have ${adventureGame.game.health} Health left`);
            const msg4 = chalk.bold('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
            const boxedMessage = boxen(`${msg1}\n${msg2}\n${msg3}\n${msg4}`, { padding: 1, margin: 1, borderStyle: "classic", textAlignment: "center", borderColor: "grey" });
            console.log(boxedMessage);
            enemyAppeared = false; // End the battle
            await continueOrExit();
        }
    }
}
async function continueOrExit() {
    const answer = await inquirer.prompt({
        type: 'list',
        name: 'continueOrexit',
        message: 'Do you want to playAgain?',
        choices: ['playAgain', 'Exit']
    });
    if (answer.continueOrexit === 'playAgain') {
        await startGame();
    }
    else {
        const msg = chalk.bold(chalk.rgb(204, 102, 153)('Thanks For Playing 😃'));
        const boxedMessage = boxen(msg, { padding: 1, margin: 1, borderStyle: 'double', textAlignment: "center", borderColor: "magenta" });
        console.log(boxedMessage);
        process.exit();
    }
}
await welcome();
await startGame();
