const displayResult = document.querySelector('result');
const buttons = document.querySelectorAll('.btn');

const holder = [];
const num = [];
const num2 = [];
let operator;
//let result;

const operations = ['add', 'subtract', 'multiply', 'divide'];


buttons.forEach((button) => {
    button.addEventListener('click', calculator);
})


function calculator(event) {
    const button = event.target;

    // This condition is used if the last add item is a operator and not a number.
    if(button.value === 'enter' && num.length < 2) {
        
        num.push(holder.join(''));
        num.push(0);

        operate(num[0],num[1]);

        holder.length = 0;
    }

    else if(button.value === 'enter') {
        num.push(holder.join(''));

        holder.length = 0;

        operate(num[0],num[1]);
    }


    else if(button.value === 'add' && num.length === 0) {
        operator = 'add';

        num.push(holder.join(''));

        holder.length = 0;

        console.log('num:',num);
    }

    // This condition is used when user alredy add 2 numbers and keeps adding more operations.
    else if(button.value === 'add' && num.length > 0) {

        num.push(holder.join(''));

        console.log(num);

        holder.length = 0;

        operate(num[0],num[1]);

        console.log('num:',num);
        operator = 'add';
    }

    else if(button.value === 'subtract' && num.length === 0) {
        operator = 'subtract';

        num.push(holder.join(''));

        holder.length = 0;

        console.log('num:',num);
    }

    // This condition is used when user alredy add 2 numbers and keeps adding more operations.
    else if(button.value === 'subtract' && num.length > 0) {

        num.push(holder.join(''));

        console.log(num);

        holder.length = 0;

        operate(num[0],num[1]);

        console.log('num:',num);
        operator = 'subtract';
    }

    else if(button.value === 'multiply' && num.length === 0) {
        operator = 'multiply';

        num.push(holder.join(''));

        holder.length = 0;

        console.log('num:',num);
    }

    // This condition is used when user alredy add 2 numbers and keeps adding more operations.
    else if(button.value === 'multiply' && num.length > 0) {

        num.push(holder.join(''));

        console.log(num);

        holder.length = 0;

        operate(num[0],num[1]);

        console.log('num:',num);
        operator = 'multiply';
    }

    else if(button.value === 'divide' && num.length === 0) {
        operator = 'divide';

        num.push(holder.join(''));

        holder.length = 0;

        console.log('num:',num);
    }

    // This condition is used when user alredy add 2 numbers and keeps adding more operations.
    else if(button.value === 'divide' && num.length > 0) {
        num.push(holder.join(''));

        console.log(num);

        holder.length = 0;

        operate(num[0],num[1]);

        console.log('num:',num);
        operator = 'divide'
    }

    else {
    console.log('num:',num);
    holder.push(button.value);
    console.log('holder:',holder);

    }
}


function operate(num1,num2) {
    if (operator === 'add') add(num1,num2);
    if (operator === 'subtract') subtract(num1,num2);
    if (operator === 'multiply') multiply(num1,num2);
    if (operator === 'divide') divide(num1,num2);
}


function add(num1,num2) {

    const secondNumber = parseInt(num2);

    if(isNaN(secondNumber)) { // This condition is used to prevent bugs when user keeps pressing operator button.
        const result = parseInt(num1);
        num.length = 0;
        num.push(result);

        console.log('result:',result);
        return result;

    } else {
    const result = parseInt(num1) + parseInt(num2);
    num.length = 0;
    num.push(result);

    console.log(result);
    return result;
}
}
   
function subtract(num1,num2) {

    const secondNumber = parseInt(num2);

    if(isNaN(secondNumber)) { // This condition is used to prevent bugs when user keeps pressing operator button.
        const result = parseInt(num1);
        num.length = 0;
        num.push(result);

        console.log('result:',result);
        return result;

    } else {
    const result = parseInt(num1) - parseInt(num2);
    num.length = 0;
    num.push(result);

    console.log(result);
    return result;
}
}
   
function multiply(num1,num2) {

    const secondNumber = parseInt(num2);

    if(isNaN(secondNumber)) { // This condition is used to prevent bugs when user keeps pressing operator button.
        const result = parseInt(num1);
        num.length = 0;
        num.push(result);

        console.log('result:',result);
        return result;

    } else {
    const result = parseInt(num1) * parseInt(num2);
    num.length = 0;
    num.push(result);

    console.log(result);
    return result;
}
}
   
function divide(num1,num2) {

    const secondNumber = parseInt(num2);

    if(isNaN(secondNumber)) { // This condition is used to prevent bugs when user keeps pressing operator button.
        const result = parseInt(num1);
        num.length = 0;
        num.push(result);

        console.log('result:',result);
        return result;

    } else if(secondNumber === 0) {
        console.log('lol');
        num.length = 0;
    } else {
    const result = parseInt(num1) / parseInt(num2);
    num.length = 0;
    num.push(result);

    console.log(result);
    return result;
}
}
