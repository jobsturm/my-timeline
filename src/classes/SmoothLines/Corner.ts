import Point from '@/classes/Point';
import SmoothLinePoint from '@/classes/SmoothLines/SmoothLinePoint';
import Line from '@/classes/Line';

interface DirectionInterface {
    vertical:boolean,
}
interface CornerInterface {
    line:Line;
    directionIncoming:DirectionInterface
    directionOutgoing:DirectionInterface
}

export default class Corner implements CornerInterface {
    line:Line;
    directionIncoming:DirectionInterface;
    directionOutgoing:DirectionInterface;

    constructor({ line, directionIncoming, directionOutgoing }: CornerInterface) {
        this.line = line;
        this.directionIncoming = directionIncoming;
        this.directionOutgoing = directionOutgoing;
    }

    private generate() {
        let startPoint;
        // Corners have 8 different variants.
        if (this.directionIncoming.vertical) {
            // STARTPOINT
                // POINT
                    // x = line.start.x
                    // y = line.start.y
                // CONTROL POINT
                    // x = line.start.x
                    // y = line.end.y
        } else {
            // STARTPOINT
                // POINT
                    // x = line.start.x
                    // y = line.start.y
                // CONTROL POINT
                    // x = line.end.x
                    // y = line.start.y
        }
        if (this.directionOutgoing.vertical) {
            // ENDPOINT
                // POINT
                    // x = line.end.x
                    // y = line.end.y
                // CONTROL POINT
                    // x line.end.x
                    // y line.start.y
        } else {
            // ENDPOINT
                // POINT
                    // x = line.end.x
                    // y = line.end.y
                // CONTROL POINT
                    // x = line.start.x
                    // y = line.end.y
        }
    }
}
