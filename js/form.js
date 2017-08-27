'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var checkinInput = noticeForm.querySelector('#timein');
  var checkoutInput = noticeForm.querySelector('#timeout');
  var typeHousingInput = noticeForm.querySelector('#type');
  var priceInput = noticeForm.querySelector('#price');
  var roomNumberInput = noticeForm.querySelector('#room_number');
  var capacityInput = noticeForm.querySelector('#capacity');

  // Динамическое изменение полей формы
  document.addEventListener('DOMContentLoaded', function () {
    checkinInput.onchange = changeCheckinHandler;
    typeHousingInput.onchange = changeTypeHousingHandler;
    roomNumberInput.oninput = changeNumberOfGuess;
  });

  // Динамическое изменение времени выезда
  function changeCheckinHandler(event) {
    var target = event.target;
    checkoutInput.value = target.value;
  }
  // Динамическое изменение времени цены от типа жилья
  function changeTypeHousingHandler(event) {
    var target = event.target;
    if (target.value === 'flat') {
      priceInput.min = '1000';
      priceInput.value = '1000';
    } else if (target.value === 'bungalo') {
      priceInput.min = '0';
      priceInput.value = '0';
    } else if (target.value === 'house') {
      priceInput.min = '5000';
      priceInput.value = '5000';
    } else if (target.value === 'palace') {
      priceInput.min = '10000';
      priceInput.value = '10000';
    }
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

})();


