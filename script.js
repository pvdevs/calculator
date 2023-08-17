const displayResult = document.querySelector('result');
const buttons = document.querySelectorAll('.btn');

const holder = [];
const num1 = [];
const num2 = [];
let operator;
//let result;

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
 
        if(button.value === 'enter') {
            num1.push(holder.join(''));
            add(num1[0],num1[1]);
        }
        

        else if(button.value === '+' && num1.length === 0) {
            operator = 'add'

            num1.push(holder.join(''));
            
            holder.length = 0;

            console.log('num1:',num1);
        }

        else if(button.value === '+' && num1.length > 0) {
            operator = 'add'
            num1.push(holder.join(''));
            add(num1[0],num1[1]);
            
            holder.length = 0;
            console.log('num1:',num1);
        }

        else {
        console.log('num1length:', num1.length);
        holder.push(button.value);
        console.log('holder:',holder);

        }
 })
})

function add(num1,num2) {
    const result = parseInt(num1) + parseInt(num2);
    console.log(result)
    return result;
}