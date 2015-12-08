(function () {
  'use strict';

  angular.module('yepis.general.directives').directive('backImg', function() {
    return function(scope, element, attrs) {

      attrs.$observe('backImg', function () {
        setBackImg();
      });

      var setBackImg = function() {
        var url = attrs.backImg;

        if (url) {
          element.css({
            'background-image': 'url(' + url + ')'
          });
          element.removeClass("m--noImage").addClass("m--providedImage");
        } else {
          element.removeClass("m--providedImage").addClass("m--noImage");
        }

      };

      setBackImg();


    };
  });

})();

