(function() {
  'use strict';

  angular
    .module('yepis.story.controllers')
    .controller('StoryController', StoryController);

  /** @ngInject */
  function StoryController($log, $stateParams, Story, StoryService, StoryModalsService) {
    var vm = this;

    vm.openQuickEditor = openQuickEditor;

    activate();

    function activate() {

      StoryService.getStory($stateParams.id)
        .then(function(data) {
          $log.debug("loaded story", data);
        }, function(error) {
          $log.warn("failed to load story");
        });

      Story.init({
        pages: [
          {
            page: "woop"
          },
          {
            page: "woop"
          }
        ]
      });

    }

    function openQuickEditor() {
      StoryModalsService.quickEditor();
    }

  }
})();
