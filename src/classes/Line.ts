import Point from './Point';

interface LineInterface {
    start:Point;
    end:Point;
}

export default class Line implements LineInterface {
    start: Point;

    end: Point;

    angle: Number;

    constructor({ start, end } : LineInterface) {
        this.start = start;
        this.end = end;
        this.angle = Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI;
    }
}
