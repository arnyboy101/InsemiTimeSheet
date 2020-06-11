

export const START = "START";
export const STOP = "STOP";
export const RESET = "RESET";
export const TICK = "TICK";


export function start() {
    return {type:START};
}
export function stop() {
    return {type:STOP};
}
export function reset() {
    return {type:RESET};
}
export function tick() {
    return {type:TICK};
}
