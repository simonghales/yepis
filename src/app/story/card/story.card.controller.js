(function() {
  'use strict';

  angular
    .module('yepis.story.controllers')
    .controller('StoryCardController', StoryCardController);

  /** @ngInject */
  function StoryCardController($scope, $log) {
    var vm = this;

    vm.story = ($scope.story) ? $scope.story: {};

    activate();

    function activate() {
      $log.debug("Story", $scope.story);
    }

  }
})();
