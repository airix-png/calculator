//Globals 

let btnDigits = Array.from(document.querySelectorAll ('.number'));
let btnOperator = Array.from(document.querySelectorAll('.operator'));
let equal = document.querySelector ('.equal')
let screen = document.querySelector ('#screen')
let screen2 = document.querySelector ('#screen2')
let screen3 = document.querySelector ('#screen3')


let input1 = ""
let input2 = ""
let input3 = ""
let operation1 = ""
let operation2 = ""



//MASTER OPERATOR

btnDigits.map(btn => {
    btn.addEventListener('click', e => {
        buttonPressed(e.target);
        screen3.textContent = "";

        if (screen.textContent === 'NaN') {
            clear()
        }
        if (screen.textContent[0] === '0' && screen.textContent[1] !=='.') {
            screen.textContent =  e.target.value;
        }
            else {
                screen.textContent += e.target.value; 
            }
        }
        )})

btnOperator.map(btn => {
    btn.addEventListener('click', e => {
        buttonPressed(e.target);
        if (operation1 === "÷" || operation2 === "÷")
            if(screen.textContent === "0" || screen.textContent === "0.") {
                clear();
                screen.textContent = "Error: Can't divide by 0!";
                return;
            }

            if (screen.textContent === "Error: Can't divide by 0!") {
                clear();
                return;
            }    
    
        if (screen2.textContent === ""){                //Step 1: if screen2 is empty then take screen1 and make it = to input1
            if (screen.textContent === "") {return;}
            input1 = Number(screen.textContent);
            operation1 = e.target.value;                //Step 2: Set operation to what was clicked  
            screen.textContent = "";                    //Step 3: Clear screen for next input and move content to screen2
            screen2.textContent = input1 + operation1;
            return;
        }

        if (!operation2) {
            if (operation1 === "×" || operation1 === "÷" || operation1 === "+" || operation1 === "-"){
                input2 = Number(screen.textContent);             //Step 4: take what is on screen and store as input2
                input1 = operate(input1, input2, operation1);    //Step 5: calculate and return saved as input1
                input2 = "";
                operation1 = e.target.value;                     //Step 6: clear input2 and reset operation1 to what was clicked 
                screen.textContent = "";
                screen2.textContent = input1 + operation1;       //Step 7: clear screen1 and replace screen2 with new input1 value and new operation
            }
            return;
        }

        if (screen.textContent === "") {
            if (input2 != ""){                           //Step 8: The second time we hit an operation button set operation2 to value
                operation2 = e.target.value;
                if (operation2 === "+" || operation2 === "-" || operation2 === "×" || operation2 === "÷" ){
                    input1 = operate(input1, input2, operation1);  //Step 9: calculate what was already in input 1 and 2 and make it equal to input1
                    operation1 = operation2;             //Step 10: Set operation1 to what was clicked and reset operation2 and input2 
                    operation2 = "";
                    input2 = "";
                    screen2.textContent = input1 + operation1}
                }
            else {
                if (input1) {   
                    operation1 = e.target.value; 
                    screen2.textContent = input1 + operation2; 
                }
            return;
            }    }
})})

equal.addEventListener ('click', e => {
    buttonPressed(e.target); 
    if (operation1 === "÷" && Number(screen.textContent) === 0 || operation2 === "÷" && Number(screen.textContent) === 0){
        if (screen.textContent !== ""){
            clear();
            screen.textContent = "Error: Undefined, cannot divide by 0!";
        return;
    }}
    if (screen.textContent != ""){
        if (operation2){
        input2 = operate(input2, Number(screen.textContent), operation2);
        input1 = operate (input1, input2, operation1)
        input2 = "";}
        else {
            if (!operation1) {return;}
            input1 = operate(input1, Number(screen.textContent), operation1);
        }}
    else {
        if (input2) {
            input1 = operate(input1, input2, operation1)
            input2 = "";
        }
    }
    screen3.textContent = roundNumber(input1); 
    screen.textContent = "";
    screen2.textContent = "";
    operation1 = ""
    operation2 = ""
})

//CALC FUNCTIONS

function operate(x, y, operator) {
    switch(operator){
        case "+": return roundNumber(add(x,y))
        case "-": return roundNumber(subtract(x,y))
        case "×": return roundNumber(multiply(x,y))
        case "÷": return roundNumber(divide(x,y))
    }
}

function add(x, y){return x + y}
function subtract(x, y){return x - y }
function multiply(x, y){return x * y }
function divide(x, y){return x / y }
function roundNumber(number){
    if (String(number).includes('.') && String(number).replace(/\d*./, '').length > 9){
        return Math.round(number*100000000)/100000000;
      }
      return number;
    }

function buttonPressed(btn) {
    btn.classList.add('clicked');
    setTimeout(() => {btn.classList.remove('clicked')}, 100);
}

function clear(){
    screen.textContent = "";
    screen2.textContent = "";
    screen3.textContent = "";
    input1 = "";
    input2 = "";
    input3 = "";
    operation1 = "";
    operation2 = "";    
}

//MISC BUTTONS

let clearAll = document.querySelector (".clear");
    clearAll.addEventListener('click', e => {
        buttonPressed (e.target);
        clear();
    })

let back = document.querySelector ('.back');
    back.addEventListener('click', e => {
        buttonPressed(e.target); 
        screen3.textContent = "";
        if (screen.textContent === "NaN") {return}
        screen.textContent = screen.textContent.slice(0, -1);
    })

let decimal = document.querySelector ('.decimal');
    decimal.addEventListener('click', e => {
        buttonPressed(e.target); 
        screen3.textContent = "";
        if (screen.textContent === "" || screen.textContent.includes(".")) {return}
        screen.textContent += "."
        
    })


let percent = document.querySelector ('.percent');
    percent.addEventListener('click', e => {
        buttonPressed(e.target); 
        screen3.textContent = "";
        screen.textContent = parseFloat(screen.textContent) * .01; 
    })

let negative = document.querySelector ('.negative');
    negative.addEventListener('click', e => {
        buttonPressed(e.target); 
        screen3.textContent = "";
        screen.textContent = parseFloat(screen.textContent) * -1; 
    })

document.addEventListener('keydown', e => {
    if (e.key >= 0 && e.key <= 9){
          document.getElementById(e.key).click();
        }
    switch (e.key) {
        case '.':
            document.getElementById('dot').click();
            break;
        case '+':
            document.getElementById('+').click();
            break;
        case '-':
            document.getElementById('-').click();
            break;
        case '*':
            document.getElementById('×').click();
            break;
        case '/':
            document.getElementById('÷').click();
            break;
        case '=':
        case 'Enter':
            document.getElementById('equal').click();
            break;
        case 'Backspace':
            document.getElementById('backspace').click();
            break;
        case 'c':
            document.getElementById('clear').click();
            break;
        case '%':
            document.getElementById('percentage').click();
            break;
        }
      })
      