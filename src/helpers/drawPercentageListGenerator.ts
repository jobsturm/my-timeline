import animationStep from '@/helpers/animationStep';

interface timelineItem {
    key: string;
    start: number;
    end: number;
}
interface drawPercentageListInterface {
    parentPercentage: number;
    timeline: timelineItem[];
}

export default function ({
    parentPercentage,
    timeline,
}: drawPercentageListInterface): { [key: string]: number; } {
    return timeline.reduce((
        drawPercentageList: any,
        item: timelineItem,
    ) => {
        const { start, end } = item;
        const mergeItem: any = {};
        mergeItem[item.key] = animationStep({ parentPercentage, start, end });
        return { ...drawPercentageList, ...mergeItem };
    }, {});
}
