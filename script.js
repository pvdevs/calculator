const displayResult = document.querySelector('result');
const buttons = document.querySelectorAll('.btn');

const holder = [];
const num = [];
const num2 = [];
let operator;
//let result;

const operations = ['add', 'subtract', 'multiply', 'divide'];


buttons.forEach((button) => {
    button.addEventListener('click', operate);
})


function operate(event) {

    const button = event.target;

    // This condition is used if the last add item is a operator and not a number.
    if(button.value === 'enter' && num.length < 2) {
        
        num.push(holder.join(''));
        num.push(0);
        
        add(num[0],num[1]);

        holder.length = 0;
        num.length = 0;
    }

    else if(button.value === 'enter') {
        num.push(holder.join(''));

        holder.length = 0;

        add(num[0],num[1]);

        num.length = 0;
    }


    else if(button.value === 'add' && num.length === 0) {
        operator = 'add'

        num.push(holder.join(''));

        holder.length = 0;

        console.log('num:',num);
    }

    // This condition is used when user alredy add 2 numbers and keeps adding more operations.
    else if(button.value === 'add' && num.length > 0) {
        operator = 'add'

        num.push(holder.join(''));

        console.log(num);

        holder.length = 0;
        add(num[0],num[1]);

        console.log('num:',num);
    }

    else {
    console.log('num:',num);
    holder.push(button.value);
    console.log('holder:',holder);

    }
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