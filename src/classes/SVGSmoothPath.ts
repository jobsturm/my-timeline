import Point from './Point';
import SmoothPoint from './SmoothPoint';
import Path from './Path';
import Line from './Line';

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

    private generateSmoothPath():Array<SmoothPoint> {
        // first point can't have curve
        const { points } = this.getPixelPath();
        return points.map((point:Point, index:number) => {
            const line = new Line({
                start: points[index - 1] || point,
                end: point,
            });
            let nextLine = null;
            if (points[index + 1]) {
                nextLine = new Line({
                    start: point,
                    end: points[index + 1],
                });
            }
            let previousLine = null;
            if (points[index - 2]) {
                previousLine = new Line({
                    start: points[index - 2],
                    end: points[index - 1],
                });
            }
            return new SmoothPoint({
                line,
                nextLine,
                previousLine,
            });
        });
    }

    public getSVGStringPath():string {
        const points = this.generateSmoothPath();
        const start = this.getPixelPath().points[0];
        let SVGStringPath = `M${start.x}, ${start.y}`;
        points.forEach((point, index) => {
            if (index === 0) return; // first point is the start of the path
            const { x, y } = point.endPoint;
            const { startControlPoint, endControlPoint } = point;
            SVGStringPath += `C ${startControlPoint.x},${startControlPoint.y} ${endControlPoint.x},${endControlPoint.y} ${x},${y}`;
        });
        return SVGStringPath;
    }
}
