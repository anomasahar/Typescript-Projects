#!/usr/bin/env node
import inquirer from "inquirer";
import boxen from "boxen";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
};
async function welcome() {
    let rainbowTitle = chalkAnimation.rainbow('✨ Welcome to the Currency Converter App ✨');
    await sleep();
    rainbowTitle.stop();
}
await welcome();
// Define conversion rates relative to a base currency
const conversionRates = {
    "USD": {
        "EUR": 0.85, "GBP": 0.73, "SAR": 3.75, "AED": 3.67, "CNY": 6.44, "CAD": 1.28, "AUD": 1.29, "PKR": 162.5
        // Exchange rate as of February 2024
    },
    "EUR": {
        "USD": 1.18, "GBP": 0.86, "SAR": 4.45, "AED": 4.37, "CNY": 7.66, "CAD": 1.52, "AUD": 1.53, "PKR": 193.0
        // Exchange rate as of February 2024
    },
    "GBP": {
        "USD": 1.38, "EUR": 1.17, "SAR": 5.16, "AED": 5.07, "CNY": 8.88, "CAD": 1.76, "AUD": 1.77, "PKR": 223.55
        // Exchange rate as of February 2024
    },
    "SAR": {
        "USD": 0.27, "EUR": 0.22, "GBP": 0.19, "AED": 0.98, "CNY": 1.72, "CAD": 0.34, "AUD": 0.34, "PKR": 42.91
        // Exchange rate as of February 2024
    },
    "AED": {
        "USD": 0.27, "EUR": 0.23, "GBP": 0.2, "SAR": 1.02, "CNY": 1.75, "CAD": 0.35, "AUD": 0.35, "PKR": 44.08
        // Exchange rate as of February 2024
    },
    "CNY": {
        "USD": 0.16, "EUR": 0.13, "GBP": 0.11, "SAR": 0.58, "AED": 0.57, "CAD": 0.2, "AUD": 0.2, "PKR": 25.21
        // Exchange rate as of February 2024
    },
    "CAD": {
        "USD": 0.78, "EUR": 0.66, "GBP": 0.57, "SAR": 2.92, "AED": 2.86, "CNY": 4.98, "AUD": 1.0, "PKR": 126.3
        // Exchange rate as of February 2024
    },
    "AUD": {
        "USD": 0.78, "EUR": 0.66, "GBP": 0.57, "SAR": 2.92, "AED": 2.86, "CNY": 4.98, "CAD": 1.0, "PKR": 126.3
        // Exchange rate as of February 2024
    },
    "PKR": {
        "USD": 0.0062, "EUR": 0.0052, "GBP": 0.0045, "SAR": 0.023, "AED": 0.022, "CNY": 0.04, "CAD": 0.0079, "AUD": 0.0079
        // Exchange rate as of February 2024
    }
};
async function start() {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'fromCurrency',
            message: 'Select the currency you want to convert:',
            choices: ["US Dollar (USD)", "Euro (EUR)", "British Pound Sterling (GBP)", "Saudi Riyal (SAR)",
                "UAE Dirham (AED)", "Chinese Yuan (CNY)", "Canadian Dollar (CAD)", "Australian Dollar (AUD)",
                "Pakistani Rupee (PKR)"],
        },
        {
            type: 'input',
            name: 'amount',
            message: 'Enter the amount you want to convert:',
            validate: (value) => {
                if (!isNaN(parseFloat(value))) {
                    return true;
                }
                return chalk.red('Please enter a number.');
            },
        },
        {
            type: 'list',
            name: 'toCurrency',
            message: 'Select the target currency:',
            choices: ["US Dollar (USD)", "Euro (EUR)", "British Pound Sterling (GBP)", "Saudi Riyal (SAR)",
                "UAE Dirham (AED)", "Chinese Yuan (CNY)", "Canadian Dollar (CAD)", "Australian Dollar (AUD)",
                "Pakistani Rupee (PKR)"]
        }
    ]);
    // Extract currency codes from the selected currencies
    const fromCurrencyCode = answer.fromCurrency.split('(')[1].split(')')[0];
    const toCurrencyCode = answer.toCurrency.split('(')[1].split(')')[0];
    // Check if the conversion rates object contains the specified currencies
    if (!conversionRates[fromCurrencyCode] || !conversionRates[toCurrencyCode]) {
        console.error('Conversion rates not available for selected currencies.');
    }
    else {
        // Get the conversion rate from the selected base currency to the target currency
        const conversionRate = conversionRates[fromCurrencyCode][toCurrencyCode];
        // Perform currency conversion
        const convertedAmount = parseFloat(answer.amount) * conversionRate;
        const msg1 = chalk.rgb(240, 249, 112)(`Conversion rate:`, conversionRate);
        const msg2 = chalk.rgb(240, 249, 112)(`Converted amount:`, convertedAmount.toFixed(2));
        const boxedMessage = boxen(`${msg1}\n\n${msg2}`, { padding: 1, margin: 1, borderStyle: 'double', textAlignment: "center", borderColor: "green" });
        console.log(boxedMessage);
    }
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
        await start();
    }
    else {
        const msg = chalk.bold(chalk.rgb(204, 102, 153)('Thanks For Using Our Currency Converter App😃'));
        const boxedMessage = boxen(msg, { padding: 1, margin: 1, borderStyle: 'double', textAlignment: "center", borderColor: "magenta" });
        console.log(boxedMessage);
    }
}
await start();
