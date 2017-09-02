'use strict';

// Создание метки на карте


window.backend.load(function (data) {
  window.renderPin(data);
});


// Перемещение текущего пина, и вывод его адреса в поле адрес

var currentPin = document.querySelector('.pin__main');
var addressInput = document.getElementById('address');
var pinWidth = currentPin.offsetWidth;
var pinHeight = currentPin.offsetHeight;

currentPin.addEventListener('mousedown', function (event) {
  event.preventDefault();

  var startCoords = {
    x: event.clientX,
    y: event.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    currentPin.style.top = (currentPin.offsetTop - shift.y) + 'px';
    currentPin.style.left = (currentPin.offsetLeft - shift.x) + 'px';
  };

  var setAddressValue = function () {
    addressInput.value = 'x: ' + (currentPin.offsetTop + pinHeight) + ', y: ' + (currentPin.offsetLeft + pinWidth / 2);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', setAddressValue);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mousemove', setAddressValue);
  document.addEventListener('mouseup', onMouseUp);

});


/* eslint-disable no-console */
/* eslint-enable no-console */
//

