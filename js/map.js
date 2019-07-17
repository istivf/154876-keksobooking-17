'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var main = document.querySelector('main');
  var mainPin = document.querySelector('.map__pin--main');
  var inputFilters = document.querySelectorAll('.map__filter');
  var checkboxFilters = document.querySelectorAll('.map__checkbox');
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

  var lastTimeout;
  var startRerenderPins = function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.rerenderPins();
    }, 500);
  };

  inputFilters.forEach(function (it) {
    it.addEventListener('input', startRerenderPins);
  });

  checkboxFilters.forEach(function (it) {
    it.addEventListener('click', startRerenderPins);
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
    window.ads = window.xhrResponse;
    inputFilters.forEach(function (filter) {
      if (filter.value === 'any') {
        return false;
      }

      window.ads = window.ads.filter(function (ad) {
        var adValueName = filter.name.replace('housing-', '');
        var result;

        switch (adValueName) {
          case 'type':
            result = ad.offer.type === filter.value;
            break;
          case 'price':
            var adPrice;
            if (ad.offer.price < 10000) {
              adPrice = 'low';
            } else if (ad.offer.price >= 10000 && filter.value <= 50000) {
              adPrice = 'middle';
            } else if (ad.offer.price > 50000) {
              adPrice = 'high';
            }
            result = adPrice === filter.value;
            break;
          case 'rooms':
            result = ad.offer.rooms === parseInt(filter.value, 10);
            break;
          case 'guests':
            result = ad.offer.guests === parseInt(filter.value, 10);
            break;
        }
        return result;
      });

      return null;
    });

    checkboxFilters.forEach(function (checkbox) {
      if (checkbox.checked === false) {
        return false;
      }

      window.ads = window.ads.filter(function (ad) {
        return ad.offer.features.includes(checkbox.value);
      });
      return null;
    });
    window.ads = window.ads.slice(0, window.MAX_ADS_AMOUNT);
    pins = window.getAds(window.ads);
    mapPins.appendChild(pins);
  };
})();
