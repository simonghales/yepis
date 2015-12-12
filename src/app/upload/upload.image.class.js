(function () {
  'use strict';

  angular
    .module('yepis.upload.services')
    .factory('ImageUploadClass', ImageUploadClass);

  /** @ngInject */
  function ImageUploadClass($log, $rootScope, $q, $http, API_URL, Upload) {

    function Image(pageId, storyId, promise, dataURI) {
      this.storyId = storyId;
      this.pageId = pageId;
      this.promise = promise;
      this.pending = true;
      this.progress = 0;
      this.dataURI = dataURI;
    }

    Image.prototype.listen = function() {

      var deferred = $q.defer();

      var self = this;
      var storyId = this.storyId;
      var pageId = this.pageId;

      this.promise.progress(function (evt) {
        var progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        self.progress = progress;
        $log.debug("Upload progress: " + progress, 'story-' + self.storyId + '-page-' + self.pageId + '-uploadProgress');
        $rootScope.$broadcast('story-' + self.storyId + '-page-' + self.pageId + '-uploadProgress', progress);
      });

      this.promise.then(function (response) {
        $log.debug("Upload finished", response, 'story-' + self.storyId + '-page-' + self.pageId + '-uploadCompleted');
        $rootScope.$broadcast('story-' + self.storyId + '-page-' + self.pageId + '-uploadCompleted', response.data);
        self.pending = false;
        deferred.resolve();
      }, function (response) {
        $log.debug("Upload failed", response);
        $rootScope.$broadcast('story-' + self.storyId + '-page-' + self.pageId + '-uploadFailed', response);
        if (response.status > 0) {
        }
        self.pending = false;
        deferred.reject();
      });

      return deferred.promise;
    }

    Image.build = function(pageId, storyId, blob, dataURI) {

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
        dataURI
      );

    }

    return Image;

  }

})();
