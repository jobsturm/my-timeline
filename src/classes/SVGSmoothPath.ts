import Point from '@/classes/Point';
import Path from '@/classes/Path';
import SmoothLine from '@/classes/SmoothLines/SmoothLine';
import Corner from '@/classes/SmoothLines/Corner';
import Zigzag from '@/classes/SmoothLines/Zigzag';

interface SVGSmoothPathInterface {
    path: Path;
    windowWidth: number;
    windowHeight: number;
}

export default class SVGSmoothPath implements SVGSmoothPathInterface {
    path: Path;
    windowWidth: number;
    windowHeight: number;

    constructor({ path, windowWidth, windowHeight }: SVGSmoothPathInterface) {
        this.path = path;
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
    }

    private getPixelPath(): Path {
        const points = this.path.points.map(({ x, y }) => {
            const pixelX = (this.windowWidth / 100) * x;
            const pixelY = (this.windowHeight / 100) * y;
            return new Point({
                x: Math.round(pixelX),
                y: Math.round(pixelY),
            });
        });
        return new Path({ points });
    }

    private generateSmoothPath(): (Corner|Zigzag)[] {
        return new SmoothLine({
            path: this.getPixelPath(),
        }).smoothLine;
    }

    get SVGStringPath(): string {
        const points = this.generateSmoothPath();
        const start = this.getPixelPath().points[0];
        let SVGStringPath = `M${start.x}, ${start.y}`;
        points.forEach((point, index) => {
            if (index === 0) return; // first point is the start of the path
            const startBezierPoint = point.bezierPath.points[0];
            const startControlPoint = startBezierPoint.controlPoint;
            const endBezierPoint = point.bezierPath.points[1];
            const endControlPoint = endBezierPoint.controlPoint;
            const { x, y } = endBezierPoint.point;
            SVGStringPath += `C ${startControlPoint.x},${startControlPoint.y} ${endControlPoint.x},${endControlPoint.y} ${x},${y}`;
        });
        return SVGStringPath;
    }
}
