import type { ExtractPublicPropTypes } from 'vue';
import type checkboxGroup from './checkbox-group.vue';
import type { CheckboxProps, CheckboxValueType } from './checkbox';
import type { ComponentSize } from 'element-plus/es/constants';
import type { AriaProps } from 'element-plus/es/hooks';
export type CheckboxGroupValueType = Exclude<CheckboxValueType, boolean>[];
export interface CheckboxGroupProps extends Pick<AriaProps, 'ariaLabel'> {
    /**
     * @description binding value
     */
    modelValue?: CheckboxGroupValueType;
    /**
     * @description whether the nesting checkboxes are disabled
     */
    disabled?: boolean;
    /**
     * @description minimum number of checkbox checked
     */
    min?: number;
    /**
     * @description maximum number of checkbox checked
     */
    max?: number;
    /**
     * @description size of checkbox
     */
    size?: ComponentSize;
    /**
     * @description border and background color when button is active
     */
    fill?: string;
    /**
     * @description font color when button is active
     */
    textColor?: string;
    /**
     * @description element tag of the checkbox group
     */
    tag?: string;
    /**
     * @description whether to trigger form validation
     */
    validateEvent?: boolean;
    /**
     * @description data of the options, the key of `value` and `label` and `disabled` can be customize by `props`
     */
    options?: CheckboxOption[];
    /**
     * @description configuration options
     */
    props?: CheckboxOptionProps;
    /**
     * @description component type to render options (e.g. `'button'`)
     */
    type?: 'checkbox' | 'button';
}
/**
 * @deprecated Removed after 3.0.0, Use `CheckboxGroupProps` instead.
 */
export declare const checkboxGroupProps: {
    readonly ariaLabel: StringConstructor;
    readonly modelValue: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => CheckboxGroupValueType) | (() => CheckboxGroupValueType) | ((new (...args: any[]) => CheckboxGroupValueType) | (() => CheckboxGroupValueType))[], unknown, unknown, () => never[], boolean>;
    readonly disabled: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
    readonly min: NumberConstructor;
    readonly max: NumberConstructor;
    readonly size: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly fill: StringConstructor;
    readonly textColor: StringConstructor;
    readonly tag: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "div", boolean>;
    readonly validateEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly options: {
        readonly type: import("vue").PropType<CheckboxOption[]>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly props: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => CheckboxOptionProps) | (() => CheckboxOptionProps) | ((new (...args: any[]) => CheckboxOptionProps) | (() => CheckboxOptionProps))[], unknown, unknown, () => Required<CheckboxOptionProps>, boolean>;
    readonly type: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "button" | "checkbox", unknown, "checkbox", boolean>;
};
export declare const checkboxGroupEmits: {
    "update:modelValue": (val: CheckboxGroupValueType) => boolean;
    change: (val: CheckboxValueType[]) => boolean;
};
/**
 * @deprecated Removed after 3.0.0, Use `CheckboxGroupProps` instead.
 */
export type CheckboxGroupPropsPublic = ExtractPublicPropTypes<typeof checkboxGroupProps>;
export type CheckboxGroupEmits = typeof checkboxGroupEmits;
export type CheckboxGroupInstance = InstanceType<typeof checkboxGroup> & unknown;
export type CheckboxOption = CheckboxProps & Record<string, any>;
type CheckboxOptionProps = {
    value?: string;
    label?: string;
    disabled?: string;
};
export declare const checkboxDefaultProps: Required<CheckboxOptionProps>;
export {};
