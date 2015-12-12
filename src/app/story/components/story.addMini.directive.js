(function () {
  'use strict';

  angular
    .module('yepis.story.directives')
    .directive('storyAddMini', storyAddMini);

  function storyAddMini() {

    var directive = {
      restrict: 'E',
      templateUrl: 'app/story/components/_story.addMini.html',
      replace: true,
      scope: false
    }

    return directive;

  }

})();
