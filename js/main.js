'use strict';

var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var form = document.querySelector('.ad-form');
var formFielsets = form.querySelectorAll('fieldset');
var mainPin = document.querySelector('.map__pin--main');
var addressInput = document.querySelector('#address');
var housingType = form.querySelector('#type');
var minPrice = form.querySelector('#price');
var timeIn = form.querySelector('#timein');
var timeOut = form.querySelector('#timeout');
var main = document.querySelector('main');
var PIN_WIDTH = 65;
var PIN_HEIGHT = 85;

var adsAdded = false;

window.onload = function () {
  if (housingType.value === 'flat') {
    minPrice.setAttribute('min', 1000);
    minPrice.placeholder = '1000';
  }
};

for (var a = 0; a < formFielsets.length; a++) {
  formFielsets[a].setAttribute('disabled', 'disabled');
}

var createAds = function (amount) {
  var adsList = [];
  var offerType = ['palace', 'flat', 'house', 'bungalo'];
  for (var i = 0; i < amount; i++) {
    var adTemplate = {
      'author': {
        'avatar': 'img/avatars/user0' + [i + 1] + '.png'
      },
      'offer': {
        'type': offerType[Math.floor(Math.random() * offerType.length)]
      },
      'location': {
        'x': Math.floor(Math.random() * map.clientWidth),
        'y': Math.floor(130 + Math.random() * (630 - 130))
      }
    };
    adsList.push(adTemplate);
  }
  return adsList;
};

var createPin = function (ad) {
  var pin = pinTemplate.cloneNode(true);
  pin.firstChild.src = ad.author.avatar;
  pin.firstChild.alt = ad.offer.type;
  pin.style.left = (ad.location.x - 25) + 'px';
  pin.style.top = (ad.location.y) + 'px';
  return pin;
};

var displayAds = function (ads) {
  var pins = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    var currentPin = createPin(ads[i]);
    pins.appendChild(currentPin);
  }
  mapPins.appendChild(pins);
};

addressInput.value = mainPin.offsetLeft + ', ' + mainPin.offsetTop;

mainPin.addEventListener('mousedown', function () {
  if (!adsAdded) {
    var ads = createAds(8);
    displayAds(ads);
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
