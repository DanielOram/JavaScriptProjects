var arrayPosTemp = 100;
var overCardPos = 100;

var matched = 0;

// enclosing_element must not have '#' or '.'
function Grid(rowsNum, columnsNum, enclosing_element) {
	this.enclosing_element = document.getElementById(enclosing_element);
	this.grid_ctx = this.enclosing_element.getContext("2d");
    this.rowsNum = rowsNum;
    this.columnsNum = columnsNum;
	var cards = []
	//use this.cards and not var cards!
	this.cards = cards;
    //fill array with card objects
    this.contents = function () {
        var count = 0;
        for (i = 0; i < rowsNum; i++) {
            for (j = 0; j < columnsNum; j++) {
                this.cards[count] = new Card(Randomise_Card(), i * 50, j * 50, "gameArea", (i*10 + j));
                count++;
            }

        }
    };
	//for drawing and redrawing the canvas
    this.drawGridContents = function () {
        for (var q = 0; q < (rowsNum * columnsNum); q++) {
            this.cards[q].drawCard(this.cards[q].hasBeenSelected);
        }
    };
	
	//this method returns the card object that was clicked.
	this.ClickedCard = function ClickedCard(e) {
		var offsetX = this.enclosing_element.offsetLeft;
		var offsetY = this.enclosing_element.offsetTop;
		
    	var xPosition = e.clientX - offsetX;
    	var yPosition = e.clientY - offsetY;
		//array goes [0] - [99]
		var arrayPos = ((Math.ceil(xPosition / 50) - 1 ) * 10) + (Math.ceil(yPosition / 50)) - 1;
		
		
		//this code is for drawing the clicked card onto the hoverbox.
		document.getElementById('hover_image').style.backgroundColor=this.cards[arrayPos].fillColor;
		//document.getElementById('hover_image').backGround=this.cards[arrayPos].fillColor;
		document.getElementById('hover_image').src=this.cards[arrayPos].image;
		document.getElementById('hover_image').style.width = '100%'
		document.getElementById('hover_image').style.height = 'auto'		
		

		
		return this.cards[arrayPos];
		
	}
	
	//this method returns card that is being hovered.
	this.HoveredCard = function HoveredCard(e) {
		var offsetX = this.enclosing_element.offsetLeft;
		var offsetY = this.enclosing_element.offsetTop;
    	var xPosition = e.clientX - offsetX;
    	var yPosition = e.clientY - offsetY;
		
		//change hoverBox position.
		var hoverBox = document.getElementById('hover_card');
		var x = ((Math.ceil(xPosition / 50) ) * 50);
		var y = ((Math.ceil(yPosition / 50)) * 50);
		
		//this code is for drawing the clicked card onto the hoverbox.
        overCardPos = ((Math.ceil(xPosition / 50) - 1 ) * 10) + (Math.ceil(yPosition / 50)) - 1;
		if(overCardPos < 100){
		if(this.cards[overCardPos].hasBeenSelected){
			//document.getElementById('hover_image').backGround=this.cards[arrayPosTemp].fillColor;
			//document.getElementById('hover_image').style.backgroundColor=this.cards[arrayPos].fillColor;
			document.getElementById('hover_image').style.backgroundColor=this.cards[overCardPos].fillColor;
			
			document.getElementById('hover_image').src=this.cards[overCardPos].image;
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
			//this cannot be called on hoverBox.
			$('#hover_card').stop().animate({width:"75px", height: "75px",marginLeft: (x - 12) + 'px', marginTop: (y - 12) + 'px' },100);	
			
			
			
		}		
			
		} 
		
        arrayPosTemp = ((Math.ceil(xPosition / 50) - 1 ) * 10) + (Math.ceil(yPosition / 50)) - 1;
		//display mouse position for testing purposes
		document.getElementById('online_users').innerHTML = (" hover: " + xPosition + ", " + yPosition);
		
	}
	
	


}

function Randomise_Card() {
	var cardPic = Math.floor(Math.random() * 20) + 1;
	var icon = '';
	switch (cardPic) {
	        case 1:
				icon = 'Images/Icons/blank.png'
				break;
	        case 2:
				icon = 'Images/Icons/cake.png'
				break;
	        case 3:
				icon = 'Images/Icons/chain.png'
				break;
	        case 4:
				icon = 'Images/Icons/coffee.png'
				break;
	        case 5:
				icon = 'Images/Icons/cross.png'
				break;
	        case 6:
				icon = 'Images/Icons/drop.png'
				break;
	        case 7:
				icon = 'Images/Icons/envelope.png'
				break;
	        case 8:
				icon = 'Images/Icons/flower.png'
				break;
	        case 9:
				icon = 'Images/Icons/heart.png'
				break;
	        case 10:
				icon = 'Images/Icons/house.png'
				break;
	        case 11:
				icon = 'Images/Icons/key.png'
				break;
	        case 12:
				icon = 'Images/Icons/left_arrow.png'
				break;
	        case 13:
				icon = 'Images/Icons/nuclear.png'
				break;
	        case 14:
				icon = 'Images/Icons/paperclip.png'
				break;
	        case 15:
				icon = 'Images/Icons/plus.png'
				break;
	        case 16:
				icon = 'Images/Icons/present.png'
				break;
	        case 17:
				icon = 'Images/Icons/right_arrow.png'
				break;
	        case 18:
				icon = 'Images/Icons/tick.png'
				break;
	        case 19:
				icon = 'Images/Icons/wine.png'
				break;
	        case 20:
				icon = 'Images/Icons/wrench.png'
				break;
			}
			return icon;
}

$(document).ready(function () {
});

/*
for (var q = 0; q < (rowsNum * columnsNum); q++) {
        list[q] = 'empty';
    }


for (i = 0; i < 10; i++) {
	for (i = 0; i < 10; i++) {
	}

}
*/