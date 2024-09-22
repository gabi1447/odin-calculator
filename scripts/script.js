function add(num1, num2) {
    return +num1 + +num2;
}

function subtract(num1, num2) {
    return +num1 - +num2;
}

function multiply(num1, num2) {
    return +num1 * +num2;
}

function divide(num1, num2) {
    return +num1 / +num2;
}

function operate(firstNum, operator, secondNum) {
    switch (operator) {
        case '+':
            return cutFloatOverflow(add(firstNum, secondNum));
        case '-':
            return cutFloatOverflow(subtract(firstNum, secondNum));
        case '*':
            return cutFloatOverflow(multiply(firstNum, secondNum));
        case '/':
            const result = cutFloatOverflow(divide(firstNum, secondNum));
            return result === Infinity ? 'Zzzzz' : result;
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

function captureGroups(stringOperation) {
    pattern = /^([\d]+\.?[\d]*)((?!\.)[+-\/*])([\d]+\.?[\d]*)([+-\/*])?$/;
    return stringOperation.match(pattern);
}

function cutFloatOverflow(num) {
    const stringNum = num.toString();
    if (stringNum.length > 15 && isFloat(num)) {
        return +stringNum.slice(0, 16);
    } 
    return num;
}

function isFloat(num) {
    const roundedNum = Math.floor(num);
    return roundedNum === num ? false : true;
}

function divideDisplayInputBy100(stringNum) {
    const numPattern = /^[\d]+$/;
    if (stringNum.match(numPattern)) {
        displayInput.value =  +stringNum / 100;
    } else {
        return;
    }
}

function addDotToDisplayInput() {
    let displayValue = displayInput.value + '.';
    dotPattern = /^([\d]+\.?[\d]*)?((?!\.)[+-\/*])?([\d]+\.?[\d]*)?$/;
    if (displayValue.match(dotPattern)) {
        displayInput.value = displayValue;
    }
}

let firstNum, operator, secondNum, secondOperator;
const displayInput = document.querySelector('.display-value');
const numsOpsContainer = document.querySelector('.num-operations-container');
const changeDisplayInputEvent = new Event('input');

numsOpsContainer.addEventListener('click', (event) => {
    /* console.log(event.target.id, event.target.className); */
    const classTarget = event.target.className;
    if (classTarget === 'numbers' || classTarget === 'smiley') {

        if (displayInput.value == '0') {
            displayInput.value = '';
        }
        displayInput.value += event.target.textContent;
        displayInput.dispatchEvent(changeDisplayInputEvent);

    } else if (classTarget === 'dot') {
        /* displayInput.value += returnDotIfNotPresent(displayInput.value); */
        addDotToDisplayInput();
    } else if (classTarget === 'ops') {
        displayInput.value += event.target.value;
        displayInput.dispatchEvent(changeDisplayInputEvent);
    } else if (classTarget === 'divideBy100') {
        divideDisplayInputBy100(displayInput.value);
    } else if (classTarget === 'clear') {
        clearDisplay(event.target.id);
    } else if (classTarget === 'equal') {
        displayInput.value = operate(firstNum, operator, secondNum);
    } else {
        return;
    }
});

displayInput.addEventListener('input', () => {
    const stringOperation = displayInput.value;
    const groups = captureGroups(stringOperation)
    if (groups) {
        firstNum = groups[1];
        operator = groups[2];
        secondNum = groups[3];
        secondOperator = groups[4];
        console.log(firstNum, operator, secondNum, secondOperator, groups);
        secondOperator ? displayInput.value = 
        `${operate(firstNum, operator, secondNum)}${secondOperator}`: '';
    }
});