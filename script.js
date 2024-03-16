const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.querySelector("#clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

const calculate = {
    "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
    "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
    "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
    "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
    "=": (firstNumber, secondNumber) => secondNumber,
};

//Calculate first and second values depending on operator
const sendNumberValue = (number) => {
    //Replace current value if await next value
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        //if current display value is 0, replace it, if not add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent =
            displayValue === "0" ? number : displayValue + number;
    }
};

const addDecimal = () => {
    //If operator pressed, don't add decimal
    if (awaitingNextValue) return;
    if (!calculatorDisplay.textContent.includes(".")) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
};

const useOperator = (operator) => {
    const currentValue = Number(calculatorDisplay.textContent);
    //Prevent multipleoperator
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    //Assing first value if no value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    awaitingNextValue = true;
    operatorValue = operator;
};

//Reset display
const resetAll = () => {
    firstValue = 0;
    operatorValue = "";
    awaitingNextValue = false;
    calculatorDisplay.textContent = "0";
};

//Add Event Listeners for buttons

inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener("click", () =>
            sendNumberValue(inputBtn.value)
        );
    } else if (inputBtn.classList.contains("operator")) {
        inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains("decimal")) {
        inputBtn.addEventListener("click", () => addDecimal());
    }
});

clearBtn.addEventListener("click", resetAll);
