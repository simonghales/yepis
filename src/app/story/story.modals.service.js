(function () {
  'use strict';

  angular
    .module('yepis.story.services')
    .factory('StoryModalsService', StoryModalsService);

  /** @ngInject */
  function StoryModalsService($log, $q, ngDialog) {

    var service = {
      quickEditor: quickEditor
    };

    return service;

    ///////////////

    function quickEditor() {
      var deferred = $q.defer();

      var modal = ngDialog.open({
        template: 'app/story/_story.quickEditor.html',
        className: 'modal-theme-default modal-theme-editor',
        //controller: 'UserAuthController',
        //controllerAs: 'modalVM',
        showClose: false
      });

      modal.closePromise.then(function(data) {
        deferred.resolve(data);
      });

      return deferred.promise;
    }

  }

})();
