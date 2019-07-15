'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  window.send = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad();
          break;
        default:
          onError(xhr.status, xhr.statusText);
          break;
      }
    });
    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
