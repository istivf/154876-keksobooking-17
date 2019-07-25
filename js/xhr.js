'use strict';

(function () {
  window.serverRequest = function (type, url, onSuccess, onError, requestBody) {
    var xhr = new XMLHttpRequest();
    var SUCCESSFUL_STATUS = 200;
    xhr.responseType = 'json';
    xhr.open(type, url);
    xhr.send(requestBody);
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case SUCCESSFUL_STATUS:
          onSuccess(xhr);
          break;
        default:
          onError(xhr);
          break;
      }
    });
  };
})();
