(function () {
  'use strict';

  angular
    .module('yepis.story.services')
    .factory('StoryModalsService', StoryModalsService);

  /** @ngInject */
  function StoryModalsService($log, $q, ngDialog) {

    var service = {
      deletePrompt: deletePrompt,
      quickEditor: quickEditor
    };

    return service;

    ///////////////

    function deletePrompt(story) {
      var deferred = $q.defer();

      var modal = ngDialog.open({
        template: 'app/story/components/_story.delete.confirm.html',
        className: 'modal-theme-default modal-theme-prompt',
        controller: 'StoryDeleteConfirmController',
        controllerAs: 'modalVM',
        data: {
          story: story
        },
        showClose: false
      });

      modal.closePromise.then(function(data) {
        deferred.resolve(data);
      });

      return deferred.promise;
    }

    function quickEditor() {
      var deferred = $q.defer();

      var modal = ngDialog.open({
        template: 'app/story/editor/_story.quickEditor.html',
        className: 'modal-theme-default modal-theme-editor',
        controller: 'StoryQuickEditorController',
        controllerAs: 'modalVM',
        showClose: false
      });

      modal.closePromise.then(function(data) {
        deferred.resolve(data);
      });

      return deferred.promise;
    }

  }

})();
