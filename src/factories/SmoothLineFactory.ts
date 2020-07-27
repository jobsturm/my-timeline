import Point from '@/classes/Point';
import Corner from '@/classes/SmoothLines/Corner';
import Zigzag from '@/classes/SmoothLines/Zigzag';
import Path from '@/classes/Path';
import Line from '@/classes/Line';

interface SmoothLineFactoryInterface {
    line:Line;
    nextLine: Line | null;
    previousLine: Line | null;
}

export default abstract class SmoothLineFactory {
    public createSmoothPoint({
        line,
        nextLine,
        previousLine,
    }:SmoothLineFactoryInterface): Corner | Zigzag {

    }
}
