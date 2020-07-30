import Point from '@/classes/Point';

interface BezierPointInterface {
    point: Point;
    controlPoint: Point;
}

export default class BezierPoint implements BezierPointInterface {
    point: Point;
    controlPoint: Point;

    constructor({ point, controlPoint }: BezierPointInterface) {
        this.point = point;
        this.controlPoint = controlPoint;
    }
}
