var calc = (function() {

    var inputNumber, oldSum, currentOperation;

    function init() {
        document.onreadystatechange = function() {
            if(document.readyState === 'complete') {
                inputNumber  = document.getElementById('result');
                inputNumber.value = 0;
                oldSum = 0;

                document.querySelectorAll('button').forEach(function(b) {
                    b.addEventListener('click', handleButtonClickEvent);
                });
            }
        }
    }

    function handleButtonClickEvent(e) {
        let ch = e.target.innerText,
            code = ch.charCodeAt(0);
        
        switch(true) {
            case code > 47 && code < 58:
                //input is a number
                appendNumber(ch);
            break;
            case code === 46:
                // decimal point is inserted
                isInputDecimal() ? '' : appendNumber('.');
            break;
            
        }
    }
    function performOperation() {
        if(currentOperation) {
            currentOperation.call(null, oldSum, inputNumber.value);
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

    function addition(a, b) {
        return a - b;
    }

    function multiplication(a, b) {
        return a * b;
    }

    function multiplication(a, b) {
        return a / b;
    }

    return {
        init: init
    }
})();