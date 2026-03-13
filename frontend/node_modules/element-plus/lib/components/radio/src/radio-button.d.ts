import type { ExtractPublicPropTypes } from 'vue';
import type { RadioPropsBase } from './radio';
import type RadioButton from './radio-button.vue';
export interface RadioButtonProps extends RadioPropsBase {
}
/**
 * @deprecated Removed after 3.0.0, Use `RadioButtonProps` instead.
 */
export declare const radioButtonProps: {
    readonly modelValue: import("element-plus/es/utils").EpPropFinalized<(NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown, undefined, boolean>;
    readonly size: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly disabled: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
    readonly label: import("element-plus/es/utils").EpPropFinalized<(NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown, undefined, boolean>;
    readonly value: import("element-plus/es/utils").EpPropFinalized<(NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown, undefined, boolean>;
    readonly name: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `RadioButtonProps` instead.
 */
export type RadioButtonPropsPublic = ExtractPublicPropTypes<typeof radioButtonProps>;
export type RadioButtonInstance = InstanceType<typeof RadioButton> & unknown;
/**
 * @description default values for RadioButtonProps
 */
export declare const radioButtonPropsDefaults: {
    readonly modelValue: undefined;
    readonly disabled: undefined;
    readonly label: undefined;
    readonly value: undefined;
    readonly name: undefined;
};
