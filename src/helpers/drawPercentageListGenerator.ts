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

export default function drawPercentageListGenerator({
    parentPercentage,
    timeline,
}: drawPercentageListInterface): { [key: string]: number; } {
    return timeline.reduce((
        drawPercentageList: Record<string, number>,
        item: timelineItem,
    ) => {
        const { start, end } = item;
        const mergeItem: Record<string, number> = {};
        mergeItem[item.key] = animationStep({ parentPercentage, start, end });
        return { ...drawPercentageList, ...mergeItem };
    }, {});
}
