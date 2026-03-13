import { ComponentSize } from 'element-plus/es/constants';
import type { ExtractPublicPropTypes } from 'vue';
import type Description from './description.vue';
export interface DescriptionProps {
    /**
     * @description with or without border
     * @default false
     */
    border?: boolean;
    /**
     * @description numbers of `Descriptions Item` in one line
     * @default 3
     */
    column?: number;
    /**
     * @description direction of list
     * @default 'horizontal'
     */
    direction?: 'horizontal' | 'vertical';
    /**
     * @description size of list
     * @default ''
     */
    size?: ComponentSize;
    /**
     * @description title text, display on the top left
     * @default ''
     */
    title?: string;
    /**
     * @description extra text, display on the top right
     * @default ''
     */
    extra?: string;
    /**
     * @description width of every label column
     */
    labelWidth?: string | number;
}
/**
 * @deprecated Removed after 3.0.0, Use `DescriptionProps` instead.
 */
export declare const descriptionProps: {
    readonly border: BooleanConstructor;
    readonly column: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 3, boolean>;
    readonly direction: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "horizontal" | "vertical", unknown, "horizontal", boolean>;
    readonly size: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly title: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly extra: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly labelWidth: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
};
/**
 * @deprecated Removed after 3.0.0, Use `DescriptionProps` instead.
 */
export type DescriptionPropsPublic = ExtractPublicPropTypes<typeof descriptionProps>;
export type DescriptionInstance = InstanceType<typeof Description> & unknown;
