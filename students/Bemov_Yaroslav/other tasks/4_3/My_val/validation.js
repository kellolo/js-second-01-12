let name = document.querySelector('input[name="name"]'),
    phoneNumber = document.querySelector('input[name="phoneNumber"]'),
    email = document.querySelector('input[name="email"]'),
    text = document.querySelector('input[name="text"]'),
    btn = document.querySelector('.btn-submit'),
    nameReg = /^[a-zA-Z][a-zA-Z\.]{1,20}$/gm;

btn.addEventListener('click', validation);

function validation() {
    let ok = nameReg.test(name.value);
    if (!ok) {
        name.classList.add('border-red');
    }
}