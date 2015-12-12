
(function () {
  'use strict';

  angular
    .module('yepis.story.services')
    .factory('Story', Story);

  /** @ngInject */
  function Story($log) {

    var service = {
      addPage : addPage,
      getPages : getPages,
      init : init,
      pages: []
    };

    return service;

    function addPage(page) {
      service.pages.push(page);
    }

    function getPages() {
      return service.pages;
    }

    function init(data) {
      service.pages = data.pages;
    }

  }

})();
