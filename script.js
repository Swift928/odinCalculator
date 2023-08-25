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

console.log(operate('/' , 100, 5))

// console.log(operate())

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
