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
      var canvasBackground;
      var resizeCanvasListener;

      $timeout(function() {

        canvas = element[0];

        resizeCanvas();

        canvasContext = canvas.getContext("2d")
        canvasBackground = new Image();

        if(scope.img) {
          drawImage();
        }

        scope.$watch(scope.img, function(newVal, oldVal) {

          $log.debug("scope img changed???", scope, newVal, oldVal, scope.img);

          if(newVal !== oldVal) {
            drawImage();
          }

        });

        var window = angular.element($window);
        window.bind('resize', resizeHandler);

        scope.$on('$destroy', function(e) {
          window.unbind('resize', resizeHandler);
        });

      });

      function drawImage() {

        var proxyImage = scope.img.thumbnail;
        //var proxyImage = scope.img.original;
        proxyImage = proxyImage.replace("http://storyapp-yep.s3-ap-southeast-2.amazonaws.com", "/imageproxy");

        $log.debug("proxy image to use", proxyImage);

        canvasBackground.src = proxyImage;
        canvasBackground.onload = function() {
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
        // This draws the image we just loaded to our canvas
        canvasContext.drawImage(canvasBackground, 0, 0, w, h);
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
