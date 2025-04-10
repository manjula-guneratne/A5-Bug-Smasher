//Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1250;
canvas.height = 833;
document.body.appendChild(canvas);

//Trying to add a new Button
// var reset = document.createElement("button");
// reset.appendChild(document.createTextNode("RESET"));
// document.body.appendChild(reset);

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
var speed = 3000;
bugImage.onload = function(){
    bugReady = true;
};
bugImage.src = "dragon_fly.png";

//Game Objects
var bug = {
    x:0,
    y:0
};

var bugsSmashed = 0;

//When the bug is clicked throws it somewhere on the screen randomly
var move = function(value){

    setInterval(myTimer,value);

    function myTimer(){
        bug.x =  (Math.random()*(canvas.width - 250));
        bug.y =  (Math.random()*(canvas.height - 250));
    }
};

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
})

function smashed(){

    ++bugsSmashed;

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

    //Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Bugs caught: " + bugsSmashed ,32 ,32); 
};

// The main game loop
var main = function(){
    var now = Date.now();
    var delta = now - then;

    // update(delta / 1000);
    render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


// Let's play this game!
var then = Date.now();
move(speed);
main();