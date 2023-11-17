// @ts-nocheck
<template>
    <div ref="sketchContainer"></div>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import p5 from 'p5';
import type { BoundingBox } from '../models/boundingBox.js';

const sketchContainer = ref<HTMLElement | null>(null);

onMounted(() => {
    new p5((p: p5) => {
        const cameraWidth: number = 640;
        const cameraHeight: number = 640;
        let captureScale: number = 1;
        let capture = null;
        let captureConstraints;
        const throttleClusterSearch: number = 4;
        const frameRateTarget: number = 60;
        let frameCount: number = 0;
        let redClusters = [];
        let greenClusters = [];
        let largestRedCluster: Array<[number, number]>;
        let largestGreenCluster: Array<[number, number]>;
        let redBoundingBox: BoundingBox;
        let oldRedBoundingBox: BoundingBox;
        let greenBoundingBox: BoundingBox;
        let oldGreenBoundingBox: BoundingBox;
        const lerpSpeed: number = 0.25;

        p.setup = () => {
            captureScale = p.windowWidth / cameraWidth;
            p.createCanvas(p.windowWidth, p.windowWidth);
            p.frameRate(frameRateTarget);

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
            capture = p.createCapture(captureConstraints, function () { });
            capture.size(cameraWidth, cameraHeight);
            capture.hide();
        };

        p.draw = () => {
            p.background(255);
            p.image(capture, 0, 0, p.windowWidth, p.windowWidth);

            capture.loadPixels();

            frameCount++;
            if (frameCount % throttleClusterSearch === 0) {
                updateClusters();
                frameCount = 0;
            }

            if (largestRedCluster) {
                oldRedBoundingBox = redBoundingBox;
                redBoundingBox = getBoundingBox(largestRedCluster);

                if (oldRedBoundingBox) {
                    redBoundingBox.rect[0] = p.lerp(oldRedBoundingBox.rect[0], redBoundingBox.rect[0], lerpSpeed);
                    redBoundingBox.rect[1] = p.lerp(oldRedBoundingBox.rect[1], redBoundingBox.rect[1], lerpSpeed);
                    redBoundingBox.rect[2] = p.lerp(oldRedBoundingBox.rect[2], redBoundingBox.rect[2], lerpSpeed);
                    redBoundingBox.rect[3] = p.lerp(oldRedBoundingBox.rect[3], redBoundingBox.rect[3], lerpSpeed);
                    redBoundingBox.center.x = p.lerp(oldRedBoundingBox.center.x, redBoundingBox.center.x, lerpSpeed);
                    redBoundingBox.center.y = p.lerp(oldRedBoundingBox.center.y, redBoundingBox.center.y, lerpSpeed);
                }

                drawBoundingBox(redBoundingBox, p.color(0, 255, 0));
            };

            if (largestGreenCluster) {
                oldGreenBoundingBox = greenBoundingBox;
                greenBoundingBox = getBoundingBox(largestGreenCluster);

                if (oldGreenBoundingBox) {
                    greenBoundingBox.rect[0] = p.lerp(oldGreenBoundingBox.rect[0], greenBoundingBox.rect[0], lerpSpeed);
                    greenBoundingBox.rect[1] = p.lerp(oldGreenBoundingBox.rect[1], greenBoundingBox.rect[1], lerpSpeed);
                    greenBoundingBox.rect[2] = p.lerp(oldGreenBoundingBox.rect[2], greenBoundingBox.rect[2], lerpSpeed);
                    greenBoundingBox.rect[3] = p.lerp(oldGreenBoundingBox.rect[3], greenBoundingBox.rect[3], lerpSpeed);
                    greenBoundingBox.center.x = p.lerp(oldGreenBoundingBox.center.x, greenBoundingBox.center.x, lerpSpeed);
                    greenBoundingBox.center.y = p.lerp(oldGreenBoundingBox.center.y, greenBoundingBox.center.y, lerpSpeed);
                }

                drawBoundingBox(greenBoundingBox, p.color(255, 0, 0));
            }
        }

        function updateClusters() {
            redClusters = findClusters(capture.pixels, capture.width, capture.height, isRed);
            largestRedCluster = findLargestCluster(redClusters);

            greenClusters = findClusters(capture.pixels, capture.width, capture.height, isGreen);
            largestGreenCluster = findLargestCluster(greenClusters);
        }

        function drawBoundingBox(box: BoundingBox, color: p5.Color) {
            p.noFill();
            p.stroke(color);
            p.strokeWeight(2);
            p.rectMode(p.CORNERS);
            p.rect(box.rect[0], box.rect[1], box.rect[2], box.rect[3]);
            p.fill(color);
            p.noStroke();
            p.ellipse(box.center.x, box.center.y, 6, 6);
        }

        function getBoundingBox(cluster): BoundingBox {
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
                rect: [minX * captureScale, minY * captureScale, maxX * captureScale, maxY * captureScale],
                center: p.createVector(centerX * captureScale, centerY * captureScale)
            };
        }

        function isRed(pixels, index): boolean {
            let red: number = pixels[index];
            let green: number = pixels[index + 1];
            let blue: number = pixels[index + 2];

            let [h, s, b] = rgbToHsb(red, green, blue);

            let withinHue = (h > 0 && h < 15) || (h > 350 && h < 360);
            let withinSaturation = s > 40;
            let withinBrightness = 30 < b && b < 60;

            return withinHue && withinSaturation && withinBrightness;
        }

        function isGreen(pixels, index): boolean {
            let red: number = pixels[index];
            let green: number = pixels[index + 1];
            let blue: number = pixels[index + 2];

            let [h, s, b] = rgbToHsb(red, green, blue);

            let withinHue = h > 100 && h < 115;
            let withinSaturation = s > 30;
            let withinBrightness = 20 < b && b < 80;

            return withinHue && withinSaturation && withinBrightness;
        }

        function getCluster(pixels, startX, startY, width, visited, isColor): Array<[number, number]> {
            let cluster: Array<[number, number]> = [];
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

            for (let y = 0; y < height; y += 2) {
                for (let x = 0; x < width; x += 2) {
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

        function rgbToHsb(red: number, green: number, blue: number) {
            red /= 255;
            green /= 255;
            blue /= 255;
            let max: number = Math.max(red, green, blue);
            let min: number = Math.min(red, green, blue);
            let h, s, v = max;

            let d = max - min;
            s = max == 0 ? 0 : d / max;

            if (max == min) {
                h = 0; // achromatic
            } else {
                switch (max) {
                    case red: h = (green - blue) / d + (green < blue ? 6 : 0); break;
                    case green: h = (blue - red) / d + 2; break;
                    case blue: h = (red - green) / d + 4; break;
                }
                h /= 6;
            }

            return [h * 360, s * 100, v * 100]; // Convert hue to degrees
        }
    }, sketchContainer.value!);
});
</script>