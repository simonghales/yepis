(function() {
  'use strict';

  angular
    .module('yepis.story.controllers')
    .controller('StoryQuickEditorController', StoryQuickEditorController);

  /** @ngInject */
  function StoryQuickEditorController($log, $rootScope, $scope, Story, StoryService, StoryPageService,
                                      StoryPageClass, ImageUploadClass,
                                      ImageService, PendingImagesService) {
    var vm = this;

    vm.addPage = addPage;
    vm.deletePage = deletePage;
    vm.done = done;
    vm.uploadImage = uploadImage;

    vm.story = StoryService.currentStory;
    vm.pendingPages = [];

    var storyId = vm.story.id;

    activate();

    function activate() {
    }

    function addPage(file) {
      vm.pendingPages.push('');

      // create page

      var pageData = {
        "story": vm.story.id,
        "background_images": [],
        "background_colour": "",
        "measurements": "",
        "elements": ""
      };

      StoryPageService.post(pageData)
        .then(function(data) {
          $log.debug("Added new page", data);

          var page = data;

          $rootScope.$broadcast('story-' + vm.story.id + '-newPage', page);
          $log.debug("Broadcast new page", 'story-' + vm.story.id + '-newPage');

          if(vm.pendingPages.length > 0) {
            vm.pendingPages.splice(0, 1);
          }

          uploadImage(file, page);

        }, function(error) {
          $log.warn("Failed to add new page", error);

          if(vm.pendingPages.length > 0) {
            vm.pendingPages.splice(0, 1);
          }

        });

      // remove pendingPage

    }

    function addImageListener(page, pageId) {

      $scope.$on('story-' + storyId + '-page-' + pageId + '-uploadProgress',
        function(event, progress) {
          //$log.debug("UPDATE WITH THE PROGRESS: " + progress);
          //page.imageProgress = progress;
        });
      $scope.$on('story-' + storyId + '-page-' + pageId + '-uploadCompleted',
        function(event, response) {
          //$log.debug("Upload finished", response, page);
          //page.imageUpdating = false;
        });
      $scope.$on('story-' + storyId + '-page-' + pageId + '-uploadFailed',
        function(event, response) {
          //$log.debug("Upload failed", response);
          //page.imageUpdating = false;
        });
      //$log.debug("Listening on", 'story-' + storyId + '-page-' + pageId + '-uploadCompleted');
    }

    function deletePage(page, index) {
      if(page.states) page.states.deleting = true;
      else page.states = {deleting: true};
      StoryPageService.one(page.id).remove()
        .then(function() {
          StoryService.removePage(page.id, index);
          $log.debug("Deleted page");
        }, function(error) {
          $log.warn("Failed to delete page");
        });
    }

    function done() {
      $scope.closeThisDialog();
    }

    function uploadImage(file, page) {
      if(!file) return;
      $log.debug("File to upload", file);

      ImageService.resizeImage(file, function(dataURI) {

        var blob = ImageService.dataURItoBlob(dataURI);

        $log.debug("Resized image, now do something with it", blob);

        //var uploadingImage = ImageUploadClass.build(page.id, storyId, blob, dataURI);
        PendingImagesService.newUploadingImage(page.id, storyId, blob, dataURI, page);

        page.background_image_urls[0] = {original: dataURI};
        page.imageUpdating = true;
        $log.debug("New page", page);
        vm.story.pages.push(page); // todo change back to push
        addImageListener(page, page.id);

      });

    }

  }
})();
