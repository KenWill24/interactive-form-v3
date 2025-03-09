//Create a variable referencing the name element and using the focus method
const field = document.getElementById("name");
field.focus();

//Create variables referencing the job role and other role elements
const job = document.getElementById("title");
const job2 = document.getElementById('other-job-role');

//Create variable referencing the <div> element of "paypal" and hide element
const payment1 = document.getElementById('paypal');

//Create variable referencing the <div> element of "bitcoin" and hide element
const payment2 = document.getElementById('bitcoin');

payment1.style.display = "none";
payment2.style.display = "none";

//Other job role hidden by default
job2.style.display = "none"

//Listen for changes in the dropdown
job.addEventListener(('change'), (e) => {
    if (e.target.value === 'other') {
        job2.style.display = "block";
    } else {
        job2.style.display = "none";
    }
});

//Create variables referencing the Design and Theme elements
const designs = document.getElementById('design');
const colors = document.getElementById('color');
const colorOptions = colors.children;

//Disable the colors
colors.disabled = true;

//Listen for changes in dropdown
designs.addEventListener(('change'), (e) => {
    colors.disabled = false;

    //Create variables referencing the event target
    const selectedDesign = e.target.value;
    const selectedColor = document.getElementById("color")

    //Loop through color options
    for (let option of colorOptions){
        //Create variable for getAttribute method
        if (option.getAttribute('data-theme') === selectedDesign){
        //Show options that match the selected design, hide others
            option.hidden = false;
        } else {
            option.hidden = true;
        }       
    }

    if (selectedDesign !== 'Select Theme'){
        selectedColor.value = document.querySelectorAll(`[data-theme|="${selectedDesign}"]`)[0].value;
    }
});

//Create variables referencing the fieldset and <p> element
const activity = document.getElementById('activities');
const sum = document.getElementById('activities-cost');

//Store total cost
let total = 0;

//Listen for change on registered activities
activity.addEventListener(('change'), (e) => {

    //Get the data-cost attribute from the event target and convert it to a number
    const cost = +e.target.getAttribute('data-cost');

    //Determine if the event target (checkbox) was checked or not
    if (e.target.checked) {
        total += cost;
    } else {
        total -= cost;
    }

    //Update the total <p> element with the new total cost
    sum.textContent = `Total: $${total}`;
});

//Create variable referencing the <select> element
const payments = document.getElementById('payment');

//Create variable referencing the <div> element of "credit card"
const card = document.getElementById('credit-card');

//Target the second child (index 1 since indexes start from 0)
payments.children[1].setAttribute('selected', 'selected');

//Listen for change on payment
payments.addEventListener(('change'), (e) => {

    //Hide all payment method divs
    card.style.display = "none";
    payment1.style.display = "none";
    payment2.style.display = "none";

    //Get the selected value and show the corresponding div
    const selectedPayment = e.target.value;
    if (selectedPayment) {
        document.getElementById(selectedPayment).style.display = "block";
    }
});

//Create variable for email address, card number element, zip code element, cvv 
const emailField = document.getElementById('email');
const cardNum = document.getElementById('cc-num');
const zipField = document.getElementById('zip');
const cvvField = document.getElementById('cvv');


//Create variable for <form> element
const form = document.querySelector('form');
let isValid = true;

form.addEventListener('submit', (e) => {
    //Prevent form submission temporarily for testing
    e.preventDefault();

    //Validate name field using Regex
    const nameValue = field.value.trim();
    const nameRegex = /^[A-Za-z\s]{2,}$/;
    const isValidName = nameRegex.test(nameValue)

    //If Name is invalid, show error and prevent form submission
    if (!isValidName) {
        isValid = false;
      //  alert("Name field cannot be blank.");
    };

    //Validate the Email field validation (similar structure)
    const emailValue = emailField.value.trim();
    // Regex for validating email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailRegex.test(emailValue);
    
    if (!isValidEmail) {
        isValid = false;
      //  alert("Please enter a valid email.");
    };

    // Validate Activities (at least one checkbox selected)
    const selectedActivities = activity.querySelectorAll('input[type="checkbox"]:checked');

    if (selectedActivities.length === 0) {
        isValid = false;
       // alert("Please select at least one activity.");
    };

    //Validate Credit Card Number (only if selected payment is "credit card")
    if (cardNum.value === "") {
        const cardNumValue = cardNum.value.trim();
        // Regex for 13 or 16-digit card number
        const cardNumRegex = /^\d{13,16}$/;
        const isValidCard = cardNumRegex.test(cardNumValue);
                

        if (!isValidCard) {
            isValid = false;
            const newSpan = document.getElementById("cc-hint");
            newSpan.style.display = "block";
           // alert("Please enter a valid credit card number (13-16 digits).")
        }
    };

    //Validate zip code
    const zipValue = zipField.value.trim();
    // Regex for 5-digit zip code
    const zipRegex = /^\d{5}$/;
    const isValidZip = zipRegex.test(zipValue);

    if (!isValidZip) {
        isValid = false;
        const newSpan = document.getElementById("zip-hint");
        newSpan.style.display = "block";
        //alert("Please enter a valid 5-digit zip code.");
    };

    // Validate CVV
    const cvvValue = cvvField.value.trim();
    // Regex for 3-digit CVV
    const cvvRegex = /^\d{3}$/;
    const isValidCvv = cvvRegex.test(cvvValue);

    if (!isValidCvv) {
      isValid = false;
      const newSpan = document.getElementById("cvv-hint");
      newSpan.style.display = "block";
      //alert("Please enter a valid 3-digit CVV.")
    }


});

//Select all activity checkbox input elements
const activityCheckboxes = document.querySelectorAll('#activities-box input[type="checkbox"]');
//Loop through each checkbox and add event listeners
activityCheckboxes.forEach(checkbox => {
    //When a checkbox receives focus, add the .focus class to its parent label
    checkbox.addEventListener('focus', (e) => {
        e.target.parentElement.classList.add('focus');
    });

    //When a checkbox loses focus, remove the .focus class
    checkbox.addEventListener('blur', (e) => {
        e.target.parentElement.classList.remove('focus');        
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const activitiesFieldset = document.getElementById('activities-box');
    const activityCheckboxes = document.querySelectorAll('#activities-box input[type="checkbox"]');
    const paymentInput = document.getElementById('credit-card')

    // Helper function to show validation error
    function showValidationError(element) {
    const parent = element.parentElement;
    parent.classList.add('not-valid');
    parent.classList.remove('valid');
    //parent.lastElementChild.style.display = "block";
    }

    // Helper function to show valid state
    function showValidState(element) {
    const parent = element.parentElement;
    parent.classList.add('valid');
    parent.classList.remove('not-valid');
    parent.lastElementChild.style.display = 'none';
    }

    // Name validation function
    function validateName() {
    if (nameInput.value.trim() === '') {
        showValidationError(nameInput);
        return false;
    } else {
        showValidState(nameInput);
        return true;
    }
}

// Email validation function (basic regex check)
function validateEmail() {
    const emailPattern = /^[^@]+@[^@.]+\.[a-z]+$/i;
        if (!emailPattern.test(emailInput.value)) {
            showValidationError(emailInput);
            return false;
        } else {
            showValidState(emailInput);
            return true;
        }
    }

    // Activities validation function (at least one checkbox should be checked)
    function validateActivities() {
        const isChecked = [...activityCheckboxes].some(checkbox => checkbox.checked);
        if (!isChecked) {
            showValidationError(activitiesFieldset);
            return false;
        } else {
            showValidState(activitiesFieldset);
            return true;
        }
    }

    //Credit card vaildation function
    function validateCreditCard() {
        const cardPattern = /^\d{13,16}$/;
        if (!cardPattern.test(paymentInput.value)) {
            showValidationError(paymentInput);
            return false;           
        } else {
            showValidState(paymentInput);
            return true;
        }
    }



    // Validate form on submission
    form.addEventListener('submit', (e) => {
        let isFormValid = true;

        if (!validateName()) isFormValid = false;
        if (!validateEmail()) isFormValid = false;
        if (!validateActivities()) isFormValid = false;
        if (paymentInput.value === "credit-card"){
            if (!validateCreditCard()) isFormValid = false;
        }

        // Prevent form submission if any validation fails
        if (!isFormValid) {
            e.preventDefault();
        } else {
            // If all validations pass, allow form submission
            alert("Form is valid. Submitting...");
            form.submit(); //Submit the form if all validations pass
        }
    });

    // Real-time validation on input events
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    activityCheckboxes.forEach(checkbox => checkbox.addEventListener('change', validateActivities));
    paymentInput.addEventListener('blur', validateCreditCard);
});