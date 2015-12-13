(function () {
  'use strict';

  angular
    .module('yepis.story.directives')
    .directive('storyFooter', storyFooter);

  function storyFooter() {

    var directive = {
      restrict: 'E',
      templateUrl: 'app/story/components/_story.footer.html',
      replace: true,
      scope: false
    }

    return directive;

  }

})();
