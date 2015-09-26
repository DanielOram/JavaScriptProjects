'use strict';

angular.module('memorycardgameApp')
  .factory('gameGridFactory', function () {

    var arrayPosTemp = 100;
    var overCardPos = 100;
    var matched = 0;

    var grid = function(rowsNum, columnsNum, enclosing_element) {
      var newGrid = {};
      newGrid.enclosing_element = document.getElementById(enclosing_element);
      newGrid.grid_ctx = newGrid.enclosing_element.getContext("2d");
      newGrid.rowsNum = rowsNum;
      newGrid.columnsNum = columnsNum;
      var cards = []
      //use newGrid.cards and not var cards!
      newGrid.cards = cards;
        //fill array with card objects
        newGrid.contents = function () {
          var count = 0;
          for (var i = 0; i < rowsNum; i++) {
            for (var j = 0; j < columnsNum; j++) {
              newGrid.cards[count] = card(randomiseCard(), i * 50, j * 50, "gameArea", (i*10 + j));
              count++;
            }

          }
        };
      //for drawing and redrawing the canvas
      newGrid.drawGridContents = function () {
        for (var q = 0; q < (rowsNum * columnsNum); q++) {
          newGrid.cards[q].drawCard(newGrid.cards[q].hasBeenSelected);
        }
      };

      //newGrid method returns the card object that was clicked.
      newGrid.ClickedCard = function ClickedCard(e) {
        var offsetX = newGrid.enclosing_element.offsetLeft;
        var offsetY = newGrid.enclosing_element.offsetTop;

        var xPosition = e.clientX - offsetX;
        var yPosition = e.clientY - offsetY;
        //array goes [0] - [99]
        var arrayPos = ((Math.ceil(xPosition / 50) - 1 ) * 10) + (Math.ceil(yPosition / 50)) - 1;


        //newGrid code is for drawing the clicked card onto the hoverbox.
        document.getElementById('hover_image').style.backgroundColor=newGrid.cards[arrayPos].fillColor;
        //document.getElementById('hover_image').backGround=newGrid.cards[arrayPos].fillColor;
        document.getElementById('hover_image').src=newGrid.cards[arrayPos].image;
        document.getElementById('hover_image').style.width = '100%'
        document.getElementById('hover_image').style.height = 'auto'



        return newGrid.cards[arrayPos];

      }

      //newGrid method returns card that is being hovered.
      newGrid.HoveredCard = function HoveredCard(e) {
        var offsetX = newGrid.enclosing_element.offsetLeft;
        var offsetY = newGrid.enclosing_element.offsetTop;
        var xPosition = e.clientX - offsetX;
        var yPosition = e.clientY - offsetY;

        //change hoverBox position.
        var hoverBox = document.getElementById('hover_card');
        var x = ((Math.ceil(xPosition / 50) ) * 50);
        var y = ((Math.ceil(yPosition / 50)) * 50);

        //newGrid code is for drawing the clicked card onto the hoverbox.
        var overCardPos = ((Math.ceil(xPosition / 50) - 1 ) * 10) + (Math.ceil(yPosition / 50)) - 1;
        if(overCardPos < 100){
          if(newGrid.cards[overCardPos].hasBeenSelected){
            //document.getElementById('hover_image').backGround=newGrid.cards[arrayPosTemp].fillColor;
            //document.getElementById('hover_image').style.backgroundColor=newGrid.cards[arrayPos].fillColor;
            document.getElementById('hover_image').style.backgroundColor=newGrid.cards[overCardPos].fillColor;

            document.getElementById('hover_image').src=newGrid.cards[overCardPos].image;
            document.getElementById('hover_image').style.width = '100%'
            document.getElementById('hover_image').style.height = 'auto'
          } else {
            document.getElementById('hover_image').src="";
          }

          //method to animate scale effect on hover card
          if (arrayPosTemp != ((Math.ceil(xPosition / 50) - 1 ) * 10) + (Math.ceil(yPosition / 50)) - 1) {
            //enlarged hoverbox animation effect
            hoverBox.style.marginLeft = x + 'px';
            hoverBox.style.marginTop = y + 'px';
            hoverBox.style.height = "52px";
            hoverBox.style.width = "52px";
            //newGrid cannot be called on hoverBox.
            $('#hover_card').stop().animate({width:"75px", height: "75px",marginLeft: (x - 12) + 'px', marginTop: (y - 12) + 'px' },100);
          }
        }
        arrayPosTemp = ((Math.ceil(xPosition / 50) - 1 ) * 10) + (Math.ceil(yPosition / 50)) - 1;
        //display mouse position for testing purposes
        document.getElementById('online_users').innerHTML = (" hover: " + xPosition + ", " + yPosition);
      }

      return newGrid;
    };

    var card = function (image, xPos, yPos, canvas, arrayPosition) {
      var newCard= {};
      //Important stuff for canvas and drawing.
      newCard.canvas = document.getElementById(canvas);
      newCard.ctx = newCard.canvas.getContext("2d");

      newCard.image = image;
        newCard.height = '50px';
        newCard.width = '50px';
      newCard.arrayPosition = arrayPosition;

        newCard.getInfo = function () {
            return 'colour: ' + newCard.image + ' height: ' + newCard.height + ' width: ' + newCard.width + ' canvas: ' + newCard.canvas;
        };

      //returns image src as string.
      newCard.getType = function () {
        return newCard.image;
      }
      //all cards are initially not selected. They are drawn blank.
      newCard.hasBeenSelected = false;
      //the background colour.
      newCard.fillColor = '#ccc';
      newCard.xPos = xPos;
      newCard.yPos = yPos;
      //load image. ONCE!
      var img=new Image();
      img.src=image;

      //function to draw card on canvas
      newCard.drawCard = function (selected) {
        if (selected){
          //draw Image.
          newCard.ctx.fillStyle = newCard.fillColor;
          //newCard determines position and size of icon
          newCard.ctx.fillRect(newCard.xPos,newCard.yPos,50,50);

          newCard.ctx.strokeStyle = "#2191B7";
          newCard.ctx.lineWidth = 1;
          newCard.ctx.strokeRect(newCard.xPos,newCard.yPos, 50,50);

          newCard.ctx.drawImage(img, newCard.xPos, newCard.yPos, 50, 50);
        } else {
          //Draw blank image.
          newCard.ctx.fillStyle = newCard.fillColor;
          //newCard determines position and size of icon
          newCard.ctx.fillRect(newCard.xPos,newCard.yPos,50,50);

          newCard.ctx.strokeStyle = "#2191B7";
          newCard.ctx.lineWidth = 1;
          newCard.ctx.strokeRect(newCard.xPos,newCard.yPos, 50,50);
        }
      }

      //function to change cards background color after matching.
      newCard.matchedCard = function () {
        newCard.fillColor = "#F3A214";
        document.getElementById('hover_image').style.backgroundColor=newCard.fillColor;
      }

      return newCard;
    };

    var randomiseCard = function() {
     var cardPic = Math.floor(Math.random() * 20) + 1;
     var icon = '';
     switch (cardPic) {
       case 1:
       icon = 'app/Images/Icons/blank.png'
       break;
       case 2:
       icon = 'app/Images/Icons/cake.png'
       break;
       case 3:
       icon = 'app/Images/Icons/chain.png'
       break;
       case 4:
       icon = 'app/Images/Icons/coffee.png'
       break;
       case 5:
       icon = 'app/Images/Icons/cross.png'
       break;
       case 6:
       icon = 'app/Images/Icons/drop.png'
       break;
       case 7:
       icon = 'app/Images/Icons/envelope.png'
       break;
       case 8:
       icon = 'app/Images/Icons/flower.png'
       break;
       case 9:
       icon = 'app/Images/Icons/heart.png'
       break;
       case 10:
       icon = 'app/Images/Icons/house.png'
       break;
       case 11:
       icon = 'app/Images/Icons/key.png'
       break;
       case 12:
       icon = 'app/Images/Icons/left_arrow.png'
       break;
       case 13:
       icon = 'app/Images/Icons/nuclear.png'
       break;
       case 14:
       icon = 'app/Images/Icons/paperclip.png'
       break;
       case 15:
       icon = 'app/Images/Icons/plus.png'
       break;
       case 16:
       icon = 'app/Images/Icons/present.png'
       break;
       case 17:
       icon = 'app/Images/Icons/right_arrow.png'
       break;
       case 18:
       icon = 'app/Images/Icons/tick.png'
       break;
       case 19:
       icon = 'app/Images/Icons/wine.png'
       break;
       case 20:
       icon = 'app/Images/Icons/wrench.png'
       break;
     }
     return icon;
   };

    return {
      grid: grid
    };
  });
