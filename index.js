// all input fields
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const phoneNumber = document.querySelector('#phone-number');
const confirmPass = document.querySelector('#confirm-pass');


const submitButton = document.querySelector('.create-account-button');
const form = document.querySelector('.user-form');

submitButton.addEventListener('click', (e) => {
  form.submit();
});