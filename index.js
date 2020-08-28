const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');



onError = (input, msg) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = msg;
}


onsuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}


checkEmail = (input) => {
    const regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regx.test(String(input.value.trim()).toLowerCase())) {
        onsuccess(input)
    } else {
        onError(input, 'Email is not valild');
    }
}



checkField = (inputArr) => {
    inputArr.forEach(input => {
        if (input.value.trim() === '') {
            onError(input, `${getField(input)} is required`);
        } else {
            onsuccess(input);
        }
    });
}



lengthCheck = (input, min, max) => {
    if (input.value.length < min) {
        onError(input, `${getField(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        onError(input, `${getField(input)} must be less than ${max} characters`);
    } else {
        onsuccess(input);
    }
}


getField = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


passwordCheck = (pwd, cpwd) => {
    if(pwd.value !== cpwd.value) {
        onError(cpwd, 'Password do not match');
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault(); //Toggling a checkbox is the default action of clicking on a checkbox. 
    //The preventDefault() method prevents this from happening.

    checkField([username, email, password, confirmPassword]);
    lengthCheck(username, 3, 15);
    emailCheck(email);
    lengthCheck(password, 3, 15);
    passwordCheck(password, confirmPassword);
});