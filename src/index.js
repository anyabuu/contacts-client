
window.addEventListener('DOMContentLoaded', (event) => {

    const clientForm = document.forms[0]

    const inputName = document.querySelector('[name = name]');
    const inputNumber = document.querySelector('[name = number]');
    const validationMessage = document.querySelector('.input__message');


    fetch('https://contacts-api-learn.herokuapp.com/api/contacts')
        .then (async (response) => {
            return await response.json()
        })
        .then(function (data) {

            Object.values(data).forEach(function(client){
                addClient(client.name, client.number)
            })

        })
        .catch(function (error) {
            console.log(error)
        })




    clientForm.addEventListener('submit', function(event) {

        const requestData = new FormData(this)
        console.log(requestData)

        fetch('https://contacts-api-learn.herokuapp.com/api/contacts', {
            method: 'POST',
            body: requestData
        })
            .then(async(response) => {

                if (!inputName || !inputNumber || validationMessage.innerText){
                    event.preventDefault()
                    return
                }

                addClient(await response.json());

                inputName.value = ''
                inputNumber.value = ''
        })
            .catch((error) => {
            console.log(error)
        })


    })

    function addClient (name, number) {
        const listElem = document.querySelector('.contacts');
        const liElem = document.querySelector('.contact');

        let clonedLi = liElem.cloneNode(true)
        clonedLi.querySelector('.contact__title').innerText = name
        clonedLi.querySelector('a').innerText = number
        clonedLi.querySelector('a').href = `tel:+${number}`;

        listElem.append(clonedLi);

    }


    function validateLength(element, minLength, maxLength) {
        return function (){

            const elemMessage = element.closest('label').querySelector('.input__message')

            if (element.value.length < minLength) {
                elemMessage.innerText = `*It should be more than ${minLength} symbols`
            } else if (element.value.length > maxLength) {
                elemMessage.innerText = `*It should be less then ${maxLength} symbols`
            } else {
                elemMessage.innerText = ''
            }
        }
    }


    inputName.addEventListener('change', validateLength(inputName, 4,20));
    inputNumber.addEventListener('change', validateLength(inputNumber, 12, 20));


});
