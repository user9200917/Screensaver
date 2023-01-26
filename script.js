// Declaring constants to control the number of bezier curves and the number of balls
const numBeziers = 3;
const numBalls = 3 * numBeziers + 1;

const directions = [-1, 1];

// Declaring a constant to control the number of trails
const numTrails = 30;

// Declaring an array to store all the ball objects
let balls = [];

// Declaring an array to store the bezier trailss
let trails = [];

// Declaring variables for rgb values that will be used later to choose the colour of the lines
let randomR = 50;
let randomG = 50;
let randomB = 100;

// A function to return a ball object that can be put into an array
function createBall() {
  return {
    // Entering x position, y position, x direction, y direction, speed, and colour
    xValue: random(0, width),
    yValue: random(0, height),
    directionX: random(directions),
    directionY: random(directions),
    speed: random(3, 6),
    colour: {
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255)
    },
    // A custom method to move the balls
    moveBall() {
      this.xValue += this.directionX * this.speed,
      this.yValue += this.directionY * this.speed
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(20);
  background(3, 3, 18);

  // Uses the createBall function to put the predetermined number of balls into the balls array
  for (let index = 0; index < numBalls; index++) {
    balls.push(createBall());
  }

  for (let index = 0; index < numTrails; index++) {
    trails.push(createGraphics(width, height));
  }
}

function preload() {
  // Load a font to be used later
  raleway = loadFont("Raleway-Regular.ttf");
}

// A function to make smoothly changing colours for the bezier curves
function changeColour() {
  let colourChange = [-1, 1];
  randomR += random(0, 5) * random(colourChange);
  randomG += random(0, 5) * random(colourChange);
  randomB += random(0, 5) * random(colourChange);

  // If the colour gets too dark, make it lighter
  if (randomR < 100) {
    randomR = 100;
  }

  if (randomG < 100) {
    randomG = 100;
  }

  if (randomB < 100) {
    randomB = 100;
  }

  // If the colour gets to light, make it darker
  if (randomR > 255) {
    randomR = 255;
  }

  if (randomG > 255) {
    randomG = 255;
  }

  if (randomB > 255) {
    randomB = 255;
  }
}

// A function to move the balls and make them bounce
function moveBalls() {
  for (let ball of balls) {
    // Custom method to move the balls
    ball.moveBall();

    // If statements to make the balls bounce off the sides
    if (ball.xValue >= width) {
      ball.directionX = -1;
    }

    if (ball.xValue <= 0) {
      ball.directionX = 1;
    }

    if (ball.yValue >= height) {
      ball.directionY = -1;
    }

    if (ball.yValue <= 0) {
      ball.directionY = 1;
    }
  }
}

// A function to update the trails by moving the last graphic in the array to the front
function updateTrails() {
  let oldestTrail = trails.pop();
  trails.unshift(oldestTrail);
}

// A function to draw the beziers
function drawBeziers() {
  let graphics = trails[0];

  graphics.clear();

  // Adjust the stroke weight, fill, background, and stroke colour for the balls and lines
  graphics.strokeWeight(1);
  graphics.noFill();
  graphics.stroke(randomR, randomG, randomB);

  // Draw bezier curves using the balls
  for (let ballIndex = 0; ballIndex < balls.length - 3; ballIndex += 3) {
    graphics.bezier(balls[ballIndex].xValue, balls[ballIndex].yValue,
      balls[ballIndex + 1].xValue, balls[ballIndex + 1].yValue,
      balls[ballIndex + 2].xValue, balls[ballIndex + 2].yValue,
      balls[ballIndex + 3].xValue, balls[ballIndex + 3].yValue);
  }

  graphics.strokeWeight(15);

  // Draws the predetermined number of balls
  for (let ball of balls) {
    graphics.noStroke();
    //graphics.stroke(ball.colour.r, ball.colour.g, ball.colour.b);

    // Draws the ball onto the first graphic
    graphics.point(ball.xValue, ball.yValue);
  }
}

function draw() {
  changeColour();
  moveBalls();
  updateTrails();
  drawBeziers();

  background(3, 3, 18);

  // Draw the graphics on the canvas
  for (let trail of trails) {
    image(trail, 0, 0, width, height);
  }

  // Write my name at the bottom left corner
  fill(255);
  textSize(25);
  textAlign(CENTER, CENTER);
  textFont(raleway);
  text("Alice", 40, height - 30);
}
