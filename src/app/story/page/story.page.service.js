(function () {
  'use strict';

  angular
    .module('yepis.story.services')
    .factory('StoryPageService', StoryPageService);

  /** @ngInject */
  function StoryPageService($log, Restangular) {

    var service = Restangular.service('api/storypages');
    return service;

  }

})();
