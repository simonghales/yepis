
(function () {
  'use strict';

  angular
    .module('yepis.story.services')
    .factory('StoryImageService', StoryImageService);

  /** @ngInject */
  function StoryImageService($log, ImageService, PendingImagesService) {

    var service = {
      uploadImagePage: uploadImagePage
    };

    return service;

    function uploadImagePage(image, page, storyId) {
      ImageService.resizeImage(image, function(dataURI) {
        var blob = ImageService.dataURItoBlob(dataURI);
        PendingImagesService.newUploadingImage(page.id, storyId, blob, dataURI, page);
        page.background_image_urls[0] = {original: dataURI};
        page.imageUpdating = true;
      });
    }

  }

})();
