let cameraWidth = 480;
let cameraHeight = 480;
let captureScale = 1;
let capture = null;
let captureConstraints;
let throttle = 4;
let frameRateTarget = 60;
let frameCount = 0;
let redClusters = [];
let greenClusters = [];
let largestRedCluster = null;
let largestGreenCluster = null;
let redBoundingBox = null;
let oldRedBoundingBox = null;
let greenBoundingBox = null;
let oldGreenBoundingBox = null;
let lerpSpeed = 0.25;

function setup() {  
  //pixelDensity(1);
  captureScale = windowWidth / cameraWidth;
  createCanvas(windowWidth, windowWidth);
  frameRate(frameRateTarget);
  
  captureConstraints = {
    video: {
      facingMode: "environment",
      frameRate: { ideal: frameRateTarget },
      aspectRatio: { ideal: 1 },
      width: { ideal: cameraWidth },
      height: { ideal: cameraHeight }
    },
    audio: false
  };
  capture = createCapture(captureConstraints, function(stream) {});
  capture.size(cameraWidth, cameraHeight);
  capture.hide();
}

function draw() {
  background(255);
  image(capture, 0, 0, windowWidth, windowWidth);

  capture.loadPixels();

  frameCount++;
  if (frameCount % throttle === 0) {
    updateClusters();
    frameCount = 0;
  }
  
  if (largestRedCluster) {
    oldRedBoundingBox = redBoundingBox;
    redBoundingBox = getBoundingBox(largestRedCluster);

    if (oldRedBoundingBox) {
      redBoundingBox.rect[0] = lerp(oldRedBoundingBox.rect[0], redBoundingBox.rect[0], lerpSpeed);
      redBoundingBox.rect[1] = lerp(oldRedBoundingBox.rect[1], redBoundingBox.rect[1], lerpSpeed);
      redBoundingBox.rect[2] = lerp(oldRedBoundingBox.rect[2], redBoundingBox.rect[2], lerpSpeed);
      redBoundingBox.rect[3] = lerp(oldRedBoundingBox.rect[3], redBoundingBox.rect[3], lerpSpeed);
      redBoundingBox.center.x = lerp(oldRedBoundingBox.center.x, redBoundingBox.center.x, lerpSpeed);
      redBoundingBox.center.y = lerp(oldRedBoundingBox.center.y, redBoundingBox.center.y, lerpSpeed);
    }
    drawBoundingBox(redBoundingBox, [0, 255, 0]);
  }
  
  if (largestGreenCluster) {
    oldGreenBoundingBox = greenBoundingBox;
    greenBoundingBox = getBoundingBox(largestGreenCluster);

    if (oldGreenBoundingBox) {
      greenBoundingBox.rect[0] = lerp(oldGreenBoundingBox.rect[0], greenBoundingBox.rect[0], lerpSpeed);
      greenBoundingBox.rect[1] = lerp(oldGreenBoundingBox.rect[1], greenBoundingBox.rect[1], lerpSpeed);
      greenBoundingBox.rect[2] = lerp(oldGreenBoundingBox.rect[2], greenBoundingBox.rect[2], lerpSpeed);
      greenBoundingBox.rect[3] = lerp(oldGreenBoundingBox.rect[3], greenBoundingBox.rect[3], lerpSpeed);
      greenBoundingBox.center.x = lerp(oldGreenBoundingBox.center.x, greenBoundingBox.center.x, lerpSpeed);
      greenBoundingBox.center.y = lerp(oldGreenBoundingBox.center.y, greenBoundingBox.center.y, lerpSpeed);
    }
    drawBoundingBox(greenBoundingBox, [255, 0, 0]);
  }
}

function updateClusters() {  
  redClusters = findClusters(capture.pixels, capture.width, capture.height, isRed);
  largestRedCluster = findLargestCluster(redClusters, isRed);

  greenClusters = findClusters(capture.pixels, capture.width, capture.height, isGreen);
  largestGreenCluster = findLargestCluster(greenClusters, isGreen);
}

function drawBoundingBox(box, color) {
  noFill();
  stroke(...color);
  strokeWeight(2);
  rectMode(CORNERS);
  rect(box.rect[0], box.rect[1], box.rect[2], box.rect[3]);
  fill(...color);
  noStroke();
  ellipse(box.center.x, box.center.y, 6, 6);
}

function getBoundingBox(cluster) {
  let minX = Infinity, minY = Infinity, maxX = 0, maxY = 0;
  for (let [x, y] of cluster) {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  let centerX = minX + (maxX - minX) / 2;
  let centerY = minY + (maxY - minY) / 2;
  
  return {
    rect: [minX*captureScale, minY*captureScale, maxX*captureScale, maxY*captureScale],
    center: createVector(centerX*captureScale, centerY*captureScale)
  };
}

function isRed(pixels, index) {
  let r = pixels[index];
  let g = pixels[index + 1];
  let b = pixels[index + 2];

  let [h, s, l] = rgbToHsl(r, g, b);

  let isRedHue = (h > 0 && h < 10) || (h > 340 && h < 360);
  let isSaturated = s > 50;
  let isNotTooLight = l > 20 && l < 70;

  return isRedHue && isSaturated && isNotTooLight;
}

function isGreen(pixels, index) {
  let r = pixels[index];
  let g = pixels[index + 1];
  let b = pixels[index + 2];

  let [h, s, l] = rgbToHsl(r, g, b);

  let isGreenHue = h > 90 && h < 150;
  let isSaturated = s > 30;
  let isNotTooLight = l > 20 && l < 80;

  return isGreenHue && isSaturated && isNotTooLight;
}

function getCluster(pixels, startX, startY, width, visited, isColor) {
  let cluster = [];
  let stack = [[startX, startY]];

  while (stack.length > 0) {
    let [x, y] = stack.pop();
    let index = (x + y * width) * 4;

    if (x >= 0 && y >= 0 && x < width && y < pixels.length / (width * 4) &&
      isColor(pixels, index) && !visited.has(index)) {
      visited.add(index);
      cluster.push([x, y]);
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
  }

  return cluster;
}

function findClusters(pixels, width, height, isColor) {
  let clusters = [];
  let visited = new Set();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      if (isColor(pixels, index) && !visited.has(index)) {
        let cluster = getCluster(pixels, x, y, width, visited, isColor);
        if (cluster.length > 0) {
          clusters.push(cluster);
        }
      }
    }
  }

  return clusters;
}

function findLargestCluster(clusters) {
  if (clusters.length === 0) return null;
  return clusters.reduce((a, b) => (a.length > b.length ? a : b));
}

function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if(max == min){
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max){
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60; // Convert from 0-6 range to 0-360 range for hue
  }

  s *= 100; // Convert from 0-1 range to 0-100 range for saturation
  l *= 100; // Convert from 0-1 range to 0-100 range for lightness

  return [h, s, l];
}