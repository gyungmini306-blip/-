let n = 20;

let mx    = [], my     = [];
let speed = [], size   = [];
let type  = [], startX = [];

let px, py;
let score = 0;
let gameOver = false;
let playerSize = 25;

function setup() {
  createCanvas(500, 500);

  px = width / 2;
  py = height * 0.8;

  for (let i = 0; i < n; i++) {

    mx[i] = random(width);
    my[i] = random(-500, 0);

    speed[i] = random(2, 4);
    size[i] = random(15, 30);

    type[i] = int(random(0, 3));

    startX[i] = mx[i];
  }
}

function draw() {
  background(10, 10, 30);

  if (!gameOver) {

    PlayerMove();                

    fill(100, 200, 255);
    ellipse(px, py, playerSize, playerSize);

    for (let i = 0; i < n; i++) {
      MeteorMove(i);              
      if (CheckHit(i))            
        gameOver = true;
    }

    score++;

    fill(255);
    textSize(18);
    textAlign(CENTER);
    text("Score : " + score, 50, 25);
  }

  else {
    fill(255, 0, 0);
    textAlign(CENTER);
    textSize(35);
    text("GAME OVER", width/2, (height/2)-20);

    textSize(18);
    text("R : Restart", width/2, (height/2)+20);
  }
}

function PlayerMove() {

  let s = PlayerSpeed();

  let A = 65;
  let D = 68;
  let W = 87;
  let S = 83;

  if (keyIsDown(A)) px -= s;
  if (keyIsDown(D)) px += s;
  if (keyIsDown(W)) py -= s;
  if (keyIsDown(S)) py += s;

  if (px < playerSize / 2)
    px = playerSize / 2;
  if (px > width - playerSize / 2)
    px = width - playerSize / 2;
  if (py < playerSize / 2)
    py = playerSize / 2;
  if (py > height - playerSize / 2)
    py = height - playerSize / 2;
}

function MeteorMove(i) {

  if (type[i] == 0) {
    speed[i] += 0.1;
    my[i] += speed[i];
  }

  else if (type[i] == 1) {
    my[i] += speed[i];

    mx[i] = startX[i] + sin(frameCount * 0.05 + i) * 40;
  }

  else {
    my[i] += speed[i];

    mx[i] += random(-1.5, 1.5);
  }

  fill(150);
  ellipse(mx[i], my[i], size[i], size[i]);

  if (my[i] > height + 30) {
    mx[i] = random(width);
    my[i] = random(-150, 0);
    startX[i] = mx[i];

    speed[i] = random(2, 4);
  }
}

function PlayerSpeed() {
  if (keyIsDown(SHIFT))
    return 2;
  return 4;
}

function CheckHit(i) {

  let d = dist(px, py, mx[i], my[i]);

  if (d < playerSize / 2 + size[i] / 2)
    return true;

  return false;
}

function keyPressed() {

  if (key == 'r' || key == 'R') {

    gameOver = false;
    score = 0;

    px = width / 2;
    py = height * 0.8;

    for (let i = 0; i < n; i++) {
      mx[i] = random(width);
      startX[i] = mx[i];

      my[i] = random(-500, 0);
    }
  }
}