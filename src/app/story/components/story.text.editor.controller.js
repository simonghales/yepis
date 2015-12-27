(function() {
  'use strict';

  angular
    .module('yepis.story.controllers')
    .controller('TextEditorController', TextEditorController);

  /** @ngInject */
  function TextEditorController($log, $scope, TextEditorService) {

    var vm = this;

    vm.updateAlignment = updateAlignment;
    vm.updateColour = updateColour;
    vm.updateWeight = updateWeight;
    vm.updateSize = updateSize;

    vm.options = {
      sizes: [
        '10px',
        '11px',
        '12px',
        '14px',
        '16px',
        '18px',
        '24px',
        '32px',
        '48px',
        '64px',
        '72px'
      ],
      alignments: [
        'left',
        'center',
        'right'
      ],
      weights: [
        'light',
        'normal',
        'bold',
        'black'
      ]
    };

    vm.element = TextEditorService.getElem();
    vm.info = {
      text: 'oops',
      color: '#FFF000',
      size: '69px',
      align: 'right',
      weight: 'normal'
    };

    activate();

    function activate() {

      $scope.$watch(function() {
        return TextEditorService.getElem();
      }, function(element, oldElement) {
        if(element === null) {
          return;
        }
        vm.element = element;
        _prepElement();
      }, true);

    }

    function updateAlignment() {
      vm.element.align = vm.info.align;
    }

    function updateColour() {
      vm.element.color = vm.info.color;
    }

    function updateWeight() {
      vm.element.weight = vm.info.weight;
    }

    function updateSize() {
      vm.element.size = vm.info.size;
    }

    function _prepElement() {
      vm.info = {
        text: vm.element.text,
        color: vm.element.color,
        size: vm.element.size,
        weight: vm.element.weight,
        align: vm.element.align
      };
    }

  }
})();
