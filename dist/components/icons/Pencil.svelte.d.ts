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
export type PencilProps = typeof __propDef.props;
export type PencilEvents = typeof __propDef.events;
export type PencilSlots = typeof __propDef.slots;
export default class Pencil extends SvelteComponent<PencilProps, PencilEvents, PencilSlots> {
}
export {};
