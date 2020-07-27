import Point from '@/classes/Point';

interface SmoothLinePointInterface {
    point:Point;
    controlPoint:Point;
}

export default class SmoothLinePoint implements SmoothLinePointInterface {
    point: Point;
    controlPoint: Point;

    constructor({ point, controlPoint } : SmoothLinePointInterface) {
        this.point = point;
        this.controlPoint = controlPoint;
    }
}
