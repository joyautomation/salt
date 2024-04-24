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
export type TrashProps = typeof __propDef.props;
export type TrashEvents = typeof __propDef.events;
export type TrashSlots = typeof __propDef.slots;
export default class Trash extends SvelteComponent<TrashProps, TrashEvents, TrashSlots> {
}
export {};
