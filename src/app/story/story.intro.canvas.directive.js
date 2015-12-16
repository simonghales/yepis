(function () {
  'use strict';

  angular
    .module('yepis.story.directives')
    .directive('storyIntroCanvas', storyIntroCanvas);

  function storyIntroCanvas($log, $timeout, $window) {

    var directive = {
      restrict: 'E',
      template: "<canvas class='site-intro__canvas' width='500' height='500'>",
      replace: true,
      scope: {
        img: '=img'
      },
      link: link
    }

    return directive;

    function link(scope, element, attrs) {

      var canvas;
      var canvasContext;
      var resizeCanvasListener;
      var imageLoaded = false;
      var canvasBackground;

      canvas = element[0];
      resizeCanvas();
      canvasContext = canvas.getContext("2d")

      attrs.$observe('blurImg', function () {
        drawImage();
        $log.debug("blur img changed: " + attrs.blurImg);
      });

      var window = angular.element($window);
      window.bind('resize', resizeHandler);

      scope.$on('$destroy', function(e) {
        window.unbind('resize', resizeHandler);
      });

      function drawImage() {

        if(!attrs.blurImg) return;

        var proxyImage = attrs.blurImg;
        //var proxyImage = scope.img.original;
        proxyImage = proxyImage.replace("http://storyapp-yep.s3-ap-southeast-2.amazonaws.com", "/imageproxy");

        // http://storyapp-yep.s3-ap-southeast-2.amazonaws.com
        // https://storyapp-yep.s3.amazonaws.com/media

        $log.debug("proxy image to use", proxyImage);

        canvasBackground = new Image();
        canvasBackground.src = proxyImage;
        canvasBackground.onload = function() {
          imageLoaded = true;
          drawBlur();
          $timeout(function() {
            element.addClass('image--loaded');
          }, 200);
        }
      }

      function drawBlur() {
        // Store the width and height of the canvas for below
        var w = canvas.width;
        var h = canvas.height;
        canvasContext.clearRect(0, 0, w, h);
        // This draws the image we just loaded to our canvas
        //canvasContext.drawImage(canvasBackground, 0, 0, w, h);

        drawImageProp(canvasContext, canvasBackground, 0, 0, w, h, 0.5, 0.5);

        // This blurs the contents of the entire canvas
        stackBlurCanvasRGBA(attrs.id, 0, 0, w, h, 100);
      }

      function resizeCanvas() {

        canvas.width = $window.innerWidth;
        canvas.height = $window.innerHeight;

      }

      function resizeHandler() {
        resizeCanvas();
        drawBlur();
      }

    }

  }

})();
