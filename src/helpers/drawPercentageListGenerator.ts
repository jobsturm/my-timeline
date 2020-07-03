import animationStep from '@/helpers/animationStep';

interface timelineItem {
    key:string,
    start:number,
    end:number,
}
interface drawPercentageListParameters {
    parentPercentage:number;
    timeline:Array<timelineItem>,
}

export default function ({
    parentPercentage,
    timeline,
}:drawPercentageListParameters):object {
    return timeline.reduce((
        drawPercentageList:any,
        item:timelineItem,
    ) => {
        const { start, end } = item;
        const mergeItem:any = {};
        mergeItem[item.key] = animationStep({ parentPercentage, start, end });
        return { ...drawPercentageList, ...mergeItem };
    }, {});
}
