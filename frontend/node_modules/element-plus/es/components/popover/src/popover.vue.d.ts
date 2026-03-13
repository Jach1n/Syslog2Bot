import type { PopoverProps } from './popover';
declare var __VLS_15: {}, __VLS_18: {};
type __VLS_Slots = {} & {
    reference?: (props: typeof __VLS_15) => any;
} & {
    default?: (props: typeof __VLS_18) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<PopoverProps>, {
    readonly trigger: "hover";
    readonly triggerKeys: () => string[];
    readonly placement: "bottom";
    readonly visible: null;
    readonly popperOptions: () => {};
    readonly tabindex: 0;
    readonly content: "";
    readonly popperStyle: undefined;
    readonly enterable: true;
    readonly effect: "light";
    readonly teleported: true;
    readonly width: 150;
    readonly offset: undefined;
    readonly showAfter: 0;
    readonly hideAfter: 200;
    readonly autoClose: 0;
    readonly showArrow: true;
    readonly persistent: true;
}>, {
    /** @description popper ref */
    popperRef: import("vue").ComputedRef<import("element-plus").PopperInstance | undefined>;
    /** @description hide popover */
    hide: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "after-enter": () => void;
    "after-leave": () => void;
    "before-enter": () => void;
    "before-leave": () => void;
    "update:visible": (value: boolean) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<PopoverProps>, {
    readonly trigger: "hover";
    readonly triggerKeys: () => string[];
    readonly placement: "bottom";
    readonly visible: null;
    readonly popperOptions: () => {};
    readonly tabindex: 0;
    readonly content: "";
    readonly popperStyle: undefined;
    readonly enterable: true;
    readonly effect: "light";
    readonly teleported: true;
    readonly width: 150;
    readonly offset: undefined;
    readonly showAfter: 0;
    readonly hideAfter: 200;
    readonly autoClose: 0;
    readonly showArrow: true;
    readonly persistent: true;
}>>> & {
    "onUpdate:visible"?: ((value: boolean) => any) | undefined;
    "onAfter-enter"?: (() => any) | undefined;
    "onAfter-leave"?: (() => any) | undefined;
    "onBefore-enter"?: (() => any) | undefined;
    "onBefore-leave"?: (() => any) | undefined;
}, {
    tabindex: string | number;
    width: string | number;
    content: string;
    offset: number;
    visible: boolean | null;
    placement: import("element-plus").Placement;
    effect: import("element-plus").PopperEffect;
    showAfter: number;
    hideAfter: number;
    autoClose: number;
    teleported: boolean;
    trigger: import("element-plus/es/utils").Arrayable<import("element-plus/es/components/tooltip").TooltipTriggerType>;
    popperOptions: Partial<import("element-plus").Options>;
    enterable: boolean;
    popperStyle: string | false | import("vue").CSSProperties | import("vue").StyleValue[] | null;
    triggerKeys: string[];
    persistent: boolean;
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
