const form = document.querySelector("form");

const user = document.getElementById("username");
const userError = document.querySelector("#username + span + br + span.error");

const email = document.getElementById("email");
const emailError = document.querySelector("#email + span + br + span.error");
const confirmEmail = document.getElementById("confirmEmail");
const confirmEmailError = document.querySelector("#confirmEmail + span + br + span.error");



const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const passwordError = document.querySelector("#password + span + br + span.error");
const confirmPasswordError = document.querySelector("#confirmPassword + span + br + span.error");




function showEmailError() {
    if (email.validity.valueMissing) {
      emailError.textContent = "You need to enter an email address.";
    } else if (email.validity.typeMismatch) {
      emailError.textContent = "Entered value needs to be an email address.";
    } else if (email.validity.tooShort) {
      emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
    }
    emailError.className = "error active";
  }

function showConfirmEmailError() {
    confirmEmailError.textContent = "Confirmation email does not match.";
    confirmEmailError.className = "error active";
}

function showUserError() {
    if (user.validity.valueMissing) {
        userError.textContent = "You need to enter a username.";
    } else if (user.validity.tooShort) {
        userError.textContent = `Username should be at least ${user.minLength} characters; you entered ${user.value.length}.`;
    } else if (user.validity.patternMismatch) { 
        userError.textContent = `Username must be lowercase and only contain characters a-z.`;
    }
    userError.className = "error active";
  }


function showPassError() {
    if (password.validity.valueMissing) {
        passwordError.textContent = "You need to enter a password.";
    }  else if (password.validity.tooShort) {
        passwordError.textContent = `Password should be at least ${password.minLength} characters; you entered ${password.value.length}.`;
    } else if (password.validity.patternMismatch) {
        passwordError.textContent = `Password must only contain characters a-zA-Z0-9!#% and contain at least one uppercase character, one number and one special character !#%`;
    }
    passwordError.className = "error active";
}

function showConfirmPassError() {
    confirmPasswordError.textContent = "Confirmation password does not match.";
    confirmPasswordError.className = "error active";
}

class SubmitError {
    constructor(message = "") {
      this.name = "SubmitError";
      this.message = message;
    }
  }

SubmitError.prototype = Error.prototype;


email.addEventListener("input", () => {
    if (email.validity.valid) {
        console.log('email valid')
        emailError.textContent = "";
        emailError.className = "error";
    } else {
        showEmailError();
    }
})

confirmEmail.addEventListener("input", () => {
    if(confirmEmail.value == email.value && confirmEmail.validity.valid) {
        console.log('confirm email valid')
        confirmEmailError.textContent = "";
        confirmEmailError.className = "error";
    } else {
        showConfirmEmailError();
    }
})


user.addEventListener("input", () => {
    if (user.validity.valid) {
        // console.log('user valid')
        userError.textContent = "";
        userError.className = "error";
    } else {
        showUserError();
    }
})

password.addEventListener("input", () => {
    if (password.validity.valid) {
        // console.log('password valid')
        passwordError.textContent = "";
        passwordError.className = "error";
    } else {
        showPassError();
    }
})

confirmPassword.addEventListener("input", () => {
    if (confirmPassword.value == password.value && confirmPassword.validity.valid) {
        // console.log('password valid')
        confirmPasswordError.textContent = "";
        confirmPasswordError.className = "error";
    } else {
        showConfirmPassError();
    }
})


form.addEventListener('submit', (e) => {
    try {
        errorMsg = ""
        if (!email.validity.valid) {
            e.preventDefault();
            errorMsg += "email not valid\n";
        } 
        if (!confirmEmail.validity.valid || confirmEmail.value != email.value) {
            e.preventDefault();
            errorMsg += "Emails do not match\n";
        }
        if (!user.validity.valid) {
            e.preventDefault();
            errorMsg += "Username not valid\n";
        }
        if (!password.validity.valid) {
            e.preventDefault();
            errorMsg += "confirm password not valid\n";
        }
        if (!confirmPassword.validity.valid || confirmPassword.value != password.value) {
            e.preventDefault();
            errorMsg += "Passwords do not match\n";
        }
        if (errorMsg === ""){
            let infoSubmit = {};
            infoSubmit.Email = email.value;
            infoSubmit.Username = username.value;
            infoSubmit.Password = password.value;
            // infoSubmit.GraphicalPassword = coords;
            console.log(infoSubmit)
        } else {
            throw new SubmitError(errorMsg);
        }
    } catch(e) {
        alert(errorMsg);
    }
})