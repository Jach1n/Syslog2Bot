import type { Option } from './types';
import type { SegmentedProps } from './segmented';
declare var __VLS_1: {
    item: any;
};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<SegmentedProps>, {
    direction: string;
    options: () => never[];
    props: () => Required<import("./segmented").Props>;
    validateEvent: boolean;
    modelValue: undefined;
    disabled: undefined;
}>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (val: any) => void;
    change: (val: any) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<SegmentedProps>, {
    direction: string;
    options: () => never[];
    props: () => Required<import("./segmented").Props>;
    validateEvent: boolean;
    modelValue: undefined;
    disabled: undefined;
}>>> & {
    "onUpdate:modelValue"?: ((val: any) => any) | undefined;
    onChange?: ((val: any) => any) | undefined;
}, {
    disabled: boolean;
    direction: "vertical" | "horizontal";
    props: import("./segmented").Props;
    modelValue: string | number | boolean;
    options: Option[];
    validateEvent: boolean;
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
