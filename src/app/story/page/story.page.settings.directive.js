(function () {
  'use strict';

  angular
    .module('yepis.story.directives')
    .directive('storyPageSettings', storyPageSettings);

  function storyPageSettings() {

    var directive = {
      restrict: 'E',
      templateUrl: 'app/story/page/_story.page.settings.html',
      replace: true,
      scope: false
    }

    return directive;

  }

})();
