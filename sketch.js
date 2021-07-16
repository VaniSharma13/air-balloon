var balloon,balloonImage1,balloonImage2;

var database,position,balloonposition
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(800,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonposition=database.ref("balloon/position")
  balloonposition.on("value",readPosition,showerror);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(position !==undefined){
  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    if(keyDown(LEFT_ARROW)){
      changePosition(-1,0);
    }
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    if(keyDown(RIGHT_ARROW)){
      changePosition(1,0);
    }
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    if(keyDown(UP_ARROW)){
      changePosition(0,-1);
    }
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);  
    if(keyDown(DOWN_ARROW)){
      changePosition(0,1);
    }
  }
  
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
}
function changePosition(x,y){
  database.ref("balloon/position").set({
      'x':position.x + x,
      'y':position.x + y
  })

}
function readPosition(data){
  position = data.val();
  balloon.x=position.x;
  balloon.y=position.y;

}
function showerror(){
  console.log(error);
}