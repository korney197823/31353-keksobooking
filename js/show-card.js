'use strict';

(function () {

  window.showCard = function (event) {

    var target = event.target;
    var pinContainerElement = document.querySelector('.tokyo__pin-map');
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

})();

