import Color from 'element-plus/es/components/color-picker-panel/src/utils/color';
import type { ColorPickerProps } from './color-picker';
declare function show(): void;
declare function hide(): void;
declare function focus(): void;
declare function blur(): void;
declare const __VLS_export: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<ColorPickerProps>, {
    readonly persistent: true;
    readonly modelValue: undefined;
    readonly disabled: undefined;
    readonly clearable: true;
    readonly popperStyle: undefined;
    readonly tabindex: 0;
    readonly teleported: true;
    readonly validateEvent: true;
    readonly valueOnClear: undefined;
}>, {
    /**
     * @description current color object
     */
    color: Color;
    /**
     * @description manually show ColorPicker
     */
    show: typeof show;
    /**
     * @description manually hide ColorPicker
     */
    hide: typeof hide;
    /**
     * @description focus the input element
     */
    focus: typeof focus;
    /**
     * @description blur the input element
     */
    blur: typeof blur;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    focus: (evt: FocusEvent) => void;
    "update:modelValue": (val: string | null) => void;
    change: (val: string | null) => void;
    clear: () => void;
    blur: (evt: FocusEvent) => void;
    activeChange: (val: string | null) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<ColorPickerProps>, {
    readonly persistent: true;
    readonly modelValue: undefined;
    readonly disabled: undefined;
    readonly clearable: true;
    readonly popperStyle: undefined;
    readonly tabindex: 0;
    readonly teleported: true;
    readonly validateEvent: true;
    readonly valueOnClear: undefined;
}>>> & {
    "onUpdate:modelValue"?: ((val: string | null) => any) | undefined;
    onFocus?: ((evt: FocusEvent) => any) | undefined;
    onChange?: ((val: string | null) => any) | undefined;
    onBlur?: ((evt: FocusEvent) => any) | undefined;
    onClear?: (() => any) | undefined;
    onActiveChange?: ((val: string | null) => any) | undefined;
}, {
    disabled: boolean;
    tabindex: string | number;
    modelValue: string | null;
    valueOnClear: string | number | boolean | Function | null;
    teleported: boolean;
    validateEvent: boolean;
    clearable: boolean;
    popperStyle: string | false | import("vue").CSSProperties | import("vue").StyleValue[] | null;
    persistent: boolean;
}, {}>;
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
type __VLS_PrettifyLocal<T> = {
    [K in keyof T as K]: T[K];
} & {};
