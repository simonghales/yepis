
(function () {
  'use strict';

  angular
    .module('yepis.user.services')
    .factory('UserAuthService', UserAuthService);

  /** @ngInject */
  function UserAuthService($log, $http, $cookies, Restangular) {

    var service = Restangular.service('api-token-auth');

    service.isAuth = isAuth;
    service.getAuth = getAuth;
    service.setAuth = setAuth;
    service.storeAuth = storeAuth;
    service.clearAuth = clearAuth;

    return service;

    function isAuth() {
      return !!$cookies.get('JWT');
    }

    function getAuth() {
      if(!$cookies.get('JWT')) return null;
      return $cookies.get('JWT');
    }

    function setAuth(token, storeToken) {
      $http.defaults.headers.common['Authorization'] = 'JWT ' + token; // jshint ignore:line
      $http.defaults.headers.common['Content-Type'] = 'application/json'; // jshint ignore:line
      if(storeToken) {
        service.storeAuth(token);
      }
    }

    function storeAuth(token) {
      $cookies.put('JWT', token);
    }

    function clearAuth() {
      $http.defaults.headers.common['Authorization'] = null;
      $cookies.remove('JWT');
    }

  }

})();
