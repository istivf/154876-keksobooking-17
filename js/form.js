'use strict';

(function () {
  window.onload = function () {
    if (housingType.value === 'flat') {
      minPrice.setAttribute('min', 1000);
      minPrice.placeholder = '1000';
    }

    if (roomNumber.value === '1') {
      capacity.value = '1';
      capacity.children[0].setAttribute('disabled', 'disabled');
      capacity.children[3].setAttribute('disabled', 'disabled');
    }
  };

  var form = document.querySelector('.ad-form');
  var formFielsets = form.querySelectorAll('fieldset');
  var housingType = form.querySelector('#type');
  var minPrice = form.querySelector('#price');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');

  for (var a = 0; a < formFielsets.length; a++) {
    formFielsets[a].setAttribute('disabled', 'disabled');
  }

  housingType.addEventListener('input', function () {
    switch (housingType.value) {
      case 'bungalo':
        minPrice.setAttribute('min', 0);
        minPrice.placeholder = '0';
        window.rerenderPins();
        break;
      case 'flat':
        minPrice.setAttribute('min', 1000);
        minPrice.placeholder = '1000';
        window.rerenderPins();
        break;
      case 'house':
        minPrice.setAttribute('min', 5000);
        minPrice.placeholder = '5000';
        window.rerenderPins();
        break;
      case 'palace':
        minPrice.setAttribute('min', 10000);
        minPrice.placeholder = '10000';
        window.rerenderPins();
        break;
    }
  });

  timeIn.addEventListener('input', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('input', function () {
    timeIn.value = timeOut.value;
  });

  roomNumber.addEventListener('input', function () {
    switch (roomNumber.value) {
      case '1':
        capacity.value = '1';
        capacity.children[0].setAttribute('disabled', 'disabled');
        capacity.children[3].setAttribute('disabled', 'disabled');
        capacity.children[1].removeAttribute('disabled', 'disabled');
        capacity.children[2].removeAttribute('disabled', 'disabled');
        break;
      case '2':
        capacity.value = '2';
        capacity.children[0].setAttribute('disabled', 'disabled');
        capacity.children[3].setAttribute('disabled', 'disabled');
        capacity.children[1].removeAttribute('disabled', 'disabled');
        capacity.children[2].removeAttribute('disabled', 'disabled');
        break;
      case '3':
        capacity.value = '3';
        capacity.children[3].setAttribute('disabled', 'disabled');
        capacity.children[0].removeAttribute('disabled', 'disabled');
        capacity.children[1].removeAttribute('disabled', 'disabled');
        capacity.children[2].removeAttribute('disabled', 'disabled');
        break;
      case '100':
        capacity.value = '0';
        capacity.children[3].removeAttribute('disabled', 'disabled');
        capacity.children[0].setAttribute('disabled', 'disabled');
        capacity.children[1].setAttribute('disabled', 'disabled');
        capacity.children[2].setAttribute('disabled', 'disabled');
        break;
    }
  });
})();
