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
export type XmarkProps = typeof __propDef.props;
export type XmarkEvents = typeof __propDef.events;
export type XmarkSlots = typeof __propDef.slots;
export default class Xmark extends SvelteComponent<XmarkProps, XmarkEvents, XmarkSlots> {
}
export {};
