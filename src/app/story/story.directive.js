(function () {
  'use strict';

  angular
    .module('yepis.story.directives')
    .directive('story', story);

  function story($log, $window, $rootScope) {

    var directive = {
      restrict: 'A',
      scope: false,
      link: link
    }

    return directive;

    function link(scope, element, attributes) {

      activate();

      function activate() {
        var window = angular.element($window);
        window.bind('resize', resizeHandler);
        window.bind('orientationchange', resizeHandler);
      }

      function resizeHandler() {
        $rootScope.$broadcast('resize-pages');
      }

    }

  }

})();
