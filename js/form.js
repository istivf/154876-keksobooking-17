'use strict';

(function () {
  window.onload = function () {
    if (housingType.value === 'flat') {
      minPrice.setAttribute('min', 1000);
      minPrice.placeholder = '1000';
    }
  };

  var form = document.querySelector('.ad-form');
  var formFielsets = form.querySelectorAll('fieldset');
  var housingType = form.querySelector('#type');
  var minPrice = form.querySelector('#price');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');

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
})();
