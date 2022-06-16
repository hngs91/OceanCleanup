// arrays to be used for functions to specify what values and tips should be displayed following user interaction
let inputIdArray = ['in_bottles', 'in_bags', 'in_wrapping', 'in_yogurt', 'in_takeout', 'in_cups', 'in_packaging', 'in_detergent', 'in_shampoo', 'in_toothbrushes', 'in_toothpaste']
let tipIdArray = ['tip_bottles', 'tip_bags', 'tip_wrapping', 'tip_yogurt', 'tip_takeout', 'tip_cups', 'tip_packaging', 'tip_detergent', 'tip_shampoo', 'tip_toothbrushes', 'tip_toothpaste']

/********************** Event Listeners ***********************************/
// event listener that ensures all the code contained loads after the HTML loads
document.addEventListener('DOMContentLoaded', e => {

    // resets all the tips and values when the page is loaded/refreshed
    resetValues();
    resetTips();

    // creates a click event on the reset button that allows the user to reset all values and tips
    let resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', e => {
        resetValues();
        resetTips()
    })

    // creates change event for all inputs with type=number automatically amending the estimated plastic footprint and offering the most relevant tip to users
    let input = document.querySelectorAll("input[type=number]");
    for (let i = 0; i < input.length; i++) {
        input[i].addEventListener('change', e => {
            total_values()
            resetTips()
            getTip()
        })
    }

    // ensures that when users select a household size the estimated plastic footprint updates
    let household = document.querySelectorAll('select')
    household.forEach(e => {
        e.addEventListener('click', e => {
            total_values()
        })
    })
});

/********************** functions *************************************/
// calculates the total amount of plastic waste in kg / year
function total_values() {
    let total_value = 0

    // multiples the items number of items the user inputs by the data-weight value of the item
    for (let i = 0; i < inputIdArray.length; i++) {
        total_value += document.getElementById(inputIdArray[i]).value * document.getElementById(inputIdArray[i]).getAttribute('data-weight')
    }

    // amends 'total_per_year' inner html taking into account the size of the users household,
    // rounding the number to 3 decimal places to match precision of data-weights
    document.getElementById('total_per_year').innerHTML = (total_value / document.getElementById("in_household").value).toFixed(3).toString()
}

// sets values to 0 for all input areas and the estimated plastic footprint
function resetValues() {
    for (let i = 0; i < inputIdArray.length; i++) {
        document.getElementById(inputIdArray[i]).value = 0
    }
    total_values()
}

function getTip() {

    let max = 0;
    let maxIndex = 0;

    // loops through all inputted values for each item type and pulls out the one with the largest value (i.e. largest plastic footprint)
    // this is achieved by setting max to the input element with the largest value and maxIndex to where in the inputIdArray its id is stored
    for (let i = 0; i < tipIdArray.length; i++) {
        if (document.getElementById(inputIdArray[i]).value * document.getElementById(inputIdArray[i]).getAttribute('data-weight') > max) {
            max = document.getElementById(inputIdArray[i]).value * document.getElementById(inputIdArray[i]).getAttribute('data-weight')
            maxIndex = i;
        }
    }

    // displays the tip for the item of the user that has the largest plastic footprint
    document.getElementById(tipIdArray[maxIndex]).style.display = "";
    // displays the name of the item with the largest footprint in place of 'unknown sources'
    document.getElementById("biggest-category").innerHTML = findLabelForControl(inputIdArray[maxIndex]).innerHTML
}

function resetTips() {
    for (let i = 0; i < tipIdArray.length; i++) {
        document.getElementById(tipIdArray[i]).style.display = "none";
    }

    // sets where plastic originates back to 'unknown sources'
    document.getElementById("biggest-category").innerHTML = "unknown sources";

    // sets the household drop-down value to '1'
    document.getElementById('in_household').selectedIndex = 0;
}

// src = https://stackoverflow.com/questions/285522/find-html-label-associated-with-a-given-input
// creates an array of all label elements and then identifies which one has relevant for attribute that matches the inputted 'input_id'
function findLabelForControl(input_id) {
    let idVal = input_id;
    let labels = document.getElementsByTagName('label');
    for( let i = 0; i < labels.length; i++ ) {
        if (labels[i].htmlFor === idVal)
            return labels[i];
    }
}