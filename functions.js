const BUTTON_COLOR_DEFAULT = '#730D09';
const BUTTON_COLOR_HOVER = '#EFF4F4';
const NUM_SNOWFLAKES = 15;
const SNOWFLAKE_X_GAP = 1000 / (NUM_SNOWFLAKES + 1);
const BASKET_WIDTH = 120;
const BASKET_HEIGHT = 90;
const TITLE_PAGE = 0;
const PLAY_PAGE = 1;
const GAME_OVER_PAGE = 2;

// Create snowflake y positions
let snowflakeY = [30, 10, 300, 400, 500, 40, 120, 10, 20, 600, 10, 50, 200, 150, 350];

let buttonColor = BUTTON_COLOR_DEFAULT;
let page = TITLE_PAGE;
let canvasHeight = 700;
let objectY = -20;
let objectX = 200;
let objectSpeed = 2;
let score = 0;

// Load images and sound
let snowmanImg;
let snowflakeImg;
let christmasBasket;
let merryChristmas;
let mySound;

function preload() {
   snowmanImg = loadImage('snowman1.jpg');
   snowflakeImg = loadImage('snowflake.png');
   christmasBasket = loadImage('christmasBasket.png');
   merryChristmas = loadImage('merryChristmas.png');
   mySound = loadSound('jingleBell.mp3');
}

// Set up Canvas
function setup() {
   createCanvas(1000, canvasHeight);
}

function draw() {
   if (page == TITLE_PAGE) {
      drawTitlePage();
   } else if (page == PLAY_PAGE) {
      drawPlayPage();
   } else if (page == GAME_OVER_PAGE) {
      drawGameOverPage();
   }
}

function drawSnowman() {
   image(snowmanImg, 0, 0);
   textFont('montserrat');
   textSize(15);
   fill('white');
   textAlign(LEFT);
   text('Press up to hear ♫~, down to pause ♫~', 700, 680);
   fill('#D2DAFF');
   // Create a for loop for snowflakes.
   for (let n = 0; n < NUM_SNOWFLAKES; n++) {
      let snowflakeX = SNOWFLAKE_X_GAP * (n + 1);
      circle(snowflakeX, (snowflakeY[(n)]), 10);
      snowflakeY[n]++;
      // When snowflake Y position is 0, make n equals to 0.
      if (snowflakeY[n] > height) {
         snowflakeY[n] = 0;
      }
   }
   // Snowman's cheek
   noStroke();
   fill('#ffa791');
   ellipse(770 - 10, 440, 15, 10);
   ellipse(770 + 50, 440, 15, 10);
   // Snowman's eyes
   fill('#100F0F');
   ellipse(770, 420, 25, 25);
   ellipse(770 + 40, 420, 25, 25);
   // Snowman's iris
   let xc = constrain(mouseX, 745, 760);
   let xs = constrain(mouseY, 435, 445);
   fill('white');
   circle(xc + 20, xs - 20, 8);
   circle(xc + 60, xs - 20, 8);
}

function drawTitlePage() {
   drawSnowman();
   // Show 'Click to Start Game' on page
   fill(buttonColor);
   textFont('impact');
   textSize(50);
   textAlign(LEFT);
   text('Click to Start Game', 200, 400);
   image(snowflakeImg, mouseX, mouseY, 30, 30);
   reset();
}

function drawPlayPage() {
   drawSnowman();
   textFont('impact');
   textSize(50);
   textAlign(LEFT);
   text("Score: " + score + ' ❄ ', 700, 70);
   image(snowflakeImg, objectX - 20, objectY - 20, 40, 40);
   image(
      christmasBasket,
      mouseX - (BASKET_WIDTH / 2),
      height - BASKET_WIDTH,
      BASKET_WIDTH,
      BASKET_WIDTH * 1.1
   );
   objectY = objectY + objectSpeed;
   let basketLeftX = mouseX - (BASKET_WIDTH / 2);
   let basketRightX = mouseX + (BASKET_WIDTH / 2);
   if (objectY > canvasHeight - BASKET_HEIGHT && objectX > basketLeftX && objectX < basketRightX) {
      // Object is in the basket 
      objectX = random(20, width - 20);
      objectY = -20;
      objectSpeed += 1;
      score++;
   } else if (objectY > canvasHeight) {
      // Object missed the basket
      page = GAME_OVER_PAGE;
   }
}

function drawGameOverPage() {
   background('#730D09');
   textFont('Georgia');
   textSize(30);
   fill('#F5EFE6');
   textAlign(CENTER, CENTER);
   image(merryChristmas, 360, 100, 300, 300 / 2);
   text('Game Over', width / 2, height / 2 - 50);
   text('Your Score is: ' + score, width / 2, height / 2);
   text('Click to Restart', width / 2, height / 2 + 50);
}

function mousePressed() {
   if (page == TITLE_PAGE) {
      page = PLAY_PAGE;
   } else if (page == GAME_OVER_PAGE) {
      page = TITLE_PAGE;
   }
}

function reset() {
   score = 0;
   objectSpeed = 2;
   objectY = -20;
}

function mouseIsInsideClickToStartBox() {
   return (mouseX > 200) && (mouseX < 600) && (mouseY > 350 && mouseY < 420);
}

function mouseMoved() {
   // When mouse enter 'play game' box, draw 'play game' with white.
   // When mouse is outside of 'Play game' box, draw it with dark red.
   if (mouseIsInsideClickToStartBox()) {
      // Mouse is inside.
      buttonColor = BUTTON_COLOR_HOVER;
   } else {
      buttonColor = BUTTON_COLOR_DEFAULT;
   }
}

function keyPressed() {
   // When input up arrow, play music
   if (keyCode === UP_ARROW) {
      mySound.play();
   } // When input down arrow, pause music 
   if (keyCode === DOWN_ARROW) {
      mySound.pause();
   }
}