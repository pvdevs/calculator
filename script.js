// Get references to the HTML elements
const displayElement = document.querySelector('.result');
const displayHistory = document.querySelector('.history');
const numberButtons = document.querySelectorAll('.btn.number');
const operatorButtons = document.querySelectorAll('.btn.operator');
const decimalButton = document.querySelector('.btn.decimal');
const enterButton = document.querySelector('.btn.enter');
const clearButton = document.querySelector('.btn.clear');

const numberBuffer = [];
const numbers = [];
const operatorsList = ['+', '-', '*', '/'];
const numbersList = [0,1,2,3,4,'5',6,7,8,9];

let currentOperator;
let history;

// Attach event listeners to the classes with multiple buttons
numberButtons.forEach(button => {
    button.addEventListener('click', handleNumberButtonClick);
});

operatorButtons.forEach(button => {
    button.addEventListener('click', handleOperatorButtonClick);
});

// Attach event listeners to one button classes
decimalButton.addEventListener('click', handleDecimalButtonClick);
enterButton.addEventListener('click', handleEnterButtonClick);
clearButton.addEventListener('click', handleClearButtonClick);
window.addEventListener("keydown", handleKeyboardPress);

// Suport Functions

function handleKeyboardPress(event) {
    const keyPressed = event.key;
    const keyParsed = parseFloat(keyPressed);
    console.log(keyPressed);

    const operators = operatorsList.some((operator) => operator === keyPressed)
    const numbers = numbersList.some((number) => number === keyPressed);

    switch(true) {
        case operators:
            handleOperatorButtonClick(keyPressed);
            console.log('works');
            break;
        case numbers:
            console.log('worked here to!')
            handleNumberButtonClick(event);
            break;
        case keyPressed === '.':
            handleDecimalButtonClick();
            break;
        case keyPressed === 'Enter':
            handleEnterButtonClick();
            break;
    }
}

/*
function handleKeyboardPress(event) {
    const keyPressed = event.key;
    console.log(keyPressed);

    switch(keyPressed) {
        case operatorsList.some((operator) => operator === keyPressed):
            handleOperatorButtonClick(keyPressed);
            break;
        case numbersList.some((number) => number === keyPressed):
            handleNumberButtonClick(keyPressed);
            break;
        case keyPressed === '.':
            handleDecimalButtonClick();
            break;
        case keyPressed === 'Enter':
            handleEnterButtonClick();
            break;
    }
}
*/

function handleNumberButtonClick(event) {
    const number = event.target.value;
    numberBuffer.push(number);
    console.log(`number: ${number}, numberBuffer: ${numberBuffer}`); // REMOVE this later, its being used just to test the switch case
    updateDisplay();
}

function handleOperatorButtonClick(event) {
    if (numberBuffer.length > 0) {
        numbers.push(parseFloat(numberBuffer.join('')));

        numberBuffer.length = 0;
        performCalculation();
    }
    console.log(event); // REMOVE THIS LATTER
    currentOperator = event.target.value;
}

function handleDecimalButtonClick() {
    if (!numberBuffer.includes('.')) {
        numberBuffer.push('.');
        updateDisplay();
    }
}

function handleEnterButtonClick() {
    if (numberBuffer.length > 0) {
        numbers.push(parseFloat(numberBuffer.join('')));
        numberBuffer.length = 0;
    }
    performCalculation();
}

function handleClearButtonClick() {
    numberBuffer.length = 0;
    numbers.length = 0;
    history = '';

    updateHistory(history)
    updateDisplay();
}

function performCalculation() {
    if (numbers.length < 2 || !currentOperator) { // This codition is used to capture when users are trying to perform a calculation with only 1 number.
        return;
    }

    const num1 = numbers.shift();
    const num2 = numbers.shift();
    let result;

    switch (currentOperator) {
        case '+':
            result = num1 + num2;
            history = `${num1} + ${num2}`;
            break;
        case '-':
            result = num1 - num2;
            history = `${num1} - ${num2}`;
            break;
        case '*':
            result = num1 * num2;
            history = `${num1} * ${num2}`;
            break;
        case '/':
            result = num1 / num2;
            history = `${num1} / ${num2}`;
            break;
    }

    numbers.unshift(result);
    updateDisplay();
    updateHistory(history);
}

function updateDisplay() {
    displayElement.textContent = numberBuffer.length > 0 ? numberBuffer.join('') : numbers[0] || '';
}

function updateHistory(history) {
    displayHistory.textContent = `${history}`
}

