'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  window.send = function (data, onLoad, onError) {
    window.serverRequest('POST', URL, onLoad, onError, data);
  };
})();
