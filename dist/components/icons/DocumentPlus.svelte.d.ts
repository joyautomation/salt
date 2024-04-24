/** @typedef {typeof __propDef.props}  DocumentPlusProps */
/** @typedef {typeof __propDef.events}  DocumentPlusEvents */
/** @typedef {typeof __propDef.slots}  DocumentPlusSlots */
export default class DocumentPlus extends SvelteComponent<{
    size?: string | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type DocumentPlusProps = typeof __propDef.props;
export type DocumentPlusEvents = typeof __propDef.events;
export type DocumentPlusSlots = typeof __propDef.slots;
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
