import easingFunctions from './easingFunctions';

const animateXtoY = ({
    x, y, time, executable, easeName,
}) => {
    let easeFunction = easingFunctions[easeName];
    if (!easeFunction) easeFunction = easingFunctions.linear;
    let negative = false;
    const goal = y;
    let distance = goal - x;
    if (distance < 0) {
        distance -= distance * 2;
        negative = true;
    }
    const frames = Math.ceil(time / 16); // frames (ms / frame length in ms (16ms))
    const step = (distance) / frames;
    let ticks = 0;
    for (let i = 0; i < frames; i += 1) {
        /* eslint-disable no-loop-func */
        window.setTimeout(() => {
            ticks += 1;
            let setTo = x + easeFunction(step * ticks);
            if (negative) setTo = x - easeFunction(step * ticks);
            if (setTo > 1) setTo = 1;
            if (setTo < 0) setTo = 0;
            if (ticks === frames) setTo = goal;
            window.requestAnimationFrame(() => {
                executable({
                    setTo, ticks, goal, step,
                });
            });
        }, i * 16);
        /* eslint-enable no-loop-func */
    }
};

export default animateXtoY;
