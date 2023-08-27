let firstValue;
let secondValue;
const numberRegex = /^[0-9]$/;
const decimalRegex = /^\.$/;
let firstA = [];
let firstB = [];
let operator;




const calculatorUi = document.querySelector('.calculator-ui')
const display =  document.querySelector('.calc-display')
const numButtons = calculatorUi.querySelectorAll('.number')
const decimalButton = calculatorUi.querySelector('.decimal')
const clearButton = document.querySelector('.ac-button')
let displayValue = parseInt(display.innerHTML)
let operatorButton = document.querySelectorAll('.operator')
let equalButton = document.querySelector('.equal')



function operate(operator, num1, num2, ...rest) {
   
    let black = {
        '+': addition,
        '-': subtraction,
        'X': multiply,
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
        return 'Error'
    }
    let computed = rest.reduce((accumulator, currentValue) => accumulator / currentValue)
    return computed
}

equalButton.addEventListener('click', () => {
    
    equalButton.addEventListener('click', () => {
        // Convert the arrays to strings and join them
        let valueA = firstA.join('');
        let valueB = firstB.join('');
    
        // Convert the string values to numbers
        let numberA = parseFloat(valueA);
        let numberB = parseFloat(valueB);
    
        // Perform the calculation using the 'operate' function
        let result = operate(operator, numberB, numberA);
    
        // Update the display with the result
        display.innerHTML = result;
    });
    
})

operatorButton.forEach(button => {
    button.addEventListener('click', () => {
        operator = button.innerHTML
        console.log(typeof button.innerHTML)
        console.log(button)
        let tmp = firstA;
        firstB = tmp;
        firstA = [];
    })
})

clearButton.addEventListener('click', () => {
    display.innerHTML = displayValue

    if (clearButton.innerHTML == 'C') {
        clearButton.innerHTML = 'AC'
    }
    firstA = []
    operator = ''

})

numButtons.forEach(button => {
    button.addEventListener('click', () => {

        if (firstA.length <= 9 && firstA.includes('.') || firstA.length < 9) {
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
        } else {return}

        // if (firstA.length >= 3 && firstA.length % 3 === 0 && !firstA.includes(',')) {
        //     firstA.unshift(',');
        //     console.log(firstA)
        //     // display.innerHTML = firstA.join('')
        // }
})
})


decimalButton.addEventListener('click', () => {
    if (firstA.length < 9) {
        if (!firstA.length) {
            clearButton.innerHTML = 'C'
            firstA.push('0')
            firstA.push('.')
            display.innerHTML = firstA.join('')
        } else if (firstA.length > 0 && !firstA.includes('.')) { 
            firstA.push('.')
            display.innerHTML = firstA.join('')
            console.log(display.innerHTML)
        } else {return}
    }
})