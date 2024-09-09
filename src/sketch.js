const size = 5;
const square_size = 2;
const configurations = 2 ** size; // the number of possible configurations; e.g. 000 001 010 ... for size 3 / 00000 00001 00010 ... for size 5
const number_of_rules = 2 ** configurations; // the number of possible rules; e.g. for 000 I can assign 0 or 1
let rule = 0; // the current rule
let ruleset = []; // stores the rules
let current_line = [];
let next_line = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(400, 400);

  background(0);
  pixelDensity(1);
}

function draw() {
  background(0);
  // loadPixels();

  let r = random(255);
  let g = random(255);
  let b = random(255);

  for (
    let y = 0;
    y < height / square_size;
    y += 1
  ) {
    for (
      let x = 0;
      x < width / square_size;
      x += 1
    ) {
      next_line[x] = ruleset[toBaseTen(x)];
      fill(r, g, b);
      noStroke();
      if (next_line[x]) {
        rect(
          x * square_size,
          y * square_size,
          square_size
        );
      }
      // let index = (x + y * width) * 4;
      // pixels[index] = next_line[x] * r;
      // pixels[index + 1] = next_line[x] * g;
      // pixels[index + 2] = next_line[x] * b;
      // pixels[index + 3] = 255;
    }
    current_line = next_line.slice();
  }

  // updatePixels();
  noLoop();
}

function toBaseTen(x) {
  let num = 0;
  let factor = 1;
  for (
    let i = Math.floor(size / 2);
    i >= -Math.floor(size / 2);
    i--
  ) {
    num += (current_line[x + i] ?? 0) * factor;
    factor *= 2;
  }

  return num;
}

function isOffScreen(x) {
  return (
    x - Math.floor(size / 2) < 0 ||
    x + Math.floor(size / 2) >= width - 1
  );
}

function init() {
  rule = Math.floor(random(1, number_of_rules));
  let copy = rule;
  for (let i = 0; i < configurations; i += 1) {
    ruleset[i] = copy & 1; // either 1 or 0
    copy >>= 1;
  }

  for (
    let i = 0;
    i < width / square_size;
    i += 1
  ) {
    current_line[i] = random([0, 1]);
    // current_line[i] = 0;
  }

  current_line[int(width / square_size / 2)] = 1;
  draw();
}

function mousePressed() {
  init();
  saveCanvas(`${rule}`, "png");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
