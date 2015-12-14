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
      imageProgress: 0,
      imageId: ''
    };

    vm.states = {
      uploading: false,
      image: {
        uploading: false,
        uploaded: false
      }
    };

    vm.isValidForm = isValidForm;
    vm.uploadImage = uploadImage;

    activate();

    function activate() {
    }

    function isValidForm() {
      if(vm.models.title &&
        vm.models.description &&
        vm.models.imageId &&
        vm.states.image.uploaded) return true;
      return false;
    }

    function uploadImage(file) {
      if(!file || vm.states.image.uploading) return;
      $log.debug("File to upload", file);
      vm.states.image.uploading = true;
      vm.states.image.uploaded = false;

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

          vm.models.imageId = data.data.id;

          vm.states.image.uploading = false;
          vm.states.image.uploaded = true;
        }, function(error) {
          $log.warn("Failed to upload image", error);
          vm.states.image.uploading = false;
          vm.states.image.uploaded = true;
        });

      });

    }

  }
})();
