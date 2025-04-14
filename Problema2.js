const btn = document.getElementById('btn');
const birthInput = document.getElementById('birth');
const ageInput = document.getElementById('age');

function nameValidation(name) {
    if (name === '') return false;
    const regex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    return regex.test(name);
}

function birthValidation(birth) {
    if (birth === '') return false;
    return !isNaN(Date.parse(birth)) && new Date(birth) < new Date();
}

function ageValidation(age) {
    if (age === '') return false;
    const regex = /^[0-9]+$/;
    return regex.test(age);
}

function emailValidation(email) {
    if (email === '') return false;
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}

function calculateAge(dateString) {
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

// Auto-completare varsta din data nasterii
birthInput.addEventListener('change', () => {
    const val = birthInput.value;
    if (birthValidation(val)) {
        const age = calculateAge(val);
        ageInput.value = age;
    } else {
        ageInput.value = '';
    }
});

btn.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.form-control input');
    const myName = inputs[0].value;
    const birthdate = inputs[1].value;
    const age = inputs[2].value;
    const email = inputs[3].value;
    let error = '';

    if (!nameValidation(myName)) {
        error += 'Numele introdus nu este valid!\n';
        inputs[0].style.border = '2px solid red';
    } else {
        inputs[0].style.border = '2px solid #ccc';
    }

    if (!birthValidation(birthdate)) {
        error += 'Data nasterii nu este valida!\n';
        inputs[1].style.border = '2px solid red';
    } else {
        inputs[1].style.border = '2px solid #ccc';
    }

    if (!ageValidation(age)) {
        error += 'Varsta nu este valida!\n';
        inputs[2].style.border = '2px solid red';
    } else {
        inputs[2].style.border = '2px solid #ccc';
    }

    if (!emailValidation(email)) {
        error += 'Adresa de email nu este valida!\n';
        inputs[3].style.border = '2px solid red';
    } else {
        inputs[3].style.border = '2px solid #ccc';
    }

    if (error) {
        alert(error);
    } else {
        alert('Datele au fost trimise cu succes!');
        inputs.forEach(input => {
            input.value = '';
            input.style.border = '2px solid #ccc';
        });
    }
});
