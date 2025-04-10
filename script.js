//Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 400;
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
bugImage.src = "dragon_fly.jpg";