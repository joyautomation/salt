/** @typedef {typeof __propDef.props}  PlayCircleProps */
/** @typedef {typeof __propDef.events}  PlayCircleEvents */
/** @typedef {typeof __propDef.slots}  PlayCircleSlots */
export default class PlayCircle extends SvelteComponent<{
    size?: string | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type PlayCircleProps = typeof __propDef.props;
export type PlayCircleEvents = typeof __propDef.events;
export type PlayCircleSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        size?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
