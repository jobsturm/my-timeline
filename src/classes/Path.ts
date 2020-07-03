import Point from './Point';

interface PathInterface {
    start:Point;
    end:Point;
    length:number;
}

export default class Path implements PathInterface {
    start: Point;
    end: Point;
    length: number;

    constructor({ start, end, length } : PathInterface) {
        this.start = start;
        this.end = end;
        this.length = length;
    }
}
