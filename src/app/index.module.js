(function() {
  'use strict';

  angular
    .module('yepis', [

      'yepis.general',
      'yepis.user',
      'yepis.upload',
      'yepis.story',

      'ngAnimate',
      'ngCookies',
      'ngTouch',
      'ngSanitize',
      'restangular',
      'ui.router',
      'toastr',
      'ngDialog',
      'ngFileUpload'
    ]);

  // General

  angular.module('yepis.general', [
    'yepis.general.controllers',
    'yepis.general.directives',
    'yepis.general.services'
  ]);

  angular.module('yepis.general.controllers', []);

  angular.module('yepis.general.directives', []);

  angular.module('yepis.general.services', []);

  // User

  angular.module('yepis.user', [
    'yepis.user.controllers',
    'yepis.user.services'
  ]);

  angular.module('yepis.user.controllers', []);

  angular.module('yepis.user.services', []);

  // Upload

  angular.module('yepis.upload', [
    'yepis.upload.controllers',
    'yepis.upload.services'
  ]);

  angular.module('yepis.upload.controllers', []);

  angular.module('yepis.upload.services', []);

  // Story

  angular.module('yepis.story', [
    'yepis.story.controllers',
    'yepis.story.directives',
    'yepis.story.services'
  ]);

  angular.module('yepis.story.controllers', []);

  angular.module('yepis.story.directives', []);

  angular.module('yepis.story.services', []);


})();
