(function() {
  'use strict';

  angular
    .module('yepis.story.controllers')
    .controller('StoryQuickEditorController', StoryQuickEditorController);

  /** @ngInject */
  function StoryQuickEditorController($log, $scope, Story, StoryService, StoryPageService,
                                      StoryPageClass, ImageUploadClass,
                                      ImageService, PendingImagesService) {
    var vm = this;

    vm.done = done;
    vm.uploadImage = uploadImage;

    // temp
    var count = 0;

    vm.story = StoryService.currentStory;

    var storyId = vm.story.id;

    activate();

    function activate() {
    }

    function addPage(pageId) {

    }

    function addImageListener(page, pageId) {

      $log.debug("Page Id:" + pageId);
      $scope.$on('story-' + storyId + '-page-' + pageId + '-uploadProgress',
        function(event, progress) {
          $log.debug("UPDATE WITH THE PROGRESS: " + progress);
          page.imageProgress = progress;
        });
      $log.debug("Page Id:" + pageId);
      $scope.$on('story-' + storyId + '-page-' + pageId + '-uploadCompleted',
        function(event, response) {
          $log.debug("Upload finished", response, page);
          page.imageUpdating = false;
        });
      $log.debug("Page Id:" + pageId);
      $scope.$on('story-' + storyId + '-page-' + pageId + '-uploadFailed',
        function(event, response) {
          $log.debug("Upload failed", response);
        });
      $log.debug("Listening on", 'story-' + storyId + '-page-' + pageId + '-uploadCompleted');
    }

    function done() {
      $scope.closeThisDialog();
    }

    function uploadImage(file) {
      if(!file) return;
      $log.debug("File to upload", file);

      ImageService.resizeImage(file, function(dataURI) {

        var blob = ImageService.dataURItoBlob(dataURI);

        $log.debug("Resized image, now do something with it", blob);

        var uploadingImage = ImageUploadClass.build('woop' + count, storyId, blob, dataURI);
        PendingImagesService.addPendingImage(uploadingImage, 'woop' + count, storyId);
        var page = StoryPageClass.build(dataURI);
        page.imageUpdating = true;
        $log.debug("New page", page);
        vm.story.pages.push(page);
        addImageListener(page, 'woop' + count);
        //Story.addPage(page);

        count++; // temp

      });

    }

  }
})();
