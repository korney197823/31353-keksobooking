'use strict';

(function () {
  // Создание метки на карте
  var pinContainerElement = document.querySelector('.tokyo__pin-map');

  window.renderPin = function (objArr) {

    var fragment = document.createDocumentFragment();

    objArr.forEach(function (element) {
      var pinElement = document.createElement('div');
      var pinHalfWidth = 56 / 2;
      var pinHeight = 75;
      var positionY = element.location.y - pinHeight;
      var positionX = element.location.x - pinHalfWidth;
      pinElement.className = 'pin';
      pinElement.setAttribute('tabindex', '0');
      pinElement.setAttribute('style', 'left: ' + positionX + 'px;' + 'top: ' + positionY + 'px;');
      pinElement.innerHTML = '<img class="rounded" width="40" height="40">';
      pinElement.children[0].setAttribute('src', element.author.avatar);
      fragment.appendChild(pinElement);
    });
    pinContainerElement.appendChild(fragment);
  };

  // Функция очистки активных маркеров карты
  window.clearPins = function () {
    var pinElements = pinContainerElement.querySelectorAll('.pin');
    var pins = [].slice.call(pinElements);
    pins.forEach(function (t) {
      t.classList.remove('pin--active');
    });
  };

  window.clickPinHandler = function (event) {
    var target = event.target;
    // получаем адрес активного изображения
    var currentPinImageUrl = (target.getAttribute('src') || target.children[0].getAttribute('src'));
    // получаем массив объектов размещения отфильтрованный по активной аватарке
    var currentDialogElement = window.offers.filter(function (t) {
      return t.author.avatar === currentPinImageUrl;
    });

    window.clearPins();

    var dialogElement = document.querySelector('.dialog');

    while (target !== pinContainerElement) {
      if (dialogElement.classList.contains('hidden')) {
        dialogElement.classList.remove('hidden');
      }

      if (target.classList.contains('pin')) {
        target.classList.toggle('pin--active');
        window.renderLodge(currentDialogElement[0]);
        return;
      }
      target = target.parentNode;
    }
  };

  // Добавление обработчика по клику на метку на карте
  pinContainerElement.addEventListener('click', window.clickPinHandler);
  // Добавление обработчика по нажатию на ENTER на метке на карте
  pinContainerElement.addEventListener('keydown', function () {
    if (event.keyCode === 13) {
      window.clickPinHandler(event);
    }
  });

})();

