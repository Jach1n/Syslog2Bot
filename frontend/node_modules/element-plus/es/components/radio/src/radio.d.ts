import type { ExtractPublicPropTypes } from 'vue';
import type { ComponentSize } from 'element-plus/es/constants';
import type Radio from './radio.vue';
export interface RadioPropsBase {
    /**
     * @description binding value
     */
    modelValue?: string | number | boolean;
    /**
     * @description size of the Radio
     */
    size?: ComponentSize;
    /**
     * @description whether Radio is disabled
     */
    disabled?: boolean;
    /**
     * @description the label of Radio
     */
    label?: string | number | boolean;
    /**
     * @description the value of Radio
     */
    value?: string | number | boolean;
    /**
     * @description native `name` attribute
     */
    name?: string;
}
export interface RadioProps extends RadioPropsBase {
    /**
     * @description whether to add a border around Radio
     */
    border?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `RadioPropsBase` instead.
 */
export declare const radioPropsBase: {
    modelValue: import("element-plus/es/utils").EpPropFinalized<(NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown, undefined, boolean>;
    size: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    disabled: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
    label: import("element-plus/es/utils").EpPropFinalized<(NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown, undefined, boolean>;
    value: import("element-plus/es/utils").EpPropFinalized<(NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown, undefined, boolean>;
    name: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `RadioProps` instead.
 */
export declare const radioProps: {
    readonly border: BooleanConstructor;
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
export declare const radioEmits: {
    "update:modelValue": (val: string | number | boolean | undefined) => val is string | number | boolean;
    change: (val: string | number | boolean | undefined) => val is string | number | boolean;
};
/**
 * @deprecated Removed after 3.0.0, Use `RadioProps` instead.
 */
export type RadioPropsPublic = ExtractPublicPropTypes<typeof radioProps>;
export type RadioEmits = typeof radioEmits;
export type RadioInstance = InstanceType<typeof Radio> & unknown;
/**
 * @description default values for RadioProps
 */
export declare const radioPropsDefaults: {
    readonly modelValue: undefined;
    readonly disabled: undefined;
    readonly label: undefined;
    readonly value: undefined;
    readonly name: undefined;
    readonly border: false;
};
