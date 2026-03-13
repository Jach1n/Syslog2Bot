import type { ExtractPublicPropTypes } from 'vue';
import type { ComponentSize } from 'element-plus/es/constants';
export interface TextProps {
    /**
     * @description text type
     */
    type?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | '';
    /**
     * @description text size
     */
    size?: ComponentSize;
    /**
     * @description render ellipsis
     */
    truncated?: boolean;
    /**
     * @description maximum lines
     */
    lineClamp?: number | string;
    /**
     * @description custom element tag
     */
    tag?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `TextProps` instead.
 */
export declare const textProps: {
    readonly type: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "" | "primary" | "success" | "warning" | "info" | "danger", unknown, "", boolean>;
    readonly size: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "" | "small" | "default" | "large", unknown, "", boolean>;
    readonly truncated: BooleanConstructor;
    readonly lineClamp: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly tag: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "span", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `TextProps` instead.
 */
export type TextPropsPublic = ExtractPublicPropTypes<typeof textProps>;
