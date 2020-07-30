import Point from '@/classes/Point';
import BezierPoint from '@/classes/SmoothLines/BezierPoint';
import BezierPath from '@/classes/SmoothLines/BezierPath';
import SmoothLineSegment from '@/classes/SmoothLines/SmoothLineSegment';

export default class Corner extends SmoothLineSegment {
    bezierPath: BezierPath;

    constructor({ line, directionIncoming, directionOutgoing }: SmoothLineSegment) {
        super({ line, directionIncoming, directionOutgoing });
        this.bezierPath = this.getBezierPath();
    }

    private getBezierPath(): BezierPath {
        const { start, end } = this.line;
        let startPoint;
        let endPoint;

        // Corners have 8 different variants, however in corners
        // it's a given that 2 of those paths always mirror each other.
        // This means we only have 4 if statements here.
        if (this.directionIncoming.vertical) {
            startPoint = new BezierPoint({
                point: new Point(start),
                controlPoint: new Point({ x: start.x, y: end.y }),
            });
        } else {
            startPoint = new BezierPoint({
                point: new Point(start),
                controlPoint: new Point({ x: end.x, y: start.y }),
            });
        }
        if (this.directionOutgoing.vertical) {
            endPoint = new BezierPoint({
                point: new Point(end),
                controlPoint: new Point({ x: end.x, y: start.y }),
            });
        } else {
            endPoint = new BezierPoint({
                point: new Point(end),
                controlPoint: new Point({ x: start.x, y: end.y }),
            });
        }
        return new BezierPath({ points: [startPoint, endPoint] });
    }
}
