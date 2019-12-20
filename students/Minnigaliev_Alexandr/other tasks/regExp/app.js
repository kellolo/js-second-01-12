document.querySelector('button').addEventListener ('click', function () {
    let inputs = document.querySelectorAll ('.myFormBoxElement')
    let test = {
        userName: /^([a-zа-я]+)$/gmi,
        userPhone: /\+\d\(\d{3}\)\d{3}-\d{4}$/gmi,
        userEmail: /(^[a-z0-9]+[\.|\-][a-z0-9]+@mail\.ru$)|(^[a-z0-9]+@mail\.ru$)/gmi,
    }
    
    inputs.forEach(function (input) {
        let userInput = input.dataset.id
        if ( !test[userInput].test(input.value) ) {
            input.style.borderColor = 'red'
            input.parentNode.querySelector('p').style.display = 'block'
        } else {
            input.style.borderColor = 'initial'
            input.parentNode.querySelector('p').style.display = 'none'
        }
    })
})