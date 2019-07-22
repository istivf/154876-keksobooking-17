'use strict';

(function () {
  window.getXhr = function () {
    var newXhr = new XMLHttpRequest();
    return newXhr;
  };
})();
