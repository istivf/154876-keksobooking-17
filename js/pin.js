'use strict';

(function () {
  window.getAds = function (ads) {
    var map = document.querySelector('.map');
    var pins = document.createDocumentFragment();
    var mapFiltersContainer = document.querySelector('.map__filters-container');
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var ESC_KEYCODE = 27;
    var ENTER_KEYCODE = 13;

    var addPinClickHandler = function (pin, pinInfo) {
      pin.addEventListener('mousedown', function () {
        var adCards = map.querySelectorAll('.map__card');
        adCards.forEach(function (el) {
          map.removeChild(el);
        });
        var card = cardTemplate.cloneNode(true);

        card.children[0].src = pinInfo.author.avatar;
        card.children[2].textContent = pinInfo.offer.title;
        card.children[3].textContent = pinInfo.offer.address;
        card.children[4].textContent = pinInfo.offer.price + '₽/ночь';
        switch (pinInfo.offer.type) {
          case 'flat':
            card.children[5].textContent = 'Квартира';
            break;
          case 'bungalo':
            card.children[5].textContent = 'Бунгало';
            break;
          case 'house':
            card.children[5].textContent = 'Дом';
            break;
          case 'palace':
            card.children[5].textContent = 'Дворец';
            break;
        }
        card.children[6].textContent = pinInfo.offer.rooms + ' комнаты для ' + pinInfo.offer.guests + ' гостей';
        card.children[7].textContent = 'Заезд после ' + pinInfo.offer.checkin + ' выезд до ' + pinInfo.offer.checkout;
        for (var k = 0; k < card.children[8].children.length; k++) {
          pinInfo.offer.features.some(function (it) {
            if (card.children[8].children[k].className.endsWith(it)) {
              card.children[8].children[k].textContent = it;
            }
          });
        }
        card.children[9].textContent = pinInfo.offer.description;
        card.children[10].children[0].src = pinInfo.offer.photos[0];
        for (var j = 1; j < pinInfo.offer.photos.length; j++) {
          var imgClone = document.createElement('img');
          imgClone.src = pinInfo.offer.photos[j];
          imgClone.width = card.children[10].children[0].width;
          imgClone.height = card.children[10].children[0].height;
          imgClone.alt = card.children[10].children[0].alt;
          imgClone.classList.add('popup__photo');
          card.children[10].appendChild(imgClone);
        }
        var onPopupEscPress = function (evt) {
          if (evt.keyCode === ESC_KEYCODE) {
            card.remove();
          }
        };
        document.addEventListener('keydown', onPopupEscPress);
        card.children[1].addEventListener('click', function () {
          card.remove();
          document.addEventListener('keydown', onPopupEscPress);
        });
        card.children[1].addEventListener('keydown', function (evt) {
          if (evt.keyCode === ENTER_KEYCODE) {
            card.remove();
          }
        });
        map.insertBefore(card, mapFiltersContainer);
      });
    };

    for (var i = 0; i < ads.length; i++) {
      var currentPin = window.createPin(ads[i]);
      addPinClickHandler(currentPin, ads[i]);
      pins.appendChild(currentPin);
    }
    return pins;
  };
})();
