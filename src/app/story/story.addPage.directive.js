(function () {
  'use strict';

  angular
    .module('yepis.story.directives')
    .directive('storyAddPage', storyAddPage);

  function storyAddPage() {

    var directive = {
      restrict: 'E',
      templateUrl: 'app/story/_story.addPage.html',
      replace: true,
      scope: false
    }

    return directive;

  }

})();
