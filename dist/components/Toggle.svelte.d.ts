import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        id: string;
        checked?: boolean | undefined;
        name: string;
        selector?: string | null | undefined;
        selectorName?: string | undefined;
        buttonType?: "button" | "submit" | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ToggleProps = typeof __propDef.props;
export type ToggleEvents = typeof __propDef.events;
export type ToggleSlots = typeof __propDef.slots;
export default class Toggle extends SvelteComponent<ToggleProps, ToggleEvents, ToggleSlots> {
}
export {};
