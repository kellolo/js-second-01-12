let text = document.querySelector('.text1').innerHTML = "'Что-то похолодало, может, неподалеку град прошел', - подумал Петр."
let regexp = text.replace(/'/g, '\"');
let replacedTxt = document.querySelector('.text2').innerHTML = regexp;

let music = document.querySelector('.text3').innerHTML = "Один из моих любимых треков - 'The Offspring - The Kids Aren't Alright'"
let replaceMusic = music.replace(/^'|(\s)'|'(\s)|'$/g, '$1"$2');
let replacedMusic = document.querySelector('.text4').innerHTML = replaceMusic;