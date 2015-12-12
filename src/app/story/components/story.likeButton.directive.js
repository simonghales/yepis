(function () {
  'use strict';

  angular
    .module('yepis.story.directives')
    .directive('storyLikeButton', storyLikeButton);

  function storyLikeButton() {

    var directive = {
      restrict: 'E',
      templateUrl: 'app/story/components/_story.likeButton.html',
      replace: true,
      scope: false
    }

    return directive;

  }

})();
