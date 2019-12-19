let textBlock = document.querySelector('p');
document.querySelector('button').addEventListener('click', () => {
  textBlock.textContent = textBlock.textContent.replace(/'\B|\B'/g, '"');
})