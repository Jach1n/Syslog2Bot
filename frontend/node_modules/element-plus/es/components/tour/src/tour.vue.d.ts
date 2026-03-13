import type { TourProps } from './tour';
declare var __VLS_25: {}, __VLS_27: {
    current: number;
    total: number;
};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_25) => any;
} & {
    indicators?: (props: typeof __VLS_27) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<TourProps>, {
    current: number;
    showArrow: boolean;
    showClose: boolean;
    placement: string;
    mask: boolean;
    gap: () => {
        offset: number;
        radius: number;
    };
    scrollIntoViewOptions: () => {
        block: string;
    };
    appendTo: string;
    closeOnPressEscape: boolean;
    targetAreaClickable: boolean;
}>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => void;
    change: (current: number) => void;
    close: (current: number) => void;
    finish: () => void;
    "update:current": (current: number) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<TourProps>, {
    current: number;
    showArrow: boolean;
    showClose: boolean;
    placement: string;
    mask: boolean;
    gap: () => {
        offset: number;
        radius: number;
    };
    scrollIntoViewOptions: () => {
        block: string;
    };
    appendTo: string;
    closeOnPressEscape: boolean;
    targetAreaClickable: boolean;
}>>> & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onChange?: ((current: number) => any) | undefined;
    onClose?: ((current: number) => any) | undefined;
    onFinish?: (() => any) | undefined;
    "onUpdate:current"?: ((current: number) => any) | undefined;
}, {
    mask: import("element-plus").TourMask;
    gap: import("element-plus").TourGap;
    placement: import("@floating-ui/utils").Placement;
    appendTo: string | HTMLElement;
    scrollIntoViewOptions: boolean | ScrollIntoViewOptions;
    showArrow: boolean;
    showClose: boolean;
    closeOnPressEscape: boolean;
    current: number;
    targetAreaClickable: boolean;
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
