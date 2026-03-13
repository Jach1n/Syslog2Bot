import type { ColorPickerPanelProps } from './color-picker-panel';
import type { InputInstance } from 'element-plus/es/components/input';
declare function update(): void;
declare var __VLS_35: {};
type __VLS_Slots = {} & {
    footer?: (props: typeof __VLS_35) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<ColorPickerPanelProps>, {
    modelValue: undefined;
    border: boolean;
    validateEvent: boolean;
}>, {
    /**
     * @description current color object
     */
    color: import("./utils/color.js").default;
    /**
     * @description custom input ref
     */
    inputRef: import("vue").Ref<InputInstance | undefined>;
    /**
     * @description update sub components
     */
    update: typeof update;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (val: string | null) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<ColorPickerPanelProps>, {
    modelValue: undefined;
    border: boolean;
    validateEvent: boolean;
}>>> & {
    "onUpdate:modelValue"?: ((val: string | null) => any) | undefined;
}, {
    border: boolean;
    modelValue: string | null;
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
