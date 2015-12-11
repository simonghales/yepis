(function() {
  'use strict';

  angular
    .module('yepis.story.controllers')
    .controller('StoryController', StoryController);

  /** @ngInject */
  function StoryController($log, StoryModalsService) {
    var vm = this;

    vm.openQuickEditor = openQuickEditor;

    activate();

    function activate() {

    }

    function openQuickEditor() {
      StoryModalsService.quickEditor();
    }

  }
})();
