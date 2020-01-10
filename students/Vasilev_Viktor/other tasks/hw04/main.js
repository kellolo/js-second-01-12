// 1. Дан большой текст, в котором для оформления прямой речи используются одинарные
// кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.
// 2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на
// двойную.
// 3. * Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить.
// При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
// a. Имя содержит только буквы.
// b. Телефон имеет вид +7(000)000-0000.
// c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
// d. Текст произвольный.
// e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой
// и сообщить пользователю об ошибке.
'use strict';

// Решение заданий 1 и 2:

const str = "'After the sunset,' he said. 'We'll have to go home.'";
const regExp = /\B'/g;
str.replace(regExp, '"');

// Решение задания 3:

class EmailValidation {
  constructor(
    namePattern,
    phonePattern,
    emailPattern,
    nameErrorMessage,
    phoneErrorMessage,
    emailErrorMessage,
    formClass = '.formClass',
    submitBtnClass = '.submitBtnClass',
    nameFieldId = 'name',
    emailFiledId = 'email',
    phoneFieldId = 'phone',
    validFieldClass = 'is-valid',
    invalidFieldClass = 'is-invalid',
    invalidFeedbackClass = 'invalid-feedback',
  ) {
    this.regExpPatterns = {
      namePattern: namePattern,
      phonePattern: phonePattern,
      emailPattern: emailPattern,
    };
    this.errorMessages = {
      nameErrorMessage: nameErrorMessage,
      phoneErrorMessage: phoneErrorMessage,
      emailErrorMessage: emailErrorMessage,
    };
    this.formClass = formClass;
    this.submitBtnClass = submitBtnClass;
    this.nameFieldId = nameFieldId;
    this.emailFiledId = emailFiledId;
    this.phoneFieldId = phoneFieldId;
    this.validFieldClass = validFieldClass;
    this.invalidFieldClass = invalidFieldClass;
    this.invalidFeedbackClass = invalidFeedbackClass;
  }

  init() {
    const $submitBtn = document.querySelector(this.submitBtnClass);
    $submitBtn.addEventListener('click', event => this.submitBtnClickHandler(event));
  }

  submitBtnClickHandler(event) {
    this.validateForm();
    this.submitForm(event);
  }

  validateForm() {
    const $inputElements = this.getForm().getElementsByTagName('INPUT');
    for (const $inputElement of $inputElements) {
      this.removeValidationStyles($inputElement);
      if (this.isFieldValid($inputElement)) {
        EmailValidation.markTheField($inputElement, this.validFieldClass);
      } else {
        EmailValidation.markTheField($inputElement, this.invalidFieldClass);
        this.addMessage($inputElement);
      }
    }
  }

  removeValidationStyles(field) {
    field.classList.remove(this.invalidFieldClass, this.validFieldClass);
  }

  submitForm(event) {
    if (!this.isFormValid()) {
      event.preventDefault();
    }
  }

  isFieldValid(field) {
    switch (field.id) {
      case this.nameFieldId:
        return this.regExpPatterns.namePattern.test(field.value);
      case this.phoneFieldId:
        return this.regExpPatterns.phonePattern.test(field.value);
      case this.emailFiledId:
        return this.regExpPatterns.emailPattern.test(field.value);
    }
  }

  static markTheField(field, fieldClass) {
    field.classList.add(fieldClass);
  }

  addMessage(field) {
    let message = this.getErrorMessage(field);
    let siblingElem = field.nextSibling.nextSibling;
    siblingElem.classList.add(this.invalidFeedbackClass);
    siblingElem.innerText = message;
  }

  isFormValid() {
    return !this.getForm().getElementsByClassName(this.invalidFieldClass).length;
  }

  getErrorMessage(field) {
    switch (field.id) {
      case this.nameFieldId:
        return this.errorMessages.nameErrorMessage;
      case this.phoneFieldId:
        return this.errorMessages.phoneErrorMessage;
      case this.emailFiledId:
        return this.errorMessages.emailErrorMessage;
    }
  }

  getForm() {
    return document.querySelector(this.formClass);
  }
}


const nameRegexp = /^[A-Za-zА-ЯА-яЁё]+$/;
const phoneRegexp = /^\+[0-9]{1,3}\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/;
const emailRegexp = /^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z.]{2,6})$/;
const nameErrorMessage = 'Поле должно содержать только буквы';
const phoneErrorMessage = 'Телефон должен иметь вид +7(000)000-0000';
const emailErrorMessage = 'E-mail должен иметь вид mymail@mail.ru';


window.addEventListener('load', () => {
  const emailValidation = new EmailValidation(
    nameRegexp,
    phoneRegexp,
    emailRegexp,
    nameErrorMessage,
    phoneErrorMessage,
    emailErrorMessage,
    );
  emailValidation.formClass = '.test-form';
  emailValidation.submitBtnClass = '.btn-submit';
  emailValidation.init();
});
