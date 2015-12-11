(function () {
  'use strict';

  angular
    .module('yepis.story.directives')
    .directive('storyIntro', storyIntro);

  function storyIntro() {

    var directive = {
      restrict: 'E',
      templateUrl: 'app/story/_story.intro.html',
      replace: true,
      scope: false
    }

    return directive;

  }

})();
