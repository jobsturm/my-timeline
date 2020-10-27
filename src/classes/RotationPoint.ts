import Point from './Point';

interface RotationPointInterface extends Point {
    x: number;
    y: number;
    degrees: number;
}

export default class RotationPoint extends Point implements RotationPointInterface {
    x: number;
    y: number;
    degrees: number;

    constructor({ x, y, degrees }: RotationPointInterface) {
        super({ x, y });
        this.degrees = degrees;
    }
}
