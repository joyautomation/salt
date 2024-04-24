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
export type ChevronUpDownProps = typeof __propDef.props;
export type ChevronUpDownEvents = typeof __propDef.events;
export type ChevronUpDownSlots = typeof __propDef.slots;
export default class ChevronUpDown extends SvelteComponent<ChevronUpDownProps, ChevronUpDownEvents, ChevronUpDownSlots> {
}
export {};
