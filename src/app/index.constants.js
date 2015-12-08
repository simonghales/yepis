/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('yepis')
    .constant('malarkey', malarkey)
    .constant('moment', moment);

  angular.module('yepis').constant('API_URL', 'https://morning-mountain-1547.herokuapp.com/');

})();
