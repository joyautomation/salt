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
export type PlusProps = typeof __propDef.props;
export type PlusEvents = typeof __propDef.events;
export type PlusSlots = typeof __propDef.slots;
export default class Plus extends SvelteComponent<PlusProps, PlusEvents, PlusSlots> {
}
export {};
