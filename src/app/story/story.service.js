
(function () {
  'use strict';

  angular
    .module('yepis.story.services')
    .factory('StoryService', StoryService);

  /** @ngInject */
  function StoryService($log, Restangular) {

    var service = Restangular.service('api/stories');
    return service;

  }

})();
