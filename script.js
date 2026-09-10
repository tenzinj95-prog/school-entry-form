// ============================================================
// STUDENT ENTRY FORM
// GitHub Pages + Google Sheets
// ============================================================


// ============================================================
// IMPORTANT
// Paste your Google Apps Script Web App URL here.
// ============================================================

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzZq9CjVCUnsx3V2cw_sxpTw_U9_xhFitp0Gf77D-Avl5xu_XTZ9lRcLUMnZVz3kcy6-A/exec";


// ============================================================
// GET ELEMENTS
// ============================================================

const form = document.getElementById("entryForm");

const studentName = document.getElementById("studentName");
const className = document.getElementById("className");
const section = document.getElementById("section");
const category = document.getElementById("category");
const entryDate = document.getElementById("entryDate");
const achievement = document.getElementById("achievement");

const submitButton = document.getElementById("submitButton");
const buttonText = document.getElementById("buttonText");

const clearButton = document.getElementById("clearButton");

const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");

const characterCount = document.getElementById("characterCount");


// ============================================================
// SET TODAY'S DATE
// ============================================================

function setToday() {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    entryDate.value = `${year}-${month}-${day}`;
}

setToday();


// ============================================================
// CHARACTER COUNTER
// ============================================================

achievement.addEventListener("input", function () {

    const length = achievement.value.length;

    characterCount.textContent =
        `${length} / 500`;

});


// ============================================================
// ERROR HELPERS
// ============================================================

function showError(input, errorId, message) {

    input.classList.add("input-error");

    document.getElementById(errorId).textContent = message;
}


function clearError(input, errorId) {

    input.classList.remove("input-error");

    document.getElementById(errorId).textContent = "";

}


// ============================================================
// VALIDATION
// ============================================================

function validateForm() {

    let valid = true;


    // Student Name
    const name = studentName.value.trim();

    if (name === "") {

        showError(
            studentName,
            "studentNameError",
            "Please enter the student's name."
        );

        valid = false;

    } else if (name.length < 2) {

        showError(
            studentName,
            "studentNameError",
            "Name must contain at least 2 characters."
        );

        valid = false;

    } else if (!/^[a-zA-ZÀ-ÿ.' -]+$/.test(name)) {

        showError(
            studentName,
            "studentNameError",
            "Please enter a valid name."
        );

        valid = false;

    } else {

        clearError(
            studentName,
            "studentNameError"
        );
    }


    // Class
    if (className.value === "") {

        showError(
            className,
            "classNameError",
            "Please select a class."
        );

        valid = false;

    } else {

        clearError(
            className,
            "classNameError"
        );
    }


    // Section
    if (section.value === "") {

        showError(
            section,
            "sectionError",
            "Please select a section."
        );

        valid = false;

    } else {

        clearError(
            section,
            "sectionError"
        );
    }


    // Category
    if (category.value === "") {

        showError(
            category,
            "categoryError",
            "Please select a category."
        );

        valid = false;

    } else {

        clearError(
            category,
            "categoryError"
        );
    }


    // Date
    if (entryDate.value === "") {

        showError(
            entryDate,
            "entryDateError",
            "Please select a date."
        );

        valid = false;

    } else {

        clearError(
            entryDate,
            "entryDateError"
        );
    }


    // Achievement
    const achievementText =
        achievement.value.trim();

    if (achievementText === "") {

        showError(
            achievement,
            "achievementError",
            "Please enter the achievement."
        );

        valid = false;

    } else if (achievementText.length < 3) {

        showError(
            achievement,
            "achievementError",
            "Please enter more information."
        );

        valid = false;

    } else {

        clearError(
            achievement,
            "achievementError"
        );
    }


    return valid;
}


// ============================================================
// CLEAR ALL ERRORS
// ============================================================

function clearAllErrors() {

    clearError(
        studentName,
        "studentNameError"
    );

    clearError(
        className,
        "classNameError"
    );

    clearError(
        section,
        "sectionError"
    );

    clearError(
        category,
        "categoryError"
    );

    clearError(
        entryDate,
        "entryDateError"
    );

    clearError(
        achievement,
        "achievementError"
    );
}


// ============================================================
// HIDE MESSAGES
// ============================================================

function hideMessages() {

    successMessage.style.display = "none";

    errorMessage.style.display = "none";
}


// ============================================================
// SHOW SUCCESS
// ============================================================

function showSuccess() {

    successMessage.style.display = "flex";

    errorMessage.style.display = "none";

    successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


// ============================================================
// SHOW ERROR
// ============================================================

function showSubmissionError() {

    errorMessage.style.display = "flex";

    successMessage.style.display = "none";
}


// ============================================================
// RESET BUTTON
// ============================================================

function resetButton() {

    submitButton.disabled = false;

    submitButton.classList.remove("loading");

    buttonText.textContent = "Submit Entry";
}


// ============================================================
// FORM SUBMISSION
// ============================================================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    hideMessages();


    // Validate
    if (!validateForm()) {

        return;
    }


    // Check Google Script URL
    if (
        GOOGLE_SCRIPT_URL ===
        "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE"
    ) {

        alert(
            "Please add your Google Apps Script URL in script.js first."
        );

        return;
    }


    // Check honeypot
    const honeypot =
        document.getElementById("website");

    if (honeypot.value !== "") {

        return;
    }


    // Loading
    submitButton.disabled = true;

    submitButton.classList.add("loading");

    buttonText.textContent = "Submitting...";


    // Set form destination
    form.action = GOOGLE_SCRIPT_URL;


    // Submit to Google Apps Script
    form.submit();


    /*
       Google Apps Script receives the submission
       through the hidden iframe.

       We wait briefly and then show the success
       message because GitHub Pages cannot directly
       read the cross-origin Apps Script response.
    */

    setTimeout(function () {

        showSuccess();

        form.reset();

        setToday();

        characterCount.textContent = "0 / 500";

        clearAllErrors();

        resetButton();

    }, 1500);

});


// ============================================================
// CLEAR BUTTON
// ============================================================

clearButton.addEventListener("click", function () {

    form.reset();

    setToday();

    characterCount.textContent = "0 / 500";

    clearAllErrors();

    hideMessages();

});


// ============================================================
// REMOVE ERROR WHEN USER STARTS CORRECTING
// ============================================================

studentName.addEventListener("input", function () {
    clearError(studentName, "studentNameError");
});

className.addEventListener("change", function () {
    clearError(className, "classNameError");
});

section.addEventListener("change", function () {
    clearError(section, "sectionError");
});

category.addEventListener("change", function () {
    clearError(category, "categoryError");
});

entryDate.addEventListener("change", function () {
    clearError(entryDate, "entryDateError");
});

achievement.addEventListener("input", function () {
    clearError(achievement, "achievementError");
});
