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
        var cardImg = card.querySelector('.popup__avatar');
        var cardTitle = card.querySelector('.popup__title');
        var cardAddress = card.querySelector('.popup__text--address');
        var cardPrice = card.querySelector('.popup__text--price');
        var cardType = card.querySelector('.popup__type');
        var cardRooms = card.querySelector('.popup__text--capacity');
        var cardTime = card.querySelector('.popup__text--time');
        var cardFeaturesList = card.querySelectorAll('.popup__features');
        var cardFeaturesItems = card.querySelectorAll('.popup__feature');
        var cardDesc = card.querySelector('.popup__description');
        var cardPhotos = card.querySelector('.popup__photos');
        var cardCloseBtn = card.querySelector('.popup__close');

        cardImg.src = pinInfo.author.avatar;
        cardTitle.textContent = pinInfo.offer.title;
        cardAddress.textContent = pinInfo.offer.address;
        cardPrice.textContent = pinInfo.offer.price + '₽/ночь';
        switch (pinInfo.offer.type) {
          case 'flat':
            cardType.textContent = 'Квартира';
            break;
          case 'bungalo':
            cardType.textContent = 'Бунгало';
            break;
          case 'house':
            cardType.textContent = 'Дом';
            break;
          case 'palace':
            cardType.textContent = 'Дворец';
            break;
        }
        cardRooms.textContent = pinInfo.offer.rooms + ' комнаты для ' + pinInfo.offer.guests + ' гостей';
        cardTime.textContent = 'Заезд после ' + pinInfo.offer.checkin + ' выезд до ' + pinInfo.offer.checkout;
        for (var k = 0; k < cardFeaturesItems.length; k++) {
          var isMatched;
          pinInfo.offer.features.some(function (it) {
            if (cardFeaturesItems[k].className.endsWith(it)) {
              cardFeaturesItems[k].textContent = it;
              isMatched++;
            }
          });
          if (!isMatched) {
            cardFeaturesList[0].removeChild(cardFeaturesItems[k]);
          }
          isMatched = 0;
        }
        cardDesc.textContent = pinInfo.offer.description;
        cardPhotos.children[0].src = pinInfo.offer.photos[0];
        for (var j = 1; j < pinInfo.offer.photos.length; j++) {
          var imgClone = document.createElement('img');
          imgClone.src = pinInfo.offer.photos[j];
          imgClone.width = cardPhotos.children[0].width;
          imgClone.height = cardPhotos.children[0].height;
          imgClone.alt = cardPhotos.children[0].alt;
          imgClone.classList.add('popup__photo');
          cardPhotos.appendChild(imgClone);
        }
        var onPopupEscPress = function (evt) {
          if (evt.keyCode === ESC_KEYCODE) {
            card.remove();
          }
        };
        document.addEventListener('keydown', onPopupEscPress);
        cardCloseBtn.addEventListener('click', function () {
          card.remove();
          document.addEventListener('keydown', onPopupEscPress);
        });
        cardCloseBtn.addEventListener('keydown', function (evt) {
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
