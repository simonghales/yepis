(function() {
  'use strict';

  angular
    .module('yepis')
    .config(config);

  /** @ngInject */
  function config($logProvider, RestangularProvider, API_URL, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);


    RestangularProvider.setBaseUrl(API_URL);
    RestangularProvider.setRequestSuffix('/.json');

    // leftover from previous iteration, not sure if necessary
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
      var extractedData;
      if (operation === "getList") {
        extractedData = data.results;
        extractedData.meta = {
          count: data.count,
          next: data.next,
          previous: data.previous,
        }
        //extractedData.next = data.next;
        //extractedData.previous = data.previous;
      } else {
        extractedData = data;
      }
      return extractedData;
    });


    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();
