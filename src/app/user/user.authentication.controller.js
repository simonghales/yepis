(function() {
  'use strict';

  angular
    .module('yepis.user.controllers')
    .controller('UserAuthController', UserAuthController);

  /** @ngInject */
  function UserAuthController($log, $scope, $rootScope, $timeout, UserAuthService, UserService, UserSessionService) {
    var vm = this;

    vm.changeTab = changeTab;
    vm.createAccount = createAccount;
    vm.signIn = signIn;

    vm.inputs = {
      username: '',
      email: '',
      password: ''
    };

    vm.states = {
      error: false,
      submitting: false,
      tab: 'login',
      create: {
        submitting: false,
        error: false
      }
    };

    activate();

    function activate() {

      if($scope.ngDialogData && $scope.ngDialogData.tab) {
        vm.states.tab = $scope.ngDialogData.tab;
      }

      $timeout(function() {
        focusInput();
      }, 100);

    }

    function changeTab(tab) {
      vm.states.error = false;
      vm.states.tab = tab;
      $timeout(function() {
        focusInput();
      });
    }

    function createAccount(valid) {
      if(!valid || vm.states.create.submitting) return;
      vm.states.create.submitting = true;
      vm.states.create.error = false;

      UserService.register.post({
        username: vm.inputs.username,
        email: vm.inputs.email,
        password: vm.inputs.password,
        userprofile: {
          avatar_images: [],
          bio: ""
        }
      }).then(function(data) {
        $log.debug("Registered", data);

        signIn(true);

        //_getToken();
      }, function(error) {
        $log.warn("Failed to register", error);
        vm.states.create.error = true;
        vm.states.create.submitting = false;
      });

    }

    function focusInput() {
      var input = (vm.states.tab == 'create') ? document.getElementById('form-auth-input-username__create') :
        document.getElementById('form-auth-input-username');
      if(input) input.focus();
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
          vm.states.create.submitting = false;
          vm.states.submitting = false;
          $scope.closeThisDialog();
        }, function(error) {
          console.log("Error getting current user", error);
          vm.states.error = true;
          vm.states.create.submitting = false;
          vm.states.submitting = false;
        });

    }

  }
})();
