import type { FormItemProps } from './form-item';
declare var __VLS_11: {
    label: string;
}, __VLS_13: {}, __VLS_20: {
    error: string;
};
type __VLS_Slots = {} & {
    label?: (props: typeof __VLS_11) => any;
} & {
    default?: (props: typeof __VLS_13) => any;
} & {
    error?: (props: typeof __VLS_20) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<FormItemProps>, {
    labelPosition: string;
    showMessage: boolean;
    required: undefined;
    inlineMessage: undefined;
}>, {
    /**
     * @description Form item size.
     */
    size: import("vue").ComputedRef<"" | "small" | "default" | "large">;
    /**
     * @description Validation message.
     */
    validateMessage: import("vue").Ref<string>;
    /**
     * @description Validation state.
     */
    validateState: import("vue").Ref<"" | "error" | "success" | "validating">;
    /**
     * @description Validate form item.
     */
    validate: (trigger: string, callback?: import("./types").FormValidateCallback) => import("./types").FormValidationResult;
    /**
     * @description Remove validation status of the field.
     */
    clearValidate: () => void;
    /**
     * @description Reset current field and remove validation result.
     */
    resetField: () => void;
    /**
     * @description Set initial value for this field. When `resetField` is called, the field will reset to this value.
     */
    setInitialValue: (value: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<FormItemProps>, {
    labelPosition: string;
    showMessage: boolean;
    required: undefined;
    inlineMessage: undefined;
}>>>, {
    required: boolean;
    labelPosition: "left" | "right" | "top" | "";
    inlineMessage: boolean;
    showMessage: boolean;
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
