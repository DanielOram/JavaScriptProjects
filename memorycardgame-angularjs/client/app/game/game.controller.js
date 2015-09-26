'use strict';

angular.module('memorycardgameApp')
  .controller('GameCtrl', function ($scope, gameGridService) {

  //start the game
  var grid = gameGridService.start_game();
  // //event handler for clicking icons.
  document.getElementById("gameArea").addEventListener("click", function (e) { gameGridService.playTurn(grid.ClickedCard(e));}, false);

  // //event handler for hovering over icons. Currently has mousemove effect.
  document.getElementById("gameArea").addEventListener("mousemove", function (e) { grid.HoveredCard(e); }, false);

  // //event handler for reverting changes from hover.
  // //document.getElementById("gameArea").addEventListener("mouseout", function (e) { alert("out"); }, false);
  gameGridService.hover_over_selection();
});
