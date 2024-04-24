import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        theme: string;
        action?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ThemeButtonProps = typeof __propDef.props;
export type ThemeButtonEvents = typeof __propDef.events;
export type ThemeButtonSlots = typeof __propDef.slots;
export default class ThemeButton extends SvelteComponent<ThemeButtonProps, ThemeButtonEvents, ThemeButtonSlots> {
}
export {};
