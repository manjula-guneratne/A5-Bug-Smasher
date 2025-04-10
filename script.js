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
var reset = function(){
    bug.x =  (Math.random()*(canvas.width - 250));
    bug.y =  (Math.random()*(canvas.height - 250));
    console.log("The bug width: "+bug.x);
    console.log("The bug height: "+bug.y);
};

bgImage.addEventListener("click", smashed);

function smashed(){
    alert("Bug is Smashed!");
    ++bugsSmashed;
    reset();
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
reset();
main();