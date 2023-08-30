let secondValue = null;
const numberRegex = /^[0-9]$/;
const decimalRegex = /^\.$/;
let firstA = [0];
let firstB = null;
let clickedOperator;

const allButtons = document.querySelectorAll('.calc-button')
const calculatorUi = document.querySelector('.calculator-ui')
const display =  document.querySelector('.calc-display')
const numberButtons = calculatorUi.querySelectorAll('.number')
const decimalButton = calculatorUi.querySelector('.decimal')
const clearButton = document.querySelector('.ac-button')
let displayValue = parseInt(display.innerHTML)
let operatorButton = document.querySelectorAll('.operator')
let equalButton = document.querySelector('.equal')
let absBtn = document.querySelector('.absolute-btn')
let pctBtn = document.querySelector('.percent-btn')



function operate(clickedOperator, ...rest) {
   
    let black = {
        '+': addition,
        '-': subtraction,
        'X': multiply,
        '/': divide
    }

    if (black.hasOwnProperty(clickedOperator)) {
        return black[clickedOperator](...rest)
    }
}

function addition(...rest) {
    let decimalRest = rest.map(value => new Decimal(value));
    let computed = decimalRest.reduce((accumulator, currentValue) => accumulator.plus(currentValue), new Decimal(0));
    return Math.abs(computed.toNumber()) >= 1e9 ? computed.toExponential(2) : computed.toNumber();
}

function subtraction(...rest) {
    let initial = new Decimal(rest[0]);
    let decimalRest = rest.map(value => new Decimal(value))
    let computed = decimalRest.slice(1).reduce((accumulator, currentValue) => accumulator.minus(currentValue), initial);
    return Math.abs(computed.toNumber()) >= 1e9 ? computed.toExponential(2) : computed.toNumber();
}

function multiply(...rest) {
    let decimalRest = rest.map(value => new Decimal(value))
    let computed = decimalRest.reduce((accumulator, currentValue) => accumulator.times(currentValue), new Decimal(1))
    return  Math.abs(computed.toNumber()) >= 1e9 ? computed.toExponential(2) : computed.toNumber()
}

function divide(...rest) {
    if (rest.length == 0 || rest.some(value => value === 0 || value === null)) {
        return 'Error'
    } else {
        let decimalRest = rest.map(value => new Decimal(value))
        let computed = decimalRest.reduce((accumulator, currentValue) => accumulator.dividedBy(currentValue))
        return Math.abs(computed.toNumber()) >= 1e9 ? computed.toExponential(2) : computed.toNumber();
    }
}





let result = null;


document.addEventListener('keydown', function(event) {
    event.preventDefault()

    if (event.key === 'Enter') {        
        calculate();
    } else if (/^[0-9]/.test(event.key)) {
        numbers(event.key)
    } else if (event.key === '.') {
        addDecimal()
    } else if (event.shiftKey && /[+X]/.test(event.key)) {
        operations(event.key)
    } else if (event.key === '/') {
        operations('/')
    } else if (event.key === '-') {
        operations('-')
    }
})

numberButtons.forEach(button => {
    button.addEventListener('click', () => numbers(button) )})

equalButton.addEventListener('click', calculate);

decimalButton.addEventListener('click', addDecimal)

operatorButton.forEach(button => {
    button.addEventListener('click', () => operations(button));
});

// document.addEventListener('keydown', function(event) {
//     console.log('Key pressed:', event.key);
//   });

function calculate() {
    if (clickedOperator && result) {
        // Perform repeat calculation and update the result variable
        if (firstA.length !== 0) {
            secondValue = parseFloat(firstA.join(''))
            result = operate(clickedOperator, result, secondValue);
            display.innerHTML = result.toLocaleString()
            firstA = []
        } else {
            result = operate(clickedOperator, result, secondValue);
            display.innerHTML = result.toLocaleString()
            firstA = []
        }
        
    } else {
        secondValue = parseFloat(firstA.join(''));
        result = operate(clickedOperator, firstB, secondValue);
        display.innerHTML = result.toLocaleString()
        
        firstA = [];
    }
};

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


function operations(input) {
        // let clickedOperator;

        if (typeof input === 'string') {
            clickedOperator = input
        } else if (typeof input === 'object' && input instanceof Element) {
            clickedOperator = input.innerHTML
        }

        // operatorButton.forEach(btn => btn.classList.remove("active"));
        // this.classList.add("active");

        if (result !== null && secondValue !== null && firstA.length !== 0) {
            secondValue = parseFloat(firstA.join(''))
            result = operate(clickedOperator, result, secondValue)
            display.innerHTML = result.toLocaleString()
            firstA = []
        } else if (clickedOperator && firstB !== null && firstA.length !== 0) {
            // Perform previous calculation and assign result to firstB
            secondValue = parseFloat(firstA.join(''))
            result = operate(clickedOperator, firstB, secondValue);
            display.innerHTML = result.toLocaleString();
            firstA = [];
        } else if (firstA.length !== 0) {
            // This will perform the first calculation and store it in firstB
            firstB = parseFloat(firstA.join(''));
            firstA = [];
        } else {return}
    }
    


clearButton.addEventListener('click', () => {
    display.innerHTML = displayValue

    if (clearButton.innerHTML == 'C') {
        clearButton.innerHTML = 'AC';
        firstA = [0];
    } else if (clearButton.innerHTML == 'AC'){
        result = null;
        firstB = null;
        firstA = [0];
        clickedOperator = '';
        secondValueValue = null;
        operatorButton.forEach(btn => btn.classList.remove('active'))
    }
})



function numbers(input) {
        if (firstA.length <= 9 && firstA.includes('.') || firstA.length < 9) {
            let testB;

            if (typeof input === 'string') {
                testB = input
            } else if (typeof input === 'object' && input instanceof Element) {
                testB = input.innerHTML
            } else {return}

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
};


function addDecimal() {
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
}


allButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        if (!button.classList.contains('operator') && !button.classList.contains('percent-btn') && !button.classList.contains('absolute-btn') && !button.classList.contains('ac-button')){
            operatorButton.forEach(btn => btn.classList.remove('active'))
        }
    })
})