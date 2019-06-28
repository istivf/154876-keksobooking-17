'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var main = document.querySelector('main');
  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var formFielsets = form.querySelectorAll('fieldset');
  var addressInput = document.querySelector('#address');
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 85;

  var adsAdded = false;

  mainPin.addEventListener('mousedown', function () {
    if (!adsAdded) {
      var pins = window.getAds(window.ads);
      mapPins.appendChild(pins);
      adsAdded = true;
    }
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    for (var i = 0; i < formFielsets.length; i++) {
      formFielsets[i].removeAttribute('disabled');
    }

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (shift.y - main.offsetTop - PIN_HEIGHT) + 'px';
      mainPin.style.left = (shift.x - main.offsetLeft - (PIN_WIDTH / 2)) + 'px';

      if (mainPin.offsetTop < (130)) {
        mainPin.style.top = 130 + 'px';
      }
      if (mainPin.offsetTop > 630) {
        mainPin.style.top = 630 + 'px';
      }
      if (mainPin.offsetLeft < 0) {
        mainPin.style.left = 0 + 'px';
      }
      if (mainPin.offsetLeft > 1200) {
        mainPin.style.left = 1200 + 'px';
      }
      addressInput.value = mainPin.offsetLeft + ', ' + mainPin.offsetTop;
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();
