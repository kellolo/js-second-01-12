let textBlock = document.querySelector('p');
let button = document.querySelector('button')
button.addEventListener('click', () => {
  textBlock.textContent = textBlock.textContent.replace(/'\B|\B'/g, '"');
})