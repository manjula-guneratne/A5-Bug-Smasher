//Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1250;
canvas.height = 833;
document.body.appendChild(canvas);


//Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
    bgReady = true;
};
bgImage.src = "sky.jpg"

//Bug image
var bugReady = false;
var bugImage = new Image();
var speed = 2000;   //Initial speed
bugImage.onload = function(){
    bugReady = true;
};
bugImage.src = "dragon_fly.png";

//Reset Score image
var resetScoreReady = false;
var resetScoreImg = new Image();
resetScoreImg.onload = function(){
    resetScoreReady = true;
}
resetScoreImg.src = "btn_reset_score.png";

//Reset Speed image
var resetSpeedReady = false;
var resetSpeedImg = new Image();
resetSpeedImg.onload = function(){
    resetSpeedReady = true;
}
resetSpeedImg.src = "btn_reset_speed.png";


//Game Objects
var bug = {
    x:0,
    y:0
};

var resetScore = {
    x: (canvas.width -222),
    y: 32
}

var resetSpeed = {
    x: (canvas.width -(222*2)),
    y: 32
}

var bugsSmashed = 0;
var moveInterval = null;

//When the bug is clicked throws it somewhere on the screen randomly
var move = function(speed){

    //Clear the existing timer
    if(moveInterval !== null){
        clearInterval(moveInterval);
    }

    moveInterval = setInterval(myTimer,speed);

    function myTimer(){
        nextPositionCal();

        console.log("Current speed is " + speed);
    }
};

function nextPositionCal(){
    bug.x =  (Math.random()*(canvas.width - 250));
    bug.y =  (Math.random()*(canvas.height - 250));
}

canvas.addEventListener("click", function (e){
    //check
    if(!bugReady){
        return;
    }

    //Get the position relative to canvas
    var rec = canvas.getBoundingClientRect();
    var mouseX = e.clientX - rec.left;
    var mouseY = e.clientY - rec.top;

    //Check if the mouse clicked inside the bug image
    if(
        mouseX >= bug.x && mouseX <= bug.x + bugImage.width &&
        mouseY >= bug.y && mouseY <= bug.y + bugImage.height
    ){
        smashed();
    }

    //Check if the mouse clicked inside the Reset Score image
    if(
        mouseX >= resetScore.x && mouseX <= resetScore.x + resetScoreImg.width &&
        mouseY >= resetScore.y && mouseY <= resetScore.y + resetScoreImg.height
    ){
        move(2000);   //Resets to original speed
        bugsSmashed = 0;
        speed = 2000;
    }

    //Check if the mouse clicked inside the Reset Speed image
    if(
        mouseX >= resetSpeed.x && mouseX <= resetSpeed.x + resetSpeedImg.width &&
        mouseY >= resetSpeed.y && mouseY <= resetSpeed.y + resetSpeedImg.height
    ){

        move(2000);   //Resets to original speed
        speed = 2000;
    }


})

function smashed(){

    ++bugsSmashed;

    //Once smashed immediately moves
    nextPositionCal();

    //Reducing the movement time
    speed -= 250;

    move(speed);
};

//Draw everything
var render = function(){
    if(bgReady){
        ctx.drawImage(bgImage,0,0);
    }
    if(bugReady){
        ctx.drawImage(bugImage,bug.x,bug.y);
    }
    if(resetScoreReady){
        ctx.drawImage(resetScoreImg,resetScore.x,resetScore.y);
    }
    if(resetSpeedReady){
        ctx.drawImage(resetSpeedImg,resetSpeed.x,resetSpeed.y);
    }

    //Score
    ctx.fillStyle = "rgb(66, 135, 245)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Bugs caught: " + bugsSmashed ,32 ,32); 
};

// The main game loop
var main = function(){

    render();

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


// Let's play this game!
move(speed);
main();