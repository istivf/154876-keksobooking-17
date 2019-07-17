'use strict';

(function () {
  window.onload = function () {
    if (housingType.value === 'flat') {
      minPrice.setAttribute('min', 1000);
      minPrice.placeholder = '1000';
    }

    if (roomNumber.value === '1') {
      capacity.value = '1';
      capacity.children[0].setAttribute('disabled', 'disabled');
      capacity.children[3].setAttribute('disabled', 'disabled');
    }
  };

  var main = document.querySelector('main');
  var form = document.querySelector('.ad-form');
  var formFielsets = form.querySelectorAll('fieldset');
  var adTitle = form.querySelector('#title');
  var adDesc = form.querySelector('#description');
  var housingType = form.querySelector('#type');
  var minPrice = form.querySelector('#price');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var mainPin = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var avatarInput = form.querySelector('#avatar');
  var avatar = form.querySelector('.ad-form-header__preview');
  var imagesInput = form.querySelector('#images');
  var imagesContainer = form.querySelector('.ad-form__photo-container');
  var images = form.querySelector('.ad-form__photo');
  var clearFormBtn = form.querySelector('.ad-form__reset');
  var ESC_KEYCODE = 27;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var checkPicture = function (file) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    return matches;
  };

  avatarInput.addEventListener('change', function () {
    var file = avatarInput.files[0];
    var checkResult = checkPicture(file);

    if (checkResult) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatar.children[0].src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  imagesInput.addEventListener('change', function () {
    var file = imagesInput.files[0];
    var checkResult = checkPicture(file);

    if (checkResult) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var imageBlock = images.cloneNode();
        var newImage = document.createElement('img');
        newImage.src = reader.result;
        newImage.width = 70;
        newImage.height = 70;
        imageBlock.setAttribute('data-img', 'added');
        imageBlock.appendChild(newImage);
        imagesContainer.insertBefore(imageBlock, imagesContainer.children[imagesContainer.children.length - 1]);
      });

      reader.readAsDataURL(file);
    }
  });

  for (var a = 0; a < formFielsets.length; a++) {
    formFielsets[a].setAttribute('disabled', 'disabled');
  }

  housingType.addEventListener('input', function () {
    switch (housingType.value) {
      case 'bungalo':
        minPrice.setAttribute('min', 0);
        minPrice.placeholder = '0';
        break;
      case 'flat':
        minPrice.setAttribute('min', 1000);
        minPrice.placeholder = '1000';
        break;
      case 'house':
        minPrice.setAttribute('min', 5000);
        minPrice.placeholder = '5000';
        break;
      case 'palace':
        minPrice.setAttribute('min', 10000);
        minPrice.placeholder = '10000';
        break;
    }
  });

  timeIn.addEventListener('input', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('input', function () {
    timeIn.value = timeOut.value;
  });

  roomNumber.addEventListener('input', function () {
    switch (roomNumber.value) {
      case '1':
        capacity.value = '1';
        capacity.children[0].setAttribute('disabled', 'disabled');
        capacity.children[3].setAttribute('disabled', 'disabled');
        capacity.children[1].removeAttribute('disabled', 'disabled');
        capacity.children[2].removeAttribute('disabled', 'disabled');
        break;
      case '2':
        capacity.value = '2';
        capacity.children[0].setAttribute('disabled', 'disabled');
        capacity.children[3].setAttribute('disabled', 'disabled');
        capacity.children[1].removeAttribute('disabled', 'disabled');
        capacity.children[2].removeAttribute('disabled', 'disabled');
        break;
      case '3':
        capacity.value = '3';
        capacity.children[3].setAttribute('disabled', 'disabled');
        capacity.children[0].removeAttribute('disabled', 'disabled');
        capacity.children[1].removeAttribute('disabled', 'disabled');
        capacity.children[2].removeAttribute('disabled', 'disabled');
        break;
      case '100':
        capacity.value = '0';
        capacity.children[3].removeAttribute('disabled', 'disabled');
        capacity.children[0].setAttribute('disabled', 'disabled');
        capacity.children[1].setAttribute('disabled', 'disabled');
        capacity.children[2].setAttribute('disabled', 'disabled');
        break;
    }
  });

  var renderSuccessMessage = function () {
    var messageTemplate = document.querySelector('#success').content.querySelector('.success');
    var messageBlock = messageTemplate.cloneNode(true);
    var messagePar = messageBlock.querySelector('.success__message');
    messagePar.textContent = 'Форма успешно отправлена';
    main.appendChild(messageBlock);
    var onMessageEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeMessage();
      }
    };
    var closeMessage = function () {
      main.removeChild(messageBlock);
      document.removeEventListener('keydown', onMessageEscPress);
      document.removeEventListener('click', closeMessage);
    };
    document.addEventListener('click', closeMessage);
    document.addEventListener('keydown', onMessageEscPress);
  };

  var onSuccessHandler = function () {
    renderSuccessMessage();
    adTitle.value = '';
    adDesc.value = '';
    minPrice.value = '';
    mainPin.style.top = 375 + 'px';
    mainPin.style.left = 570 + 'px';
    addressInput.value = mainPin.offsetLeft + ', ' + mainPin.offsetTop;
    housingType.value = 'flat';
    roomNumber.value = '1';
    timeIn.value = '12:00';
    timeOut.value = '12:00';
    var features = Array.from(form.querySelectorAll('input[type="checkbox"]'));
    features.forEach(function (el) {
      el.checked = false;
    });
    avatar.children[0].src = 'img/muffin-grey.svg';
    var adImages = form.querySelectorAll('div[data-img="added"]');
    if (adImages) {
      adImages.forEach(function (img) {
        imagesContainer.removeChild(img);
      });
    }
  };

  var onErrorHandler = function (status, statusText) {
    var messageTemplate = document.querySelector('#error').content.querySelector('.error');
    var messageBlock = messageTemplate.cloneNode(true);
    var messagePar = messageBlock.querySelector('.error__message');
    var messageClose = messageBlock.querySelector('.error__button');
    messagePar.textContent = 'Произошла ошибка: ' + status + ' ' + statusText;
    main.appendChild(messageBlock);
    var onMessageEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeMessage();
      }
    };
    var closeMessage = function () {
      main.removeChild(messageBlock);
      document.removeEventListener('keydown', onMessageEscPress);
    };
    messageClose.addEventListener('click', function () {
      closeMessage();
    });
    document.addEventListener('keydown', onMessageEscPress);
  };

  form.addEventListener('submit', function (evtSubmit) {
    evtSubmit.preventDefault();
    window.send(new FormData(form), onSuccessHandler, onErrorHandler);
  });

  clearFormBtn.addEventListener('click', onSuccessHandler);
})();
