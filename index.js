// all input fields
const FIRSTNAME = document.querySelector('#first-name');
const LASTNAME = document.querySelector('#last-name');
const EMAIL = document.querySelector('#email');
const PASSWORD = document.querySelector('#password');
const PHONENUMBER = document.querySelector('#phone-number');
const CONFIRMPASS = document.querySelector('#confirm-pass');
const INPUTARRAY = document.querySelectorAll('input');


const SUBMITBUTTON = document.querySelector('.create-account-button');
const FORM = document.querySelector('.user-form');

const submitForm = (e) => {
  const isUserNameValid = checkRequiredMinAndMax(FIRSTNAME) && checkRequiredMinAndMax(LASTNAME);
  const isEmailValid = checkTypeMismatch(EMAIL);
  const isPasswordValid = checkRequiredMinAndMax(PASSWORD);
  const isPhoneNumberValid = checkPhoneNumber(PHONENUMBER);
  const doPasswordsMatch = comparePassValues(PASSWORD, CONFIRMPASS);

  if (isUserNameValid && isEmailValid && isPasswordValid && isPhoneNumberValid && doPasswordsMatch) {
    FORM.submit();
  } else {
    preventSubmission(e);
  };

  function checkRequiredMinAndMax(elem) {

    if (elem.validity.tooShort || elem.validity.tooLong || elem.validity.valueMissing) {
      addValidOrInvalidClass(elem, 'invalid')
      return false;
    };

    addValidOrInvalidClass(elem, 'valid');
    return true;
  };

  function preventSubmission(e) {
    e.preventDefault();
    window.history.back();
  };

  function checkTypeMismatch(elem) {
    if (elem.validity.typeMismatch) {
      addValidOrInvalidClass(elem, 'invalid');
      return false;
    };
    addValidOrInvalidClass('valid');
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
      addValidOrInvalidClass(elem, 'valid');
      return true;
    };

    addValidOrInvalidClass(elem, 'invalid');
    return false;
  };

  function comparePassValues(elem1, elem2) {
    if (elem1.value === elem2.value) {
      addValidOrInvalidClass(elem2, 'valid');
      return true;
    };

    addValidOrInvalidClass(elem2, 'invalid');
    return false;
  };

  function addValidOrInvalidClass(elem, value) {
    debugger;
    const id = elem.id;
    const label = document.querySelector(`[for="${id}"]`);
    elem.classList.add(`input-${value}`);
    label.classList.add(`label-${value}`);
  };

};

SUBMITBUTTON.addEventListener('click', submitForm);