import {
    generateRandomInteger, 
    finalOperador, 
    divisorsNumber, 
    getNumber, 
    isOperator
} from '../selectors/utils';

const operators = ["+", "-", "*", "/"];
const levels = [{
    max : 1, 
    both : true, 
    negative : false
}, {
    max : 2, 
    both : false, 
    negative : false
}, {
    max : 2, 
    both : false, 
    negative : true
}, {
    max : 2, 
    both : true, 
    negative : true
}, {
    max : 3, 
    both : false, 
    negative : true
}];

export const createGame = (level, operation) => {
    const operator = operation !== "MIX" ? (
        finalOperador(operation)
    ) : (
        operators[
            generateRandomInteger(
                0, operators.length - 1
            )
        ]
    );
    const showOperator = operator === "/" ? "%" : 
                         operator === "*" ? "X" : operator;
    //Ambos no tendrán la misma cantidad...
    let isMaxNumber = [
        levels[level - 1].max, 
        levels[level - 1].max
    ];
    if(!levels[level - 1].both) {
        isMaxNumber[+(!!generateRandomInteger(0, 1))] -= 1;
    }
    const firstNumber = getNumber(isMaxNumber[0], levels[level - 1].negative);
    let secondNumber = 0;
    if(operator !== "/") {
        secondNumber = getNumber(isMaxNumber[1], levels[level - 1].negative);
        if(secondNumber < 0 && operator === "-") {
            secondNumber = Math.abs(secondNumber);
        }
    } else {
        const divisors = divisorsNumber(Math.abs(firstNumber));
        secondNumber = divisors[generateRandomInteger(0, divisors.length - 1)];
    }
    const result = eval(`${firstNumber}${operator}${secondNumber}`);
    const lcd = `${firstNumber}${showOperator}${secondNumber}=`;
    return {
        lcd, 
        result
    }
};

//Para validar que la respuesta que está dando el usaurio es válida...
export const validateGame = (result, lcd, value) => {
    //Saber si lo que ha llegado es un valor válido...
    let validValue = false;
    let isCorrect = false;
    let partiallyCorrect = false;
    if(value === "-" || (+value >= 0 && +value <= 9)) {
        const valueCompare = `${lcd.split("=")[1]}${value}`;
        const resultString = String(result);
        if(valueCompare.length !== resultString.length) {
            partiallyCorrect = valueCompare.substr(0, valueCompare.length) === resultString.substr(0, valueCompare.length);
        } else {
            if(valueCompare === resultString) {
                isCorrect = true;
            }
        }
        validValue = true;
    }
    return {
        validValue, 
        isCorrect, 
        partiallyCorrect
    };
};