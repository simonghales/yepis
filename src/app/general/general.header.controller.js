(function() {
  'use strict';

  angular
    .module('yepis.general.controllers')
    .controller('HeaderController', HeaderController);

  /** @ngInject */
  function HeaderController($log, $rootScope, UserModalsService, UserService) {
    var vm = this;

    vm.authUser = authUser;
    vm.user = UserService.user;

    vm.states = {
      signedIn: false
    };

    activate();

    function activate() {
      if(vm.user) vm.states.signedIn = true;
      $log.debug("Is user signed in?: " + vm.states.signedIn);
    }

    function authUser(tab) {
      UserModalsService.userAuthModal(tab);
    }

  }
})();
