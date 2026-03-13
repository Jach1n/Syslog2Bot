import type { CheckboxGroupProps, CheckboxGroupValueType } from './checkbox-group';
declare var __VLS_7: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_7) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<CheckboxGroupProps>, {
    modelValue: () => never[];
    disabled: undefined;
    tag: string;
    validateEvent: boolean;
    props: () => Required<{
        value?: string;
        label?: string;
        disabled?: string;
    }>;
    type: string;
}>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (val: CheckboxGroupValueType) => void;
    change: (val: import("element-plus").CheckboxValueType[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<CheckboxGroupProps>, {
    modelValue: () => never[];
    disabled: undefined;
    tag: string;
    validateEvent: boolean;
    props: () => Required<{
        value?: string;
        label?: string;
        disabled?: string;
    }>;
    type: string;
}>>> & {
    "onUpdate:modelValue"?: ((val: CheckboxGroupValueType) => any) | undefined;
    onChange?: ((val: import("element-plus").CheckboxValueType[]) => any) | undefined;
}, {
    disabled: boolean;
    type: "checkbox" | "button";
    props: {
        value?: string;
        label?: string;
        disabled?: string;
    };
    tag: string;
    modelValue: CheckboxGroupValueType;
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
