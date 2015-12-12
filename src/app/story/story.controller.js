(function() {
  'use strict';

  angular
    .module('yepis.story.controllers')
    .controller('StoryController', StoryController);

  /** @ngInject */
  function StoryController($log, $scope, $stateParams, StoryService, StoryModalsService) {
    var vm = this;

    vm.states = {
      loaded: false,
      loading: false
    };

    vm.id = $stateParams.id;
    vm.story = null;

    vm.openQuickEditor = openQuickEditor;

    activate();

    function activate() {

      vm.states.loading = true;
      StoryService.getStory(vm.id)
        .then(function(data) {
          $log.debug("loaded story", data);
          vm.story = data;
          vm.states.loaded = true;
          vm.states.loading = false;
        }, function(error) {
          $log.warn("failed to load story");
          vm.states.loaded = true;
          vm.states.loading = false;
        });

      _defaultListeners();

    }

    function openQuickEditor() {
      StoryModalsService.quickEditor();
    }

    function _defaultListeners() {
      $scope.$on('story-' + vm.id + '-newPage', function(event, page) {
        _newPageImageListener(page.id);
      });
    }

    function _newPageImageListener(pageId) {
      $scope.$on('story-' + vm.id + '-page-' + pageId + '-uploadCompleted', function(event, response) {
        var page = StoryService.findPage(pageId);
        $log.debug("Update story page as image has finished uploading!", page, response);
        page.background_images[0] = response.id;
        if(page && page.put) {
          page.put()
            .then(function(data) {
              $log.debug("Updated page", data);
            }, function(error) {
              $log.warn("Failed to update page");
            });
        }

      });
    }

  }
})();
