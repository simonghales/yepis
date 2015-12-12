
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
    service.findPage = findPage;
    service.findPageIndex = findPageIndex;
    service.removePage = removePage;
    return service;

    function addPageImageListener(page) {

    }

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

    function findPage(pageId) {
      if(!service.currentStory) return null;
      for(var i = 0, len = service.currentStory.pages.length; i < len; i++) {
        if(service.currentStory.pages[i].id === pageId) return service.currentStory.pages[i];
      }
      return null;
    }

    function findPageIndex(pageId) {
      if(!service.currentStory) return null;
      for(var i = 0, len = service.currentStory.pages.length; i < len; i++) {
        if(service.currentStory.pages[i].id === pageId) return i;
      }
      return null;
    }

    function removePage(pageId, index) {
      if(service.currentStory.pages[index].id !== pageId) {
        index = findPageIndex(pageId);
      }
      if(service.currentStory.pages[index]) {
        service.currentStory.pages.splice(index, 1);
      }
    }



  }

})();
