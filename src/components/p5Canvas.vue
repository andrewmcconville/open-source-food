<template>
    <aside class="p5-canvas">
        <div ref="sketchContainer"></div>
        <button @click="toggleLoop">{{ p5CanvasStore.isLooping ? 'Stop' : 'Start' }} Loop</button>

        <div class="p5-canvas__center-marker" v-show="p5CanvasStore.tomatoVector" :style="{ transform: `translate(${p5CanvasStore.tomatoVector?.x}px, ${p5CanvasStore.tomatoVector?.y}px)` }">
            <div class="p5-canvas__food-marker p5-canvas__food-marker--tomato"></div>
        </div>

        <div class="p5-canvas__center-marker" v-show="p5CanvasStore.lettuceVector" :style="{ transform: `translate(${p5CanvasStore.lettuceVector?.x}px, ${p5CanvasStore.lettuceVector?.y}px)` }">
            <div class="p5-canvas__food-marker p5-canvas__food-marker--lettuce"></div>
        </div>

        <div class="p5-canvas__center-marker" v-show="p5CanvasStore.breadVector" :style="{ transform: `translate(${p5CanvasStore.breadVector?.x}px, ${p5CanvasStore.breadVector?.y}px)` }">
            <div class="p5-canvas__food-marker p5-canvas__food-marker--bread"></div>
        </div>

        <div class="p5-canvas__center-marker" v-show="p5CanvasStore.meatVector" :style="{ transform: `translate(${p5CanvasStore.meatVector?.x}px, ${p5CanvasStore.meatVector?.y}px)` }">
            <div class="p5-canvas__food-marker p5-canvas__food-marker--meat"></div>
        </div>
    </aside>
</template>
  
<script setup lang="ts">
// @ts-nocheck
import { onMounted, onUnmounted, ref } from 'vue';
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
        const canvasSize: number = 720;
        let cameraCanvasRatio: number = 1;
        let capture: any;
        let captureConstraints;
        let frameCount: number = 0;
        let lerpAmount: number = 1;

        let canvasDomRatio: number = 1;
        let canvasXY: p5.Vector = p.createVector(0, 0);

        //TO DO: these four things are not DRY
        let tomatoClusters = [];
        let largestTomatoCluster: Array<[number, number]>;
        let tomatoBoundingBox: P5BoundingBox;
        let oldTomatoBoundingBox: P5BoundingBox;

        let lettuceClusters = [];
        let largestLettuceCluster: Array<[number, number]>;
        let lettuceBoundingBox: P5BoundingBox;
        let oldLettuceBoundingBox: P5BoundingBox;

        let breadClusters = [];
        let largeestBreadCluster: Array<[number, number]>;
        let breadBoundingBox: P5BoundingBox;
        let oldBreadBoundingBox: P5BoundingBox;

        let meatClusters = [];
        let largeestMeatCluster: Array<[number, number]>;
        let meatBoundingBox: P5BoundingBox;
        let oldMeatBoundingBox: P5BoundingBox;


        p.setup = () => {
            p5CanvasStore.setIsLooping(true);
            p.pixelDensity(1);
            p.createCanvas(canvasSize, canvasSize);
            p.frameRate(p5CanvasStore.frameRateTarget);

            captureConstraints = {
                video: {
                    facingMode: "environment",
                    frameRate: { ideal: p5CanvasStore.frameRateTarget },
                    aspectRatio: { ideal: 1 },
                    Size: { ideal: p5CanvasStore.cameraSize },
                    height: { ideal: p5CanvasStore.cameraSize }
                },
                audio: false
            };
            capture = p.createCapture(captureConstraints, function () { });
            capture.size(p5CanvasStore.cameraSize, p5CanvasStore.cameraSize);
            capture.hide();

            cameraCanvasRatio = canvasSize / p5CanvasStore.cameraSize;
            canvasDomRatio = sketchContainer.value.getBoundingClientRect().width / canvasSize;
            canvasXY.x = sketchContainer.value.getBoundingClientRect().left;
            canvasXY.y = sketchContainer.value.getBoundingClientRect().top;
        };

        p.draw = () => {
            p.background(0);
            p.image(capture, 0, 0, canvasSize, canvasSize);

            if (frameCount % p5CanvasStore.throttleClusterSearch === 0) {
                capture.loadPixels();
                updateClusters();
                if (largestTomatoCluster) {
                    oldTomatoBoundingBox = tomatoBoundingBox;
                    tomatoBoundingBox = getBoundingBox(largestTomatoCluster);
                } else {
                    p5CanvasStore.tomatoVector = null;
                }

                if (largestLettuceCluster) {
                    oldLettuceBoundingBox = lettuceBoundingBox;
                    lettuceBoundingBox = getBoundingBox(largestLettuceCluster);
                } else {
                    p5CanvasStore.lettuceVector = null;
                }

                if (largeestBreadCluster) {
                    oldBreadBoundingBox = breadBoundingBox;
                    breadBoundingBox = getBoundingBox(largeestBreadCluster);
                } else {
                    p5CanvasStore.breadVector = null;
                }

                if (largeestMeatCluster) {
                    oldMeatBoundingBox = meatBoundingBox;
                    meatBoundingBox = getBoundingBox(largeestMeatCluster);
                } else {
                    p5CanvasStore.meatVector = null;
                }
                
                frameCount = 0;
            }
            frameCount++;            
            lerpAmount = frameCount / p5CanvasStore.throttleClusterSearch;

            if (largestTomatoCluster && oldTomatoBoundingBox) {
                let lerpBox: P5BoundingBox = {rect: [0, 0, 0, 0], center: p.createVector(0, 0)};

                lerpBox.rect[0] = p.lerp(oldTomatoBoundingBox.rect[0], tomatoBoundingBox.rect[0], lerpAmount);
                lerpBox.rect[1] = p.lerp(oldTomatoBoundingBox.rect[1], tomatoBoundingBox.rect[1], lerpAmount);
                lerpBox.rect[2] = p.lerp(oldTomatoBoundingBox.rect[2], tomatoBoundingBox.rect[2], lerpAmount);
                lerpBox.rect[3] = p.lerp(oldTomatoBoundingBox.rect[3], tomatoBoundingBox.rect[3], lerpAmount);
                lerpBox.center = p5.Vector.lerp(oldTomatoBoundingBox.center, tomatoBoundingBox.center, lerpAmount);

                p5CanvasStore.tomatoVector = p5.Vector.add(new p5.Vector(lerpBox.center.x * canvasDomRatio, lerpBox.center.y * canvasDomRatio), canvasXY);

                p5CanvasStore.showCanvasBoudingBoxes ? drawBoundingBox(lerpBox, p.color(0, 255, 0)) : null;
            };

            if (largestLettuceCluster && oldLettuceBoundingBox) {
                let lerpBox: P5BoundingBox = {rect: [0, 0, 0, 0], center: p.createVector(0, 0)};

                lerpBox.rect[0] = p.lerp(oldLettuceBoundingBox.rect[0], lettuceBoundingBox.rect[0], lerpAmount);
                lerpBox.rect[1] = p.lerp(oldLettuceBoundingBox.rect[1], lettuceBoundingBox.rect[1], lerpAmount);
                lerpBox.rect[2] = p.lerp(oldLettuceBoundingBox.rect[2], lettuceBoundingBox.rect[2], lerpAmount);
                lerpBox.rect[3] = p.lerp(oldLettuceBoundingBox.rect[3], lettuceBoundingBox.rect[3], lerpAmount);
                lerpBox.center = p5.Vector.lerp(oldLettuceBoundingBox.center, lettuceBoundingBox.center, lerpAmount);

                p5CanvasStore.lettuceVector = p5.Vector.add(new p5.Vector(lerpBox.center.x * canvasDomRatio, lerpBox.center.y * canvasDomRatio), canvasXY);

                p5CanvasStore.showCanvasBoudingBoxes ? drawBoundingBox(lerpBox, p.color(255, 0, 0)) : null;
            }

            if (largeestBreadCluster && oldBreadBoundingBox) {
                let lerpBox: P5BoundingBox = {rect: [0, 0, 0, 0], center: p.createVector(0, 0)};

                lerpBox.rect[0] = p.lerp(oldBreadBoundingBox.rect[0], breadBoundingBox.rect[0], lerpAmount);
                lerpBox.rect[1] = p.lerp(oldBreadBoundingBox.rect[1], breadBoundingBox.rect[1], lerpAmount);
                lerpBox.rect[2] = p.lerp(oldBreadBoundingBox.rect[2], breadBoundingBox.rect[2], lerpAmount);
                lerpBox.rect[3] = p.lerp(oldBreadBoundingBox.rect[3], breadBoundingBox.rect[3], lerpAmount);
                lerpBox.center = p5.Vector.lerp(oldBreadBoundingBox.center, breadBoundingBox.center, lerpAmount);

                p5CanvasStore.breadVector = p5.Vector.add(new p5.Vector(lerpBox.center.x * canvasDomRatio, lerpBox.center.y * canvasDomRatio), canvasXY);

                p5CanvasStore.showCanvasBoudingBoxes ? drawBoundingBox(lerpBox, p.color(0, 0, 255)) : null;
            }

            if (largeestMeatCluster && oldMeatBoundingBox) {
                let lerpBox: P5BoundingBox = {rect: [0, 0, 0, 0], center: p.createVector(0, 0)};

                lerpBox.rect[0] = p.lerp(oldMeatBoundingBox.rect[0], meatBoundingBox.rect[0], lerpAmount);
                lerpBox.rect[1] = p.lerp(oldMeatBoundingBox.rect[1], meatBoundingBox.rect[1], lerpAmount);
                lerpBox.rect[2] = p.lerp(oldMeatBoundingBox.rect[2], meatBoundingBox.rect[2], lerpAmount);
                lerpBox.rect[3] = p.lerp(oldMeatBoundingBox.rect[3], meatBoundingBox.rect[3], lerpAmount);
                lerpBox.center = p5.Vector.lerp(oldMeatBoundingBox.center, meatBoundingBox.center, lerpAmount);

                p5CanvasStore.meatVector = p5.Vector.add(new p5.Vector(lerpBox.center.x * canvasDomRatio, lerpBox.center.y * canvasDomRatio), canvasXY);

                p5CanvasStore.showCanvasBoudingBoxes ? drawBoundingBox(lerpBox, p.color(255, 255, 255)) : null;
            }
        }

        p.windowResized = () => {
            canvasDomRatio = sketchContainer.value.getBoundingClientRect().width / canvasSize;
            canvasXY.x = sketchContainer.value.getBoundingClientRect().left;
            canvasXY.y = sketchContainer.value.getBoundingClientRect().top;
        }

        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        if (isSafari) {
            p.touchEnded = (event: TouchEvent) => {
                navigate(event);
            }
        } else {
            p.mouseClicked = (event: MouseEvent) => {
                navigate(event);
            }
        }

        function navigate(event: MouseEvent | TouchEvent) {
            if (event.target === p.canvas) {
                let clickedBox: string | null = getClickedBox(p.mouseX, p.mouseY, tomatoBoundingBox, lettuceBoundingBox, breadBoundingBox, meatBoundingBox);
                if (clickedBox) {
                    router.push({ name: 'IngredientDetails', params: { id: clickedBox } });
                } else {
                    router.push({ name: 'p5Canvas' });
                }
            }
        }

        function getClickedBox(mouseX: number, mouseY: number, tomatoBoundingBox: P5BoundingBox, lettuceBoundingBox: P5BoundingBox, breadBoundingBox: P5BoundingBox, meatBoundingBox: P5BoundingBox): string {
            if (isMouseInsideBox(mouseX, mouseY, tomatoBoundingBox)) {
                return "tomato";
            }
            else if (isMouseInsideBox(mouseX, mouseY, lettuceBoundingBox)) {
                return "lettuce";
            }
            else if (isMouseInsideBox(mouseX, mouseY, breadBoundingBox)) {
                return "bread";
            }
            else if (isMouseInsideBox(mouseX, mouseY, meatBoundingBox)) {
                return "meat";
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
                rect: [minX * cameraCanvasRatio, minY * cameraCanvasRatio, maxX * cameraCanvasRatio, maxY * cameraCanvasRatio],
                center: p.createVector(centerX * cameraCanvasRatio, centerY * cameraCanvasRatio)
            };
        }

        function isTomato(pixels, index): boolean {
            let red: number = pixels[index];
            let green: number = pixels[index + 1];
            let blue: number = pixels[index + 2];

            let [h, s, b] = rgbToHsb(red, green, blue);

            let withinHue = (h > 0 && 20 > h) || (h > 350 && 360 > h);
            let withinSaturation = s > 50 && 85 > s;
            let withinBrightness = b > 50 && 100 > b;

            return withinHue && withinSaturation && withinBrightness;
        }

        function isLettuce(pixels, index): boolean {
            let red: number = pixels[index];
            let green: number = pixels[index + 1];
            let blue: number = pixels[index + 2];

            let [h, s, b] = rgbToHsb(red, green, blue);

            let withinHue = h > 80 && 115 > h;
            let withinSaturation = s > 30 && 100 > s;
            let withinBrightness = b > 20 && 100 > b;

            return withinHue && withinSaturation && withinBrightness;
        }

        function isBread(pixels, index): boolean {
            let red: number = pixels[index];
            let green: number = pixels[index + 1];
            let blue: number = pixels[index + 2];

            let [h, s, b] = rgbToHsb(red, green, blue);

            let withinHue = h > 20 && 50 > h;
            let withinSaturation = s > 30 && 70 > s;
            let withinBrightness = b > 40 && 100 > b;

            return withinHue && withinSaturation && withinBrightness;
        }

        function isMeat(pixels, index): boolean {
            let red: number = pixels[index];
            let green: number = pixels[index + 1];
            let blue: number = pixels[index + 2];

            let [h, s, b] = rgbToHsb(red, green, blue);

            let withinHue = (h > 0 && 30 > h) || (h > 350 && 360 > h);
            let withinSaturation = s > 20 && 65 > s;
            let withinBrightness = b > 0 && 60 > b;

            return withinHue && withinSaturation && withinBrightness;
        }

        function updateClusters() {
            tomatoClusters = findClusters(capture.pixels, capture.width, capture.height, isTomato);
            largestTomatoCluster = findLargestCluster(tomatoClusters);

            lettuceClusters = findClusters(capture.pixels, capture.width, capture.height, isLettuce);
            largestLettuceCluster = findLargestCluster(lettuceClusters);

            breadClusters = findClusters(capture.pixels, capture.width, capture.height, isBread);
            largeestBreadCluster = findLargestCluster(breadClusters);

            meatClusters = findClusters(capture.pixels, capture.width, capture.height, isMeat);
            largeestMeatCluster = findLargestCluster(meatClusters);
        }

        function findClusters(pixels, width, height, isColor) {
            let clusters = [];
            let visited = new Set();

            for (let y = 0; y < height; y += p5CanvasStore.pixelScanRatio) {
                for (let x = 0; x < width; x += p5CanvasStore.pixelScanRatio) {
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

onUnmounted(() => {
    if (p5Canvas !== null) {
        p5Canvas.remove();
    }
});

const toggleLoop = () => {
    if (p5CanvasStore.isLooping) {
        p5Canvas?.noLoop();
        p5CanvasStore.setIsLooping(false);
    } else {
        p5Canvas?.loop();
        p5CanvasStore.setIsLooping(true);
    }
};
</script>

<style scoped lang="scss">
.p5-canvas {
    background: var(--view-background);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    min-height: 0;
}

.p5-canvas__center-marker {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
}

.p5-canvas__food-marker {
    width: 20px;
    height: 20px;
    position: absolute;
    border: 4px solid #000;
    border-radius: 100%;

    &--tomato {
        border-color: red;
    }

    &--lettuce {
        border-color: green;
    }

    &--bread {
        border-color: yellow;
    }

    &--meat {
        border-color: brown;
    }
}
</style>

<style>
#defaultCanvas0 {
    width: 100% !important;
    height: auto !important;
    max-width: 360px;
    margin: auto;
}
</style>
