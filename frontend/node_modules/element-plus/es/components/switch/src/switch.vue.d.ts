import type { SwitchProps } from './switch';
declare var __VLS_1: {}, __VLS_13: {}, __VLS_25: {}, __VLS_47: {}, __VLS_59: {}, __VLS_71: {};
type __VLS_Slots = {} & {
    inactive?: (props: typeof __VLS_1) => any;
} & {
    inactive?: (props: typeof __VLS_13) => any;
} & {
    active?: (props: typeof __VLS_25) => any;
} & {
    'active-action'?: (props: typeof __VLS_47) => any;
} & {
    'inactive-action'?: (props: typeof __VLS_59) => any;
} & {
    active?: (props: typeof __VLS_71) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<SwitchProps>, {
    modelValue: boolean;
    disabled: undefined;
    activeText: string;
    inactiveText: string;
    activeValue: boolean;
    inactiveValue: boolean;
    name: string;
    validateEvent: boolean;
    width: string;
}>, {
    /**
     *  @description manual focus to the switch component
     **/
    focus: () => void;
    /**
     * @description whether Switch is checked
     */
    checked: import("vue").ComputedRef<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (val: string | number | boolean) => void;
    change: (val: string | number | boolean) => void;
    input: (val: string | number | boolean) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<SwitchProps>, {
    modelValue: boolean;
    disabled: undefined;
    activeText: string;
    inactiveText: string;
    activeValue: boolean;
    inactiveValue: boolean;
    name: string;
    validateEvent: boolean;
    width: string;
}>>> & {
    "onUpdate:modelValue"?: ((val: string | number | boolean) => any) | undefined;
    onInput?: ((val: string | number | boolean) => any) | undefined;
    onChange?: ((val: string | number | boolean) => any) | undefined;
}, {
    disabled: boolean;
    width: string | number;
    name: string;
    modelValue: boolean | string | number;
    validateEvent: boolean;
    activeText: string;
    inactiveText: string;
    activeValue: boolean | string | number;
    inactiveValue: boolean | string | number;
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
