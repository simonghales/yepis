(function () {
  'use strict';

  angular
    .module('yepis.story.services')
    .factory('StoryPageClass', StoryPageClass);

  /** @ngInject */
  function StoryPageClass($log) {

    function Page(dataURI) {
      this.page = 'woop';
      this.background_image_urls = [{
        original: dataURI
      }];
    }

    Page.prototype.listen = function() {
    }

    Page.build = function(dataURI) {

      return new Page(dataURI);

    }

    return Page;

  }

})();
