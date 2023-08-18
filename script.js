// Get references to the HTML elements
const displayElement = document.querySelector('.result');
const numberButtons = document.querySelectorAll('.btn.number');
const operatorButtons = document.querySelectorAll('.btn.operator');
const decimalButton = document.querySelector('.btn.decimal');
const enterButton = document.querySelector('.btn.enter');
const clearButton = document.querySelector('.btn.clear');

const numberBuffer = [];
const numbers = [];
const operators = ['add', 'subtract', 'multiply', 'divide'];

let currentOperator;


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

function handleNumberButtonClick(event) {
    const number = event.target.value;
    numberBuffer.push(number);
    updateDisplay();
}

function handleOperatorButtonClick(event) {
    if (numberBuffer.length > 0) {
        numbers.push(parseFloat(numberBuffer.join('')));
        numberBuffer.length = 0;
    }
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
    updateDisplay();
}

function performCalculation() {
    if (numbers.length < 2 || !currentOperator) {
        return;
    }

    const num1 = numbers.shift();
    const num2 = numbers.shift();
    let result;

    switch (currentOperator) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            result = num1 / num2;
            break;
    }

    numbers.unshift(result);
    console.log(numbers);
    updateDisplay();
}

function updateDisplay() {
    displayElement.textContent = numberBuffer.length > 0 ? numberBuffer.join('') : numbers[0] || '';
}
