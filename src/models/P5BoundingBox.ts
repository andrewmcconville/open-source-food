import p5 from 'p5';

export interface P5BoundingBox {
  rect: [number, number, number, number];
  center: p5.Vector;
}