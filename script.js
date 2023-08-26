function operate(operator, num1, num2, ...rest) {
   
    let black = {
        '+': addition,
        '-': subtraction,
        '*': multiply,
        '/': divide
    }

    if (black.hasOwnProperty(operator)) {
        return black[operator](num1, num2, ...rest)
    }
}



function addition(...rest) {
    let computed = rest.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return computed
}

function subtraction(...rest) {
    let computed = rest.reduce((accumulator, currentValue) => accumulator - currentValue)
    return computed
}

function multiply(...rest) {
    let computed = rest.reduce((accumulator, currentValue) => accumulator * currentValue, 1)
    return computed
}

function divide(...rest) {
    if (rest.includes(0)) {
        return 'Not possible to divide by 0.'
    }
    let computed = rest.reduce((accumulator, currentValue) => accumulator / currentValue)
    return computed
}

let firstValue;
let secondValue;

const calculatorUi = document.querySelector('.calculator-ui')

const display =  document.querySelector('.calc-display')
const numButtons = calculatorUi.querySelectorAll('.number')
const decimalButton = calculatorUi.querySelector('.decimal')

const numberRegex = /^[0-9]$/;
const decimalRegex = /^\.$/;

const clearButton = document.querySelector('.ac-button')

let displayValue = parseInt(display.innerHTML)



clearButton.addEventListener('click', () => {
    display.innerHTML = displayValue

    if (clearButton.innerHTML == 'C') {
        clearButton.innerHTML = 'AC'
    }
    firstA = []
})


let firstA = [];

let result = firstA ? 'its true' : 'its not true';
console.log(result)


numButtons.forEach(button => {
    button.addEventListener('click', () => {
    const numValue = parseInt(button.innerHTML)
    console.log(typeof numValue)
    
        if (numberRegex.test(button.innerHTML) || decimalRegex.test(button.innerHTML)) {
        clearButton.innerHTML = 'C'
        firstA.push(numValue)
        display.innerHTML = parseInt(firstA.join(''))
        // console.log(typeof numValue)
        }        
})
})

decimalButton.addEventListener('click', () => {
    if (!firstA.length) {
        clearButton.innerHTML = 'C'
        firstA.push(decimalButton)
    } else { firstA.push('.')}
})

