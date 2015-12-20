(function () {
  'use strict';

  angular
    .module('yepis.story.directives')
    .directive('storyPage', storyPage);

  function storyPage($log, $window) {

    var directive = {
      restrict: 'E',
      templateUrl: 'app/story/page/_story.page.html',
      replace: true,
      scope: false,
      link: link
    }

    return directive;

    function link(scope, element, attributes) {

      var img = element[0].querySelector('.story-page__bg-image');

      resizePage();

      scope.$on('resize-pages', function() {
        resizePage();
      });

      function resizePage() {

        element.css({
          'height' : $window.innerHeight + 'px'
        });

      }

    }

  }

})();
