<template>
    <aside class="p5-canvas panel-view">
        <section ref="sketchContainer" class="p5-canvas__sketch-container" :class="{'p5-canvas__sketch-container--hide-canvas': !p5CanvasStore.showCanvasBoudingBoxes}">
            <template v-if="p5CanvasStore.tomatoFoodVector">
                <div class="p5-canvas__center-marker p5-canvas__center-marker--food"
                    :style="{ transform: `translate(${p5CanvasStore.tomatoFoodVector?.x}px, ${p5CanvasStore.tomatoFoodVector?.y}px)` }">
                    <RouterLink :to="{ name: 'IngredientDetails', params: { id: 'tomato' }}" class="p5-canvas__food-marker p5-canvas__food-marker--tomato" />
                </div>
                <template v-if="p5CanvasStore.tomatoLabelVector">
                    <svg height="360" width="360" class="p5-canvas__line">
                        <line style="stroke: rgb(255,255,255); stroke-width: 2"
                            :x1="p5CanvasStore.tomatoFoodVector?.x"
                            :y1="p5CanvasStore.tomatoFoodVector?.y"
                            :x2="p5CanvasStore.tomatoLabelVector?.x"
                            :y2="p5CanvasStore.tomatoLabelVector?.y + p5CanvasStore.labelOffset - 12" />
                    </svg>
                    <div class="p5-canvas__center-marker p5-canvas__center-marker--label"
                        :style="{ transform: `translate(${p5CanvasStore.tomatoLabelVector?.x}px, ${p5CanvasStore.tomatoLabelVector?.y + p5CanvasStore.labelOffset}px)` }">
                        <RouterLink :to="{ name: 'IngredientDetails', params: { id: 'tomato' }}" class="p5-canvas__food-label p5-canvas__food-label--tomato">
                            Tomato
                        </RouterLink>
                    </div>
                </template>
            </template>

            <template v-if="p5CanvasStore.lettuceFoodVector">
                <div class="p5-canvas__center-marker p5-canvas__center-marker--food"
                    :style="{ transform: `translate(${p5CanvasStore.lettuceFoodVector?.x}px, ${p5CanvasStore.lettuceFoodVector?.y}px)` }">
                    <RouterLink :to="{ name: 'IngredientDetails', params: { id: 'lettuce' }}" class="p5-canvas__food-marker p5-canvas__food-marker--lettuce" />
                </div>
                <template v-if="p5CanvasStore.lettuceLabelVector">
                    <svg height="360" width="360" class="p5-canvas__line">
                        <line style="stroke: rgb(255,255,255); stroke-width: 2"
                            :x1="p5CanvasStore.lettuceFoodVector?.x"
                            :y1="p5CanvasStore.lettuceFoodVector?.y"
                            :x2="p5CanvasStore.lettuceLabelVector?.x"
                            :y2="p5CanvasStore.lettuceLabelVector?.y + p5CanvasStore.labelOffset - 12" />
                    </svg>
                    <div class="p5-canvas__center-marker p5-canvas__center-marker--label"
                        :style="{ transform: `translate(${p5CanvasStore.lettuceLabelVector?.x}px, ${p5CanvasStore.lettuceLabelVector?.y + p5CanvasStore.labelOffset}px)` }">
                        <RouterLink :to="{ name: 'IngredientDetails', params: { id: 'lettuce' }}" class="p5-canvas__food-label p5-canvas__food-label--lettuce">
                            Lettuce
                        </RouterLink>
                    </div>
                </template>
            </template>

            <template v-if="p5CanvasStore.breadFoodVector">
                <div class="p5-canvas__center-marker p5-canvas__center-marker--food"
                    :style="{ transform: `translate(${p5CanvasStore.breadFoodVector?.x}px, ${p5CanvasStore.breadFoodVector?.y}px)` }">
                    <RouterLink :to="{ name: 'IngredientDetails', params: { id: 'bread' }}" class="p5-canvas__food-marker p5-canvas__food-marker--bread" />
                </div>
                <template v-if="p5CanvasStore.breadLabelVector">
                    <svg height="360" width="360" class="p5-canvas__line">
                        <line style="stroke: rgb(255,255,255); stroke-width: 2"
                            :x1="p5CanvasStore.breadFoodVector?.x"
                            :y1="p5CanvasStore.breadFoodVector?.y"
                            :x2="p5CanvasStore.breadLabelVector?.x"
                            :y2="p5CanvasStore.breadLabelVector?.y + p5CanvasStore.labelOffset - 12" />
                    </svg>
                    <div class="p5-canvas__center-marker p5-canvas__center-marker--label"
                        :style="{ transform: `translate(${p5CanvasStore.breadLabelVector?.x}px, ${p5CanvasStore.breadLabelVector?.y + p5CanvasStore.labelOffset}px)` }">
                        <RouterLink :to="{ name: 'IngredientDetails', params: { id: 'bread' }}" class="p5-canvas__food-label p5-canvas__food-label--bread">
                            Bread
                        </RouterLink>
                    </div>
                </template>
            </template>

            <template v-if="p5CanvasStore.hamburgerFoodVector">
                <div class="p5-canvas__center-marker p5-canvas__center-marker--food" 
                    :style="{ transform: `translate(${p5CanvasStore.hamburgerFoodVector?.x}px, ${p5CanvasStore.hamburgerFoodVector?.y}px)` }">
                    <RouterLink :to="{ name: 'IngredientDetails', params: { id: 'hamburger' }}" class="p5-canvas__food-marker p5-canvas__food-marker--hamburger" />
                </div>
                <template v-if="p5CanvasStore.hamburgerLabelVector">
                    <svg height="360" width="360" class="p5-canvas__line">
                        <line style="stroke: rgb(255,255,255); stroke-width: 2"
                            :x1="p5CanvasStore.hamburgerFoodVector?.x"
                            :y1="p5CanvasStore.hamburgerFoodVector?.y"
                            :x2="p5CanvasStore.hamburgerLabelVector?.x"
                            :y2="p5CanvasStore.hamburgerLabelVector?.y + p5CanvasStore.labelOffset - 12" />
                    </svg>
                    <div class="p5-canvas__center-marker p5-canvas__center-marker--label"
                        :style="{ transform: `translate(${p5CanvasStore.hamburgerLabelVector?.x}px, ${p5CanvasStore.hamburgerLabelVector?.y + p5CanvasStore.labelOffset}px)` }">
                        <RouterLink :to="{ name: 'IngredientDetails', params: { id: 'hamburger' }}" class="p5-canvas__food-label p5-canvas__food-label--hamburger">
                            Hamburger
                        </RouterLink>
                    </div>
                </template>
            </template>

            <button class="p5-canvas__play-pause" @click="toggleLoop">{{ p5CanvasStore.isLooping ? 'Pause' : 'Play' }}</button>
        </section>

        <section class="panel-view__scroller">
            <p class="panel-view__label">
                Current Ingredients
                <span class="panel-view__label-helper">(click to learn more)</span>
            </p>
            <template v-if="p5CanvasStore.activeIngredients.length > 0">
            <nav class="p5-canvas__ingredient-list">
                <template v-for="ingredient in p5CanvasStore.activeIngredients" v-bind:key="ingredient">
                    <RouterLink :to="{ name: 'IngredientDetails', params: { id: ingredient }}" class="p5-canvas__ingredient">
                        {{ ingredient }}
                    </RouterLink>
                </template>
            </nav>
            </template>
            <p v-else>
                Point your camera at some food to get started.
            </p>

            <p class="panel-view__label">Recent Ingredients</p>
            <template v-if="p5CanvasStore.inactiveIngredients.length > 0">
                <nav class="p5-canvas__ingredient-list p5-canvas__ingredient-list--inactive">
                    <template v-for="ingredient in p5CanvasStore.inactiveIngredients" v-bind:key="ingredient">
                        <RouterLink :to="{ name: 'IngredientDetails', params: { id: ingredient }}" class="p5-canvas__ingredient">
                            {{ ingredient }}
                        </RouterLink>
                    </template>
                </nav>
            </template>
            <p v-else>
                No recent ingredients, yet.
            </p>
        </section>
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
        let tomatoHasInitialAppearance: boolean = false;

        let lettuceClusters = [];
        let largestLettuceCluster: Array<[number, number]>;
        let newLettuceBoundingBox: P5BoundingBox;
        let oldLettuceBoundingBox: P5BoundingBox;
        let newLettuceBoundingBoxTotal: p5.Vector = p.createVector(0, 0);
        let newLettuceLabel: p5.Vector;
        let oldLettuceLabel: p5.Vector;
        let lettuceHasInitialAppearance: boolean = false;

        let breadClusters = [];
        let largeestBreadCluster: Array<[number, number]>;
        let newBreadBoundingBox: P5BoundingBox;
        let oldBreadBoundingBox: P5BoundingBox;
        let newBreadBoundingBoxTotal: p5.Vector = p.createVector(0, 0);
        let newBreadLabel: p5.Vector;
        let oldBreadLabel: p5.Vector;
        let breadHasInitialAppearance: boolean = false;

        let hamburgerClusters = [];
        let largeestHamburgerCluster: Array<[number, number]>;
        let newHamburgerBoundingBox: P5BoundingBox;
        let oldHamburgerBoundingBox: P5BoundingBox;
        let newHamburgerBoundingBoxTotal: p5.Vector = p.createVector(0, 0);
        let newHamburgerLabel: p5.Vector;
        let oldHamburgerLabel: p5.Vector;
        let hamburgerHasInitialAppearance: boolean = false;


        p.setup = () => {
            p5CanvasStore.isLooping = true;
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
                    tomatoHasInitialAppearance = true;

                    p5CanvasStore.inactiveIngredients = p5CanvasStore.inactiveIngredients.filter((ingredient) => ingredient !== 'tomato');

                    if (p5CanvasStore.activeIngredients.indexOf('tomato') === -1) {
                        p5CanvasStore.activeIngredients.push('tomato');
                    }
                }
                else {
                    p5CanvasStore.tomatoFoodVector = null;

                    p5CanvasStore.activeIngredients = p5CanvasStore.activeIngredients.filter((ingredient) => ingredient !== 'tomato');

                    if (p5CanvasStore.inactiveIngredients.indexOf('tomato') === -1 && tomatoHasInitialAppearance) {
                        p5CanvasStore.inactiveIngredients.unshift('tomato');
                    }
                }

                if (largestLettuceCluster) {
                    oldLettuceBoundingBox = newLettuceBoundingBox;
                    newLettuceBoundingBox = getBoundingBox(largestLettuceCluster);
                    newLettuceBoundingBoxTotal = p5.Vector.add(newLettuceBoundingBoxTotal, newLettuceBoundingBox.center);
                    lettuceHasInitialAppearance = true;

                    p5CanvasStore.inactiveIngredients = p5CanvasStore.inactiveIngredients.filter((ingredient) => ingredient !== 'lettuce');

                    if (p5CanvasStore.activeIngredients.indexOf('lettuce') === -1) {
                        p5CanvasStore.activeIngredients.push('lettuce');
                    }
                }
                else {
                    p5CanvasStore.lettuceFoodVector = null;

                    p5CanvasStore.activeIngredients = p5CanvasStore.activeIngredients.filter((ingredient) => ingredient !== 'lettuce');

                    if (p5CanvasStore.inactiveIngredients.indexOf('lettuce') === -1 && lettuceHasInitialAppearance) {
                        p5CanvasStore.inactiveIngredients.unshift('lettuce');
                    }
                }

                if (largeestBreadCluster) {
                    oldBreadBoundingBox = newBreadBoundingBox;
                    newBreadBoundingBox = getBoundingBox(largeestBreadCluster);
                    newBreadBoundingBoxTotal = p5.Vector.add(newBreadBoundingBoxTotal, newBreadBoundingBox.center);
                    breadHasInitialAppearance = true;

                    p5CanvasStore.inactiveIngredients = p5CanvasStore.inactiveIngredients.filter((ingredient) => ingredient !== 'bread');

                    if (p5CanvasStore.activeIngredients.indexOf('bread') === -1) {
                        p5CanvasStore.activeIngredients.push('bread');
                    }
                }
                else {
                    p5CanvasStore.breadFoodVector = null;

                    p5CanvasStore.activeIngredients = p5CanvasStore.activeIngredients.filter((ingredient) => ingredient !== 'bread');

                    if (p5CanvasStore.inactiveIngredients.indexOf('bread') === -1 && breadHasInitialAppearance) {
                        p5CanvasStore.inactiveIngredients.unshift('bread');
                    }
                }

                if (largeestHamburgerCluster) {
                    oldHamburgerBoundingBox = newHamburgerBoundingBox;
                    newHamburgerBoundingBox = getBoundingBox(largeestHamburgerCluster);
                    newHamburgerBoundingBoxTotal = p5.Vector.add(newHamburgerBoundingBoxTotal, newHamburgerBoundingBox.center);
                    hamburgerHasInitialAppearance = true;

                    p5CanvasStore.inactiveIngredients = p5CanvasStore.inactiveIngredients.filter((ingredient) => ingredient !== 'hamburger');

                    if (p5CanvasStore.activeIngredients.indexOf('hamburger') === -1) {
                        p5CanvasStore.activeIngredients.push('hamburger');
                    }
                }
                else {
                    p5CanvasStore.hamburgerFoodVector = null;

                    p5CanvasStore.activeIngredients = p5CanvasStore.activeIngredients.filter((ingredient) => ingredient !== 'hamburger');

                    if (p5CanvasStore.inactiveIngredients.indexOf('hamburger') === -1 && hamburgerHasInitialAppearance) {
                        p5CanvasStore.inactiveIngredients.unshift('hamburger');
                    }
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
                    
                    if (largeestHamburgerCluster) {
                        oldHamburgerLabel = newHamburgerLabel;
                        newHamburgerLabel = p.createVector(newHamburgerBoundingBoxTotal.x / p5CanvasStore.labelLerpSpeed, newHamburgerBoundingBoxTotal.y / p5CanvasStore.labelLerpSpeed);
                        newHamburgerBoundingBoxTotal = p.createVector(0, 0);
                    }
                    else {
                        p5CanvasStore.hamburgerLabelVector = null;
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

                p5CanvasStore.showCanvasBoudingBoxes ? drawBoundingBox(lerpBox, p.color(255, 0, 0)) : null;
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

                p5CanvasStore.showCanvasBoudingBoxes ? drawBoundingBox(lerpBox, p.color(0, 255, 0)) : null;
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

                p5CanvasStore.showCanvasBoudingBoxes ? drawBoundingBox(lerpBox, p.color(255, 255, 0)) : null;
            }

            if (largeestHamburgerCluster && oldHamburgerBoundingBox) {
                let lerpBox: P5BoundingBox = {rect: [0, 0, 0, 0], center: p.createVector(0, 0)};

                lerpBox.rect[0] = p.lerp(oldHamburgerBoundingBox.rect[0], newHamburgerBoundingBox.rect[0], lerpAmountFood);
                lerpBox.rect[1] = p.lerp(oldHamburgerBoundingBox.rect[1], newHamburgerBoundingBox.rect[1], lerpAmountFood);
                lerpBox.rect[2] = p.lerp(oldHamburgerBoundingBox.rect[2], newHamburgerBoundingBox.rect[2], lerpAmountFood);
                lerpBox.rect[3] = p.lerp(oldHamburgerBoundingBox.rect[3], newHamburgerBoundingBox.rect[3], lerpAmountFood);
                lerpBox.center = p5.Vector.lerp(oldHamburgerBoundingBox.center, newHamburgerBoundingBox.center, lerpAmountFood);

                p5CanvasStore.hamburgerFoodVector = new p5.Vector(lerpBox.center.x * canvasDomRatio * p5CanvasStore.pixelScanRatio, lerpBox.center.y * canvasDomRatio * p5CanvasStore.pixelScanRatio);
                
                if (oldHamburgerLabel) {
                    let lerpLabel: p5.Vector = p.createVector(0, 0);
                    lerpLabel = p5.Vector.lerp(oldHamburgerLabel, newHamburgerLabel, lerpAmountLabel);
                    p5CanvasStore.hamburgerLabelVector = new p5.Vector(lerpLabel.x * canvasDomRatio * p5CanvasStore.pixelScanRatio, lerpLabel.y * canvasDomRatio * p5CanvasStore.pixelScanRatio);
                }

                p5CanvasStore.showCanvasBoudingBoxes ? drawBoundingBox(lerpBox, p.color(120, 80, 60)) : null;
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
            let withinSaturation = s > 50 && 95 > s;
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

        function isHamburger(pixels, index): boolean {
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

            hamburgerClusters = findClusters(p.pixels, p.width, p.height, isHamburger);
            largeestHamburgerCluster = findLargestCluster(hamburgerClusters);
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
    if (capture.elt.srcObject) {
        capture.elt.srcObject.getTracks().forEach((track: any) => track.stop());
    }
    else {
        return
    }
}

const toggleLoop = () => {
    if (p5CanvasStore.isLooping) {
        p5Canvas?.noLoop();
        capture.pause();
        p5CanvasStore.isLooping = false;
        
    } else {
        p5Canvas?.loop();
        capture.play();
        p5CanvasStore.isLooping = true;
    }
};
</script>

<style scoped lang="scss">

.p5-canvas__sketch-container {
    position: relative;
    width: 100%;
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

    &--food {
        z-index: 2;
    }

    &--label {
        z-index: 3;
    }
}

.p5-canvas__food-marker {
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    width: 20px;
    height: 20px;
    position: absolute;
    border: 2px solid #fff;
    border-radius: 100%;
    z-index: 0;

    &--tomato {        
        background-color: rgba(200, 100, 60, 0.333);
    }

    &--lettuce {
        background-color: rgba(130, 190, 70, 0.333);
    }

    &--bread {
        background-color: rgba(200, 170, 110, 0.333);
    }

    &--hamburger {
        background-color: rgba(130, 80, 70, 0.333);
    }
}

.p5-canvas__food-label {
    position: absolute;
    backdrop-filter: blur(4px);
    padding: 6px 10px 8px 10px;
    white-space: nowrap;
    line-height: 1;
    color: #fff;
    border-top: 2px solid #fff;
    z-index: 1;
    font-size: 18px;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.333);
    font-weight: 900;

    &--tomato {        
        background-color: rgba(200, 100, 60, 0.333);
    }

    &--lettuce {
        background-color: rgba(130, 190, 70, 0.333);
    }

    &--bread {
        background-color: rgba(200, 170, 110, 0.333);
    }

    &--hamburger {
        background-color: rgba(130, 80, 70, 0.333);
    }
}

.p5-canvas__play-pause {
    border: 2px solid var(--yellow-10);
    background-color: rgba(var(--teal-rgb), 0.75);
    backdrop-filter: blur(8px);
    color: #fff;
    font-weight: 900;
    padding: 0;
    width: 80px;
    height: 80px;
    border-radius: 100%;
    cursor: pointer;
    position: absolute;
    bottom: -40px;
    margin: auto;
    left: 0;
    right: 0;
    z-index: 4;
}

.p5-canvas__ingredient-list {
    display: flex;
    flex-direction: column;
    max-width: 360px;
    width: 100%;
    justify-content: start;
    align-items: start;
}

.p5-canvas__ingredient-list--inactive {
    opacity: 0.5;
}

.p5-canvas__ingredient {
    background-color: var(--teal);
    color: #fff;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2px;
    font-weight: 800;
    text-transform: capitalize;
}
</style>

<style>
#defaultCanvas0, video {
    background-color: #000;
    width: 100% !important;
    height: auto !important;
    margin: auto;
}

#defaultCanvas0 {
    image-rendering: pixelated;
}

.p5-canvas__sketch-container--hide-canvas #defaultCanvas0 {
    display: none;
}
</style>
