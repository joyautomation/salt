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
export type WrenchScrewdriverProps = typeof __propDef.props;
export type WrenchScrewdriverEvents = typeof __propDef.events;
export type WrenchScrewdriverSlots = typeof __propDef.slots;
export default class WrenchScrewdriver extends SvelteComponent<WrenchScrewdriverProps, WrenchScrewdriverEvents, WrenchScrewdriverSlots> {
}
export {};
