document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('result');
    const keys = document.querySelectorAll('.calculator .keys button');

    let displayValue = '0';
    let firstValue = null;
    let operator = null;
    let waitingForSecondValue = false;

    function updateDisplay() {
        display.value = displayValue;
    }

    function handleKeyPress(e) {
        const { target } = e;

        if (!target.matches('button')) {
            return;
        }

        if (target.id === 'clear') {
            displayValue = '0';
            firstValue = null;
            operator = null;
            waitingForSecondValue = false;
            updateDisplay();
            return;
        }

        if (target.id === 'backspace') {
            displayValue = displayValue.slice(0, -1) || '0';
            updateDisplay();
            return;
        }

        if (target.id === 'decimal') {
            if (!displayValue.includes('.')) {
                displayValue += '.';
            }
            updateDisplay();
            return;
        }

        if (['+', '-', '×', '÷'].includes(target.textContent)) {
            if (firstValue === null) {
                firstValue = parseFloat(displayValue);
            } else if (operator) {
                const result = calculate(firstValue, displayValue, operator);
                displayValue = String(result);
                firstValue = result;
            }
            operator = target.textContent;
            waitingForSecondValue = true;
            updateDisplay();
            return;
        }

        if (target.id === 'equal') {
            if (firstValue !== null && operator) {
                const result = calculate(firstValue, displayValue, operator);
                displayValue = String(result);
                firstValue = null;
                operator = null;
                waitingForSecondValue = false;
                updateDisplay();
                return;
            }
        }

        if (target.textContent === '00') {
            displayValue += '00';
            updateDisplay();
            return;
        }

        if (target.textContent >= '0' && target.textContent <= '9') {
            if (waitingForSecondValue) {
                displayValue = target.textContent;
                waitingForSecondValue = false;
            } else {
                displayValue = displayValue === '0' ? target.textContent : displayValue + target.textContent;
            }
            updateDisplay();
            return;
        }
    }

    function calculate(first, second, operator) {
        first = parseFloat(first);
        second = parseFloat(second);

        switch (operator) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case '×':
                return first * second;
            case '÷':
                return first / second;
            default:
                return second;
        }
    }

    keys.forEach(key => key.addEventListener('click', handleKeyPress));

    document.addEventListener('keydown', function (e) {
        if (e.key >= '0' && e.key <= '9') {
            if (waitingForSecondValue) {
                displayValue = e.key;
                waitingForSecondValue = false;
            } else {
                displayValue = displayValue === '0' ? e.key : displayValue + e.key;
            }
            updateDisplay();
        } else if (e.key === '.') {
            if (!displayValue.includes('.')) {
                displayValue += '.';
            }
            updateDisplay();
        } else {
            alert("Only numbers are allowed");
        }
    });
});
