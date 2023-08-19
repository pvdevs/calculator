// Get references to the HTML elements
const displayElement = document.querySelector('.result');
const displayHistory = document.querySelector('.history');
const numberButtons = document.querySelectorAll('.btn.number');
const operatorButtons = document.querySelectorAll('.btn.operator');
const decimalButton = document.querySelector('.btn.decimal');
const enterButton = document.querySelector('.btn.enter');
const clearButton = document.querySelector('.btn.clear');
const deleteButton = document.querySelector('.btn.delete');

const numberBuffer = [];
const numbers = [];
const operatorsList = ['+', '-', '*', '/'];
const numbersList = ['0','1','2','3','4','5','6','7','8','9'];

let currentOperator;
let history;

// Attach event listeners to the classes with multiple buttons
numberButtons.forEach(button => button.addEventListener('click', handleNumberButtonClick));
operatorButtons.forEach(button => button.addEventListener('click', handleOperatorButtonClick));

// Attach event listeners to one button classes
decimalButton.addEventListener('click', handleDecimalButtonClick);
clearButton.addEventListener('click', handleClearButtonClick);
deleteButton.addEventListener('click', handleDeleteButtonClick);
enterButton.addEventListener('click', handleEnterButtonClick);

// Attach event listener to keyboard events
window.addEventListener("keydown", handleKeyboardPress);


// Suport Functions
function handleNumberButtonClick(event) {
    let number;
    typeof event === 'object' ? number = event.target.value : number = event; // This checks if the event is coming from Keyboard or Button.
    numberBuffer.push(number);
    updateDisplay();
}

function handleOperatorButtonClick(event) {
    if (numberBuffer.length > 0) {
        numbers.push(parseFloat(numberBuffer.join('')));
        numberBuffer.length = 0;
        performCalculation();
    }
    typeof event === 'object' ? currentOperator = event.target.value : currentOperator = event; // This checks if the event is coming from Keyboard or Button.
    updateHistory((`${numbers} ${currentOperator}`));
}

function handleDecimalButtonClick() {
    if (!numberBuffer.includes('.')) {
        numberBuffer.push('.');
        updateDisplay();
    }
}

function handleClearButtonClick() {
    numberBuffer.length = 0;
    numbers.length = 0;
    history = '';

    updateHistory(history)
    updateDisplay();
}

function handleDeleteButtonClick() {
    if (numberBuffer.length === 0 && numbers.length === 0) return;
    else if (numberBuffer.length === 0 && numbers.length > 0){
        numbers[0] = Math.floor(numbers[0] / 10);
    }
    numberBuffer.shift();
    updateDisplay();
}

function handleEnterButtonClick() {
    if (numberBuffer.length > 0) {
        numbers.push(parseFloat(numberBuffer.join('')));
        numberBuffer.length = 0;
    }
    performCalculation();
}

// This function Checks if the pressed key is one of the operators / numbers / other buttons that are available in tis calculator.
function handleKeyboardPress(event) {
    switch(true) {
        case operatorsList.some((operator) => operator === event.key): // This case returns true or false if the pressed key is in the operators listed above.
            handleOperatorButtonClick(event.key);
            break;
        case numbersList.some((number) => number === event.key): // This case returns true or false if the pressed key is in the numbers listed above.
            handleNumberButtonClick(event.key);
            break;
        case event.key === '.':
            handleDecimalButtonClick();
            break;
        case event.key === 'Enter':
            handleEnterButtonClick();
            break;
        case event.key === 'Backspace':
            handleDeleteButtonClick();
            break;
        case event.key === 'c':
            handleClearButtonClick();
            break;
    }
}

function updateDisplay() {
    displayElement.textContent = numberBuffer.length > 0 ? numberBuffer.join('') : numbers[0] || '';
}

function updateHistory(history) {
    displayHistory.textContent = `${history}`
}

function performCalculation() {
    if (numbers.length < 2 || !currentOperator) return; // This codition is used to capture when users are trying to perform a calculation with only 1 number.

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
