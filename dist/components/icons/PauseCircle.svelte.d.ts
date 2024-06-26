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
export type PauseCircleProps = typeof __propDef.props;
export type PauseCircleEvents = typeof __propDef.events;
export type PauseCircleSlots = typeof __propDef.slots;
export default class PauseCircle extends SvelteComponent<PauseCircleProps, PauseCircleEvents, PauseCircleSlots> {
}
export {};
