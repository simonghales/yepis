(function () {
  'use strict';

  angular
    .module('yepis.upload.services')
    .factory('ImageService', ImageService);

  /** @ngInject */
  function ImageService($log) {

    var service = {};

    service.resizeImage = resizeImage;
    service.dataURItoBlob = dataURItoBlob;

    return service;

    function resizeImage(file, callback) {

      var reader = new FileReader();
      reader.onloadend = function() {

        var tempImg = new Image();
        tempImg.src = reader.result;
        tempImg.onload = function() {

          var MAX_WIDTH = 1920;
          var MAX_HEIGHT = 1920;
          var tempW = tempImg.width;
          var tempH = tempImg.height;
          if (tempW > tempH) {
            if (tempW > MAX_WIDTH) {
              tempH *= MAX_WIDTH / tempW;
              tempW = MAX_WIDTH;
            }
          } else {
            if (tempH > MAX_HEIGHT) {
              tempW *= MAX_HEIGHT / tempH;
              tempH = MAX_HEIGHT;
            }
          }

          var canvas = document.createElement('canvas');
          canvas.width = tempW;
          canvas.height = tempH;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(this, 0, 0, tempW, tempH);
          var dataURL = canvas.toDataURL("image/jpeg");
          var data = 'image=' + dataURL;

          callback(dataURL);


        }

      }
      reader.readAsDataURL(file);

    }

    // source: http://stackoverflow.com/a/15754051
    function dataURItoBlob(dataURI) {
      var byteString = atob(dataURI.split(',')[1]);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: 'image/jpeg' });
    }

  }

})();
