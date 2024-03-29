'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  window.MAX_ADS_AMOUNT = 5;

  window.load = function () {
    var loadSuccess = function (xhr) {
      window.xhrResponse = xhr.response;
      window.ads = window.xhrResponse.slice(0, window.MAX_ADS_AMOUNT);
    };
    var loadError = function (xhr) {
      var message = errorMessageTemplate.cloneNode(true);
      message.firstElementChild.textContent = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      main.appendChild(message);
    };

    window.serverRequest('GET', URL, loadSuccess, loadError);
  };
  window.load();
})();
