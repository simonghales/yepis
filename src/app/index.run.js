(function() {
  'use strict';

  angular
    .module('yepis')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, UserAuthService, UserService, UserSessionService) {

    $rootScope.states = {
      signedIn: false
    };

    if(UserAuthService.isAuth()) {
      UserAuthService.setAuth(UserAuthService.getAuth());
      $rootScope.states.signedIn = true;
      if(UserService.isStoredUser()) {
        var user = UserService.getStoredUser();
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

    $log.debug('runBlock end');
  }

})();
