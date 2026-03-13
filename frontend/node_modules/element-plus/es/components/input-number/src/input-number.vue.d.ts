import type { InputNumberProps } from './input-number';
declare var __VLS_1: {}, __VLS_18: {}, __VLS_50: {}, __VLS_53: {};
type __VLS_Slots = {} & {
    'decrease-icon'?: (props: typeof __VLS_1) => any;
} & {
    'increase-icon'?: (props: typeof __VLS_18) => any;
} & {
    prefix?: (props: typeof __VLS_50) => any;
} & {
    suffix?: (props: typeof __VLS_53) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<InputNumberProps>, {
    id: undefined;
    disabled: undefined;
    step: number;
    max: number;
    min: number;
    stepStrictly: boolean;
    readonly: boolean;
    controls: boolean;
    controlsPosition: string;
    valueOnClear: null;
    validateEvent: boolean;
    inputmode: undefined;
    align: string;
}>, {
    /** @description get focus the input component */
    focus: () => void;
    /** @description remove focus the input component */
    blur: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    focus: (e: FocusEvent) => void;
    "update:modelValue": (val: number | undefined) => void;
    change: (cur: number | undefined, prev: number | undefined) => void;
    input: (val: number | null | undefined) => void;
    blur: (e: FocusEvent) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<InputNumberProps>, {
    id: undefined;
    disabled: undefined;
    step: number;
    max: number;
    min: number;
    stepStrictly: boolean;
    readonly: boolean;
    controls: boolean;
    controlsPosition: string;
    valueOnClear: null;
    validateEvent: boolean;
    inputmode: undefined;
    align: string;
}>>> & {
    "onUpdate:modelValue"?: ((val: number | undefined) => any) | undefined;
    onInput?: ((val: number | null | undefined) => any) | undefined;
    onFocus?: ((e: FocusEvent) => any) | undefined;
    onChange?: ((cur: number | undefined, prev: number | undefined) => any) | undefined;
    onBlur?: ((e: FocusEvent) => any) | undefined;
}, {
    disabled: boolean;
    id: string;
    valueOnClear: "min" | "max" | number | null;
    min: number;
    max: number;
    inputmode: "search" | "text" | "none" | "url" | "email" | "tel" | "numeric" | "decimal";
    validateEvent: boolean;
    readonly: boolean;
    align: "left" | "right" | "center";
    step: number;
    controls: boolean;
    controlsPosition: "" | "right";
    stepStrictly: boolean;
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
