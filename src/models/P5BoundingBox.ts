import p5 from 'p5';

export interface BoundingBox {
  rect: [number, number, number, number];
  center: p5.Vector;
}