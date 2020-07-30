import BezierPoint from '@/classes/SmoothLines/BezierPoint';

interface BezierPathInterface {
    points: BezierPoint[];
}

export default class BezierPath extends Array implements BezierPathInterface {
    points: BezierPoint[];

    constructor({ points }: BezierPathInterface) {
        super();
        this.points = points;
    }
}
