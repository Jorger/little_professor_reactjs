//Para mostrar los valores en el LCD cuando se hace una configuración...
export const showOptionsLCD = (
    mode, 
    options
) => mode === "calculator" ? (
    "CALC"
) : (
    `L${options.level}  ${options.operation !== "MIX" ? "OP " : ""} ${options.operation}`
);

export const isOperator = value => value === "+" || value === "-" || value === "%" || value === "X" || value === "*" || value === "/";
export const finalOperador = value => value === "%" ? "/" : value === "X" ? "*" : value;
export const generateRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
export const getNumber = (max, negative) => generateRandomInteger(1, Math.pow(10, max) - 1) * (negative ? (!!generateRandomInteger(0, 1) ? -1 : 1): 1);
export const divisorsNumber = (number) => {
    const divisors = [];
    for(let i = 1; i <= number; i++) {
        if(number % i === 0) {
            divisors.push(i);
        }
    }
    return divisors;
};