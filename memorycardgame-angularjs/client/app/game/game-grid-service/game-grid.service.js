'use strict';

angular.module('memorycardgameApp')
  .service('gameGridService', function (gameGridFactory) {
    var firstCard = null;
    var secondCard = null;
    var grid = null;
    var matched = 0;
    //flip a card over to reveal image. Reset and redraw entire canvas.
    function revealCard(card) {
      card.hasBeenSelected = true;
      redrawCanvas();
    };

    //redraw canvas.
    function redrawCanvas() {
      grid.grid_ctx.clearRect(0, 0, grid.enclosing_element.width, grid.enclosing_element.height);
      grid.drawGridContents();
    };

    //compare a player's two selected cards.
    function compareCards(card1, card2) {
      if (card1.getType() == card2.getType()) {
        return true;
      }
      return false;
    };

     //function to reset pair to original drawing.
    function resetCards(c1, c2) {
      c1.fillColor = "red";
      c2.fillColor = "red";
      document.getElementById('hover_image').style.backgroundColor="red";
      redrawCanvas();
      //function changes cards back to normal after set period of time
      setTimeout(function(){
        c1.fillColor = "#ccc";
        c2.fillColor = "#ccc";
        c1.hasBeenSelected = false;
        c2.hasBeenSelected = false;
        document.getElementById('hover_image').src="";
        document.getElementById('hover_image').style.backgroundColor="#ccc";
        redrawCanvas();
      }, 500);
    };

    //this function checks whether the game has completed.
   var end_game = function () {
      if(endOfGameReached()){
        alert("GAME OVER");
      }
    };

    //called after successful pair matching. Does success animations etc.
    function matchPair(c1, c2){
      c1.matchedCard();
      c2.matchedCard();
      redrawCanvas();
      //update grid.cards array
      //grid.cards[c1.arrayPosition].hasBeenSelected == true;
      //grid.cards[c2.arrayPosition].hasBeenSelected == true;

      end_game();
    };


    //helper method for finding the end of game.
    function endOfGameReached(){
      for (var i = 0; i < grid.cards.length; i++) {
        if (grid.cards[i].hasBeenSelected) {
          matched++;
        }
      }
      if (matched>=100){
        matched = 0;
        return true;
      }
      matched = 0;
      return false;
    };

    return {
      //method for getting click coordinates.
      getClick: function(e) {
        var xPosition = e.clientX;
        var yPosition = e.clientY;
        alert("" + xPosition + ',' + yPosition);
      },

      //function to enable player to select two cards and compare them, implementing both success and fail cases.
      playTurn: function(clicked_card) {
        if (!clicked_card.hasBeenSelected){
          if (!firstCard) {
            firstCard = clicked_card;
            revealCard(firstCard);
          } else {
            secondCard = clicked_card;
            revealCard(secondCard);
            if (compareCards(firstCard, secondCard)){
            //alert('Same card type!');
            //do success animations etc.
            matchPair(firstCard, secondCard);
            //redrawCanvas();
          } else {
            //alert("reset");
            resetCards(firstCard, secondCard);
          }
            firstCard = null;
            secondCard = null;
          }
        }
      },

      start_game: function() {
        //create grid and fill with cards
        grid = gameGridFactory.grid(10,10, "gameArea");
        grid.contents();
        grid.drawGridContents();
        return grid;
      },

      //additional function for adding and removing border of hover-card.
      hover_over_selection: function() {
        $('#gameArea').hover(function(){
          document.getElementById('hover_card').style.visibility='visible';
        },function(){
          //hide hover-card when outside of the gameArea.
          document.getElementById('hover_card').style.visibility='hidden';
        });
      }
    };
});
