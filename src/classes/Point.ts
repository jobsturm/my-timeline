interface PointInterface {
    x: number;
    y: number;
}

export default class Point {
    x: any;
    y: any;

    constructor({ x, y } : PointInterface) {
        this.x = x;
        this.y = y;
    }
}
