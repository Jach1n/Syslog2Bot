import type { CheckboxProps } from './checkbox';
declare var __VLS_10: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_10) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<CheckboxProps>, {
    readonly modelValue: undefined;
    readonly label: undefined;
    readonly value: undefined;
    readonly disabled: undefined;
    readonly name: undefined;
    readonly trueValue: undefined;
    readonly falseValue: undefined;
    readonly trueLabel: undefined;
    readonly falseLabel: undefined;
    readonly id: undefined;
    readonly validateEvent: true;
}>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (val: import("./checkbox").CheckboxValueType) => void;
    change: (val: import("./checkbox").CheckboxValueType) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<CheckboxProps>, {
    readonly modelValue: undefined;
    readonly label: undefined;
    readonly value: undefined;
    readonly disabled: undefined;
    readonly name: undefined;
    readonly trueValue: undefined;
    readonly falseValue: undefined;
    readonly trueLabel: undefined;
    readonly falseLabel: undefined;
    readonly id: undefined;
    readonly validateEvent: true;
}>>> & {
    "onUpdate:modelValue"?: ((val: import("./checkbox").CheckboxValueType) => any) | undefined;
    onChange?: ((val: import("./checkbox").CheckboxValueType) => any) | undefined;
}, {
    label: string | boolean | number | object;
    disabled: boolean;
    value: string | boolean | number | object;
    id: string;
    name: string;
    modelValue: number | string | boolean;
    validateEvent: boolean;
    trueValue: string | number;
    falseValue: string | number;
    trueLabel: string | number;
    falseLabel: string | number;
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
