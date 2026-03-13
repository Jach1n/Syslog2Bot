import type { ToRefs } from 'vue';
export interface UseDelayedToggleProps {
    /**
     * @description delay of appearance, in millisecond, not valid in controlled mode
     */
    showAfter?: number;
    /**
     * @description delay of disappear, in millisecond, not valid in controlled mode
     */
    hideAfter?: number;
    /**
     * @description disappear automatically, in millisecond, not valid in controlled mode
     */
    autoClose?: number;
}
/**
 * @deprecated Removed after 3.0.0, Use `UseDelayedToggleProps` instead.
 */
export declare const useDelayedToggleProps: {
    readonly showAfter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly hideAfter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 200, boolean>;
    readonly autoClose: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
};
export type DelayedToggle = {
    open: (event?: Event) => void;
    close: (event?: Event) => void;
} & ToRefs<Required<UseDelayedToggleProps>>;
export declare const useDelayedTogglePropsDefaults: {
    readonly showAfter: 0;
    readonly hideAfter: 200;
    readonly autoClose: 0;
};
export declare const useDelayedToggle: ({ showAfter, hideAfter, autoClose, open, close, }: DelayedToggle) => {
    onOpen: (event?: Event, delay?: number) => void;
    onClose: (event?: Event, delay?: number) => void;
};
