'use strict';

(function () {
  window.getXhr = function (url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    var SUCCESSFUL_STATUS = 200;
    xhr.responseType = 'json';
    xhr.open('POST', url);
    xhr.send(data);
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case SUCCESSFUL_STATUS:
          onLoad();
          break;
        default:
          onError(xhr.status, xhr.statusText);
          break;
      }
    });
  };
})();
