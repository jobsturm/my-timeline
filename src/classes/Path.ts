import Point from './Point';

interface PathInterface {
    points:Array<Point>,
}

export default class Path extends Array implements PathInterface {
    points: Array<Point>;

    constructor({ points } : PathInterface) {
        super();
        this.points = points;
    }
}
