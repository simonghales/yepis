(function() {
  'use strict';

  angular
    .module('yepis')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'mainVM'
      })
      .state('create', {
        url: '/create',
        templateUrl: 'app/create/create.html',
        controller: 'CreateController',
        controllerAs: 'createVM',
        data: {
          requiresLogin: true
        }
      })
      .state('story', {
        url: '/s/:id/:slug',
        templateUrl: 'app/story/story.html',
        controller: 'StoryController',
        controllerAs: 'storyVM'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
