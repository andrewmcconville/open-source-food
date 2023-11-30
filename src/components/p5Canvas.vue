<template>
    <aside class="p5-canvas">
        <div ref="sketchContainer" class="p5-canvas__sketch-container" :class="{'p5-canvas__sketch-container--hide-canvas': !p5CanvasStore.showCanvasBoudingBoxes}">

            <svg height="360" width="360" class="p5-canvas__line" v-if="p5CanvasStore.tomatoFoodVector">
                <line :x1="p5CanvasStore.tomatoFoodVector?.x" :y1="p5CanvasStore.tomatoFoodVector?.y + 10" :x2="p5CanvasStore.tomatoLabelVector?.x" :y2="p5CanvasStore.tomatoLabelVector?.y + 40" style="stroke:rgb(255,255,255);stroke-width:1" />
            </svg>
            <div class="p5-canvas__center-marker" v-show="p5CanvasStore.tomatoFoodVector" :style="{ transform: `translate(${p5CanvasStore.tomatoFoodVector?.x}px, ${p5CanvasStore.tomatoFoodVector?.y}px)` }">
                <RouterLink :to="{ name: 'IngredientDetails', params: { id: 'tomato' }}" class="p5-canvas__food-marker p5-canvas__food-marker--tomato" />
            </div>
            <div class="p5-canvas__center-marker" v-show="p5CanvasStore.tomatoLabelVector" :style="{ transform: `translate(${p5CanvasStore.tomatoLabelVector?.x}px, ${p5CanvasStore.tomatoLabelVector?.y + 40}px)` }">
                <RouterLink :to="{ name: 'IngredientDetails', params: { id: 'tomato' }}" class="p5-canvas__food-label p5-canvas__food-label--tomato">
                    Tomato
                </RouterLink>
            </div>

            <svg height="360" width="360" class="p5-canvas__line" v-if="p5CanvasStore.lettuceFoodVector">
                <line :x1="p5CanvasStore.lettuceFoodVector?.x" :y1="p5CanvasStore.lettuceFoodVector?.y + 10" :x2="p5CanvasStore.lettuceLabelVector?.x" :y2="p5CanvasStore.lettuceLabelVector?.y + 40" style="stroke:rgb(255,255,255);stroke-width:1" />
            </svg>
            <div class="p5-canvas__center-marker" v-show="p5CanvasStore.lettuceFoodVector" :style="{ transform: `translate(${p5CanvasStore.lettuceFoodVector?.x}px, ${p5CanvasStore.lettuceFoodVector?.y}px)` }">
                <RouterLink :to="{ name: 'IngredientDetails', params: { id: 'lettuce' }}" class="p5-canvas__food-marker p5-canvas__food-marker--lettuce" />
            </div>
            <div class="p5-canvas__center-marker" v-show="p5CanvasStore.lettuceLabelVector" :style="{ transform: `translate(${p5CanvasStore.lettuceLabelVector?.x}px, ${p5CanvasStore.lettuceLabelVector?.y + 40}px)` }">
                <RouterLink :to="{ name: 'IngredientDetails', params: { id: 'lettuce' }}" class="p5-canvas__food-label p5-canvas__food-label--lettuce">
                    Lettuce
                </RouterLink>
            </div>

            <svg height="360" width="360" class="p5-canvas__line" v-if="p5CanvasStore.breadFoodVector">
                <line :x1="p5CanvasStore.breadFoodVector?.x" :y1="p5CanvasStore.breadFoodVector?.y + 10" :x2="p5CanvasStore.breadLabelVector?.x" :y2="p5CanvasStore.breadLabelVector?.y + 40" style="stroke:rgb(255,255,255);stroke-width:1" />
            </svg>
            <div class="p5-canvas__center-marker" v-show="p5CanvasStore.breadFoodVector" :style="{ transform: `translate(${p5CanvasStore.breadFoodVector?.x}px, ${p5CanvasStore.breadFoodVector?.y}px)` }">
                <RouterLink :to="{ name: 'IngredientDetails', params: { id: 'bread' }}" class="p5-canvas__food-marker p5-canvas__food-marker--bread" />
            </div>
            <div class="p5-canvas__center-marker" v-show="p5CanvasStore.breadLabelVector" :style="{ transform: `translate(${p5CanvasStore.breadLabelVector?.x}px, ${p5CanvasStore.breadLabelVector?.y + 40}px)` }">
                <RouterLink :to="{ name: 'IngredientDetails', params: { id: 'bread' }}" class="p5-canvas__food-label p5-canvas__food-label--bread">
                    Bread
                </RouterLink>
            </div>

            <svg height="360" width="360" class="p5-canvas__line" v-if="p5CanvasStore.meatFoodVector">
                <line :x1="p5CanvasStore.meatFoodVector?.x" :y1="p5CanvasStore.meatFoodVector?.y + 10" :x2="p5CanvasStore.meatLabelVector?.x" :y2="p5CanvasStore.meatLabelVector?.y + 40" style="stroke:rgb(255,255,255);stroke-width:1" />
            </svg>
            <div class="p5-canvas__center-marker" v-show="p5CanvasStore.meatFoodVector" :style="{ transform: `translate(${p5CanvasStore.meatFoodVector?.x}px, ${p5CanvasStore.meatFoodVector?.y}px)` }">
                <RouterLink :to="{ name: 'IngredientDetails', params: { id: 'meat' }}" class="p5-canvas__food-marker p5-canvas__food-marker--meat" />
            </div>
            <div class="p5-canvas__center-marker" v-show="p5CanvasStore.meatLabelVector" :style="{ transform: `translate(${p5CanvasStore.meatLabelVector?.x}px, ${p5CanvasStore.meatLabelVector?.y + 40}px)` }">
                <RouterLink :to="{ name: 'IngredientDetails', params: { id: 'meat' }}" class="p5-canvas__food-label p5-canvas__food-label--meat">
                    Hamburger
                </RouterLink>
            </div>
        </div>

        <button @click="toggleLoop">{{ p5CanvasStore.isLooping ? 'Pause' : 'Play' }}</button>

        <nav class="p5-canvas__ingredient-list">
            <RouterLink :to="{ name: 'IngredientDetails', params: { id: 'tomato' }}" class="p5-canvas__ingredient">
                Tomato
            </RouterLink>
            <RouterLink :to="{ name: 'IngredientDetails', params: { id: 'lettuce' }}" class="p5-canvas__ingredient">
                Lettuce
            </RouterLink>
            <RouterLink :to="{ name: 'IngredientDetails', params: { id: 'bread' }}" class="p5-canvas__ingredient">
                Bread
            </RouterLink>
            <RouterLink :to="{ name: 'IngredientDetails', params: { id: 'meat' }}" class="p5-canvas__ingredient">
                Hamburger
            </RouterLink>
        </nav>
    </aside>
</template>
  
<script setup lang="ts">
// @ts-nocheck
import { onMounted, onUnmounted, ref } from 'vue';
import p5 from 'p5';
import type { P5BoundingBox } from '../models/P5BoundingBox';
import { useP5CanvasStore } from '../stores/P5CanvasStore';

const p5CanvasStore = useP5CanvasStore();
const sketchContainer = ref<HTMLElement | null>(null);
let p5Canvas: p5 | null = null;
let capture: any;

onMounted(() => {
    p5Canvas = new p5((p: p5) => {
        let captureConstraints;
        let frameCountFood: number = 0;
        let frameCountLabel: number = 0;
        let lerpAmountFood: number = 0;
        let lerpAmountLabel: number = 0;

        let canvasDomRatio: number = 1;

        //TO DO: these four things are not DRY
        let tomatoClusters = [];
        let largestTomatoCluster: Array<[number, number]>;
        let newTomatoBoundingBox: P5BoundingBox;
        let oldTomatoBoundingBox: P5BoundingBox;
        let newTomatoBoundingBoxTotal: p5.Vector = p.createVector(0, 0);
        let newTomatoLabel: p5.Vector;
        let oldTomatoLabel: p5.Vector;

        let lettuceClusters = [];
        let largestLettuceCluster: Array<[number, number]>;
        let newLettuceBoundingBox: P5BoundingBox;
        let oldLettuceBoundingBox: P5BoundingBox;
        let newLettuceBoundingBoxTotal: p5.Vector = p.createVector(0, 0);
        let newLettuceLabel: p5.Vector;
        let oldLettuceLabel: p5.Vector;

        let breadClusters = [];
        let largeestBreadCluster: Array<[number, number]>;
        let newBreadBoundingBox: P5BoundingBox;
        let oldBreadBoundingBox: P5BoundingBox;
        let newBreadBoundingBoxTotal: p5.Vector = p.createVector(0, 0);
        let newBreadLabel: p5.Vector;
        let oldBreadLabel: p5.Vector;

        let meatClusters = [];
        let largeestMeatCluster: Array<[number, number]>;
        let newMeatBoundingBox: P5BoundingBox;
        let oldMeatBoundingBox: P5BoundingBox;
        let newMeatBoundingBoxTotal: p5.Vector = p.createVector(0, 0);
        let newMeatLabel: p5.Vector;
        let oldMeatLabel: p5.Vector;


        p.setup = () => {
            p5CanvasStore.setIsLooping(true);
            p.pixelDensity(1);
            p.createCanvas(p5CanvasStore.canvasSize / p5CanvasStore.pixelScanRatio, p5CanvasStore.canvasSize / p5CanvasStore.pixelScanRatio);
            p.frameRate(p5CanvasStore.frameRateTarget);
            
            captureConstraints = {
                video: {
                    facingMode: "environment",
                    frameRate: { ideal: p5CanvasStore.frameRateTarget },
                    aspectRatio: { ideal: 1 },
                    width: { ideal: p5CanvasStore.canvasSize },
                    height: { ideal: p5CanvasStore.canvasSize }
                },
                audio: false
            };
            capture = p.createCapture(captureConstraints, function () { });
            capture.size(p5CanvasStore.canvasSize, p5CanvasStore.canvasSize);
            p5CanvasStore.showCanvasBoudingBoxes ? capture.hide() : null;

            canvasDomRatio = sketchContainer.value.getBoundingClientRect().width / p5CanvasStore.canvasSize;
        };

        p.draw = () => {
            p.background(255);
            p.image(capture, 0, 0, p5CanvasStore.canvasSize / p5CanvasStore.pixelScanRatio, p5CanvasStore.canvasSize / p5CanvasStore.pixelScanRatio);

            if (frameCountFood % p5CanvasStore.throttleClusterSearch === 0) {
                p.loadPixels();
                updateClusters();

                if (largestTomatoCluster) {
                    oldTomatoBoundingBox = newTomatoBoundingBox;
                    newTomatoBoundingBox = getBoundingBox(largestTomatoCluster);
                    newTomatoBoundingBoxTotal = p5.Vector.add(newTomatoBoundingBoxTotal, newTomatoBoundingBox.center);
                }
                else {
                    p5CanvasStore.tomatoFoodVector = null;
                }

                if (largestLettuceCluster) {
                    oldLettuceBoundingBox = newLettuceBoundingBox;
                    newLettuceBoundingBox = getBoundingBox(largestLettuceCluster);
                    newLettuceBoundingBoxTotal = p5.Vector.add(newLettuceBoundingBoxTotal, newLettuceBoundingBox.center);
                }
                else {
                    p5CanvasStore.lettuceFoodVector = null;
                }

                if (largeestBreadCluster) {
                    oldBreadBoundingBox = newBreadBoundingBox;
                    newBreadBoundingBox = getBoundingBox(largeestBreadCluster);
                    newBreadBoundingBoxTotal = p5.Vector.add(newBreadBoundingBoxTotal, newBreadBoundingBox.center);
                }
                else {
                    p5CanvasStore.breadFoodVector = null;
                }

                if (largeestMeatCluster) {
                    oldMeatBoundingBox = newMeatBoundingBox;
                    newMeatBoundingBox = getBoundingBox(largeestMeatCluster);
                    newMeatBoundingBoxTotal = p5.Vector.add(newMeatBoundingBoxTotal, newMeatBoundingBox.center);
                }
                else {
                    p5CanvasStore.meatFoodVector = null;
                }
                

                if (frameCountLabel % (p5CanvasStore.throttleClusterSearch * p5CanvasStore.labelLerpSpeed) === 0) {
                    if (largestTomatoCluster) {
                        oldTomatoLabel = newTomatoLabel;
                        newTomatoLabel = p.createVector(newTomatoBoundingBoxTotal.x / p5CanvasStore.labelLerpSpeed, newTomatoBoundingBoxTotal.y / p5CanvasStore.labelLerpSpeed);
                        newTomatoBoundingBoxTotal = p.createVector(0, 0);
                    }
                    else {
                        p5CanvasStore.tomatoLabelVector = null;
                    }

                    if (largestLettuceCluster) {
                        oldLettuceLabel = newLettuceLabel;
                        newLettuceLabel = p.createVector(newLettuceBoundingBoxTotal.x / p5CanvasStore.labelLerpSpeed, newLettuceBoundingBoxTotal.y / p5CanvasStore.labelLerpSpeed);
                        newLettuceBoundingBoxTotal = p.createVector(0, 0);
                    }
                    else {
                        p5CanvasStore.lettuceLabelVector = null;
                    }

                    if (largeestBreadCluster) {
                        oldBreadLabel = newBreadLabel;
                        newBreadLabel = p.createVector(newBreadBoundingBoxTotal.x / p5CanvasStore.labelLerpSpeed, newBreadBoundingBoxTotal.y / p5CanvasStore.labelLerpSpeed);
                        newBreadBoundingBoxTotal = p.createVector(0, 0);
                    }
                    else {
                        p5CanvasStore.breadLabelVector = null;
                    }
                    
                    if (largeestMeatCluster) {
                        oldMeatLabel = newMeatLabel;
                        newMeatLabel = p.createVector(newMeatBoundingBoxTotal.x / p5CanvasStore.labelLerpSpeed, newMeatBoundingBoxTotal.y / p5CanvasStore.labelLerpSpeed);
                        newMeatBoundingBoxTotal = p.createVector(0, 0);
                    }
                    else {
                        p5CanvasStore.meatLabelVector = null;
                    }

                    frameCountLabel = 0;
                }

                frameCountFood = 0;
            }
            frameCountFood++;
            frameCountLabel++;
            lerpAmountFood = frameCountFood / p5CanvasStore.throttleClusterSearch;
            lerpAmountLabel = frameCountLabel / (p5CanvasStore.throttleClusterSearch * p5CanvasStore.labelLerpSpeed);

            if (largestTomatoCluster && oldTomatoBoundingBox) {
                let lerpBox: P5BoundingBox = {rect: [0, 0, 0, 0], center: p.createVector(0, 0)};

                lerpBox.rect[0] = p.lerp(oldTomatoBoundingBox.rect[0], newTomatoBoundingBox.rect[0], lerpAmountFood);
                lerpBox.rect[1] = p.lerp(oldTomatoBoundingBox.rect[1], newTomatoBoundingBox.rect[1], lerpAmountFood);
                lerpBox.rect[2] = p.lerp(oldTomatoBoundingBox.rect[2], newTomatoBoundingBox.rect[2], lerpAmountFood);
                lerpBox.rect[3] = p.lerp(oldTomatoBoundingBox.rect[3], newTomatoBoundingBox.rect[3], lerpAmountFood);
                lerpBox.center = p5.Vector.lerp(oldTomatoBoundingBox.center, newTomatoBoundingBox.center, lerpAmountFood);

                p5CanvasStore.tomatoFoodVector = new p5.Vector(lerpBox.center.x * canvasDomRatio * p5CanvasStore.pixelScanRatio, lerpBox.center.y * canvasDomRatio * p5CanvasStore.pixelScanRatio);

                if (oldTomatoLabel) {
                    let lerpLabel: p5.Vector = p.createVector(0, 0);
                    lerpLabel = p5.Vector.lerp(oldTomatoLabel, newTomatoLabel, lerpAmountLabel);
                    p5CanvasStore.tomatoLabelVector = new p5.Vector(lerpLabel.x * canvasDomRatio * p5CanvasStore.pixelScanRatio, lerpLabel.y * canvasDomRatio * p5CanvasStore.pixelScanRatio);
                }

                p5CanvasStore.showCanvasBoudingBoxes ? drawBoundingBox(lerpBox, p.color(0, 255, 0)) : null;
            };

            if (largestLettuceCluster && oldLettuceBoundingBox) {
                let lerpBox: P5BoundingBox = {rect: [0, 0, 0, 0], center: p.createVector(0, 0)};

                lerpBox.rect[0] = p.lerp(oldLettuceBoundingBox.rect[0], newLettuceBoundingBox.rect[0], lerpAmountFood);
                lerpBox.rect[1] = p.lerp(oldLettuceBoundingBox.rect[1], newLettuceBoundingBox.rect[1], lerpAmountFood);
                lerpBox.rect[2] = p.lerp(oldLettuceBoundingBox.rect[2], newLettuceBoundingBox.rect[2], lerpAmountFood);
                lerpBox.rect[3] = p.lerp(oldLettuceBoundingBox.rect[3], newLettuceBoundingBox.rect[3], lerpAmountFood);
                lerpBox.center = p5.Vector.lerp(oldLettuceBoundingBox.center, newLettuceBoundingBox.center, lerpAmountFood);

                p5CanvasStore.lettuceFoodVector = new p5.Vector(lerpBox.center.x * canvasDomRatio * p5CanvasStore.pixelScanRatio, lerpBox.center.y * canvasDomRatio * p5CanvasStore.pixelScanRatio);

                if (oldLettuceLabel) {
                    let lerpLabel: p5.Vector = p.createVector(0, 0);
                    lerpLabel = p5.Vector.lerp(oldLettuceLabel, newLettuceLabel, lerpAmountLabel);
                    p5CanvasStore.lettuceLabelVector = new p5.Vector(lerpLabel.x * canvasDomRatio * p5CanvasStore.pixelScanRatio, lerpLabel.y * canvasDomRatio * p5CanvasStore.pixelScanRatio);
                }

                p5CanvasStore.showCanvasBoudingBoxes ? drawBoundingBox(lerpBox, p.color(255, 0, 0)) : null;
            }

            if (largeestBreadCluster && oldBreadBoundingBox) {
                let lerpBox: P5BoundingBox = {rect: [0, 0, 0, 0], center: p.createVector(0, 0)};

                lerpBox.rect[0] = p.lerp(oldBreadBoundingBox.rect[0], newBreadBoundingBox.rect[0], lerpAmountFood);
                lerpBox.rect[1] = p.lerp(oldBreadBoundingBox.rect[1], newBreadBoundingBox.rect[1], lerpAmountFood);
                lerpBox.rect[2] = p.lerp(oldBreadBoundingBox.rect[2], newBreadBoundingBox.rect[2], lerpAmountFood);
                lerpBox.rect[3] = p.lerp(oldBreadBoundingBox.rect[3], newBreadBoundingBox.rect[3], lerpAmountFood);
                lerpBox.center = p5.Vector.lerp(oldBreadBoundingBox.center, newBreadBoundingBox.center, lerpAmountFood);

                p5CanvasStore.breadFoodVector = new p5.Vector(lerpBox.center.x * canvasDomRatio * p5CanvasStore.pixelScanRatio, lerpBox.center.y * canvasDomRatio * p5CanvasStore.pixelScanRatio);

                if (oldBreadLabel) {
                    let lerpLabel: p5.Vector = p.createVector(0, 0);
                    lerpLabel = p5.Vector.lerp(oldBreadLabel, newBreadLabel, lerpAmountLabel);
                    p5CanvasStore.breadLabelVector = new p5.Vector(lerpLabel.x * canvasDomRatio * p5CanvasStore.pixelScanRatio, lerpLabel.y * canvasDomRatio * p5CanvasStore.pixelScanRatio);
                }

                p5CanvasStore.showCanvasBoudingBoxes ? drawBoundingBox(lerpBox, p.color(0, 0, 255)) : null;
            }

            if (largeestMeatCluster && oldMeatBoundingBox) {
                let lerpBox: P5BoundingBox = {rect: [0, 0, 0, 0], center: p.createVector(0, 0)};

                lerpBox.rect[0] = p.lerp(oldMeatBoundingBox.rect[0], newMeatBoundingBox.rect[0], lerpAmountFood);
                lerpBox.rect[1] = p.lerp(oldMeatBoundingBox.rect[1], newMeatBoundingBox.rect[1], lerpAmountFood);
                lerpBox.rect[2] = p.lerp(oldMeatBoundingBox.rect[2], newMeatBoundingBox.rect[2], lerpAmountFood);
                lerpBox.rect[3] = p.lerp(oldMeatBoundingBox.rect[3], newMeatBoundingBox.rect[3], lerpAmountFood);
                lerpBox.center = p5.Vector.lerp(oldMeatBoundingBox.center, newMeatBoundingBox.center, lerpAmountFood);

                p5CanvasStore.meatFoodVector = new p5.Vector(lerpBox.center.x * canvasDomRatio * p5CanvasStore.pixelScanRatio, lerpBox.center.y * canvasDomRatio * p5CanvasStore.pixelScanRatio);
                
                if (oldMeatLabel) {
                    let lerpLabel: p5.Vector = p.createVector(0, 0);
                    lerpLabel = p5.Vector.lerp(oldMeatLabel, newMeatLabel, lerpAmountLabel);
                    p5CanvasStore.meatLabelVector = new p5.Vector(lerpLabel.x * canvasDomRatio * p5CanvasStore.pixelScanRatio, lerpLabel.y * canvasDomRatio * p5CanvasStore.pixelScanRatio);
                }

                p5CanvasStore.showCanvasBoudingBoxes ? drawBoundingBox(lerpBox, p.color(255, 255, 255)) : null;
            }
        }

        p.windowResized = () => {
            canvasDomRatio = sketchContainer.value.getBoundingClientRect().width / p5CanvasStore.canvasSize;
        }

        function drawBoundingBox(box: P5BoundingBox, color: p5.Color) {
            p.noFill();
            p.stroke(color);
            p.strokeWeight(1);
            p.rectMode(p.CORNERS);
            p.rect(box.rect[0], box.rect[1], box.rect[2], box.rect[3]);
            p.fill(color);
            p.noStroke();
            p.ellipse(box.center.x, box.center.y, 4, 4);
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
                rect: [minX, minY, maxX, maxY],
                center: p.createVector(centerX, centerY)
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
            tomatoClusters = findClusters(p.pixels, p.width, p.height, isTomato);
            largestTomatoCluster = findLargestCluster(tomatoClusters);

            lettuceClusters = findClusters(p.pixels, p.width, p.height, isLettuce);
            largestLettuceCluster = findLargestCluster(lettuceClusters);

            breadClusters = findClusters(p.pixels, p.width, p.height, isBread);
            largeestBreadCluster = findLargestCluster(breadClusters);

            meatClusters = findClusters(p.pixels, p.width, p.height, isMeat);
            largeestMeatCluster = findLargestCluster(meatClusters);
        }

        function findClusters(pixels, width, height, isColor) {
            let clusters = [];
            let visited = new Set();

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    let index = (x + y * width) * 4;
                    if (isColor(pixels, index) && !visited.has(index)) {
                        let cluster = findCluster(pixels, x, y, width, visited, isColor);
                        if (cluster.length > 0) {
                            clusters.push(cluster);
                        }
                    }
                }
            }

            return clusters;
        }

        function findCluster(pixels, startX, startY, width, visited, isColor): Array<[number, number]> {
            let cluster: Array<[number, number]> = [];
            let stack = [[startX, startY]];

            while (stack.length > 0) {
                let point = stack.pop();
                if (point !== undefined) {
                    let [x, y] = point;
                    let index = (x + y * width) * 4;

                    if (x >= 0 && y >= 0 && x < width && y < pixels.length / (width * 4) && isColor(pixels, index) && !visited.has(index)) {
                        visited.add(index);
                        cluster.push([x, y]);
                        stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
                    }
                }
            }
            return cluster.length >= p5CanvasStore.minClusterSize ? cluster : [];
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
    stopCapture();
    p5Canvas.remove();
});

function stopCapture() {
    capture.elt.srcObject.getTracks().forEach((track: any) => track.stop());
}

const toggleLoop = () => {
    if (p5CanvasStore.isLooping) {
        p5Canvas?.noLoop();
        capture.pause();
        p5CanvasStore.setIsLooping(false);
        
    } else {
        p5Canvas?.loop();
        capture.play();
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

.p5-canvas__sketch-container {
    position: relative;
    width: 360px;
    max-width: 100dvw;
    z-index: 0;
}

.p5-canvas__line {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    pointer-events: none;
    width: 100%;
    height: auto;
}

.p5-canvas__center-marker {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
}

.p5-canvas__food-marker {
    width: 20px;
    height: 20px;
    position: absolute;
    border: 4px solid #000;
    border-radius: 100%;
    z-index: 0;

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

.p5-canvas__food-label {
    position: absolute;
    background-color: rgba(var(--yellow-20-rgb), 0.5);
    padding: 4px 8px 6px 8px;
    backdrop-filter: blur(8px);
    white-space: nowrap;
    line-height: 1;
    color: #000;
    border: 1px solid #fff;
    z-index: 1;
}

.p5-canvas__ingredient-list {
    display: flex;
}

.p5-canvas__ingredient {
    border: 1px solid var(--teal);
    background-color: var(--yellow-20);
    color: var(--teal);
    font-size: 12px;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    margin: 0 2px;
}
</style>

<style>
#defaultCanvas0, video {
    width: 100% !important;
    height: auto !important;
    max-width: 360px;
    margin: auto;
}

#defaultCanvas0 {
    image-rendering: pixelated;
}

.p5-canvas__sketch-container--hide-canvas #defaultCanvas0 {
    display: none;
}
</style>
