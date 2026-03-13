import type { ComponentSize } from 'element-plus/es/constants';
import type { ExtractPublicPropTypes } from 'vue';
import type RadioGroup from './radio-group.vue';
export type radioOptionProp = {
    value?: string;
    label?: string;
    disabled?: string;
};
export declare const radioDefaultProps: Required<radioOptionProp>;
export type radioOption = Record<string, any>;
export interface RadioGroupProps {
    /**
     * @description native `id` attribute
     */
    id?: string;
    /**
     * @description the size of radio buttons or bordered radios
     */
    size?: ComponentSize;
    /**
     * @description whether the nesting radios are disabled
     */
    disabled?: boolean;
    /**
     * @description binding value
     */
    modelValue?: string | number | boolean;
    /**
     * @description border and background color when button is active
     */
    fill?: string;
    /**
     * @description font color when button is active
     */
    textColor?: string;
    /**
     * @description native `name` attribute
     */
    name?: string;
    /**
     * @description whether to trigger form validation
     */
    validateEvent?: boolean;
    /**
     * @description radio options
     */
    options?: radioOption[];
    /**
     * @description custom prop names for options
     */
    props?: radioOptionProp;
    /**
     * @description radio type
     */
    type?: 'radio' | 'button';
    /**
     * @description native `aria-label` attribute
     */
    ariaLabel?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `RadioGroupProps` instead.
 */
export declare const radioGroupProps: {
    readonly ariaLabel: StringConstructor;
    readonly id: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
    readonly size: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly disabled: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
    readonly modelValue: import("element-plus/es/utils").EpPropFinalized<readonly [StringConstructor, NumberConstructor, BooleanConstructor], unknown, unknown, undefined, boolean>;
    readonly fill: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly textColor: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly name: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
    readonly validateEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly options: {
        readonly type: import("vue").PropType<radioOption[]>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly props: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => radioOptionProp) | (() => radioOptionProp) | ((new (...args: any[]) => radioOptionProp) | (() => radioOptionProp))[], unknown, unknown, () => Required<radioOptionProp>, boolean>;
    readonly type: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "button" | "radio", unknown, "radio", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `RadioGroupProps` instead.
 */
export type RadioGroupPropsPublic = ExtractPublicPropTypes<typeof radioGroupProps>;
export declare const radioGroupEmits: {
    "update:modelValue": (val: string | number | boolean | undefined) => val is string | number | boolean;
    change: (val: string | number | boolean | undefined) => val is string | number | boolean;
};
export type RadioGroupEmits = typeof radioGroupEmits;
export type RadioGroupInstance = InstanceType<typeof RadioGroup> & unknown;
/**
 * @description default values for RadioGroupProps
 */
export declare const radioGroupPropsDefaults: {
    readonly id: undefined;
    readonly disabled: undefined;
    readonly modelValue: undefined;
    readonly fill: "";
    readonly textColor: "";
    readonly name: undefined;
    readonly validateEvent: true;
    readonly props: () => Required<radioOptionProp>;
    readonly type: "radio";
};
