import Line from '@/classes/Line';
import Point from '@/classes/Point';

interface SmoothPointInterface {
    line: Line;
    nextLine: Line | null;
    previousLine: Line | null;
}

export default class SmoothPoint {
    line: Line;
    nextLine: Line | null;
    previousLine: Line | null;
    nextAngle: number | 0;
    previousAngle: number | 0;
    endPoint: Point;
    drawDebug: boolean;
    startControlPoint: Point;
    endControlPoint: Point;

    constructor({ line, nextLine, previousLine }: SmoothPointInterface) {
        this.line = line;
        this.nextLine = nextLine;
        this.previousLine = previousLine;
        this.nextAngle = nextLine ? nextLine.angle : 0;
        this.previousAngle = previousLine ? previousLine.angle : 0;
        this.startControlPoint = this.getStartControlPoint();
        this.endControlPoint = this.getEndControlPoint();
        this.endPoint = line.end;
    }

    private getStartControlPoint(): Point {
        const { start, end } = this.line;
        const { nextAngle, previousAngle } = this;
        if (nextAngle > 20 && nextAngle < 160) {
            // If the next line angle is above 20 zigzag has to be made
            return new Point({
                x: start.x,
                y: start.y + ((end.y - start.y) / 2),
            });
        } if (previousAngle < 20 || nextAngle > 160) {
            return new Point({
                x: end.x,
                y: start.y,
            });
        }
        // Otherwise a corner has to be made
        if (this.previousLine && this.previousLine.end.x > this.line.end.x) {
            return new Point({
                x: start.x + (end.x - start.x),
                y: start.y,
            });
        }
        return new Point({
            x: start.x,
            y: start.y + (end.y - start.y),
        });
    }

    private getEndControlPoint(): Point {
        const { start, end } = this.line;
        const { nextAngle, previousAngle } = this;

        if (nextAngle > 20 && nextAngle < 160) {
            return new Point({
                x: end.x,
                y: start.y + ((end.y - start.y) / 2),
            });
        } if (previousAngle < 20 || nextAngle > 160) {
            return new Point({
                x: end.x,
                y: start.y,
            });
        }
        // Otherwise a corner has to be made
        if (this.previousLine && this.previousLine.end.x > this.line.end.x) {
            return new Point({
                x: start.x + (end.x - start.x),
                y: start.y,
            });
        }
        return new Point({
            x: start.x,
            y: start.y + (end.y - start.y),
        });
    }
}
