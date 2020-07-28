import Point from './Point';
import Path from './Path';
import SmoothLineFactory from '@/factories/SmoothLineFactory';
import Corner from './SmoothLines/Corner';
import Zigzag from './SmoothLines/Zigzag';

interface SVGSmoothPathInterface {
    path:Path,
    windowWidth:number,
    windowHeight:number,
}

export default class SVGSmoothPath implements SVGSmoothPathInterface {
    path: Path;
    windowWidth:number;
    windowHeight:number;
    SVGStringPath:string;

    constructor({ path, windowWidth, windowHeight } : SVGSmoothPathInterface) {
        this.path = path;
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        this.SVGStringPath = this.getSVGStringPath();
    }

    private getPixelPath():Path {
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

    private generateSmoothPath():Array<Corner|Zigzag> {
        return new SmoothLineFactory({
            path: this.getPixelPath(),
        }).smoothLine;
    }

    public getSVGStringPath():string {
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
