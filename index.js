// all input fields
const FIRSTNAME = document.querySelector('#first-name');
const LASTNAME = document.querySelector('#last-name');
const EMAIL = document.querySelector('#email');
const PASSWORD = document.querySelector('#password');
const PHONENUMBER = document.querySelector('#phone-number');
const CONFIRMPASS = document.querySelector('#confirm-pass');
const INPUTARRAY = [
  {elem: FIRSTNAME, validation: checkRequiredMinAndMax.bind(this, FIRSTNAME)},
  {elem: LASTNAME, validation: checkRequiredMinAndMax.bind(this, LASTNAME)},
  {elem: EMAIL, validation: checkTypeMismatch.bind(this, EMAIL)},
  {elem: PASSWORD, validation: checkRequiredMinAndMax.bind(this, PASSWORD)},
  {elem: PHONENUMBER, validation: checkPhoneNumber.bind(this, PHONENUMBER)},
  {elem: CONFIRMPASS, validation: comparePassValues.bind(this, PASSWORD, CONFIRMPASS)}
];



const SUBMITBUTTON = document.querySelector('.create-account-button');
const FORM = document.querySelector('.user-form');

const submitForm = (e) => {

  checkFormForEmptyValues(e);

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
};

for (let i = 0; i < INPUTARRAY.length; i++) {
  const currentElem = INPUTARRAY[i].elem;
  const currentValidation = INPUTARRAY[i].validation;

  currentElem.addEventListener('input', (e) => {

    if ( currentValidation() ) {

      addValidOrInvalidClass(currentElem, 'valid');

    } else {

      addValidOrInvalidClass(currentElem, 'invalid');
    };

  });
};

SUBMITBUTTON.addEventListener('click', submitForm);




// functions used for main logic

function preventSubmission(e) {
  e.preventDefault();
  window.history.back();
};

function checkRequiredMinAndMax(elem) {

  if (elem.validity.tooShort || elem.validity.tooLong || elem.validity.valueMissing) {
    return false;
  };

  return true;
};

function checkTypeMismatch(elem) {
  if (elem.validity.typeMismatch || elem.value === '') {
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

function comparePassValues(elem1, elem2) {
  if (elem1.value === elem2.value) {
    return true;
  };

  return false;
};

function addValidOrInvalidClass(elem, value) {
  const id = elem.id;
  const label = document.querySelector(`[for="${id}"]`);

  if (elem.classList.contains('input-valid') && value === 'invalid') {

    elem.classList.remove('input-valid');
    label.classList.remove('label-valid');
    
  } else if (elem.classList.contains('input-invalid') && value === 'valid') {

    elem.classList.remove('input-invalid');
    label.classList.remove('label-invalid');
  };

  elem.classList.add(`input-${value}`);
  label.classList.add(`label-${value}`);
};

// passing event for preventSubmission
function checkFormForEmptyValues(event) {
  let isAnyElemEmpty = false;

  for (obj of INPUTARRAY) {
    if ( checkForEmptyValue(obj.elem) ) {
      obj.validation();
      addValidOrInvalidClass.call(obj, obj.elem, 'invalid');
      isAnyElemEmpty = true;
    }
   };
  
   if (isAnyElemEmpty) {
    preventSubmission(event);
    return;
    };
  };

function checkForEmptyValue(elem) {
  if (elem.value === '') {
    return true;
  } else {
    return false;
  };

}