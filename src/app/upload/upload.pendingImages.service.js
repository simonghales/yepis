(function () {
  'use strict';

  angular
    .module('yepis.upload.services')
    .factory('PendingImagesService', PendingImagesService);

  /** @ngInject */
  function PendingImagesService($log, ImageUploadClass) {

    var service = {
      addPendingImage: addPendingImage,
      newUploadingImage: newUploadingImage,
      pendingImages: {}
    };

    return service;

    ///////////////

    function addPendingImage(image, storyId, pageId, page) {
      var promise = image.listen();

      service.pendingImages['story-' + storyId + '-page-' + pageId] = image;

      promise.then(function() {
        service.pendingImages['story-' + storyId + '-page-' + pageId] = null;
      }, function() {
        service.pendingImages['story-' + storyId + '-page-' + pageId] = null;
      });
    }

    function newUploadingImage(pageId, storyId, blob, dataURI, page) {
      var uploadingImage = ImageUploadClass.build(pageId, storyId, blob, dataURI, page);
      service.addPendingImage(uploadingImage, storyId, pageId);
    }

  }

})();
