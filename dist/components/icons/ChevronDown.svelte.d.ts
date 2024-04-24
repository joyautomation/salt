/** @typedef {typeof __propDef.props}  ChevronDownProps */
/** @typedef {typeof __propDef.events}  ChevronDownEvents */
/** @typedef {typeof __propDef.slots}  ChevronDownSlots */
export default class ChevronDown extends SvelteComponent<{
    size?: string | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ChevronDownProps = typeof __propDef.props;
export type ChevronDownEvents = typeof __propDef.events;
export type ChevronDownSlots = typeof __propDef.slots;
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
