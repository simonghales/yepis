
(function () {
  'use strict';

  angular
    .module('yepis.story.services')
    .factory('TextEditorService', TextEditorService);

  /** @ngInject */
  function TextEditorService($log) {

    var editorDimensions = {
      height: 206,
      width: 260
    };

    var service = {
      calcPos: calcPos,
      getElem: getElem,
      getPos: getPos,
      element: null,
      setElem: setElem,
      setPos: setPos,
      pos: {
        x: 0,
        y: 0
      }
    };

    return service;

    function calcPos(x, y) {

      var positions = {
        x: x,
        y: y + 80
      };

      return positions;
    }

    function getElem() {
      return service.element;
    }

    function getPos() {
      return service.pos;
    }

    function setElem(element) {
      service.element = element;
    }

    function setPos(positions) {
      service.pos.x = positions.x;
      service.pos.y = positions.y;
    }

  }

})();
