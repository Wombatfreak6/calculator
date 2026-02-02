const display = document.getElementById("display");

const operators = ["+", "-", "*", "/"];

// Append numbers/operators safely
function appendToDisplay(input) {
    const lastChar = display.value.slice(-1);

    // Prevent two operators in a row
    if (operators.includes(input) && operators.includes(lastChar)) {
        return;
    }

    // Prevent starting with operator (except minus)
    if (display.value === "" && operators.includes(input) && input !== "-") {
        return;
    }

    // Prevent multiple dots in same number
    if (input === ".") {
        const parts = display.value.split(/[\+\-\*\/]/);
        if (parts[parts.length - 1].includes(".")) {
            return;
        }
    }

    display.value += input;
}

// Clear display
function clearDisplay() {
    display.value = "";
}

// Main calculate function
function calculate() {
    if (display.value === "") return;

    try {
        display.value = evaluateExpression(display.value);
    } catch {
        display.value = "Error";
    }
}

// Expression evaluator (supports + - * /)
function evaluateExpression(expression) {
    const numbers = expression.split(/[\+\-\*\/]/).map(Number);
    const ops = expression.replace(/[0-9\.]/g, "").split("");

    // Handle multiplication & division first
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "*" || ops[i] === "/") {
            const result =
                ops[i] === "*"
                    ? numbers[i] * numbers[i + 1]
                    : numbers[i] / numbers[i + 1];

            numbers.splice(i, 2, result);
            ops.splice(i, 1);
            i--;
        }
    }

    // Handle addition & subtraction
    let result = numbers[0];
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "+") result += numbers[i + 1];
        if (ops[i] === "-") result -= numbers[i + 1];
    }

    return result;
}
