const checkPass = (val) => {
    const hasUpper = /[A-Z]/.test(val);
    const hasLower = /[a-z]/.test(val);
    const hasNum = /[0-9]/.test(val);
    const hasSym = /[!@#$%^&*]/.test(val);
    return hasUpper && hasLower && hasNum && hasSym && val.length >= 8;
};

const checkMail = (val) => /.*@gmail\.com$/.test(val);

const updateUI = (input, isValid, errorMsg) => {
    let msgEl = input.nextElementSibling;
    if (!msgEl || !msgEl.classList.contains('status_msg')) {
        msgEl = document.createElement('p');
        msgEl.className = 'status_msg';
        msgEl.style.fontSize = "12px";
        msgEl.style.marginTop = "5px";
        msgEl.style.textAlign = "left";
        input.parentNode.insertBefore(msgEl, input.nextSibling);
    }

    if (input.value.trim() === "") {
        input.style.border = "1px solid red";
        msgEl.innerText = "This field is required";
        msgEl.style.color = "red";
        return false;
    } else if (!isValid) {
        input.style.border = "1px solid red";
        msgEl.innerText = errorMsg;
        msgEl.style.color = "red";
        return false;
    } else {
        input.style.border = "1px solid green";
        msgEl.innerText = "";
        return true;
    }
};

const signForm = document.getElementById('signup_form');
if (signForm) {
    signForm.onsubmit = (e) => {
        e.preventDefault();
        const fn = document.getElementById('fname');
        const ln = document.getElementById('lname');
        const em = document.getElementById('email');
        const ps = document.getElementById('signup_password');

        const v1 = updateUI(fn, fn.value.length >= 3, "Name must be 3+ letters");
        const v2 = updateUI(ln, ln.value.length >= 3, "Name must be 3+ letters");
        const v3 = updateUI(em, checkMail(em.value), "Must end with @gmail.com");
        const v4 = updateUI(ps, checkPass(ps.value), "8+ chars (Upper, Lower, Number, Symbol)");

        if (v1 && v2 && v3 && v4) {
            window.location.href = 'products.html';
        }
    };
}

const logForm = document.getElementById('login_form');
if (logForm) {
    logForm.onsubmit = (e) => {
        e.preventDefault();
        const em = document.getElementById('login_email');
        const ps = document.getElementById('login_pass');

        const v1 = updateUI(em, checkMail(em.value), "Invalid @gmail.com address");
        const v2 = updateUI(ps, ps.value.length >= 8, "Password must be 8+ chars");

        if (v1 && v2) {
            window.location.href = 'products.html';
        }
    };
}

function change() {
    const signupBox = document.getElementById('signup');
    const loginBox = document.getElementById('login');
    if (signupBox.style.display === "none") {
        signupBox.style.display = "block";
        loginBox.style.display = "none";
    } else {
        signupBox.style.display = "none";
        loginBox.style.display = "block";
    }
}

const isPassStrong = (val) => {
    const hasUpper = /[A-Z]/.test(val);
    const hasLower = /[a-z]/.test(val);
    const hasNum = /[0-9]/.test(val);
    const hasSym = /[!@#$%^&*]/.test(val);
    return hasUpper && hasLower && hasNum && hasSym && val.length >= 8;
};

const isPhoneValid = (val) => /^01[0125][0-9]{8}$/.test(val);

const updateFieldUI = (input, isValid, errorMsg) => {
    let msgEl = input.nextElementSibling;
    if (!msgEl || !msgEl.classList.contains('status_msg')) {
        msgEl = document.createElement('p');
        msgEl.className = 'status_msg';
        msgEl.style.fontSize = "12px";
        msgEl.style.marginTop = "5px";
        msgEl.style.textAlign = "left";
        input.parentNode.insertBefore(msgEl, input.nextSibling);
    }

    if (input.value.trim() === "") {
        input.style.border = "1px solid red";
        msgEl.innerText = "This field is required";
        msgEl.style.color = "red";
        return false;
    } else if (!isValid) {
        input.style.border = "1px solid red";
        msgEl.innerText = errorMsg;
        msgEl.style.color = "red";
        return false;
    } else {
        input.style.border = "1px solid green";
        msgEl.innerText = "";
        return true;
    }
};

const checkoutBtn = document.querySelector('.summary .mainbutton');
if (checkoutBtn) {
    checkoutBtn.onclick = (e) => {
        const name = document.getElementById('checkout_name');
        const pass = document.getElementById('checkout_pass');
        const city = document.getElementById('City');
        const area = document.getElementById('area');
        const street = document.getElementById('street');
        const build = document.getElementById('building');
        const phone = document.getElementById('checkout phone');
        const errBox = document.getElementById('checkout_error');

        const v1 = updateFieldUI(name, name.value.length >= 3, "Name must be 3+ letters");
        const v2 = updateFieldUI(pass, isPassStrong(pass.value), "8+ chars (Upper, Lower, Number, Symbol)");
        const v3 = updateFieldUI(city, city.value !== "", "Please select a city");
        const v4 = updateFieldUI(area, area.value.trim().length > 0, "Area is required");
        const v5 = updateFieldUI(street, street.value.trim().length > 0, "Street is required");
        const v6 = updateFieldUI(build, build.value > 0, "Invalid building number");
        const v7 = updateFieldUI(phone, isPhoneValid(phone.value), "Phone must be 11 digits (01xxxxxxxxx)");

        const payment = document.querySelector('input[name="payment"]:checked');
        let v8 = true;
        if (!payment) {
            errBox.innerText = "Please select a payment method";
            errBox.style.color = "red";
            v8 = false;
        } else {
            errBox.innerText = "";
        }

        if (v1 && v2 && v3 && v4 && v5 && v6 && v7 && v8) {
            errBox.style.color = "green";
            errBox.innerText = "Order Placed Successfully!";
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    };
}

