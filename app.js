var calc = (function() {

    var inputNumber, oldSum, currentOperation,
        operationsMap = {
            43: addition,
            45: substraction,
            42: multiplication,
            47: division
        },
        total = 0,
        operand = null;

    function init() {
        document.onreadystatechange = function() {
            if(document.readyState === 'complete') {
                inputNumber  = document.getElementById('result');
                inputNumber.value = total;

                document.querySelectorAll('button').forEach(function(b) {
                    b.addEventListener('click', handleButtonClickEvent);
                });
                
                document.addEventListener('keyup', handleKeyPressEvent);
            }
        }
    }

    function handleButtonClickEvent(e) {
        let ch = e.target.innerText,
            code = ch.charCodeAt(0);
            processInput(ch, code);
    }

    function handleKeyPressEvent(e) {
       processInput(e.key, e.key.charCodeAt(0));
    }

    function performOperation() {
        if(total !== null && operand !== null) {
            total = parseNumber(total);
            operand = parseNumber(operand);
            total = currentOperation.call(null, total, operand);
            inputNumber.value = total;
            operand = null;
        }
    }

    function appendNumber(num) {
        if(parseInt(operand)) {
            inputNumber.value = inputNumber.value.concat(num);
        } else {
            inputNumber.value = num;
        }
        operand = inputNumber.value;
    }

    function isInputDecimal() {
        return inputNumber.value.indexOf('.') > -1;
    }

    function addition(a, b) {
        return a + b;
    }

    function substraction(a, b) {
        return a - b;
    }

    function multiplication(a, b) {
        return a * b;
    }

    function division(a, b) {
        return a / b;
    }

    function parseNumber(num) {
        return Number.isInteger(num) ? parseInt(num) : parseFloat(num);
    }

    function processInput(ch, code) {
        switch(true) {
            case code > 47 && code < 58:
                //input is a number
                appendNumber(ch);
            break;
            case code === 46:
                // decimal point is inserted
                isInputDecimal() ? '' : appendNumber('.');
            break;
            case code === 61 || code === 69:
                performOperation();
            break;
            case [42,43,45,47].indexOf(code) > -1:
                currentOperation = operationsMap[code];
                total = inputNumber.value;
                
            break;
        }

    }

    return {
        init: init,
        clearText: function clearText() { 
            total = 0;
            operand = null;
            currentOperation = null;
            inputNumber.value = total
        }
    }
})();