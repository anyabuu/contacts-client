export { renderClient };

function renderClient({ name, number }) {
  const listElem = document.querySelector('.contacts');
  const liElem = document.createElement('li');
  liElem.classList.add('contact');

  liElem.innerHTML = `
        <h2 class="contact__title">${name}<h2>
        <a href='tel:${number}'>${number}</a>
        `;

  listElem.append(liElem);
}
