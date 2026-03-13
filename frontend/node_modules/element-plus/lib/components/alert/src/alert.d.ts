import { TypeComponentsMap } from 'element-plus/es/utils';
import type { ExtractPublicPropTypes } from 'vue';
export declare const alertEffects: readonly ["light", "dark"];
export interface AlertProps {
    /**
     * @description alert title.
     */
    title?: string;
    /**
     * @description descriptive text.
     */
    description?: string;
    /**
     * @description alert type.
     */
    type?: keyof typeof TypeComponentsMap;
    /**
     * @description whether alert can be dismissed.
     */
    closable?: boolean;
    /**
     * @description text for replacing x button
     */
    closeText?: string;
    /**
     * @description whether show icon
     */
    showIcon?: boolean;
    /**
     * @description should content be placed in center.
     */
    center?: boolean;
    /**
     * @description theme style
     */
    effect?: 'light' | 'dark';
}
/**
 * @deprecated Removed after 3.0.0, Use `AlertProps` instead.
 */
export declare const alertProps: {
    readonly title: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly description: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly type: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "error" | "primary" | "success" | "warning" | "info", unknown, "info", boolean>;
    readonly closable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly closeText: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly showIcon: BooleanConstructor;
    readonly center: BooleanConstructor;
    readonly effect: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "dark" | "light", unknown, "light", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `AlertProps` instead.
 */
export type AlertPropsPublic = ExtractPublicPropTypes<typeof alertProps>;
export declare const alertEmits: {
    close: (evt: MouseEvent) => boolean;
};
export type AlertEmits = typeof alertEmits;
