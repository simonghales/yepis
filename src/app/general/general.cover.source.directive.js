(function () {
  'use strict';

  angular.module('yepis.general.directives').directive('coverSrc',
    function($log, $window) {
    return function(scope, element, attrs) {

      var aspectRatio;
      var windowRatio;
      var img;
      var imgLoaded = false;
      var url;

      activate();

      function activate() {

        attrs.$observe('coverSrc', function () {
          setCoverSource();
        });

        scope.$on('resize-pages', function() {
          calcSize();
        });

      }

      var setCoverSource = function() {
        url = attrs.coverSrc;

        if(!url) return;

        img = element[0];

        img.onload = function() {
          //$log.debug("loaded img");
          imgLoaded = true;
          calcSize();
        }

        attrs.$set('src', url);

      };

      function calcSize() {
        if(!imgLoaded) return;
        windowRatio = $window.innerWidth / $window.innerHeight;
        aspectRatio = img.width / img.height;

        if (windowRatio < aspectRatio) {
          //$log.debug("Adjust the height");
          element.removeClass('size--width').addClass('size--height');
          element.css({
            'margin-left' : Math.round(($window.innerWidth - img.width) / 2) + 'px',
            'margin-top' : '0'
          });
        } else {
          $log.debug("Adjust the width");
          element.removeClass('size--height').addClass('size--width');
          element.css({
            'margin-left' : '0',
            'margin-top' : Math.round(($window.innerHeight - img.height) / 2) + 'px'
          });
        }

        // Math.round(($window.innerHeight - img.height) / 2)

        //attrs.$set('src', url);

        //$log.debug("Element", element[0], element[0].width, element[0].height);

        //$log.debug("loaded img", img, img.width, img.height);
      }

      setCoverSource();


    };
  });

})();

