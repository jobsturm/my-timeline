import Line from './Line';

interface SlideInterface {
    index: number;
    line: Line;
}

export default class Slide implements SlideInterface {
    index: number;
    line: Line;

    constructor({ index, line }: SlideInterface) {
        this.index = index;
        this.line = line;
    }
}
