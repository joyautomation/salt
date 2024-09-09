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
export type ChevronRightProps = typeof __propDef.props;
export type ChevronRightEvents = typeof __propDef.events;
export type ChevronRightSlots = typeof __propDef.slots;
export default class ChevronRight extends SvelteComponent<ChevronRightProps, ChevronRightEvents, ChevronRightSlots> {
}
export {};
