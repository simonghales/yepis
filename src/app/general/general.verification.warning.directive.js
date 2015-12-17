(function () {
  'use strict';

  angular
    .module('yepis.general.directives')
    .directive('verificationWarning', verificationWarning);

  function verificationWarning() {

    var directive = {
      restrict: 'E',
      templateUrl: 'app/general/_verification.warning.html',
      replace: true,
      scope: false
    }

    return directive;

  }

})();
