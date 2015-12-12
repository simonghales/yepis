(function () {
  'use strict';

  angular
    .module('yepis.upload.services')
    .factory('ImageUploadClass', ImageUploadClass);

  /** @ngInject */
  function ImageUploadClass($log, $rootScope, $q, $http, API_URL, Upload) {

    function Image(pageId, storyId, promise, dataURI, page) {
      this.storyId = storyId;
      this.pageId = pageId;
      this.promise = promise;
      this.pending = true;
      this.imageProgress = 0;
      this.dataURI = dataURI;
      this.page = page;
    }

    Image.prototype.listen = function(page) {

      var deferred = $q.defer();

      var self = this;

      this.promise.progress(function (evt) {
        var progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        self.imageProgress = progress;
        $log.debug("Upload progress: " + progress, 'story-' + self.storyId + '-page-' + self.pageId + '-uploadProgress');
        $rootScope.$broadcast('story-' + self.storyId + '-page-' + self.pageId + '-uploadProgress', progress);
        self.page.imageProgress = progress;
      });

      this.promise.then(function (response) {
        $log.debug("Upload finished", response, 'story-' + self.storyId + '-page-' + self.pageId + '-uploadCompleted');
        $rootScope.$broadcast('story-' + self.storyId + '-page-' + self.pageId + '-uploadCompleted', response.data);
        self.pending = false;
        self.page.imageUpdating = false;
        deferred.resolve();
      }, function (response) {
        $log.debug("Upload failed", response);
        $rootScope.$broadcast('story-' + self.storyId + '-page-' + self.pageId + '-uploadFailed', response);
        if (response.status > 0) {
        }
        self.pending = false;
        self.page.imageUpdating = false;
        deferred.reject();
      });

      return deferred.promise;
    }

    Image.build = function(pageId, storyId, blob, dataURI, page) {

      $log.debug("Use this blob", pageId, storyId, blob);

      var promise = Upload.upload({
        url: API_URL + 'api/image/.json',
        //file: {
        //  "original" : blob
        //},
        file: blob,
        fields: {
          'original' : blob,
          'remote_url':''
        },
        headers: {
          Authorization: $http.defaults.headers.common['Authorization'],
          'Content-Type': 'multipart/form-data'
        },
      });

      return new Image(
        pageId,
        storyId,
        promise,
        dataURI,
        page
      );

    }

    return Image;

  }

})();
