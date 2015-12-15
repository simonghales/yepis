(function() {
  'use strict';

  angular
    .module('yepis.story.controllers')
    .controller('StoryDeleteConfirmController', StoryDeleteConfirmController);

  /** @ngInject */
  function StoryDeleteConfirmController($log, $scope, $location) {
    var vm = this;

    vm.states = {
      busy: false,
      error: false
    };
    vm.story = $scope.ngDialogData.story;

    vm.cancel = cancel;
    vm.confirm = confirm;

    activate();

    function activate() {
      $log.debug("Provided info", $scope.ngDialogData);
    }

    function cancel() {
      if(vm.states.busy) return;
      $scope.closeThisDialog();
    }

    function confirm() {
      if(vm.states.busy) return;

      vm.states.busy = true;
      vm.states.error = false;

      vm.story.remove()
        .then(function() {
          vm.states.busy = false;
          $location.path('/');
          $scope.closeThisDialog();
        }, function(error) {
          $log.warn("Error deleting story", error);
          vm.states.error = true;
          vm.states.busy = false;
        });

    }

  }
})();
