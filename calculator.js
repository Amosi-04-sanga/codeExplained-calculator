const input_element = document.querySelector(".input");
const output_operation_element = document.querySelector(".operation .value");
const output_result_element = document.querySelector(".result .value");

let calculator_buttons = [
    {
        name : "delete",
        symbol : "⌫",
        formula : false,
        type : "key"
    },{
        name : "clear",
        symbol : "C",
        formula : false,
        type : "key"
    },{
        name : "percent",
        symbol : "%",
        formula : "/100",
        type : "number"
    },{
        name : "division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    },{
        name : "7",
        symbol : 7,
        formula : 7,
        type : "number"
    },{
        name : "8",
        symbol : 8,
        formula : 8,
        type : "number"
    },{
        name : "9",
        symbol : 9,
        formula : 9,
        type : "number"
    },{
        name : "multiplication",
        symbol : "×",
        formula : "*",
        type : "operator"
    },{
        name : "4",
        symbol : 4,
        formula : 4,
        type : "number"
    },{
        name : "5",
        symbol : 5,
        formula : 5,
        type : "number"
    },{
        name : "6",
        symbol : 6,
        formula : 6,
        type : "number"
    },{
        name : "addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    },{
        name : "1",
        symbol : 1,
        formula : 1,
        type : "number"
    },{
        name : "2",
        symbol : 2,
        formula : 2,
        type : "number"
    },{
        name : "3",
        symbol : 3,
        formula : 3,
        type : "number"
    },{
        name : "subtraction",
        symbol : "–",
        formula : "-",
        type : "operator"
    },{
        name : "0",
        symbol : 0,
        formula : 0,
        type : "number"
    },{
        name : "comma",
        symbol : ".",
        formula : ".",
        type : "number"
    },{
        name : "calculate",
        symbol : "=",
        formula : "=",
        type : "calculate"
    }
];

// function to create buttons.
function createButtons() {
   // number of buttons per row and buttons added.
   const btns_per_row = 4;
   let added_btn = 0;

   calculator_buttons.forEach( function(button, index) {
       // add .row
       if(added_btn % btns_per_row === 0) {
           input_element.innerHTML += `<div class = "row"></div>`;
       }

       // add buttons.
       const row = document.querySelector(".row:last-child");
       row.innerHTML += `<button id = "${button.name}">
                            ${button.symbol}
                         </button>`;

       added_btn++;
   });
}

// calling createButtons function.
createButtons();


// add event listner to input element.
input_element.addEventListener('click', function(event) {
    const target_btn = event.target;

    // trigger function calculator for each button.
    calculator_buttons.forEach( function(button, index) {
         if(target_btn.id === button.name) calculator(button);
    });
});


// save data in an array.
let data = {
    operation: [],
    result: []
};

// calculator button.
function calculator(button) {
    if(button.type === 'operator') {
        data.operation.push(button.symbol);
        data.result.push(button.formula);
    }
    
    else if(button.type === 'number') {
        data.operation.push(button.symbol);
        data.result.push(button.formula);
    }

    else if(button.type === 'key') {
        // clear all, delete.
        if(button.name === 'clear') {
            data.operation = [];
            data.result = [];
            updateOutputResult(0);
        } else if(button.name === 'delete') {
            data.operation.pop();
            data.result.pop();
        }
    }

    else if(button.type === 'calculate') {
        const result_join = data.result.join('');

        let result;

        try {
            result = eval(result_join);
        } catch(error) {
            if(error instanceof SyntaxError) {
                result = 'SYNTAX ERROR!';
                updateOutputResult(result);
            }
        }
        // print result on the screen.
        updateOutputResult( '=' + ' ' + result);

        // clear all element in arrays, we dont need anymore.
        data.operation = [];
        data.result = [];

        // push result to arrays.
        data.result.push(result);
        data.operation.push(result);
    }

    updateOutputOperation(data.operation.join(''));
}

// update result output.
function updateOutputResult(result) {
    output_result_element.innerHTML = result;
}

// update operation output.
function updateOutputOperation(operation) {
    output_operation_element.innerHTML = operation;
}