let cameraWidth;
let scale = 1;
let capture;
let captureConstraints;
let captureHD;
let captureHDConstraints;

function setup() {
  cameraWidth = 480;
  createCanvas(480, 480);
  frameRate(60);
  
  // captureConstraints = {
  //   video: {
  //     facingMode: "environment",
  //     frameRate: { ideal: 10  },
  //     width: { ideal: 480/scale },
  //     height: { ideal: 480/scale }
  //   },
  //   audio: false
  // };
  // capture = createCapture(captureConstraints, function(stream) {});
  // capture.size(480/scale, 480/scale);
  // capture.hide();
  
  captureHDConstraints = {
    video: {
      facingMode: "environment",
      frameRate: { ideal: 60  },
      width: { ideal: 480 },
      height: { ideal: 480 }
    },
    audio: false
  };
  captureHD = createCapture(captureHDConstraints, function(stream) {});
  captureHD.size(480, 480);
  captureHD.hide();
  capture = captureHD;
  
  pixelDensity(1);
}

function draw() {
  background(255);

  capture.loadPixels();

  let clusters = [];
  let visited = new Set();

  for (let y = 0; y < capture.height; y++) {
    for (let x = 0; x < capture.width; x++) {
      let index = (x + y * capture.width) * 4;
      if (isRed(capture.pixels, index) && !visited.has(index)) {
        let cluster = getCluster(capture.pixels, x, y, capture.width, visited);
        if (cluster.length > 0) {
          clusters.push(cluster);
        }
      }
    }
  }

  image(captureHD, 0, 0, 480, 480);

  let largestCluster = findLargestCluster(clusters);

  if (largestCluster) {
    noFill();
    stroke(0, 255, 0);
    strokeWeight(2);
    rectMode(CORNERS);
    let [minX, minY, maxX, maxY] = boundingBox(largestCluster).rect;
    rect(minX, minY, maxX, maxY);
    fill(0, 255, 0);
    noStroke();
    ellipse(boundingBox(largestCluster).center.x, boundingBox(largestCluster).center.y, 6, 6);
  }
}

function isRed(pixels, index) {
  return pixels[index] > 150 && pixels[index + 1] < 80 && pixels[index + 2] < 80;
}

function getCluster(pixels, startX, startY, width, visited) {
  let cluster = [];
  let stack = [[startX, startY]];

  while (stack.length > 0) {
    let [x, y] = stack.pop();
    let index = (x + y * width) * 4;

    if (x >= 0 && y >= 0 && x < width && y < pixels.length / (width * 4) &&
        isRed(pixels, index) && !visited.has(index)) {
      visited.add(index);
      cluster.push([x, y]);
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
  }

  return cluster;
}

function findLargestCluster(clusters) {
  if (clusters.length === 0) return null;
  return clusters.reduce((a, b) => (a.length > b.length ? a : b));
}

function boundingBox(cluster) {
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
    rect: [minX*scale, minY*scale, maxX*scale, maxY*scale],
    center: createVector(centerX*scale, centerY*scale)
  };
}
