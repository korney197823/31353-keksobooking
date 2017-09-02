'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var checkInInput = noticeForm.querySelector('#timein');
  var checkOutInput = noticeForm.querySelector('#timeout');
  var apartmentType = noticeForm.querySelector('#type');
  var pricePerNight = noticeForm.querySelector('#price');
  var roomNumberInput = noticeForm.querySelector('#room_number');
  var capacityInput = noticeForm.querySelector('#capacity');
  var TIMES_IN = ['12:00', '13:00', '14:00'];
  var TIMES_OUT = ['12:00', '13:00', '14:00'];
  var APARTMENT_TIPES = ['bungalo', 'flat', 'house', 'palace'];
  var PRICES = [0, 1000, 5000, 10000];

  // Динамическое изменение полей формы
  document.addEventListener('DOMContentLoaded', function () {
    checkInInput.onchange = changeCheckinHandler;
    apartmentType.onchange = changeTypeHousingHandler;
    roomNumberInput.oninput = changeNumberOfGuess;
  });

  // Динамическое изменение времени выезда

  var syncValues = function (element, value) {
    element.value = value;
  };

  function changeCheckinHandler() {
    window.synchronizeFields(checkInInput, checkOutInput, TIMES_IN, TIMES_OUT, syncValues);
  }
  // Динамическое изменение времени цены от типа жилья

  var syncValueWithMin = function (element, value) {
    element.value = value;
    element.min = String(value);
  };
  function changeTypeHousingHandler() {
    window.synchronizeFields(apartmentType, pricePerNight, APARTMENT_TIPES, PRICES, syncValueWithMin);
  }
  // Динамическое изменение количества гостей от количества комнат
  function changeNumberOfGuess(event) {
    var target = event.target;
    if (target.value === '1') {
      capacityInput.options[0].hidden = true;
      capacityInput.options[1].hidden = true;
      capacityInput.options[2].hidden = false;
      capacityInput.options[3].hidden = true;
      capacityInput.value = '1';
    } else if (target.value === '2') {
      capacityInput.options[0].hidden = true;
      capacityInput.options[1].hidden = false;
      capacityInput.options[2].hidden = false;
      capacityInput.options[3].hidden = true;
      capacityInput.value = '2';
    } else if (target.value === '3') {
      capacityInput.options[0].hidden = false;
      capacityInput.options[1].hidden = false;
      capacityInput.options[2].hidden = false;
      capacityInput.options[3].hidden = true;
      capacityInput.value = '3';
    } else if (target.value === '100') {
      capacityInput.options[0].hidden = true;
      capacityInput.options[1].hidden = true;
      capacityInput.options[2].hidden = true;
      capacityInput.options[3].hidden = false;
      capacityInput.value = '0';
    }
  }

  // Отправка формы на сервер

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 1000; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.bottom = '10%';
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.appendChild(node);
  };


  noticeForm.addEventListener('submit', function (event) {
    window.backend.save(new FormData(noticeForm), function () {
      noticeForm.reset();
    }, errorHandler);
    event.preventDefault();
  });

})();


