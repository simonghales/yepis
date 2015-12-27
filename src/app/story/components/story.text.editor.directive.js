(function () {
  'use strict';

  angular
    .module('yepis.story.directives')
    .directive('textEditor', textEditor);

  function textEditor($log, TextEditorService) {

    var directive = {
      restrict: 'E',
      controller: 'TextEditorController',
      controllerAs: 'editorVM',
      templateUrl: 'app/story/components/_story.text.editor.html',
      replace: true,
      scope: false,
      link: link
    }

    return directive;

    function link(scope, element, attributes) {

      activate();

      function activate() {

        setPos(TextEditorService.getPos());

        setListeners();

      }

      function setListeners() {

        scope.$watch(function() {
          return TextEditorService.getPos();
        }, function(positions, oldPositions) {
          setPos(positions);
        }, true);

      }

      function setPos(positions) {
        //element.css({
        //  'top' : positions.y + 'px',
        //  'left' : positions.x + 'px'
        //});
        element.css({
          'transform': 'translate(' + positions.x +'px, ' + positions.y + 'px)' // todo needs moz safari
        });
      }

    }

  }

})();
