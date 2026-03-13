import type { ExtractPublicPropTypes } from 'vue';
import type { ComponentSize } from 'element-plus/es/constants';
import type { Arrayable } from 'element-plus/es/utils';
import type { FormItemRule } from './types';
export declare const formItemValidateStates: readonly ["", "error", "validating", "success"];
export type FormItemValidateState = (typeof formItemValidateStates)[number];
export type FormItemProp = Arrayable<string>;
export interface FormItemProps {
    /**
     * @description Label text.
     */
    label?: string;
    /**
     * @description Width of label, e.g. `'50px'`. `'auto'` is supported.
     */
    labelWidth?: string | number;
    /**
     * @description Position of label. If set to `'left'` or `'right'`, `label-width` prop is also required. The default is extend from `form label-position`.
     */
    labelPosition?: 'left' | 'right' | 'top' | '';
    /**
     * @description  A key of `model`. It could be an array of property paths (e.g `['a', 'b', '0']`). In the use of `validate` and `resetFields` method, the attribute is required.
     */
    prop?: FormItemProp;
    /**
     * @description Whether the field is required or not, will be determined by validation rules if omitted.
     */
    required?: boolean;
    /**
     * @description Validation rules of form, see the [following table](#formitemrule), more advanced usage at [async-validator](https://github.com/yiminghe/async-validator).
     */
    rules?: Arrayable<FormItemRule>;
    /**
     * @description Field error message, set its value and the field will validate error and show this message immediately.
     */
    error?: string;
    /**
     * @description Validation state of formItem.
     */
    validateStatus?: FormItemValidateState;
    /**
     * @description Same as for in native label.
     */
    for?: string;
    /**
     * @description Inline style validate message.
     */
    inlineMessage?: boolean;
    /**
     * @description Whether to show the error message.
     */
    showMessage?: boolean;
    /**
     * @description Control the size of components in this form-item.
     */
    size?: ComponentSize;
}
/**
 * @deprecated Removed after 3.0.0, Use `FormItemProps` instead.
 */
export declare const formItemProps: {
    readonly label: StringConstructor;
    readonly labelWidth: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly labelPosition: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "" | "left" | "right" | "top", unknown, "", boolean>;
    readonly prop: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | string[]) | (() => FormItemProp) | ((new (...args: any[]) => string | string[]) | (() => FormItemProp))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly required: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
    readonly rules: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => FormItemRule | FormItemRule[]) | (() => Arrayable<FormItemRule>) | ((new (...args: any[]) => FormItemRule | FormItemRule[]) | (() => Arrayable<FormItemRule>))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly error: StringConstructor;
    readonly validateStatus: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "" | "error" | "success" | "validating", unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly for: StringConstructor;
    readonly inlineMessage: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
    readonly showMessage: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly size: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
};
/**
 * @deprecated Removed after 3.0.0, Use `FormItemProps` instead.
 */
export type FormItemPropsPublic = ExtractPublicPropTypes<typeof formItemProps>;
