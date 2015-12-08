(function () {
  'use strict';

  angular
    .module('yepis.general.directives')
    .directive('siteHeader', siteHeader);

  function siteHeader() {

    var directive = {
      restrict: 'E',
      controller: 'HeaderController',
      controllerAs: 'headerVM',
      templateUrl: 'app/general/_header.html',
      replace: true,
      scope: false
    }

    return directive;

  }

})();
