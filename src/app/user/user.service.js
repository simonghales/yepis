
(function () {
  'use strict';

  angular
    .module('yepis.user.services')
    .factory('UserService', UserService);

  /** @ngInject */
  function UserService($log, $cookies, Restangular) {

    var service = Restangular.service('api/users');
    service.register = Restangular.service('api/users/create');
    service.getCurrentUserAndStore = getCurrentUserAndStore;
    service.isStoredUser = isStoredUser;
    service.clearUser = clearUser;
    service.getUser = getUser;
    service.getStoredUser = getStoredUser;
    service.setUser = setUser;
    service.storeUser = storeUser;
    service.user = null;
    return service;

    function getCurrentUserAndStore() {
      service.one('current').get()
        .then(function(data) {
          service.storeUser(data.plain());
          service.user = data.plain();
        }, function(error) {
          console.log("Failed to get current user", error);
        });
    }

    function isStoredUser() {
      return !!$cookies.get('user');
    }

    function clearUser() {
      $cookies.remove('user');
    }

    function getUser() {
      if(service.user) return service.user;
      return null;
    }

    function getStoredUser() {
      if(!$cookies.get('user')) return null;
      return JSON.parse($cookies.get('user'));
    }

    function setUser(user) {
      service.user = user;
    }

    function storeUser(user) {
      $cookies.put('user', JSON.stringify(user));
    }

  }

})();
