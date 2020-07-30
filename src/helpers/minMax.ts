interface MinMaxParameters {
    number: number;
    min: number;
    max: number;
}

export default function ({
    number,
    min,
    max,
}: MinMaxParameters): number {
    return Math.min(Math.max(number, min), max);
}
