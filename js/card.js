'use strict';

(function () {
// Создание элемента по шаблону lodge-template

  window.renderLodge = function (dataObj) {
    var lodgeTemplate = document.querySelector('#lodge-template').content;
    var lodgeContainer = document.querySelector('#offer-dialog');
    var dialogPanel = document.querySelector('.dialog__panel');
    var lodgeElement = lodgeTemplate.cloneNode(true);


    // Перевод типа жилья
    function typeTranslate(type) {
      if (type === 'flat') {
        return 'Квартира';
      } else if (type === 'bungalo') {
        return 'Бунгало';
      } else {
        return 'Дом';
      }
    }

    // Генерация DOM-элементов доступных удобств
    function featuresList(array) {
      var featuresFragment = document.createDocumentFragment();
      array.forEach(function (t) {
        var featureElement = document.createElement('span');
        featureElement.className = 'feature__image feature__image--' + t;
        featuresFragment.appendChild(featureElement);
      });
      return featuresFragment;
    }

    // заполнение данными
    lodgeElement.querySelector('.lodge__title').textContent = dataObj.offer.title;
    lodgeElement.querySelector('.lodge__address').textContent = dataObj.offer.address;
    lodgeElement.querySelector('.lodge__price').textContent = dataObj.offer.price + ' ' + '\u20BD' + '/ночь';
    lodgeElement.querySelector('.lodge__type').textContent = typeTranslate(dataObj.offer.type);
    lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + dataObj.offer.guests + ' гостей в ' + dataObj.offer.rooms + ' комнатах ';
    lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + dataObj.offer.checkin + ', выезд до ' + dataObj.offer.checkout;
    lodgeElement.querySelector('.lodge__features').appendChild(featuresList(dataObj.offer.features));
    lodgeElement.querySelector('.lodge__description').textContent = dataObj.offer.description;

    // Изменение автарки пользователя
    var dialogAvatar = document.querySelector('.dialog__title > img');
    dialogAvatar.setAttribute('src', dataObj.author.avatar);
    lodgeContainer.replaceChild(lodgeElement, dialogPanel);
  };

  var dialogElement = document.querySelector('.dialog');
  var dialogCloseButton = dialogElement.querySelector('.dialog__close');

  // Обработчик закрытия диалогового окна
  dialogCloseButton.addEventListener('click', function () {
    dialogElement.classList.add('hidden');
    window.clearPins();
  });

  document.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
      dialogElement.classList.add('hidden');
      window.clearPins();
    }
  });

})();
