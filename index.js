// all input fields
const FIRSTNAME = document.querySelector('#first-name');
const LASTNAME = document.querySelector('#last-name');
const EMAIL = document.querySelector('#email');
const PASSWORD = document.querySelector('#password');
const PHONENUMBER = document.querySelector('#phone-number');
const CONFIRMPASS = document.querySelector('#confirm-pass');


const SUBMITBUTTON = document.querySelector('.create-account-button');
const FORM = document.querySelector('.user-form');

const submitForm = (e) => {
  const isUserNameValid = checkRequiredMinAndMax(FIRSTNAME) && checkRequiredMinAndMax(LASTNAME);
  const isEmailValid = checkTypeMismatch(EMAIL);
  const isPasswordValid = checkRequiredMinAndMax(PASSWORD);
  const isPhoneNumberValid = checkPhoneNumber(PHONENUMBER);

  if (isUserNameValid && isEmailValid && isPasswordValid && isPhoneNumberValid) {
    FORM.submit();
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

  function checkPhoneNumber(elem) {
    let value = elem.value;

    const tokens = ['(', ')', ' ', '-'];

    for (token of tokens) {
      if (value.includes(token)) {
        value = value.replaceAll(token, '');
      };
    };

    if (typeof(+value) === 'number' && value.length === 10) {
      return true;
    };

    return false;
  };
};

SUBMITBUTTON.addEventListener('click', submitForm);