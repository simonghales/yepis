(function() {
  'use strict';

  angular
    .module('yepis.story.controllers')
    .controller('StoryController', StoryController);

  /** @ngInject */
  function StoryController($log, $scope, $timeout, $http, $stateParams, Upload, ImageService,
                           StoryService, StoryModalsService, StoryPageService, StoryImageService,
                           UserService, Restangular, API_URL) {
    var vm = this;

    vm.states = {
      author: false,
      editing: false,
      loaded: false,
      loading: false,
      profileImage: {
        busy: false,
        uploading: false,
        progress: 0
      }
    };

    vm.id = $stateParams.id;
    vm.story = null;
    vm.profileImage = '';

    vm.deletePage = deletePage;
    vm.deleteStory = deleteStory;
    vm.togglePageOptions = togglePageOptions;
    vm.openQuickEditor = openQuickEditor;
    vm.updatePageImage = updatePageImage;
    vm.uploadProfileImage = uploadProfileImage;

    activate();

    function activate() {

      vm.states.loading = true;
      StoryService.getStory(vm.id)
        .then(function(data) {
          $log.debug("loaded story", data.plain());
          vm.story = data;
          _checkAuthor();
          vm.states.loaded = true;
          vm.states.loading = false;
        }, function(error) {
          $log.warn("failed to load story");
          vm.states.loaded = true;
          vm.states.loading = false;
        });

      _defaultListeners();

    }

    function deletePage(page, index) {
      $log.debug("Delete page via this index", index);
      if(page.states) page.states.deleting = true;
      else page.states = {deleting: true};
      $timeout(function() {
        StoryPageService.one(page.id).remove()
          .then(function() {
            $log.debug("Deleted page");
          }, function(error) {
            $log.warn("Failed to delete page");
          });
        StoryService.removePage(page.id, index);
      });
    }

    function deleteStory() {
      StoryModalsService.deletePrompt(vm.story);
    }

    function togglePageOptions(page) {
      if(!page.states) {
        page.states = {
          optionsOpen: false
        };
      }
      if(!page.states.optionsOpen) {
        page.states.optionsOpen = true;
      } else {
        page.states.optionsOpen = false;
      }
    }

    function openQuickEditor() {
      StoryModalsService.quickEditor();
    }

    function updatePageImage(file, page) {
      if(!file) return;
      StoryImageService.uploadImagePage(file, page, vm.id);
      _newPageImageListener(page.id);
    }

    function uploadProfileImage(file) {

      if(!file || vm.states.profileImage.busy) return;
      $log.debug("File to upload", file);
      vm.states.profileImage.busy = true;;

      ImageService.resizeImage(file, function(dataURI) {

        vm.states.profileImage.uploading = true

        var blob = ImageService.dataURItoBlob(dataURI);

        $timeout(function() {
          vm.profileImage = dataURI;
        });

        var promise = Upload.upload({
          url: API_URL + 'api/image/.json',
          //file: {
          //  "original" : blob
          //},
          file: blob,
          fields: {
            'original' : blob,
            'remote_url':''
          },
          headers: {
            Authorization: $http.defaults.headers.common['Authorization'],
            'Content-Type': 'multipart/form-data'
          },
        });

        promise.progress(function(evt) {
          var progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          vm.states.profileImage.progress = progress;
          $log.debug("Progress: " + progress);
        });

        promise.then(function(data) {
          $log.debug("Uploaded image", data);

          //vm.models.imageData = data.data;
          //vm.models.imageId = data.data.id;

          vm.story.profile_image_urls[0] = data.data;
          vm.story.profile_image_urls[0].thumbnail = dataURI;
          vm.story.profile_images[0] = data.data.id;

          vm.story.put()
            .then(function() {
              $log.debug("Updated profile image");
            }, function(error) {
              $log.warn("Failed to update profile image", error);
            });

          $log.debug("story now", vm.story);
          vm.states.profileImage.uploading = false;
          vm.states.profileImage.busy = false;
        }, function(error) {
          $log.warn("Failed to upload image", error);
          vm.states.profileImage.uploading = false;
          vm.states.profileImage.busy = false;
        });

        //$scope.$apply();

      });

    }

    function _defaultListeners() {
      $scope.$on('story-' + vm.id + '-newPage', function(event, page) {
        _newPageImageListener(page.id);
      });
    }

    function _newPageImageListener(pageId) {
      $scope.$on('story-' + vm.id + '-page-' + pageId + '-uploadCompleted', function(event, response) {
        var page = StoryService.findPage(pageId);
        $log.debug("Update story page as image has finished uploading!", page, response);
        page.background_images[0] = response.id;
        if(page && !page.put) {
          $log.debug("Setting up rest version of page");
          page = Restangular.restangularizeElement(null, page, 'api/storypages');
        }
        page.put()
          .then(function(data) {
            $log.debug("Updated page", data);
          }, function(error) {
            $log.warn("Failed to update page");
          });
      });
    }

    function _checkAuthor() {
      if(!UserService.getUser()) return;
      if(vm.story.author.id === UserService.getUser().id) {
        $log.debug("This is the author!");
        vm.states.author = true;
        vm.states.editing = true;
      } else {
        $log.debug("This is not the author...");
      }
    }

  }
})();
