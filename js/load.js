'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  window.MAX_ADS_AMOUNT = 5;

  window.load = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);
    xhr.send();

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          window.xhrResponse = xhr.response;
          window.ads = window.xhrResponse.slice(0, window.MAX_ADS_AMOUNT);
          break;
        default:
          window.loadError();
          break;
      }
    });

    window.loadError = function () {
      var message = errorMessageTemplate.cloneNode(true);
      message.firstElementChild.textContent = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      main.appendChild(message);
    };
  };
  window.load();
})();
