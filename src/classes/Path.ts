import Point from './Point';

interface PathInterface {
    points: Point[];
}

export default class Path extends Array implements PathInterface {
    points: Point[];

    constructor({ points }: PathInterface) {
        super();
        this.points = points;
    }
}
