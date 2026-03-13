import type { TooltipContentInstance } from './content';
import type { UseTooltipProps } from './tooltip';
import type { PopperInstance } from 'element-plus/es/components/popper';
declare var __VLS_12: {}, __VLS_20: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_12) => any;
} & {
    content?: (props: typeof __VLS_20) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<UseTooltipProps>, {
    showArrow: boolean;
    arrowOffset: 5;
    trigger: "hover";
    triggerKeys: () => string[];
    content: "";
    visible: null;
    teleported: true;
    effect: "dark";
    enterable: true;
    stopPopperMouseEvent: true;
    pure: false;
    focusOnShow: false;
    trapping: false;
    virtualTriggering: false;
    loop: false;
    style: undefined;
    popperStyle: undefined;
    boundariesPadding: 0;
    gpuAcceleration: true;
    offset: 12;
    placement: "bottom";
    popperOptions: () => {};
    strategy: "absolute";
    showAfter: 0;
    hideAfter: 200;
    autoClose: 0;
    role: string;
}>, {
    /**
     * @description el-popper component instance
     */
    popperRef: import("vue").Ref<PopperInstance | undefined>;
    /**
     * @description el-tooltip-content component instance
     */
    contentRef: import("vue").Ref<TooltipContentInstance | undefined>;
    /**
     * @description validate current focus event is trigger inside el-tooltip-content
     */
    isFocusInsideContent: (event?: FocusEvent) => boolean | undefined;
    /**
     * @description update el-popper component instance
     */
    updatePopper: () => void;
    /**
     * @description expose onOpen function to mange el-tooltip open state
     */
    onOpen: (event?: Event, delay?: number) => void;
    /**
     * @description expose onClose function to manage el-tooltip close state
     */
    onClose: (event?: Event, delay?: number) => void;
    /**
     * @description expose hide function
     */
    hide: (event?: Event) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    hide: (...args: any[]) => void;
    show: (...args: any[]) => void;
    open: (...args: any[]) => void;
    close: (...args: any[]) => void;
    "update:visible": (...args: any[]) => void;
    "before-show": (...args: any[]) => void;
    "before-hide": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<UseTooltipProps>, {
    showArrow: boolean;
    arrowOffset: 5;
    trigger: "hover";
    triggerKeys: () => string[];
    content: "";
    visible: null;
    teleported: true;
    effect: "dark";
    enterable: true;
    stopPopperMouseEvent: true;
    pure: false;
    focusOnShow: false;
    trapping: false;
    virtualTriggering: false;
    loop: false;
    style: undefined;
    popperStyle: undefined;
    boundariesPadding: 0;
    gpuAcceleration: true;
    offset: 12;
    placement: "bottom";
    popperOptions: () => {};
    strategy: "absolute";
    showAfter: 0;
    hideAfter: 200;
    autoClose: 0;
    role: string;
}>>> & {
    onShow?: ((...args: any[]) => any) | undefined;
    onHide?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
    onOpen?: ((...args: any[]) => any) | undefined;
    "onUpdate:visible"?: ((...args: any[]) => any) | undefined;
    "onBefore-show"?: ((...args: any[]) => any) | undefined;
    "onBefore-hide"?: ((...args: any[]) => any) | undefined;
}, {
    style: string | false | import("vue").CSSProperties | import("vue").StyleValue[] | null;
    content: string;
    offset: number;
    visible: boolean | null;
    placement: import("element-plus/es/components/popper").Placement;
    strategy: "fixed" | "absolute";
    effect: import("element-plus/es/components/popper").PopperEffect;
    showAfter: number;
    hideAfter: number;
    autoClose: number;
    role: typeof import("element-plus/es/components/popper").roleTypes[number];
    teleported: boolean;
    trigger: import("element-plus/es/utils").Arrayable<import("./trigger").TooltipTriggerType>;
    virtualTriggering: boolean;
    loop: boolean;
    arrowOffset: number;
    boundariesPadding: number;
    gpuAcceleration: boolean;
    popperOptions: Partial<import("element-plus/es/components/popper").Options>;
    enterable: boolean;
    pure: boolean;
    focusOnShow: boolean;
    trapping: boolean;
    popperStyle: string | false | import("vue").CSSProperties | import("vue").StyleValue[] | null;
    stopPopperMouseEvent: boolean;
    triggerKeys: string[];
    showArrow: boolean;
}, {}>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<Required<T>[K]>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaultsLocal<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_PrettifyLocal<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
type __VLS_PrettifyLocal<T> = {
    [K in keyof T as K]: T[K];
} & {};
