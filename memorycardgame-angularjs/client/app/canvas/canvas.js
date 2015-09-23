'use strict';

angular.module('memorycardgameApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('canvas', {
        url: '/canvas',
        templateUrl: 'app/canvas/canvas.html',
        controller: 'CanvasCtrl'
      });
  });