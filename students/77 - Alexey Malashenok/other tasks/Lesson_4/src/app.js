'use strict';

send.addEventListener('click', () => {
    
    let regExpName = /[a-zA-ZА-Яа-яёЁ]+/g;
    let regExpPhone = /\+{1}\d{1}-{1}\d{3}-{1}\d{3}-{1}\d{2}-{1}\d{2}/g;
    let regExpMail = /\w{6}@\w{4}\.\w{2}|\w{2}\.\w{4}@\w{4}\.\w{2}|\w{2}-\w{4}@\w{4}\.\w{2}/g;

    let name = document.querySelector('#name');
    let phone = document.querySelector('#phone');
    let mail = document.querySelector('#email');

    let nameMsg = document.querySelector('#name-message');
    let phoneMsg = document.querySelector('#phone-message');
    let mailMsg = document.querySelector('#email-message');

    name.style.outline = "none";
    phone.style.outline = "none";
    mail.style.outline = "none";

    nameMsg.textContent = "";
    phoneMsg.textContent = "";
    mailMsg.textContent = "";


    let nameText = name.value;
    let phoneText = phone.value;
    let mailText = mail.value;

    if(!regExpName.test(nameText)) {
        name.style.outline = "2px solid red";
        nameMsg.textContent = "Имя должно содержать только буквы";
    }

    if(!regExpPhone.test(phoneText)) {
        phone.style.outline = "2px solid red";
        phoneMsg.textContent = "Телефон должен быть в формате +7-999-999-99-99";
    }

    if(!regExpMail.test(mailText)) {
        mail.style.outline = "2px solid red";
        mailMsg.textContent = "E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru или my-mail@mail.ru.";
    }
});
