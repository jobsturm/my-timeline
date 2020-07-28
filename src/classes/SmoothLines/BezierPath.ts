import BezierPoint from '@/classes/SmoothLines/BezierPoint';

interface BezierPathInterface {
    points:Array<BezierPoint>,
}

export default class BezierPath extends Array implements BezierPathInterface {
    points: Array<BezierPoint>;

    constructor({ points } : BezierPathInterface) {
        super();
        this.points = points;
    }
}
