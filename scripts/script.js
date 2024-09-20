function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(firstNum, operator, secondNum) {
    switch (operator) {
        case '+':
            return add(firstNum, secondNum);
        case '-':
            return subtract(firstNum, secondNum);
        case '*':
            return multiply(firstNum, secondNum);
        case '/':
            return divide(firstNum, secondNum);
    }
}

function removeLastChar(string) {
    return string.slice(0, string.length - 1);
}

function clearDisplay(id) {
    if (id === 'return') {
        displayInput.value = removeLastChar(displayInput.value);
    } else if (id === 'clear') {
        displayInput.value = displayInput.getAttribute('placeholder');
    }
}

function calculate(stringOperation) {

    return num;
}

let firstNum, operator, secondNum;

const displayInput = document.querySelector('.display-value');
const numsOpsContainer = document.querySelector('.num-operations-container');

numsOpsContainer.addEventListener('click', (event) => {
    /* console.log(event.target.id, event.target.className); */
    const classTarget = event.target.className;
    if (classTarget === 'numbers' || 
        classTarget === 'dot' || 
        classTarget === 'smiley') {
            
        if (displayInput.value == '0') {
            displayInput.value = '';
        }
        displayInput.value += event.target.textContent;
    } else if (classTarget == 'ops') {
        displayInput.value += event.target.value;
    } else if (classTarget === 'clear') {
        clearDisplay(event.target.id);
    } else if (classTarget === 'equal') {
        displayInput.value = calculate(displayInput.value);
    } else {
        return;
    }
});