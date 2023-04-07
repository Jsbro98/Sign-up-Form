// all input fields
const FIRSTNAME = document.querySelector('#first-name');
const LASTNAME = document.querySelector('#last-name');
const EMAIL = document.querySelector('#email');
const PASSWORD = document.querySelector('#password');
const PHONENUMBER = document.querySelector('#phone-number');
const CONFIRMPASS = document.querySelector('#confirm-pass');

const INPUTARRAY = [
  {elem: FIRSTNAME, validation: checkRequiredMinAndMax.bind(null, FIRSTNAME)},
  {elem: LASTNAME, validation: checkRequiredMinAndMax.bind(null, LASTNAME)},
  {elem: EMAIL, validation: checkTypeMismatch.bind(null, EMAIL)},
  {elem: PASSWORD, validation: checkRequiredMinAndMax.bind(null, PASSWORD)},
  {elem: PHONENUMBER, validation: checkPhoneNumber.bind(null, PHONENUMBER)},
  {elem: CONFIRMPASS, validation: comparePassValues.bind(null, PASSWORD, CONFIRMPASS)}
];



const SUBMITBUTTON = document.querySelector('.create-account-button');
const FORM = document.querySelector('.user-form');

// Main form submition function
const submitForm = (e) => {

  checkFormForEmptyValues(e);

  if ( INPUTARRAY.every(obj => obj.elem.validity.valid) ) {
    FORM.submit();
  } else {
    preventSubmission(e);
  };
};


addListenersToInputs();

SUBMITBUTTON.addEventListener('click', submitForm);

// listeners to check for empty input after focusout
INPUTARRAY.forEach(obj => obj.elem.addEventListener('focusout', (e) => {
  
  if (obj.elem.value === '') {
    obj.validation();
    addValidOrInvalidClass(obj.elem, 'invalid');
  };

}));


// ---------------------------------------------------------------------------------------------------------------

// functions used for main logic

function addOrRemoveErrorMessage(elem, option, message) {
  const errorSpan = document.querySelector(`.error-message.${elem.id}`);

  if (option === 'add') {

    errorSpan.textContent = message;
    errorSpan.style.opacity = '1';

  } else if (option === 'remove') {

    errorSpan.style.opacity = '0';
  };

};


function addListenersToInputs() {
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
};


function preventSubmission(e) {
  e.preventDefault();
  window.history.back();
};


function checkRequiredMinAndMax(elem) {

  if (elem.validity.tooShort) {

    addOrRemoveErrorMessage(elem, 'add', `Input is too short, it must be ${elem.minLength} characters long`);
    return false;

  } else if (elem.validity.tooLong) {

    addOrRemoveErrorMessage(elem, 'add', `Input is too long, it must be ${elem.maxLength} characters long`);
    return false;

  } else if (elem.validity.valueMissing) {

    addOrRemoveErrorMessage(elem, 'add', `This input is required`);
    return false;

  };

  addOrRemoveErrorMessage(elem, 'remove');
  return true;
};


function checkTypeMismatch(elem) {

  if (elem.validity.typeMismatch) {

    addOrRemoveErrorMessage(elem, 'add', 'Please enter a valid email address');
    return false;

  } else if (elem.value === '') {

    addOrRemoveErrorMessage(elem, 'add', 'This input is required');
    return false;

  };

  addOrRemoveErrorMessage(elem, 'remove');
  return true;
};


function checkPhoneNumber(elem) {
  let value = elem.value;

  if (value === '') {

    addOrRemoveErrorMessage(elem, 'add', 'This input is required');
    return false
  };

  const tokens = ['(', ')', ' ', '-'];

  for (token of tokens) {
    if (value.includes(token)) {
      value = value.replaceAll(token, '');
    };
  };


  if (typeof(+value) === 'number' && value.length === 10) {

    addOrRemoveErrorMessage(elem, 'remove');
    return true;
  };

  addOrRemoveErrorMessage(elem, 'add', 'Please enter a valid phone number');
  return false;
};


function comparePassValues(elem1, elem2) {
  if (elem2.value === '') {

    addOrRemoveErrorMessage(elem2, 'add', 'This input is required');
    elem2.setCustomValidity('invalid');
    return false;
  }

  if (elem1.value === elem2.value) {

    addOrRemoveErrorMessage(elem2, 'remove');
    elem2.setCustomValidity('');
    return true;
  };

  addOrRemoveErrorMessage(elem2, 'add', 'Passwords do not match');
  elem2.setCustomValidity('invalid');
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

};