(function() {
  'use strict';

  angular.module('yepis.general.filters').filter('slugify', function ($sce) {
    return function (val) {
      if(!val) return;
      return slugify(val);
    };
  });


})();
