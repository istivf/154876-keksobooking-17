'use strict';

(function () {
  window.getAds = function (ads) {
    var pins = document.createDocumentFragment();
    for (var i = 0; i < ads.length; i++) {
      var currentPin = window.createPin(ads[i]);
      pins.appendChild(currentPin);
    }
    return pins;
  };
})();
