'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  // var SUCCESSFUL_STATUS = 200;
  window.send = function (data, onLoad, onError) {
    window.getXhr(URL, onLoad, onError, data);
};


  // window.send = function (data, onLoad, onError) {
  //   // var xhr = new XMLHttpRequest();
  //   // xhr.responseType = 'json';
  //    // xhr.addEventListener('load', function () {
  //    //  switch (xhr.status) {
  //    //    case 200:
  //    //      onLoad();
  //    //      break;
  //    //    default:
  //    //      onError(xhr.status, xhr.statusText);
  //    //      break;
  //    //  },
  //   });
  // xhr.open('POST', URL);
  // xhr.send(data);
})();
