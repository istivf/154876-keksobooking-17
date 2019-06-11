'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

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

var ads = createAds(8);
displayAds(ads);
