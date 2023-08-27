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

let calcButtons = calculatorUi.querySelectorAll('.calc-button')

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


numButtons.forEach(button => {
    button.addEventListener('click', () => {
    // const numValue = parseInt(button.innerHTML)
    // console.log(typeof numValue)
    let testB = button.innerHTML;
    
        if (numberRegex.test(testB)) {
        clearButton.innerHTML = 'C'
        }

        if (firstA.includes('.')) {
        firstA.push(testB)
        display.innerHTML = parseFloat(firstA.join('')).toFixed(firstA.slice(firstA.indexOf('.') + 1).length);
        } else {
            firstA.push(testB)
            display.innerHTML = parseInt(firstA.join(''))
        }
})
})

decimalButton.addEventListener('click', () => {

    if (!firstA.length) {
        clearButton.innerHTML = 'C'
        firstA.push('0')
        firstA.push('.')
        display.innerHTML = firstA.join('')
    } else if (firstA.length > 1 && !firstA.includes('.')) { 
        firstA.push('.')
        display.innerHTML = parseFloat(firstA.join('')).toFixed(1)
        console.log(display.innerHTML)
    } else {return}
})
