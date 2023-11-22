<template>
    <aside class="p5-canvas">
        <div ref="sketchContainer"></div>
        <button @click="toggleLoop">{{ p5CanvasStore.getIsLooping ? 'Stop' : 'Start' }} Loop</button>
    </aside>
</template>
  
<script setup lang="ts">
// @ts-nocheck
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import p5 from 'p5';
import type { P5BoundingBox } from '../models/P5BoundingBox';
import { useP5CanvasStore } from '../stores/P5CanvasStore';

const router = useRouter();
const p5CanvasStore = useP5CanvasStore();
const sketchContainer = ref<HTMLElement | null>(null);
let p5Canvas: p5 | null = null;

onMounted(() => {
    p5Canvas = new p5((p: p5) => {
        const cameraWidth: number = 720;
        const cameraHeight: number = 720;
        const canvasWidth: number = 360;
        let captureScale: number = 1;
        let capture: any;
        let captureConstraints;
        const frameRateTarget: number = 60;
        let frameCount: number = 0;
        let redClusters = [];
        let greenClusters = [];
        let largestRedCluster: Array<[number, number]>;
        let largestGreenCluster: Array<[number, number]>;
        let redBoundingBox: P5BoundingBox;
        let oldRedBoundingBox: P5BoundingBox;
        let greenBoundingBox: P5BoundingBox;
        let oldGreenBoundingBox: P5BoundingBox;
        const lerpSpeed: number = 0.25;

        p.setup = () => {
            captureScale = canvasWidth / cameraWidth;
            p.createCanvas(canvasWidth, canvasWidth);
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
            p.image(capture, 0, 0, canvasWidth, canvasWidth);

            capture.loadPixels();

            frameCount++;
            if (frameCount % p5CanvasStore.getThrottleClusterSearch === 0) {
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

        p.mouseClicked = (event) => {
            if (event.target === p.canvas) {
                let clickedBox: string | null = getClickedBox(p.mouseX, p.mouseY, redBoundingBox, greenBoundingBox);
                if (clickedBox) {
                    router.push({ name: 'IngredientDetails', params: { id: clickedBox } });
                } else {
                    router.push({ name: 'Home' });
                }
            }
        }

        function getClickedBox(mouseX: number, mouseY: number, redBoundingBox: P5BoundingBox, greenBoundingBox: P5BoundingBox): string {
            if (isMouseInsideBox(mouseX, mouseY, redBoundingBox)) {
                return "tomato";
            }
            else if (isMouseInsideBox(mouseX, mouseY, greenBoundingBox)) {
                return "lettuce";
            }
            else {
                return '';
            }
        }

        function isMouseInsideBox(mouseX: number, mouseY: number, boundingBox: P5BoundingBox): boolean {
            return boundingBox &&
                mouseX > boundingBox.rect[0] &&
                mouseX < boundingBox.rect[2] &&
                mouseY > boundingBox.rect[1] &&
                mouseY < boundingBox.rect[3];
        }

        function drawBoundingBox(box: P5BoundingBox, color: p5.Color) {
            p.noFill();
            p.stroke(color);
            p.strokeWeight(2);
            p.rectMode(p.CORNERS);
            p.rect(box.rect[0], box.rect[1], box.rect[2], box.rect[3]);
            p.fill(color);
            p.noStroke();
            p.ellipse(box.center.x, box.center.y, 6, 6);
        }

        function getBoundingBox(cluster): P5BoundingBox {
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

            let withinHue = (h > 0 && 15 > h) || (h > 350 && 360 > h);
            let withinSaturation = s > 40 && 100 > s;
            let withinBrightness = b > 40 && 90 > b;

            return withinHue && withinSaturation && withinBrightness;
        }

        function isGreen(pixels, index): boolean {
            let red: number = pixels[index];
            let green: number = pixels[index + 1];
            let blue: number = pixels[index + 2];

            let [h, s, b] = rgbToHsb(red, green, blue);

            let withinHue = h > 80 && 115 > h;
            let withinSaturation = s > 30 && 100 > s;
            let withinBrightness = b > 20 && 100 > b;

            return withinHue && withinSaturation && withinBrightness;
        }

        function updateClusters() {
            redClusters = findClusters(capture.pixels, capture.width, capture.height, isRed);
            largestRedCluster = findLargestCluster(redClusters);

            greenClusters = findClusters(capture.pixels, capture.width, capture.height, isGreen);
            largestGreenCluster = findLargestCluster(greenClusters);
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

        function getCluster(pixels, startX, startY, width, visited, isColor): Array<[number, number]> {
            let cluster: Array<[number, number]> = [];
            let stack = [[startX, startY]];

            while (stack.length > 0) {
                let point = stack.pop();
                if (point !== undefined) {
                    let [x, y] = point;
                    let index = (x + y * width) * 4;

                    if (x >= 0 && y >= 0 && x < width && y < pixels.length / (width * 4) &&
                        isColor(pixels, index) && !visited.has(index)) {
                        visited.add(index);
                        cluster.push([x, y]);
                        stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
                    }
                }
            }

            return cluster;
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
            let h = max;
            let s = max;
            let b = max;

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

            return [h * 360, s * 100, b * 100]; // Convert hue to degrees
        }
    }, sketchContainer.value!);
});

const toggleLoop = () => {
    if (p5CanvasStore.getIsLooping) {
        p5Canvas?.noLoop();
        p5CanvasStore.setIsLooping(false);
    } else {
        p5Canvas?.loop();
        p5CanvasStore.setIsLooping(true);
    }
};
</script>

<style>
.p5-canvas {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    flex: 1;
    min-height: 0;
}

#defaultCanvas0 {
    width: 100% !important;
    height: auto !important;
}
</style>
