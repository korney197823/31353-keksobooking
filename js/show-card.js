'use strict';

(function () {

  window.showCard = function (event) {

    var target = event.target;
    var pinContainerElement = document.querySelector('.tokyo__pin-map');
    // получаем адрес активного изображения
    var currentPinImageUrl = (target.getAttribute('src') || target.children[0].getAttribute('src'));

    window.clearPins();

    var dialogElement = document.querySelector('.dialog');

    while (target !== pinContainerElement) {
      if (dialogElement.classList.contains('hidden')) {
        dialogElement.classList.remove('hidden');
      }

      if (target.classList.contains('pin')) {
        target.classList.toggle('pin--active');
        window.backend.load(function (data) {
          var currentDialogElement = data.filter(function (t) {
            return t.author.avatar === currentPinImageUrl;
          });
          window.renderLodge(currentDialogElement[0]);
        });
      }
      target = target.parentNode;
    }
  };

})();

