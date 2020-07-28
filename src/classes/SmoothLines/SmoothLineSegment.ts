import Line from '@/classes/Line';

interface DirectionInterface {
    vertical:boolean,
}
interface SmoothLineSegmentInterface {
    line:Line;
    directionIncoming:DirectionInterface
    directionOutgoing:DirectionInterface
}

class SmoothLineSegment implements SmoothLineSegmentInterface {
    line:Line;
    directionIncoming:DirectionInterface;
    directionOutgoing:DirectionInterface;

    constructor({ line, directionIncoming, directionOutgoing }: SmoothLineSegmentInterface) {
        this.line = line;
        this.directionIncoming = directionIncoming;
        this.directionOutgoing = directionOutgoing;
    }
}

export default SmoothLineSegment;
