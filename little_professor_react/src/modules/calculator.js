import {
    showOptionsLCD, 
    isOperator, 
    finalOperador
} from '../selectors/utils';

export default (lcd, equation, result, value) => {
    let validEquation = true;
    if(equation === "") {
        if(value !== "-" && isOperator(value)) {
            validEquation = false;
        }
    }
    if(validEquation) {
        //El último valor que tenía era un operador y el valor que llegó es un un operador...
        if(isOperator(value) && isOperator(equation[equation.length - 1])) {
            validEquation = false;
        }
    }
    //Validar que no permita la división por cero...
    if(validEquation && !isOperator(value)) {
        if(+value === 0 && isOperator(equation[equation.length - 1])) {
            if(equation[equation.length - 1] === "/") {
                validEquation = false;
            }
        }
    }
    if(validEquation && value !== "=") {
        lcd = equation !== "" ? lcd + value : value;
        if(isOperator(value)) {
            equation += finalOperador(value);
        } else {
            equation += value;
        }
    }    
    //Realizar la operación...
    if(value === "=" && equation !== "") {
        try {
            result = eval(equation);
            // if(!Number.isInteger(result)) {
            //     result = result.toFixed(3);
            // }
            result = equation = lcd = result;
        } catch (e) {
            lcd = "ERROR";
            equation = "";
            result = 0;
        }
    }
    return {
        lcd, 
        equation, 
        result
    };
};