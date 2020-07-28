import Point from '@/classes/Point';
import Corner from '@/classes/SmoothLines/Corner';
import Zigzag from '@/classes/SmoothLines/Zigzag';
import Path from '@/classes/Path';
import Line from '@/classes/Line';
import SmoothLineSegment from '@/classes/SmoothLines/SmoothLineSegment';

// interface SmoothLineFactoryInterface {
//     line:Line;
//     nextLine: Line | null;
//     previousLine: Line | null;
// }
interface SmoothPathFactoryInterface {
    path:Path;
}

export default class SmoothLineFactory implements SmoothPathFactoryInterface {
    path:Path;
    lineSegments:Array<SmoothLineSegment>
    smoothLine:Array<Corner|Zigzag>

    constructor({ path }: SmoothPathFactoryInterface) {
        this.path = path;
        this.lineSegments = this.getLineSegments();
        this.smoothLine = this.getSmoothLine();
        console.log(this.smoothLine);
    }

    private getLineSegments():Array<SmoothLineSegment> {
        return this.path.points.map((point:Point, index:number) => {
            const line = new Line({
                start: this.path.points[index - 1] || point,
                end: point,
            });
            let nextLine = null;
            if (this.path.points[index + 1]) {
                nextLine = new Line({
                    start: point,
                    end: this.path.points[index + 1],
                });
            }
            let previousLine = null;
            if (this.path.points[index - 2]) {
                previousLine = new Line({
                    start: this.path.points[index - 2],
                    end: this.path.points[index - 1],
                });
            }
            const directionIncoming = { vertical: false };
            const directionOutgoing = { vertical: false };
            const verticalTolerance = 30;
            const toleranceUp = 90 + verticalTolerance;
            const toleranceDown = 90 - verticalTolerance;


            if (previousLine && (previousLine.angle < toleranceUp && previousLine.angle > toleranceDown)) {
                directionIncoming.vertical = true;
            }
            if (nextLine && (nextLine.angle < toleranceUp && nextLine.angle > toleranceDown)) {
                directionOutgoing.vertical = true;
            }
            return new SmoothLineSegment({
                line,
                directionIncoming,
                directionOutgoing,
            });
        });
    }

    private getSmoothLine():Array<Corner|Zigzag> {
        const smoothLine = [] as Array<Corner|Zigzag>;
        const { lineSegments } = this;
        lineSegments.forEach((lineSegment, index) => {
            const { line } = lineSegment;
            if (index === lineSegments.length - 1) {
                smoothLine.push(new Zigzag({
                    line,
                    directionIncoming: { vertical: false },
                    directionOutgoing: { vertical: false },
                }));
            } else {
                console.log(lineSegment);
                const directionIncoming = lineSegment.directionIncoming;
                const directionOutgoing = lineSegments[index + 1].directionIncoming;
                if (directionIncoming.vertical === directionOutgoing.vertical) {
                    smoothLine.push(new Zigzag({
                        line,
                        directionIncoming,
                        directionOutgoing,
                    }));
                }  else {
                    smoothLine.push(new Corner({
                        line,
                        directionIncoming,
                        directionOutgoing,
                    }));
                }
            }
        });
        return smoothLine;
    }
};
