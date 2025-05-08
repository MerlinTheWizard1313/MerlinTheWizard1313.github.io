//When clicking the topnav icon, toggle between showing the navigation options
function showNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
}

function dropdownIconChange(id) {
    const iconClassName = document.getElementById(id);
    if(iconClassName.classList.contains("fa-caret-down")){
        iconClassName.classList.replace("fa-caret-down","fa-caret-up");
    } else if (iconClassName.classList.contains("fa-caret-up")){
        iconClassName.classList.replace("fa-caret-up","fa-caret-down");
    }
}
/*
All commented code is from a website project created from my time in my Level 3
Software Development course and such is being used as a base for now. 
This will change later
pls
function headingHover() { 
    let heading = document.getElementById("heading");
    heading.style = "color: darkorange"; //Change title text color
}

function headingOut() {
    let heading = document.getElementById("heading");
    heading.style = "color: darkslategrey"; //Change title text color
}


function handleUserRating(event) {
    event.preventDefault(); //Prevent page refresh
    let serviceRatingField = document.getElementById("serviceRating"); 
    let ratingValidated = validateRating(serviceRatingField); //Send the users rating into validation function and sets ratingValidated to true or false
    //If statement which is satisfied if the rating is valid
    if (ratingValidated) {
        calculateTotal(serviceRatingField.value.toLowerCase());
    }
}

function validateRating(serviceRatingField) {
    let rating = serviceRatingField.value.toLowerCase(); //Get text value of the users rating and set it to lowercase
    let feedback = document.getElementById("serviceRatingFeedback"); //Find feedback element
    //Function to check if rating satisfies the three rating types. Provide feedback message if it is not a valid rating
    if(rating == "excellent"|| rating == "good" || rating == "poor") {
        feedback.innerText = "";
        return true;
    } else {
        feedback.innerText = "Please ensure your rating is either poor, good or excellent, then resubmit!";
        feedback.style = "color: red";
        return false;
    }
}

function calculateTotal(ratingGiven){
    //Declare text boxes which will be used
    let totalWithTipText = document.getElementById("totalWithTip");
    let perPersonText = document.getElementById("perPerson");
    //Declare and convert element values to float and integer respectively
    let initialTotal = parseFloat(document.getElementById("billTotal").value);
    let amountOfPeople = parseInt(document.getElementById("numPaying").value);
    let tipPercent = 0; //Declare tipPercent to be used in if statement
    //Set tipPercent based on the users rating
    if(ratingGiven == "excellent") {
        tipPercent = 0.2;
    } else if(ratingGiven == "good"){
        tipPercent = 0.1;
    } else {
        tipPercent = 0;
    }
    let tipAdded = tipPercent * initialTotal; //Calculate the tip only
    let actualTotal = initialTotal + tipAdded; //Add the tip to the initial total
    let roundedActualTotal = actualTotal.toFixed(2); //Round to 2 decimal places
    let amountPaidPerPerson = roundedActualTotal / amountOfPeople; //Divide the rounded total by the amount of people
    let roundedAmountPaidPerPerson = amountPaidPerPerson.toFixed(2); //Round the amount per person to 2 decimal places
    //Display the total and per person amounts to their respective divs
    totalWithTipText.innerText = roundedActualTotal;
    perPersonText.innerText = roundedAmountPaidPerPerson;
}

function moveRight(){
    let tipulatorBox = document.getElementById("tipulator-wrapper");
    tipulatorBox.style.left = "500px"; //Move 500px to the right
}

function moveLeft(){
    let tipulatorBox = document.getElementById("tipulator-wrapper");
    tipulatorBox.style.left = "0px"; //Move to original position
}

function closeTipulator(){
    document.write("<h1>Thank you for using the tipulator</h1>"); //Wipe page and create a h1 heading with the following text
}*/