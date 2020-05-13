const getSubmit = document.querySelector('button');

const getName = document.getElementById('name');
const nameRegixCheck = /^[A-Za-z]+\s?[A-Za-z]+$/;

const getEmail = document.getElementById('mail');
const emailRegixCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const getJobs = document.getElementById('title');
const getBasicInfo = document.querySelector('.basic-info');
const otherInput = document.getElementById('other-job-title');

const getShirtDesigns = document.getElementById('design');
const getShirtColors = document.getElementById('color');

const getActivities = document.querySelector('.activities');
const checkboxes = document.querySelectorAll(`input[type="checkbox"]`);

let optionText = "";
//hide the other job title input on page load.
otherInput.style.display = 'none'
getShirtColors.style.display = 'none';


/***
 * window.onload function sets the name field 
 * to be the default focus value
 */
window.onload = () => {
    getName.focus();
}
/***
 * Name Validation
 ***/
function nameCheck() {
    if (!nameRegixCheck.test(getName.value)) {
        getName.style.border = "2px solid red";
        getName.nextElementSibling.textContent = "Please input a valid name.";
        formValid = false;
    } else {
        console.log(getName.value);
        getName.style.border = '';
        getName.nextElementSibling.textContent = "";
    }
}

getName.addEventListener('blur', () => {
    nameCheck();
})

/***
 * Email Validation
 ***/
function emailCheck() {
    if (!emailRegixCheck.test(getEmail.value)) {
        getEmail.style.border = "2px solid red";
        getEmail.nextElementSibling.textContent = "Please input a valid email.";
        formValid = false;
    } else {
        console.log(getEmail.value);
        getEmail.style.border = '';
        getEmail.nextElementSibling.textContent = "";
    }
}

getEmail.addEventListener('blur', () => {
    emailCheck();
})

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

document.getElementById('title').addEventListener('change', () => {
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
totalCost = 0;
total.innerHTML = `Total: $${totalCost}`;
getActivities.appendChild(total);


function checkCheckboxes(checked, itemCost, chosenWorkshopTime) {
    console.log(checked.value);
    if (checked.checked) {
        totalCost += itemCost;
    } else {
        totalCost -= itemCost;
    }

    checkboxes.forEach((checkbox) => {
        const otherWorkshopTime = checkbox.getAttribute('data-day-and-time');
        if (checked.checked && chosenWorkshopTime == otherWorkshopTime) {
            console.log(chosenWorkshopTime);
            console.log(otherWorkshopTime);
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
    })
})



/***
 * Disable Activities that conflict.
 ***/

