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
export type SunProps = typeof __propDef.props;
export type SunEvents = typeof __propDef.events;
export type SunSlots = typeof __propDef.slots;
export default class Sun extends SvelteComponent<SunProps, SunEvents, SunSlots> {
}
export {};
