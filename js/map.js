'use strict';

var titleArray = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];

var typeArray = [
  'flat',
  'house',
  'bungalo'
];

var timeArray = [
  '12:00',
  '13:00',
  '14:00'
];

var featuresArray = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

// Генератор случайных чисел из диапазона
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Генерация массива строк случайной длины
function getRandomArr(arr) {
  return arr.slice(0, getRandom(0, arr.length));
}
// Функция счетчик
function counter(a) {
  var currentCount = 1;
  if (currentCount < a) {
    return function () {
      return currentCount++;
    };
  }
  return currentCount;
}

var counterImageNumber = counter(9);
var counterTitleIndex = counter(titleArray.length);

// Генерация объекта
function Offer() {
  this.author = {
    'avatar': 'img/avatars/user0' + counterImageNumber() + '.png'
  };
  this.location = {
    'x': getRandom(300, 901),
    'y': getRandom(100, 501)
  };
  this.offer = {
    'title': titleArray[counterTitleIndex()],
    'address': '' + this.location.x + ', ' + this.location.y,
    'price': getRandom(1000, 1000001),
    'type': typeArray[getRandom(0, typeArray.length)],
    'rooms': getRandom(1, 6),
    'guests': getRandom(1, 13),
    'checkin': timeArray[getRandom(0, timeArray.length)],
    'checkout': timeArray[getRandom(0, timeArray.length)],
    'features': getRandomArr(featuresArray),
    'description': '',
    'photos': []
  };
}

// Создание массива объектов

var offersArr = [];

function madeOfferArr(arr, length) {
  for (var i = 0; i < length; i++) {
    arr.push(new Offer());
  }
  return arr;
}

madeOfferArr(offersArr, 8);

// Создание метки на карте

function renderPin(objArr) {
  var pinContainerElement = document.querySelector('.tokyo__pin-map');
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
}

renderPin(offersArr);

// Создание элемента по шаблону lodge-template

function renderLodge(dataObj) {
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
}

// Добавление обработчика по клику на маркер на карте

// При нажатии на любой из элементов .pin ему должен добавляться класс pin--active и должен показываться элемент
// .dialog
// Если до этого у другого элемента существовал класс pin--active, то у этого элемента класс нужно убрать
// При нажатии на элемент .dialog__close карточка объявления должна скрываться.
// При этом должен деактивироваться элемент .pin, который был помечен как активный
// При показе карточки на карточке должна отображаться актуальная информация
// о текущем выбранном объекте (заголовок, адрес, цена, время заезда и выезда).
// Добавить обработчики для альтернативного ввода с клавиатуры onkeydown для кнопок открытия/закрытия объявлений:

var pinContainerElement = document.querySelector('.tokyo__pin-map');
var pinElements = pinContainerElement.querySelectorAll('.pin');
var pinArray = [].slice.call(pinElements);
var dialogElement = document.querySelector('.dialog');
var dialogCloseButton = dialogElement.querySelector('.dialog__close');

// Функция очистки активных маркеров карты
function clearPins() {
  pinArray.forEach(function (t) {
    t.classList.remove('pin--active');
  });
}

function clickPinHandler(event) {
  var target = event.target;
  // получаем адрес активного изображения
  var currentPinImageUrl = (target.getAttribute('src') || target.children[0].getAttribute('src'));
  // получаем массив объектов размещения отфильтрованный по активной аватарке
  var currentDialogElement = offersArr.filter(function (t) {
    return t.author.avatar === currentPinImageUrl;
  });

  clearPins();

  while (target !== pinContainerElement) {
    if (dialogElement.classList.contains('hidden')) {
      dialogElement.classList.remove('hidden');
    }

    if (target.classList.contains('pin')) {
      target.classList.toggle('pin--active');
      renderLodge(currentDialogElement[0]);
      return;
    }
    target = target.parentNode;
  }
}

// Добавление обработчика по клику на метку на карте
pinContainerElement.addEventListener('click', clickPinHandler);
// Добавление обработчика по нажатию на ENTER на метке на карте
pinContainerElement.addEventListener('keydown', function () {
  if (event.keyCode === 13) {
    clickPinHandler(event);
  }
})

// Обработчик закрытия диалогового окна
dialogCloseButton.addEventListener('click', function () {
  dialogElement.classList.add('hidden');
  clearPins();
});

document.addEventListener('keydown', function (event) {
  if (event.keyCode === 27) {
    dialogElement.classList.add('hidden');
    clearPins();
  }
});


/* eslint-disable no-console */
/* eslint-enable no-console */
//

