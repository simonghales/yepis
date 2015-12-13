(function () {
  'use strict';

  angular
    .module('yepis.general.directives')
    .directive('siteFooter', siteFooter);

  function siteFooter() {

    var directive = {
      restrict: 'E',
      templateUrl: 'app/general/_footer.html',
      controller: 'FooterController',
      controllerAs: 'footerVM',
      replace: true,
      scope: false
    }

    return directive;

  }

})();
