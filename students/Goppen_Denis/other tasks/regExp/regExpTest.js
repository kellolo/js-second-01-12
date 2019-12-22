
function testRegExp() {
  try {
    let testExp = new RegExp(document.getElementById('regExpInput').value, 'g');
    let testText = document.getElementById('regExpText').value;
    document.getElementById('regExpResult').value =
      testText.replace(testExp, document.getElementById('regExpReplace').value);
  } catch (regException) {
    alert(regException.message);
  }
}

function fillInit() {
  document.getElementById('regExpText').value =
    "'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, " +
    "as opposed to using 'Content here, content here', making it's look like readable English.\n" +
    "Идейные соображения 'высшего порядка', а также укрепление и развитие структуры иг'ает важную роль " +
    "в формировании 'существенных финансовых и административных условий'.\n'Поехали!'";
  document.getElementById('regExpResult').value = "";
  document.getElementById('regExpInput').value = "'\\B|\\B'";
  document.getElementById('regExpReplace').value = '"';
}

function checkName () {
  let regTest = /^[ A-Za-zА-Яа-яЁё]{3,}$/;
  if (!regTest.test(document.getElementById('nameTextId').value))
  {
    document.getElementById('nameTextLabel').classList.add('labelIncorrect');
    document.getElementById('nameTextId').classList.add('inputTextIncorrect');
  } else {
    document.getElementById('nameTextLabel').classList.remove('labelIncorrect');
    document.getElementById('nameTextId').classList.remove('inputTextIncorrect');
  }
}

function checkMail() {
  let regTest = /^[a-z]+([-\.]?(?=[a-z])[a-z]*)*@[a-z]+([-\.]?(?=[a-z])[a-z]*)+[\.]{1}[a-z]+$/;
  if (!regTest.test(document.getElementById('mailTextId').value))
  {
    document.getElementById('mailTextLabel').classList.add('labelIncorrect');
    document.getElementById('mailTextId').classList.add('inputTextIncorrect');
  } else {
    document.getElementById('mailTextLabel').classList.remove('labelIncorrect');
    document.getElementById('mailTextId').classList.remove('inputTextIncorrect');
  }
}

function checkPhone() {
  let regTest = /^(\+7)?\(?\d{3}\)?\d{3}-?\d{2}-?\d{2}$/;
  if (!regTest.test(document.getElementById('phoneTextId').value))
  {
    document.getElementById('phoneTextLabel').classList.add('labelIncorrect');
    document.getElementById('phoneTextId').classList.add('inputTextIncorrect');
  } else {
    document.getElementById('phoneTextLabel').classList.remove('labelIncorrect');
    document.getElementById('phoneTextId').classList.remove('inputTextIncorrect');
  }
}

fillInit();