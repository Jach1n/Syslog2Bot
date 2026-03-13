import type { ObjectDirective } from 'vue';
export declare const REPEAT_INTERVAL = 100;
export declare const REPEAT_DELAY = 600;
declare const SCOPE = "_RepeatClick";
interface RepeatClickEl extends HTMLElement {
    [SCOPE]: null | {
        start?: (evt: MouseEvent) => void;
        clear?: () => void;
    };
}
export interface RepeatClickOptions {
    interval?: number;
    delay?: number;
    handler: (...args: unknown[]) => unknown;
}
export declare const vRepeatClick: ObjectDirective<RepeatClickEl, RepeatClickOptions | RepeatClickOptions['handler']>;
export {};
