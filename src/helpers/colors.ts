// SHOULD DO: Make a Webpack Loader for this, doing this in runtime is not the best.
import rawColors from '!!raw-loader!@/styles/colors.sass';

const colors:Record<string, string> = Object.fromEntries(
    rawColors
        .split('\n')
        .filter((colorLine:string) => colorLine.length > 0)
        .map((colorLine:string) => colorLine.split(': ')),
);

export default colors;
