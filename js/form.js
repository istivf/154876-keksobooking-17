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
    if (housingType.value === 'bungalo') {
      minPrice.setAttribute('min', 0);
      minPrice.placeholder = '0';
    } else if (housingType.value === 'flat') {
      minPrice.setAttribute('min', 1000);
      minPrice.placeholder = '1000';
    } else if (housingType.value === 'house') {
      minPrice.setAttribute('min', 5000);
      minPrice.placeholder = '5000';
    } else if (housingType.value === 'palace') {
      minPrice.setAttribute('min', 10000);
      minPrice.placeholder = '10000';
    }
  });

  timeIn.addEventListener('input', function () {
    if (timeIn.value === '12:00') {
      timeOut.value = '12:00';
    } else if (timeIn.value === '13:00') {
      timeOut.value = '13:00';
    } else if (timeIn.value === '14:00') {
      timeOut.value = '14:00';
    }
  });

  timeOut.addEventListener('input', function () {
    if (timeOut.value === '12:00') {
      timeIn.value = '12:00';
    } else if (timeOut.value === '13:00') {
      timeIn.value = '13:00';
    } else if (timeOut.value === '14:00') {
      timeIn.value = '14:00';
    }
  });
})();
