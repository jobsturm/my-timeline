/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
interface Window {
    webkitAudioContext: typeof AudioContext,
    visualViewport: Record<string, number>,
}
