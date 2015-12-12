(function () {
  'use strict';

  angular
    .module('yepis.story.directives')
    .directive('storyPage', storyPage);

  function storyPage() {

    var directive = {
      restrict: 'E',
      templateUrl: 'app/story/page/_story.page.html',
      replace: true,
      scope: false
    }

    return directive;

  }

})();
