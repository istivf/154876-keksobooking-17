'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.createPin = function (ad) {
    var pin = pinTemplate.cloneNode(true);
    pin.firstChild.src = ad.author.avatar;
    pin.firstChild.alt = ad.offer.type;
    pin.style.left = (ad.location.x - 25) + 'px';
    pin.style.top = (ad.location.y) + 'px';
    return pin;
  };
})();
