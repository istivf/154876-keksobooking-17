'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var main = document.querySelector('main');
  var mainPin = document.querySelector('.map__pin--main');
  var housingType = document.querySelector('#housing-type');
  var form = document.querySelector('.ad-form');
  var formFielsets = form.querySelectorAll('fieldset');
  var addressInput = document.querySelector('#address');
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 85;

  var adsAdded = false;

  mainPin.addEventListener('mousedown', function (evt) {
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

    var getCoords = function () {
      var el = mainPin.getBoundingClientRect();
      return {
        x: el.left,
        y: el.top
      };
    };
    var coords = getCoords();

    var objShift = {
      x: evt.clientX,
      y: evt.clientY
    };

    addressInput.value = (mainPin.offsetLeft + Math.ceil((PIN_WIDTH / 2))) + ', ' + (mainPin.offsetTop + PIN_HEIGHT);

    var onMouseMove = function (moveEvt) {

      var shift = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };

      mainPin.style.top = (shift.y - (objShift.y - coords.y)) + 'px';
      mainPin.style.left = (shift.x - (objShift.x - coords.x) - main.offsetLeft) + 'px';

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

      addressInput.value = (mainPin.offsetLeft + Math.ceil((PIN_WIDTH / 2))) + ', ' + (mainPin.offsetTop + PIN_HEIGHT);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  housingType.addEventListener('input', function () {
    window.rerenderPins();
  });

  window.rerenderPins = function () {
    var pins = mapPins.querySelectorAll('[type="button"]');
    pins.forEach(function (el) {
      mapPins.removeChild(el);
    });
    var adCards = map.querySelectorAll('.map__card');
    adCards.forEach(function (el) {
      map.removeChild(el);
    });
    window.ads = window.xhrResponse.filter(function (ad) {
      return ad.offer.type === housingType.value;
    }).filter(function (ad, index) {
      return index < window.MAX_ADS_AMOUNT;
    });
    pins = window.getAds(window.ads);
    mapPins.appendChild(pins);
  };
})();
