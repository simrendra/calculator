var calc = (function() {

    var inputNumber, oldSum, currentOperation,
        operationsMap = {
            43: addition,
            45: substraction,
            42: multiplication,
            47: division
        };

    function init() {
        document.onreadystatechange = function() {
            if(document.readyState === 'complete') {
                inputNumber  = document.getElementById('result');
                inputNumber.value = 0;
                oldSum = 0;

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
        if(currentOperation) {
            let input = parseNumber(inputNumber.value);
            oldSum = parseNumber(oldSum);
            oldSum = currentOperation.call(null, oldSum, input);
            inputNumber.value = oldSum;
            currentOperation = null;
        }
    }

    function appendNumber(num) {
        let oldNum = inputNumber.value;  
        inputNumber.value =  oldNum == 0 ? num : oldNum + num;
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
                oldSum = inputNumber.value;
                inputNumber.value = 0;
            break;
        }

    }

    return {
        init: init,
        clearText: function clearText() { inputNumber.value = oldSum = 0; }
    }
})();