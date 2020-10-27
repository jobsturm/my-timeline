interface PointInterface {
    x: number;
    y: number;
}

export default class Point {
    x: number;
    y: number;

    constructor({ x, y }: PointInterface) {
        this.x = x;
        this.y = y;
    }
}
