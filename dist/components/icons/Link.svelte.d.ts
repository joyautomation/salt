/** @typedef {typeof __propDef.props}  LinkProps */
/** @typedef {typeof __propDef.events}  LinkEvents */
/** @typedef {typeof __propDef.slots}  LinkSlots */
export default class Link extends SvelteComponent<{
    size?: string | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type LinkProps = typeof __propDef.props;
export type LinkEvents = typeof __propDef.events;
export type LinkSlots = typeof __propDef.slots;
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
