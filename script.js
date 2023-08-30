let secondValue = null;
const numberRegex = /^[0-9]$/;
const decimalRegex = /^\.$/;
let firstA = [0];
let firstB = null;
let operator;

const allButtons = document.querySelectorAll('.calc-button')
const calculatorUi = document.querySelector('.calculator-ui')
const display =  document.querySelector('.calc-display')
const numButtons = calculatorUi.querySelectorAll('.number')
const decimalButton = calculatorUi.querySelector('.decimal')
const clearButton = document.querySelector('.ac-button')
let displayValue = parseInt(display.innerHTML)
let operatorButton = document.querySelectorAll('.operator')
let equalButton = document.querySelector('.equal')
let absBtn = document.querySelector('.absolute-btn')
let pctBtn = document.querySelector('.percent-btn')



function operate(operator, ...rest) {
   
    let black = {
        '+': addition,
        '-': subtraction,
        'X': multiply,
        '/': divide
    }

    if (black.hasOwnProperty(operator)) {
        return black[operator](...rest)
    }
}

// function addition(...rest) {
//     let computed = rest.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
//     return computed
// }

// function subtraction(...rest) {
//     let initial = rest[0];
//     let computed = rest.slice(1).reduce((accumulator, currentValue) => accumulator - currentValue, initial);
//     return computed;
// }

// function multiply(...rest) {
//     let computed = rest.reduce((accumulator, currentValue) => accumulator * currentValue, 1)
//     return computed
// }
// function divide(...rest) {
//     if (rest.length == 0 || rest.some(value => value === 0 || value === null)) {
//         return 'Error'
//     } else {
//         let computed = rest.reduce((accumulator, currentValue) => accumulator / currentValue)
//         return computed
//     }
    
// }

function addition(...rest) {
    let decimalRest = rest.map(value => new Decimal(value));
    let computed = decimalRest.reduce((accumulator, currentValue) => accumulator.plus(currentValue), new Decimal(0));
    return computed;
}

function subtraction(...rest) {
    let initial = new Decimal(rest[0]);
    let decimalRest = rest.map(value => new Decimal(value))
    let computed = decimalRest.slice(1).reduce((accumulator, currentValue) => accumulator.minus(currentValue), initial);
    return computed;
}

function multiply(...rest) {
    let decimalRest = rest.map(value => new Decimal(value))
    let computed = decimalRest.reduce((accumulator, currentValue) => accumulator.times(currentValue), new Decimal(1))
    return computed
}

function divide(...rest) {
    if (rest.length == 0 || rest.some(value => value === 0 || value === null)) {
        return 'Error'
    } else {
        let decimalRest = rest.map(value => new Decimal(value))
        let computed = decimalRest.reduce((accumulator, currentValue) => accumulator.dividedBy(currentValue))
        return computed
    }
}

let result = null;
equalButton.addEventListener('click', () => {
    if (operator && result) {
        // Perform repeat calculation and update the result variable
        if (firstA.length !== 0) {
            secondValue = parseFloat(firstA.join(''))
            result = operate(operator, result, secondValue);
            display.innerHTML = result.toNumber().toLocaleString()
            firstA = []
        } else {
            result = operate(operator, result, secondValue);
            display.innerHTML = result.toNumber().toLocaleString()
            firstA = []
        }
        
    } else {
        secondValue = parseFloat(firstA.join(''));
        result = operate(operator, firstB, secondValue);
        display.innerHTML = result.toNumber().toLocaleString()

        
        // let newResult = (Math.round(result * 100000) / 10000).toLocaleString()
        // if (result.length > 9) {
        //     return display.innerHTML = newResult.toExponential();
        // } else { return display.innerHTML = result}
        
        firstA = [];
    }
});

absBtn.addEventListener('click', () => {
    if (!firstA.length) {
        firstA.push('-')
        firstA.push('0')
        display.innerHTML = firstA.join('')
    } else if (firstA[0] !== '-'){
        firstA.unshift('-')
        display.innerHTML = firstA.join('')
    } else {
        firstA.shift()
        display.innerHTML = firstA.join('')
    }
})

pctBtn.addEventListener('click', () => {
    if (firstA.length > 0) {
        let currentValue = parseFloat(firstA.join(''));
        currentValue /= 100;
        firstA = Array.from(currentValue.toString());
        display.innerHTML = firstA.join('');
    } else { return }
});

operatorButton.forEach(button => {
    button.addEventListener('click', function (event) {

        operatorButton.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");

        operator = button.innerHTML;
        if (result !== null && secondValue !== null && firstA.length !== 0) {
            secondValue = parseFloat(firstA.join(''))
            result = operate(operator, result, secondValue)
            display.innerHTML = result.toLocaleString()
            firstA = []
        } else if (operator && firstB !== null && firstA.length !== 0) {
            // Perform previous calculation and assign result to firstB
            secondValue = parseFloat(firstA.join(''))
            result = operate(operator, firstB, secondValue);
            display.innerHTML = result.toLocaleString();
            firstA = [];
        } else if (firstA.length !== 0) {
            // This will perform the first calculation and store it in firstB
            firstB = parseFloat(firstA.join(''));
            firstA = [];
        } else {return}
        
    });
});

clearButton.addEventListener('click', () => {
    display.innerHTML = displayValue

    if (clearButton.innerHTML == 'C') {
        clearButton.innerHTML = 'AC';
        firstA = [0];
    } else if (clearButton.innerHTML == 'AC'){
        result = null;
        firstB = null;
        firstA = [0];
        operator = '';
        secondValueValue = null;
        operatorButton.forEach(btn => btn.classList.remove('active'))
    }
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
            display.innerHTML = parseFloat(firstA.join('')).toFixed(firstA.slice(firstA.indexOf('.') + 1).length).toLocaleString();
            } else {
                firstA.push(testB)
                display.innerHTML = parseInt(firstA.join('')).toLocaleString()
            }
        } else {return}

        if (firstA[0] == 0) {
            firstA.shift()
        }
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
        } else {return}
    }
})


allButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        if (!button.classList.contains('operator') && !button.classList.contains('percent-btn') && !button.classList.contains('absolute-btn') && !button.classList.contains('ac-button')){
            operatorButton.forEach(btn => btn.classList.remove('active'))
        }
    })
})