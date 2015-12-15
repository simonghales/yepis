(function() {
  'use strict';

  angular
    .module('yepis')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state, $window, UserAuthService, UserService, UserSessionService) {

    $rootScope.states = {
      signedIn: false
    };

    if(UserAuthService.isAuth()) {
      UserAuthService.setAuth(UserAuthService.getAuth());
      $rootScope.states.signedIn = true;
      if(UserService.isStoredUser()) {
        var user = UserService.getStoredUser();
        UserService.setUser(user);
        UserSessionService.create(user.id, user);
      }
      _loadUserData();
    }

    function _loadUserData() {

      UserService.one('current').get()
        .then(function(data) {
          console.log("Got current user", data);
          UserSessionService.create(data.id, data.plain());
          UserService.storeUser(data.plain());
          $rootScope.$broadcast('user-data-updated');
        }, function(error) {
          console.log("Error getting current user", error);
        });

    }

    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams){

        if(toState.data && toState.data.requiresLogin) {
          if($rootScope.states.signedIn) return;
          event.preventDefault();
          $state.go('home');
          return;
        }

      });

    $rootScope.$on('user-signedIn',
      function(event, toState, toParams, fromState, fromParams) {
        $log.debug("Reload the state!!!");
        //$state.go($state.current, {}, {reload: true});
        //$state.reload();
        $window.location.reload();
    });

    $log.debug('runBlock end');
  }

})();
