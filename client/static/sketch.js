let vmin = 500;
let shapeShifterAni;
let blaster;
let clicked = false;
let coordinates;
let gunRotation;

function preload() {
  blaster = loadImage('assets/ImageToStl.com_blasterA.png');
}

function setup() {
  vmin = Math.min(windowHeight, windowWidth);
  createCanvas(vmin, vmin);
  imageMode(CENTER);
  shapeShifterAni = loadAnimation(
    'assets/character_zombie_switch0.png',
    'assets/character_zombie_switch1.png',
  );
  shapeShifterAni.frameDelay = 20;

  coordinates = [0, 0]
  gunRotation = findAngleToRotateInRads(0, 0);

  noStroke();
}

function coord(val, is_y = false) {
  if (is_y) val *= -1;
  let display_field = vmin / 2;
  return (val * display_field) / 1000;
}

function draw() {
  translate(vmin / 2, vmin / 2);
  background(240, 240, 240);
  fill(255, 0, 0);
  angleMode(RADIANS);

  fill(0, 0, 0);

  window.dojo.zombies_on_chain.forEach(([x, y]) => {
    ellipse(coord(x), coord(y, 'y'), 1, 1);
    text(`${x}, ${y}`, coord(x), coord(y, 'y') - 5);
  });
  animation(shapeShifterAni, 250, 80);

  rotate(findAngleToRotateInRads(coordinates[0], coordinates[1]));
  image(blaster, 0, 0, 175 * vmin / 1000, 175 * vmin / 1000);
}

function mouseClicked() {
  clicked = true;
  // convert default P5 coordinates with (0,0) to coordinates with (0,0) as center
  coordinates = [(mouseX - vmin / 2), (mouseY - vmin / 2)];
  console.log('Coordinates of click: ' + coordinates);
  gunRotation = findAngleToRotateInRads(coordinates[0], coordinates[1]);
  // prevent default
  return false;
}

function findAngleToRotateInRads(coordX, coordY) {
  // return in rads
  return Math.atan(coordY / coordX);
}
