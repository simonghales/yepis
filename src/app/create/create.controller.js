(function() {
  'use strict';

  angular
    .module('yepis.general.controllers')
    .controller('CreateController', CreateController);

  /** @ngInject */
  function CreateController($log, Upload, ImageService, $http, API_URL) {
    var vm = this;

    vm.models = {
      title: '',
      description: '',
      image: '',
      imageProgress: ''
    };

    vm.states = {
      uploading: false,
      image: {
        uploading: false
      }
    };

    vm.uploadImage = uploadImage;

    activate();

    function activate() {
    }

    function uploadImage(file) {
      if(!file) return;
      $log.debug("File to upload", file);
      vm.states.image.uploading = true;

      ImageService.resizeImage(file, function(dataURI) {

        var blob = ImageService.dataURItoBlob(dataURI);

        vm.models.image = dataURI;

        $log.debug("Resized image, now do something with it", blob, dataURI);

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

        promise.progress(function(evt) {
          var progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          vm.models.imageProgress = progress;
          $log.debug("Progress: " + progress);
        });

        promise.then(function(data) {
          $log.debug("Uploaded image", data);
          vm.states.image.uploading = false;
        }, function(error) {
          $log.warn("Failed to upload image", error);
          vm.states.image.uploading = false;
        });

      });

    }

  }
})();
