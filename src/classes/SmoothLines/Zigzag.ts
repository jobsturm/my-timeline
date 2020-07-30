import Point from '@/classes/Point';
import BezierPoint from '@/classes/SmoothLines/BezierPoint';
import BezierPath from '@/classes/SmoothLines/BezierPath';
import SmoothLineSegment from '@/classes/SmoothLines/SmoothLineSegment';

export default class Zigzag extends SmoothLineSegment {
    bezierPath: BezierPath;

    constructor({ line, directionIncoming, directionOutgoing }: SmoothLineSegment) {
        super({ line, directionIncoming, directionOutgoing });
        this.bezierPath = this.getBezierPath();
    }

    private getBezierPath(): BezierPath {
        const { start, end } = this.line;
        let startPoint; let
            endPoint;

        if (this.directionIncoming.vertical) {
            startPoint = new BezierPoint({
                point: new Point(start),
                controlPoint: new Point({
                    x: start.x,
                    y: start.y + ((end.y - start.y) / 2),
                }),
            });
        } else {
            startPoint = new BezierPoint({
                point: new Point(start),
                controlPoint: new Point({
                    x: start.x + ((end.x - start.x) / 2),
                    y: start.y,
                }),
            });
        }
        if (this.directionOutgoing.vertical) {
            endPoint = new BezierPoint({
                point: new Point(end),
                controlPoint: new Point({
                    x: end.x,
                    y: end.y - ((end.y - start.y) / 2),
                }),
            });
        } else {
            endPoint = new BezierPoint({
                point: new Point(end),
                controlPoint: new Point({
                    x: start.x + ((end.x - start.x) / 2),
                    y: end.y,
                }),
            });
        }
        return new BezierPath({ points: [startPoint, endPoint] });
    }
}
