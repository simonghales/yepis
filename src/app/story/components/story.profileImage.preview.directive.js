(function () {
  'use strict';

  angular
    .module('yepis.story.directives')
    .directive('storyProfileImagePreview', storyProfileImagePreview);

  function storyProfileImagePreview() {

    var directive = {
      restrict: 'E',
      templateUrl: 'app/story/components/_story.profileImage.preview.html',
      replace: true,
      scope: false
    }

    return directive;

  }

})();
