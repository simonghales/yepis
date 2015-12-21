(function () {
  'use strict';

  angular
    .module('yepis.story.directives')
    .directive('storyPageContent', storyPageContent);

  function storyPageContent($log) {

    var directive = {
      restrict: 'E',
      templateUrl: 'app/story/page/_story.page.content.html',
      replace: true,
      scope: false,
      link: link
    }

    return directive;

    function link(scope, element, attributes) {

    }

  }

})();
