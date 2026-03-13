import type { ExtractPublicPropTypes } from 'vue';
import type { ButtonProps } from './button';
export interface ButtonGroupProps {
    /**
     * @description control the size of buttons in this button-group
     */
    size?: ButtonProps['size'];
    /**
     * @description control the type of buttons in this button-group
     */
    type?: ButtonProps['type'];
    /**
     * @description display direction
     */
    direction?: 'horizontal' | 'vertical';
}
/**
 * @deprecated Removed after 3.0.0, Use `ButtonGroupProps` instead.
 */
export declare const buttonGroupProps: {
    /**
     * @description control the size of buttons in this button-group
     */
    readonly size: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    /**
     * @description control the type of buttons in this button-group
     */
    readonly type: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "" | "text" | "default" | "primary" | "success" | "warning" | "info" | "danger", unknown, "", boolean>;
    /**
     * @description display direction
     */
    readonly direction: {
        readonly type: import("vue").PropType<"horizontal" | "vertical">;
        readonly values: readonly ["horizontal", "vertical"];
        readonly default: "horizontal";
    };
};
/**
 * @deprecated Removed after 3.0.0, Use `ButtonGroupProps` instead.
 */
export type ButtonGroupPropsPublic = ExtractPublicPropTypes<typeof buttonGroupProps>;
