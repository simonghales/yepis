(function() {
  'use strict';

  angular
    .module('yepis.user.controllers')
    .controller('UserAuthController', UserAuthController);

  /** @ngInject */
  function UserAuthController($log, $scope, $rootScope, UserAuthService, UserService, UserSessionService) {
    var vm = this;

    vm.changeTab = changeTab;
    vm.signIn = signIn;

    vm.inputs = {
      username: '',
      email: '',
      password: ''
    };

    vm.states = {
      error: false,
      submitting: false,
      tab: 'login'
    };

    activate();

    function activate() {

      if($scope.ngDialogData && $scope.ngDialogData.tab) {
        vm.states.tab = $scope.ngDialogData.tab;
      }

    }

    function changeTab(tab) {
      vm.states.error = false;
      vm.states.tab = tab;
    }

    function signIn(valid) {
      if(!valid || vm.states.submitting) return;
      vm.states.submitting = true;
      vm.states.error = false;

      UserAuthService.post({
        username: vm.inputs.username,
        password: vm.inputs.password
      })
        .then(function(data) {
          $log.debug("Authenticated user", data);
          // todo, store token, load user details
          UserAuthService.setAuth(data.token, true);
          _loadUserData();
        }, function(error) {
          $log.warn("Failed to authenticate user", error);
          vm.states.error = true;
          vm.states.submitting = false;
        });

    }

    function _loadUserData() {

      UserService.one('current').get()
        .then(function(data) {
          console.log("Got current user", data);
          UserSessionService.create(data.id, data.plain());
          UserService.storeUser(data.plain());
          $rootScope.$broadcast('user-signedIn');
          vm.states.submitting = false;
          $scope.closeThisDialog();
        }, function(error) {
          console.log("Error getting current user", error);
          vm.states.error = true;
          vm.states.submitting = false;
        });

    }

  }
})();
