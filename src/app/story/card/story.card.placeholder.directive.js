(function () {
  'use strict';

  angular
    .module('yepis.story.directives')
    .directive('storyCardPlaceholder', storyCardPlaceholder);

  function storyCardPlaceholder() {

    var directive = {
      restrict: 'E',
      templateUrl: 'app/story/card/_story.card.placeholder.html',
      replace: true,
      scope: false
    }

    return directive;

  }

})();
