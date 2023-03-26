// all input fields
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const phoneNumber = document.querySelector('#phone-number');
const confirmPass = document.querySelector('#confirm-pass');


const submitButton = document.querySelector('.create-account-button');
const form = document.querySelector('.user-form');

const submitForm = (e) => {
  const isUserNameValid = checkRequiredMinAndMax(firstName) && checkRequiredMinAndMax(lastName);
  const isEmailValid = checkTypeMismatch(email);
  const isPasswordValid = checkRequiredMinAndMax(password);

  if (isUserNameValid && isEmailValid && isPasswordValid) {
    form.submit();
  } else {
    preventSubmission(e);
  };

  function checkRequiredMinAndMax(elem) {

    if (elem.validity.tooShort) {
      console.log('A name is too short');
      return false;
    } else if (elem.validity.tooLong) {
      console.log('A name is too long');
      return false;
    } else if (elem.validity.valueMissing) {
      console.log('Please fill out required fields');
      return false;
    }

    return true;
  };

  function preventSubmission(e) {
    e.preventDefault();
    window.history.back();
  };

  function checkTypeMismatch(elem) {
    if (elem.validity.typeMismatch) {
      return false;
    };
    return true;
  };
};

submitButton.addEventListener('click', submitForm);