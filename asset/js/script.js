const form = document.querySelector('#form');
const allInputs = document.querySelectorAll('.form__input');
const nameInputs = document.querySelectorAll('.form__input[type="text"]');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirmPassword');


let nameInputsEmpty = true;
let passwordInputEmpty = true;
let passwordMismatch = true;
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

monitorNameInputs = () => {
    nameInputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        })
    
        input.addEventListener('input', () => {
            input.removeAttribute("aria-invalid");
        })
    })
}

checkNameInputs = () => {
    nameInputs.forEach(input => {
        if (input.value.length === 0) {
            input.setAttribute("aria-invalid", true);
            input.classList.add('input__filled');
            nameInputsEmpty = true;
            return;
        } else if (input.value.length > 0) {
            input.removeAttribute("aria-invalid");
            input.classList.add('input__filled');
            nameInputsEmpty = false;
        }
    })
}

validateInput = (input) => {
    if (input.value.length === 0) {
        input.classList.add('input__filled');
        input.setAttribute("aria-invalid", true);
        nameInputsEmpty = true;
        return;
    } else if (input.value.length > 0) {
        input.removeAttribute("aria-invalid");
        input.classList.add('input__filled');
    }
}

monitorPasswordInput = () => {
    passwordInput.addEventListener('blur', () => {
        validatePasswordInput();
    })
    
    passwordInput.addEventListener('input', () => {
        passwordInput.removeAttribute("aria-invalid")
    })
}

checkPasswordInput = () => {
    validatePasswordInput();
}

validatePasswordInput = () => {
    if (!(passwordInput.value.match(passwordPattern))) {
        passwordInput.setAttribute("aria-invalid", true);
        passwordInput.classList.add('input__filled');
        passwordInputEmpty = true;
        return;
    } else {
        passwordInput.removeAttribute("aria-invalid");
        passwordInput.classList.add('input__filled');
        passwordInputEmpty = false;
    }
}

monitorConfirmPasswordInput = () => {
    confirmPasswordInput.addEventListener('blur', () => {
        checkPasswordMismatch();
    })
    
    confirmPasswordInput.addEventListener('input', () => {
        confirmPasswordInput.removeAttribute("aria-invalid")
    })
}

checkConfirmPasswordInput = () => {
    checkPasswordMismatch();
}

checkPasswordMismatch = () => {
    if (!(passwordInput.value === confirmPasswordInput.value)) {
        confirmPasswordInput.setAttribute("aria-invalid", true);
        confirmPasswordInput.classList.add('input__filled');
        passwordMismatch = true;
        return;
    } else if (passwordInput.value === confirmPasswordInput.value){
        confirmPasswordInput.removeAttribute("aria-invalid");
        confirmPasswordInput.classList.add('input__filled');
        passwordMismatch = false;
    }
}

clearInputs = () => {
    allInputs.forEach(input => {
        input.value = "";
    })
}

submitForm = () => {
    const formData = new FormData(form);
    form.submit();
    clearInputs();
}

monitorNameInputs();

monitorPasswordInput();

monitorConfirmPasswordInput();

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (nameInputsEmpty || passwordInputEmpty || passwordMismatch) {
        checkNameInputs();
        checkPasswordInput();
        checkConfirmPasswordInput();
    }
    if (!nameInputsEmpty && !passwordInputEmpty && !passwordMismatch) {
        submitForm();
    }
})