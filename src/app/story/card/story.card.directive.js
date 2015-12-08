(function () {
  'use strict';

  angular
    .module('yepis.story.directives')
    .directive('storyCard', storyCard);

  function storyCard() {

    var directive = {
      restrict: 'E',
      controller: 'StoryCardController',
      controllerAs: 'cardVM',
      templateUrl: 'app/story/card/_story.card.html',
      replace: true,
      scope: {
        story: '='
      }
    }

    return directive;

  }

})();
