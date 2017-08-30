'use strict';

(function () {
  window.synchronizeFields = function (elementOne, elementTwo, dataOne, dataTwo, func) {
    var indexFirstFieldValue = dataOne.indexOf(elementOne.value);
    var value = dataTwo[indexFirstFieldValue];
    func(elementTwo, value);
  };
})();
