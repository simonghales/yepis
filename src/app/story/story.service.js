
(function () {
  'use strict';

  angular
    .module('yepis.story.services')
    .factory('StoryService', StoryService);

  /** @ngInject */
  function StoryService($log, $q, Restangular) {

    var service = Restangular.service('api/stories');
    service.currentStory = null;
    service.getStory = getStory;
    return service;

    function getStory(id) {
      var deferred = $q.defer();

      service.one(id).get().then(function(data) {
        service.currentStory = data;
        deferred.resolve(service.currentStory);
      }, function(error) {
        deferred.reject(error);
      });

      return deferred.promise;

    }

  }

})();
