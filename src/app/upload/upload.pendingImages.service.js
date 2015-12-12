(function () {
  'use strict';

  angular
    .module('yepis.upload.services')
    .factory('PendingImagesService', PendingImagesService);

  /** @ngInject */
  function PendingImagesService($log) {

    var service = {
      addPendingImage: addPendingImage,
      pendingImages: {}
    };

    return service;

    ///////////////

    function addPendingImage(image, storyId, pageId) {
      var promise = image.listen();

      service.pendingImages['story-' + storyId + '-page-' + pageId] = image;

      promise.then(function() {
        service.pendingImages['story-' + storyId + '-page-' + pageId] = null;
      }, function() {
        service.pendingImages['story-' + storyId + '-page-' + pageId] = null;
      });
    }

  }

})();
