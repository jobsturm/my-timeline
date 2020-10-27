// This helper takes a animation percentage, a startpoint and a duration.
// It returns the percentage of an animation step.
import minMax from '@/helpers/minMax';

interface AnimationStepParameters {
    parentPercentage: number;
    start: number;
    end: number;
}

export default function animationSteps({
    parentPercentage,
    start,
    end,
}: AnimationStepParameters): number {
    const duration = end - start;
    return minMax({
        number: (parentPercentage - start) / duration,
        min: 0,
        max: 1,
    });
}
