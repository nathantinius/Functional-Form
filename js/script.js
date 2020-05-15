/******************************************
Treehouse FSJS Techdegree:
project 3 - Interactive Form
******************************************/

/**
 * All Global Variables
 */
const getSubmit = document.querySelector('button');

//Name Field and Regex
const getName = document.getElementById('name');
//const nameRegexCheck = /^[a-z]+\s[a-z]+$/i; More advanced regex requiring first and last name
const nameRegexCheck = /^[a-z\s]+$/i;

//Email Field and Regex
const getEmail = document.getElementById('mail');
const emailRegexCheck = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;

//Job Title options and other field
const getJobs = document.getElementById('title');
const getBasicInfo = document.querySelector('.basic-info');
const otherInput = document.getElementById('other-job-title');
const jobRegexCheck = /^[a-z\s]+$/i;

//T-shirt options
const getShirtDesigns = document.getElementById('design');
const getShirtColors = document.getElementById('color');

//Activity checkboxes
const getActivities = document.querySelector('.activities');
const checkboxes = document.querySelectorAll(`input[type="checkbox"]`);

//Payment fields and Regex
const getPayment = document.getElementById('payment');
const getCC = document.getElementById('credit-card');
const getCCNum = document.getElementById('cc-num');
const ccRegexCheck = /^\D*\d{4}\D*\d{4}\D*\d{4}\D*\d{1,4}\D*$/;
const getZip = document.getElementById('zip');
const zipRegexCheck = /^[0-9]{5}$/;
const getCVV = document.getElementById('cvv');
const cvvRegexCheck = /^[0-9]{3}$/;
const getPP = document.getElementById('paypal');
const getB = document.getElementById('bitcoin');

//Tshirt option text placeholder used in showSelectTshirts()
let optionText = "";

//Hide all hidden options as default
otherInput.style.display = 'none'
getShirtColors.style.display = 'none';
getCC.style.display = 'none';
getPP.style.display = 'none';
getB.style.display = 'none';
getSubmit.disabled = true;

/***
 * window.onload function sets the name field 
 * to be the default focus value
 */
window.onload = () => {
    getName.focus();
}

/**
 * Validation Functions
 */

function createListener(validator) {
    return e => {
        const text = e.target.value;
        const valid = validator(text);
        const showTip = !valid;
        const tooltip = e.target.nextElementSibling;
        showOrHideTip(showTip, tooltip);
        formCheck();
    };
}

function showOrHideTip(show, element) {
    // show element when show is true, hide when false
    if (show) {
        element.style.display = "inherit";
    } else {
        element.style.display = "none";
    }
}

/***
 * Basic Info Validations and Event Listeners
 ***/

function nameCheck(name) {
    if (name == '') {
        getName.nextElementSibling.innerHTML = "Name cannot be empty"
        return nameRegexCheck.test(name)
    } else {
        getName.nextElementSibling.innerHTML = "Only letter characters allowed"
        return nameRegexCheck.test(name)
    }
}

function emailCheck(email) {
    if (email == '') {
        getEmail.nextElementSibling.innerHTML = "Email cannot be empty"
        return emailRegexCheck.test(email)
    } else {
        getEmail.nextElementSibling.innerHTML = "Email format: test@email.com"
        return emailRegexCheck.test(email)
    }
}

function jobCheck() {
    return jobRegexCheck.test(otherInput.value)
}

getName.addEventListener('input', createListener(nameCheck));
getName.addEventListener('blur', createListener(nameCheck));
getEmail.addEventListener('input', createListener(emailCheck));
getEmail.addEventListener('blur', createListener(emailCheck));
otherInput.addEventListener('input', createListener(jobCheck));

/***
 * Looks at the Job Title Selected 
 * if other is selected show the
 * other title text field.
 ***/
function showOtherJobOption() {
    if (getJobs.options[getJobs.selectedIndex].value == 'other') {
        otherInput.style.display = 'block';
    } else {
        otherInput.style.display = 'none';
    }
}

getJobs.addEventListener('change', () => {
    showOtherJobOption();
})

/***
 * Hide the Colors options on default
 * Once Design is selected present the color options
 * with the non-corrisponding colors deactivated
 ***/
function showSelectTshirts() {

    if (getShirtDesigns.options[getShirtDesigns.selectedIndex].value == 'select') {
        getShirtColors.style.display = 'none';
    } else {
        getShirtColors.style.display = '';
    }

    for (i = 0; i < getShirtColors.children.length; i++) {
        getShirtColors.options[i].disabled = true;
        optionText = getShirtColors.options[i].text;

        if (getShirtDesigns.options[getShirtDesigns.selectedIndex].value == 'js puns') {
            if (optionText.includes('Puns')) {
                getShirtColors.options[i].disabled = false;
                getShirtColors.selectedIndex = 0;
            } else {
                getShirtColors.options[i].disabled = true;
            }
        } else if (getShirtDesigns.options[getShirtDesigns.selectedIndex].value == 'heart js') {
            if (optionText.includes('Puns')) {
                getShirtColors.options[i].disabled = true;
            } else {
                getShirtColors.options[i].disabled = false;
                getShirtColors.selectedIndex = 3;

            }
        }
    }
}

document.getElementById('design').addEventListener('change', () => {
    showSelectTshirts();
});

/***
 * Create total element, calculate total cost, disable conflicting workshops.
 ***/

const total = document.createElement('h3');
const getActivitiesNote = document.getElementById('activities-note');
totalCost = 0;
total.innerHTML = `Total: $${totalCost}`;
getActivities.appendChild(total);


function checkCheckboxes(checked, itemCost, chosenWorkshopTime) {
    if (checked.checked) {
        totalCost += itemCost;
    } else {
        totalCost -= itemCost;
    }

    checkboxes.forEach((checkbox) => {
        const otherWorkshopTime = checkbox.getAttribute('data-day-and-time');
        if (checked.checked && chosenWorkshopTime == otherWorkshopTime) {
            if (checkbox !== checked) {
                checkbox.disabled = true;
            }
        } else if (chosenWorkshopTime == otherWorkshopTime) {
            checkbox.disabled = false;
        }
    })

    total.innerHTML = `Total: $${totalCost}`;
}

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
        const checked = event.target;
        const itemCost = parseInt(event.target.getAttribute('data-cost'));
        const chosenWorkshopTime = event.target.getAttribute('data-day-and-time');
        checkCheckboxes(checked, itemCost, chosenWorkshopTime);
        activitiesCheck();
        formCheck();
    })
})

function activitiesCheck() {
    if (totalCost > 0) {
        getActivitiesNote.style.display = 'none';
        return true;
    } else {
        getActivitiesNote.style.display = '';
        return false;
    }
}

/***
 * Show Payment Option based on what option is selected.
 ***/
function showPaymentOption() {
    if (getPayment.options[getPayment.selectedIndex].value == 'credit card') {
        getCC.style.display = 'block';
        getPP.style.display = 'none';
        getB.style.display = 'none';
    } else if (getPayment.options[getPayment.selectedIndex].value == 'paypal') {
        getCC.style.display = 'none';
        getPP.style.display = 'block';
        getB.style.display = 'none';
    } else if (getPayment.options[getPayment.selectedIndex].value == 'bitcoin') {
        getCC.style.display = 'none';
        getPP.style.display = 'none';
        getB.style.display = 'block';
    } else {
        getCC.style.display = 'none';
        getPP.style.display = 'none';
        getB.style.display = 'none';
    }
}

/**
 * Payment Validation and Event Listeners
 */

function paymentCheck() {
    if (getPayment.options[getPayment.selectedIndex].value == 'select method') {
        return false;
    } else if (getPayment.options[getPayment.selectedIndex].value == 'credit card') {
        if (ccNumberCheck(getCCNum.value) && zipCheck(getZip.value) && cvvCheck(getCVV.value)) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

function ccNumberCheck() {
    return ccRegexCheck.test(getCCNum.value);
}
function zipCheck() {
    return zipRegexCheck.test(getZip.value);
}
function cvvCheck() {
    return cvvRegexCheck.test(getCVV.value);
}

function formatCC(text) {
    const formatCCRegex = /^\D*(\d{4})\D*(\d{4})\D*(\d{4})\D*(\d{1,4})\D*$/
    return text.replace(formatCCRegex, '$1 $2 $3 $4')
}

getCCNum.addEventListener('input', createListener(ccNumberCheck));
getCCNum.addEventListener('blur', (event) => {
    event.target.value = formatCC(event.target.value)
});
getZip.addEventListener('input', createListener(zipCheck));
getCVV.addEventListener('input', createListener(cvvCheck));

getPayment.addEventListener('change', () => {
    showPaymentOption();
    formCheck();
})

/**
 * Form Check and Submit Button activation
 */

function formCheck() {
    if (nameCheck(getName.value) && emailCheck(getEmail.value) && activitiesCheck() && paymentCheck()) {
        getSubmit.disabled = false;
    } else {
        getSubmit.disabled = true;

    }
}
