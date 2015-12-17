(function() {
  'use strict';

  angular
    .module('yepis.general.controllers')
    .controller('SiteController', SiteController);

  /** @ngInject */
  function SiteController($log, $rootScope, $window, UserAuthService, UserService, UserModalsService) {
    var vm = this;

    vm.authUser = authUser;
    vm.requireAuth = requireAuth;
    vm.signOut = signOut;
    vm.user = UserService.user;

    vm.states = {
      signedIn: false,
      showVerification: true
    };

    activate();

    function activate() {

      if(vm.user && !vm.user.userprofile.verified) {
        $log.warn("User is not verified!");
      }

    }

    function authUser(tab) {
      UserModalsService.userAuthModal(tab);
    }

    function requireAuth(event) {

      if(!$rootScope.states.signedIn) {
        event.preventDefault();
        authUser('create');
      }

    }

    function signOut() {
      UserAuthService.clearAuth();
      UserService.clearUser();
      $window.location.reload();
    }

  }
})();
