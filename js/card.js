'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var PIN_WIDTH = 25;

  window.createPin = function (ad) {
    var pin = pinTemplate.cloneNode(true);
    pin.firstChild.src = ad.author.avatar;
    pin.firstChild.alt = ad.offer.type;
    pin.style.left = (ad.location.x - PIN_WIDTH) + 'px';
    pin.style.top = (ad.location.y) + 'px';
    return pin;
  };
})();
