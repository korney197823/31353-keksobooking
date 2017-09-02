'use strict';

(function () {

  var TITLES_POSTINGS = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'];

  var TYPES_OF_HOUSING = [
    'flat',
    'house',
    'bungalo'
  ];

  var TIMES_OF_ENTERIES = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var FEATURES = [
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
  var counterTitleIndex = counter(TITLES_POSTINGS.length);

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
      'title': TITLES_POSTINGS[counterTitleIndex()],
      'address': '' + this.location.x + ', ' + this.location.y,
      'price': getRandom(1000, 1000001),
      'type': TYPES_OF_HOUSING[getRandom(0, TYPES_OF_HOUSING.length)],
      'rooms': getRandom(1, 6),
      'guests': getRandom(1, 13),
      'checkin': TIMES_OF_ENTERIES[getRandom(0, TIMES_OF_ENTERIES.length)],
      'checkout': TIMES_OF_ENTERIES[getRandom(0, TIMES_OF_ENTERIES.length)],
      'features': getRandomArr(FEATURES),
      'description': '',
      'photos': []
    };
  }

  // Создание массива объектов

  window.offers = [];

  function madeOfferArr(arr, length) {
    for (var i = 0; i < length; i++) {
      arr.push(new Offer());
    }
    return arr;
  }

  madeOfferArr(window.offers, 8);

})();
