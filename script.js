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
let decimalBuffer = false;
let enter = false;
let operationResult = null;
let keep = false;

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
    let eventCatcher;

    const BufferLastItem = numberBuffer.length -1;
    const decimalPosition = numberBuffer.indexOf('.');

    if(decimalBuffer && BufferLastItem - decimalPosition >= 1) return; // Checks if user is trying to input more than one element as decimal (limit is one)

    typeof event === 'object' ? eventCatcher = event.target.value : eventCatcher = event; // Checks if the event is coming from Keyboard or Button.
    
    numberBuffer.push(eventCatcher);
    updateDisplay(numbers[0]);
}

function handleOperatorButtonClick(event) {
    decimalBuffer = false;

    if(numberBuffer.length > 0 && keep === true) {
        operationResult = null;
        keep = false;
    }

    if(numberBuffer.length === 0 && keep === true) {
        numberBuffer.push(operationResult); //
        operationResult = null;
        keep = false; //
    }

    if(operationResult != null && numbers.length === 0) numberBuffer.push(operationResult);

    if (numberBuffer.length > 0) {
        numbers.push(parseFloat(numberBuffer.join('')));
        numberBuffer.length = 0;
        performCalculation();
    }
    typeof event === 'object' ? currentOperator = event.target.value : currentOperator = event; // This checks if the event is coming from Keyboard or Button.
    updateHistory((`${numbers} ${currentOperator}`));

    console.log(` handle operator LATE! \n buffer -> ${numberBuffer} \n numbers -> ${numbers} \n OperationResult -> ${operationResult} \n Keep -> ${keep}`); // REMOVE LATER
}



function handleDecimalButtonClick() {
    if (!numberBuffer.includes('.')) {
        decimalBuffer = true;
        numberBuffer.push('.');
        updateDisplay(numbers[0]);
    }
}

function handleClearButtonClick() {
    numberBuffer.length = 0;
    numbers.length = 0;
    history = '';
    operationResult = null;
    decimalBuffer = false;

    updateHistory(history)
    updateDisplay(numbers[0]);
}

function handleDeleteButtonClick() {

    console.log(numberBuffer); // remove this later
    
    if (numberBuffer.length === 0 && operationResult != null){
        operationResult = operationResult.toString().slice(0, -1);
        numberBuffer.pop;
        updateDisplay(operationResult);
        return;
    }

    else if(numberBuffer.length === 0 && numbers.length === 0) return;
    else if (numberBuffer.length === 0 && numbers.length > 0){
        numbers[0] = numbers.toString().slice(0, -1);
    }
    numberBuffer.pop()
    updateDisplay(numbers[0]);
    
    if (numberBuffer.some((e) => e === '.') === false) {
        decimalBuffer = false;
    }

}

function handleEnterButtonClick() {
    decimalBuffer = false;

    enter = true;
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
            enter = true;
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

function updateDisplay(num) {
    displayElement.textContent = numberBuffer.length > 0 ? numberBuffer.join('') : num || '';
}

function updateHistory(history) {
    displayHistory.textContent = `${history}`;
}

function performCalculation() {
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

    if(enter === true) {
        resetOperation(result)
    } else {
        continueOperation(result)
    }

   console.log(` perform calculation! \n buffer -> ${numberBuffer} \n numbers -> ${numbers} \n OperationResult -> ${operationResult} \n Operator -> ${currentOperator}`); // REMOVE LATER
}

function resetOperation(result) {
    operationResult = result;
    keep = true;
    updateDisplay(result);
    updateHistory(history);
    enter = false
}

function continueOperation(result) {
    keep = false;
    numbers.unshift(result);
    updateDisplay(numbers[0]);
    updateHistory(history);
    operationResult = null;
}