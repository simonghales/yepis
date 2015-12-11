
(function () {
  'use strict';

  angular
    .module('yepis.user.services')
    .factory('UserSessionService', UserSessionService);

  /** @ngInject */
  function UserSessionService($log) {

    var service = {
      create : create,
      destroy : destroy
    }

    return service;

    function create(userId, userData) {
      this.userId = userId;
      this.userData = userData;
    }

    function destroy() {
      this.userId = null;
      this.userData = null;
    }

  }

})();
