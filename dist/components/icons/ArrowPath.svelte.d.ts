/** @typedef {typeof __propDef.props}  ArrowPathProps */
/** @typedef {typeof __propDef.events}  ArrowPathEvents */
/** @typedef {typeof __propDef.slots}  ArrowPathSlots */
export default class ArrowPath extends SvelteComponent<{
    size?: string | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ArrowPathProps = typeof __propDef.props;
export type ArrowPathEvents = typeof __propDef.events;
export type ArrowPathSlots = typeof __propDef.slots;
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
