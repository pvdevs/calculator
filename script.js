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

let currentOperator, history;
let decimalIsPresent = false;
let operationKeepsGoing = true;

numberButtons.forEach(button => button.addEventListener('click', handleNumberButtonClick));
operatorButtons.forEach(button => button.addEventListener('click', handleOperatorButtonClick));

decimalButton.addEventListener('click', handleDecimalButtonClick);
clearButton.addEventListener('click', handleClearAllButtonClick);
deleteButton.addEventListener('click', handleClearElementButtonClick);
enterButton.addEventListener('click', handleEnterButtonClick);
window.addEventListener("keydown", handleKeyboardPress);

// Suport Functions
function handleNumberButtonClick(event) {
    let eventCatcher;

    const BufferLastItem = numberBuffer.length -1;
    const decimalPosition = numberBuffer.indexOf('.');

    if(decimalIsPresent && BufferLastItem - decimalPosition >= 1) return; // Checks if user is trying to input more than one element as decimal (limit is one)

    typeof event === 'object' ? eventCatcher = event.target.value : eventCatcher = event; // Checks if the event is coming from Keyboard or Button.
    
    numberBuffer.push(eventCatcher);
    updateDisplay(numbers[0], history);
}

function handleOperatorButtonClick(event) {
    decimalIsPresent = false;

    if(numberBuffer.length > 0 && operationKeepsGoing === false) {
        numbers.length = 0;
        operationKeepsGoing = true;
    }

    if(numberBuffer.length === 0 && operationKeepsGoing === false) {
        numberBuffer.push(numbers[0]);
        numbers.length = 0;
        operationKeepsGoing = true;
    }

    if(numbers.length > 0 && numbers.length === 0) numberBuffer.push(numbers[0]);

    if (numberBuffer.length > 0) {
        numbers.push(parseFloat(numberBuffer.join('')));
        numberBuffer.length = 0;
        performCalculation(continueOperation);
    }
    typeof event === 'object' ? currentOperator = event.target.value : currentOperator = event; // This checks if the event is coming from Keyboard or Button.
    
    history = `${numbers[0]} ${currentOperator}`
    updateDisplay(numbers[0], `${numbers[0]} ${currentOperator}`);
}

function handleDecimalButtonClick() {
    if (!numberBuffer.includes('.')) {
        decimalIsPresent = true;
        numberBuffer.push('.');
        updateDisplay(numbers[0], history);
    }
}

function handleClearAllButtonClick() {
    numberBuffer.length = 0;
    numbers.length = 0;
    history = '';
    decimalIsPresent = false;
    updateDisplay(numbers[0], history);
}

function handleClearElementButtonClick() {
    if (numberBuffer.length === 0 && numbers.length > 0){
        numbers[0] = numbers.toString().slice(0, -1); // Erases last element
        numberBuffer.pop;
        updateDisplay(numbers[0], history);
        return;
    }
    else if(numberBuffer.length === 0 && numbers.length === 0) return;
    numberBuffer.pop()
    updateDisplay(numbers[0], history);
    if (numberBuffer.some((e) => e === '.') === false) decimalIsPresent = false;
}

function handleEnterButtonClick() {
    decimalIsPresent = false;

    if (numberBuffer.length > 0) {
        numbers.push(parseFloat(numberBuffer.join('')));
        numberBuffer.length = 0;
    }
    performCalculation(resetOperation);
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
            handleClearElementButtonClick();
            break;
        case event.key === 'c':
            handleClearAllButtonClick();
            break;
    }
}

function updateDisplay(number, historyNumber) {
    displayElement.textContent = numberBuffer.length > 0 ? numberBuffer.join('') : number || '';
    displayHistory.textContent = history != undefined ? `${historyNumber}` : '';
}

function performCalculation(callback) {
    if (numbers.length < 2 || !currentOperator) return; // This codition is used to capture when users are trying to perform a calculation with only 1 number.

    const num1 = numbers.shift();
    const num2 = numbers.shift();
    let result;

    switch (currentOperator) {
        case '+':
            result = num1 + num2;
            result = Math.round(result * 10) / 10
            history = `${num1} + ${num2}`;
            break;
        case '-':
            result = num1 - num2;
            result = Math.round(result * 10) / 10
            history = `${num1} - ${num2}`;
            break;
        case '*':
            result = num1 * num2;
            result = Math.round(result * 10) / 10
            history = `${num1} * ${num2}`;
            break;
        case '/':
            result = num1 / num2;
            result = Math.round(result * 10) / 10
            history = `${num1} / ${num2}`;
            break;
    }
    numbers.unshift(result);
    callback();
    updateDisplay(numbers[0],history);
}

const resetOperation = () => operationKeepsGoing = false;
const continueOperation = () => operationKeepsGoing = true;