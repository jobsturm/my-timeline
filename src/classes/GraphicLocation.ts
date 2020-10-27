import Point from '@/classes/Point';

interface GraphicLocationInterface extends Point {
    transform: string;
}

export default class GraphicLocation extends Point {
    transform: string;

    constructor({ x, y, transform }: GraphicLocationInterface) {
        super({ x, y });
        this.transform = transform;
    }
}
