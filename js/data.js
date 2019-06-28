'use strict';

var map = document.querySelector('.map');

(function () {
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

  window.ads = createAds(8);
})();
