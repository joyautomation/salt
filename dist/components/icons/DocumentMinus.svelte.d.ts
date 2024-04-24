/** @typedef {typeof __propDef.props}  DocumentMinusProps */
/** @typedef {typeof __propDef.events}  DocumentMinusEvents */
/** @typedef {typeof __propDef.slots}  DocumentMinusSlots */
export default class DocumentMinus extends SvelteComponent<{
    size?: string | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type DocumentMinusProps = typeof __propDef.props;
export type DocumentMinusEvents = typeof __propDef.events;
export type DocumentMinusSlots = typeof __propDef.slots;
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
