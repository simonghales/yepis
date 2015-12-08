(function() {
  'use strict';

  angular
    .module('yepis.general.controllers')
    .controller('HeaderController', HeaderController);

  /** @ngInject */
  function HeaderController($log, UserModalsService) {
    var vm = this;

    vm.authUser = authUser;

    activate();

    function activate() {
    }

    function authUser(tab) {
      UserModalsService.userAuthModal(tab);
    }

  }
})();
