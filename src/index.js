import { renderClient } from './renderClient.js';

window.addEventListener('DOMContentLoaded', (event) => {
  const clientForm = document.querySelector('.form');
  const link = 'https://contacts-api-learn.herokuapp.com/api'

  fetch(`${link}/contacts`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      Object.values(data).forEach(renderClient);
    })
    .catch(function (error) {
      console.log(error);
    });

  clientForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const requestData = new FormData(this);

    if (
      [...clientForm.elements]
        .filter((elem) => elem.tagName === 'INPUT')
        .reduce((accum, elem) => {
          return validateLength(elem) && accum;
        }, true)
    ) {
      fetch(`${link}/contacts`, {
        method: 'POST',
        body: requestData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          renderClient(data);
          clientForm.reset();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  clientForm.addEventListener('input', ({ target }) => {
    validateLength(target);
  });

  function validateLength(element) {
    const elemMessage = element
      .closest('label')
      .querySelector('.input__message');
    const { min, max } = element.dataset;

    if (!element.value.length) {
      elemMessage.innerText = `*This field is required`;
      return false;
    } else if (element.value.length < +min) {
      elemMessage.innerText = `*It should be more than ${min} symbols`;
      return false;
    } else if (element.value.length > +max) {
      elemMessage.innerText = `*It should be less then ${max} symbols`;
      return false;
    }

    elemMessage.innerText = '';
    return true;
  }
});
