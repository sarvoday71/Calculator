let operand = "", previousOperand="", currentOperand, operation="",  previousOperation = "";

function displayPrev(operand)
{
    let element = document.getElementsByClassName("previous-operand");
    element[0].innerHTML = operand; 
}

function displayCurr(operand)
{
    let element = document.getElementsByClassName("current-operand");
    element[0].innerHTML = operand; 
}

let number = document.querySelectorAll('[data-number]');

for(let i=0;i<number.length;i++)
{
    number[i].addEventListener("click", function() {
        let temp = number[i].innerText;
        if(temp === '.' && operand.includes('.'))
        {

        }
        else
        {
            operand = operand + temp;
            displayCurr(operand);
        }
        
    } );
}

let Ac = document.querySelector('[data-all-clear]');

Ac.addEventListener('click' , function(){
    operand = "";
    previousOperand = "";
    displayCurr(operand);
    displayPrev(previousOperand);
});

let Del = document.querySelector('[data-delete]');

Del.addEventListener("click", function(){
    operand = operand.slice(0,-1);
    displayCurr(operand);
});

let oper = document.querySelectorAll('[data-operation]');

function execute(previousOperand,operand,operation) {
    let num1 = parseFloat(previousOperand);
    let num2 = parseFloat(operand);
    let ans;
    if(operation === '+'){
        ans = num1 + num2;
    }
    else if(operation === '-'){
        ans = num1 - num2;
    }
    else if(operation === '*'){
        ans = num1 * num2;
    }
    else{
        ans = num1/num2;
    }
    ans = ans.toString();
    return ans;
}
for(let i = 0;i<oper.length;i++){
    oper[i].addEventListener('click', function() {
        operation = oper[i].innerText;
        if(previousOperand.length > 0 && operand.length>0){
            let result;
            if(previousOperation.length > 0){
                result = execute(previousOperand, operand, previousOperation);
            }
            else{
                result = execute(previousOperand, operand, operation);
            }
            previousOperation = operation;
            previousOperand = result;
            result = result + oper[i].innerText;
            displayPrev(result);
            operand = "";
            displayCurr(operand);
        }
        else if(operand.length>0 && previousOperand.length === 0){
            previousOperand = operand;
            operand = "";
            let temp = previousOperand + oper[i].innerText;
            previousOperation = oper[i].innerText;
            displayPrev(temp);
            displayCurr(operand);
        }
        else if(operand.length===0 && previousOperand.length > 0){
            let temp = previousOperand + oper[i].innerText;
            displayPrev(temp);
            previousOperation = oper[i].innerText;
        }
    });
}

let equal = document.querySelector('[data-equals]');

equal.addEventListener('click', function () {
    if(previousOperand.length > 0 && operand.length >0){
        operand = execute(previousOperand,operand,previousOperation);
        previousOperand = "";
        displayPrev(previousOperand);
        displayCurr(operand);
    }
    
    
})


