import Point from '@/classes/Point';
import Path from '@/classes/Path';
import Corner from '@/classes/SmoothLines/Corner';
import Zigzag from '@/classes/SmoothLines/Zigzag';
import Line from '@/classes/Line';
import SmoothLineSegment from '@/classes/SmoothLines/SmoothLineSegment';

interface SmoothLineInterface {
    path: Path;
}

export default class SmoothLine implements SmoothLineInterface {
    path: Path;
    lineSegments: SmoothLineSegment[]
    smoothLine: (Corner|Zigzag)[]

    constructor({ path }: SmoothLineInterface) {
        this.path = path;
        this.lineSegments = this.getLineSegments();
        this.smoothLine = this.getSmoothLine();
    }

    private getLineSegments(): SmoothLineSegment[] {
        return this.path.points.map((point: Point, index: number) => {
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

            if (
                previousLine
                && (Math.abs(previousLine.angle) < toleranceUp
                && Math.abs(previousLine.angle) > toleranceDown)
            ) {
                directionIncoming.vertical = true;
            }
            if (
                nextLine
                && (Math.abs(nextLine.angle) < toleranceUp
                && Math.abs(nextLine.angle) > toleranceDown)
            ) {
                directionOutgoing.vertical = true;
            }
            return new SmoothLineSegment({
                line,
                directionIncoming,
                directionOutgoing,
            });
        });
    }

    private getSmoothLine(): (Corner|Zigzag)[] {
        const smoothLine = [] as (Corner|Zigzag)[];
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
                const { directionIncoming } = lineSegment;
                const { directionOutgoing } = lineSegment;
                if (directionIncoming.vertical === directionOutgoing.vertical) {
                    smoothLine.push(new Zigzag({
                        line,
                        directionIncoming,
                        directionOutgoing,
                    }));
                } else {
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
}
