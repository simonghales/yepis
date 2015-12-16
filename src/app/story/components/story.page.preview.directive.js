(function () {
  'use strict';

  angular
    .module('yepis.story.directives')
    .directive('storyPagePreview', storyPagePreview);

  function storyPagePreview() {

    var directive = {
      restrict: 'E',
      templateUrl: 'app/story/components/_story.page.preview.html',
      replace: true,
      scope: false
    }

    return directive;

  }

})();
