(function() {
  'use strict';

  angular
    .module('yepis')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, StoryService) {
    var vm = this;

    vm.data = {};

    vm.states = {
      loading: false,
      loaded: false,
      error: false
    };

    vm.getStories = getStories;

    activate();

    function activate() {
      vm.getStories();
    }

    function getStories() {
      if(vm.states.loading) return;
      vm.states.loading = true;
      vm.states.error = false;

      StoryService.getList({
        random: 7
      }).then(function(data) {
        vm.data.stories = data;
        vm.states.loaded = true;
        vm.states.loading = false;
        $log.debug("Loaded data", data);
      }, function(error) {
        $log.warn("Error", error);
        vm.states.loaded = true;
        vm.states.loading = false;
        vm.states.error = true;
      });

    }

    function requireAuth(event) {

    }

  }
})();
