import type { ObjectDirective } from 'vue';
import type { NormalizedWheelEvent } from 'normalize-wheel-es';
export declare const SCOPE = "_Mousewheel";
export interface WheelElement extends HTMLElement {
    [SCOPE]: null | {
        wheelHandler?: (event: WheelEvent) => void;
    };
}
export type MousewheelCallback = (e: WheelEvent, normalized: NormalizedWheelEvent) => void;
declare const Mousewheel: ObjectDirective<WheelElement, MousewheelCallback>;
export default Mousewheel;
