const getName = document.getElementById("name");
const regexCheck = /[0-9]/;

const getEmail = document.getElementById('email');

const getJobs = document.getElementById('title');
const getBasicInfo = document.querySelector('.basic-info');
const otherInput = document.getElementById('other-job-title');

const getShirtDesigns = document.getElementById('design');
const getShirtColors = document.getElementById('color');
let optionText = "";
//hide the other job title input on page load.
otherInput.style.display = 'none'

/***
 * window.onload function sets the name field 
 * to be the default focus value
 */
window.onload = () => {
    getName.focus();
};

getName.addEventListener('keyup', () => {
    nameCheck();
})

function nameCheck() {
    if (regexCheck.test(getName.value)) {
        getName.style.border = "2px solid red";
        getName.nextElementSibling.textContent = "Only letter characters are valid.";
        formValid = false;
    } else {
        console.log(getName.value);
        getName.style.border = '';
        getName.nextElementSibling.textContent = "";
    }
}


function showOtherJobOption() {
    if (getJobs.options[getJobs.selectedIndex].value == 'other') {
        otherInput.style.display = 'block';
    } else {
        otherInput.style.display = 'none';
    }
}

document.getElementById('title').addEventListener('change', () => {
    showOtherJobOption();
});


function showSelectTshirts() {
    for (i = 0; i < getShirtColors.children.length; i++) {
        getShirtColors.options[i].disabled = true;
        optionText = getShirtColors.options[i].text;

        if (getShirtDesigns.options[getShirtDesigns.selectedIndex].value == 'js puns') {
            if (optionText.includes('Puns')) {
                getShirtColors.options[i].disabled = false;
            } else {
                getShirtColors.options[i].disabled = true;
            }
        } else if (getShirtDesigns.options[getShirtDesigns.selectedIndex].value == 'heart js') {
            if (optionText.includes('Puns')) {
                getShirtColors.options[i].disabled = true;
            } else {
                getShirtColors.options[i].disabled = false;
            }
        }
    }
}

document.getElementById('design').addEventListener('change', () => {
    showSelectTshirts();
});