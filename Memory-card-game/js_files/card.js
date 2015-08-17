


function Card (image, xPos, yPos, canvas, arrayPosition) {
	//Important stuff for canvas and drawing.
	this.canvas = document.getElementById(canvas);
	this.ctx = this.canvas.getContext("2d");
	
	this.image = image;
    this.height = '50px';
    this.width = '50px';
	this.arrayPosition = arrayPosition;
	
    this.getInfo = function () {
        return 'colour: ' + this.image + ' height: ' + this.height + ' width: ' + this.width + ' canvas: ' + this.canvas;
    };
	
	//returns image src as string.
	this.getType = function () {
		return this.image;
	}
	//all cards are initially not selected. They are drawn blank.
	this.hasBeenSelected = false;
	//the background colour.
	this.fillColor = '#ccc';
	this.xPos = xPos;
	this.yPos = yPos;
	//load image. ONCE!
	var img=new Image();
	img.src=image;
	
	//function to draw card on canvas
	this.drawCard = function (selected) {
		if (selected){
			//draw Image.
			this.ctx.fillStyle = this.fillColor;
			//this determines position and size of icon
			this.ctx.fillRect(this.xPos,this.yPos,50,50);
		
			this.ctx.strokeStyle = "#2191B7";
			this.ctx.lineWidth = 1;
			this.ctx.strokeRect(this.xPos,this.yPos, 50,50);
			this.ctx.drawImage(img, this.xPos, this.yPos, 50, 50);
		} else {
			//Draw blank image.
			this.ctx.fillStyle = this.fillColor;
			//this determines position and size of icon
			this.ctx.fillRect(this.xPos,this.yPos,50,50);
			
			this.ctx.strokeStyle = "#2191B7";
			this.ctx.lineWidth = 1;
			this.ctx.strokeRect(this.xPos,this.yPos, 50,50);
		}
	}
	
	//function to change cards background color after matching.
	this.matchedCard = function () {
		this.fillColor = "#F3A214";
		document.getElementById('hover_image').style.backgroundColor=this.fillColor;
	}
}







