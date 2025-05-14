const size = 5;
const square_size = 3;
const configurations = 2 ** size; // the number of possible configurations; e.g. 000 001 010 ... for size 3 / 00000 00001 00010 ... for size 5
const number_of_rules = 2 ** configurations; // the number of possible rules; e.g. for 000 I can assign 0 or 1
let rule = 0; // the current rule
let ruleset = []; // stores the rules
let next_line = [];
let lines = [];
let r, g, b;

function setup() {
  createCanvas(windowWidth, windowHeight);
  createCanvas(800, 400);
  r = random(255);
  g = random(255);
  b = random(255);

  init();
}

function init() {
  initRuleset();

  initFirstLine();

  initColors();
}

function initColors() {
  background(0);

  noStroke();

  fill(r, g, b);
}

function initFirstLine() {
  let currentLine = [];
  for (
    let i = 0;
    i < width / square_size;
    i += 1
  ) {
    currentLine[i] = random([0, 1]);
    // currentLine[i] = 0;
  }

  currentLine[int(width / square_size / 2)] = 1;
  lines.push(currentLine);
}

function initRuleset() {
  rule = Math.floor(random(1, number_of_rules));
  let copy = rule;
  for (let i = 0; i < configurations; i += 1) {
    ruleset[i] = copy & 1; // either 1 or 0
    copy >>= 1;
  }
}

function draw() {
  frameRate(60);
  background(0);

  drawLines();
  addNewLine();

  writeRule();
}

function writeRule() {
  fill(255);
  strokeWeight(4);
  textSize(20);
  text(`${rule}`, 20, 20);
}

function drawLines() {
  for (let i = 0; i < lines.length; i++) {
    drawLine(i);
  }
}

function drawLine(index) {
  let line = lines[index];
  for (let i = 0; i < line.length; i++) {
    if (line[i]) {
      fill(r, g, b);

      rect(
        i * square_size,
        index * square_size,
        square_size
      );
    }
  }
}

function addNewLine() {
  if (lines.length - 1 >= height / square_size) {
    lines.shift();
  }
  lines.push(getNewLine(lines[lines.length - 1]));
}

function getNewLine(previousLine) {
  let newLine = [];
  for (let i = 0; i < previousLine.length; i++) {
    newLine[i] =
      ruleset[toBaseTen(previousLine, i)];
  }

  return newLine;
}

function toBaseTen(previousLine, index) {
  let num = 0;
  let factor = 1;
  for (
    let i = Math.floor(size / 2);
    i >= -Math.floor(size / 2);
    i--
  ) {
    num +=
      (previousLine[index + i] ?? 0) * factor;
    factor *= 2;
  }

  return num;
}

function doubleClicked() {
  init();
  // saveCanvas(`${rule}`, "png");
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
