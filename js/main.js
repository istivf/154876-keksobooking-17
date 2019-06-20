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
  pin.style.top = (ad.location.y - 70) + 'px';
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

mainPin.addEventListener('click', function () {
  var ads = createAds(8);
  map.classList.remove('map--faded');
  displayAds(ads);
  form.classList.remove('ad-form--disabled');
  for (var i = 0; i < formFielsets.length; i++) {
    formFielsets[i].removeAttribute('disabled');
  }
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
