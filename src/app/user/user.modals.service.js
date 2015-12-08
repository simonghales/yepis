/**
 * AuthService
 * @namespace yepis.user.services
 */
(function () {
  'use strict';

  angular
    .module('yepis.user.services')
    .factory('UserModalsService', UserModalsService);

  /**
   * @name  UserModalsService
   * @namespace yepis.user.services.UserModalsService
   * @returns {{}}
   */
  /** @ngInject */
  function UserModalsService($log, $q, ngDialog) {

    /**
     * @name service
     * @desc The factory to be returned
     */
    var service = {
      userAuthModal: userAuthModal
    };

    return service;

    ///////////////

    function userAuthModal(tab) {
      var deferred = $q.defer();

      var modal = ngDialog.open({
        template: 'app/user/_user.authentication.modal.html',
        className: 'modal-theme-default',
        controller: 'UserAuthController',
        controllerAs: 'modalVM',
        data: {tab: tab},
        showClose: false
      });

      modal.closePromise.then(function(data) {
        deferred.resolve(data);
      });

      return deferred.promise;
    }

  }

})();
