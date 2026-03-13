import type { ExtractPublicPropTypes, StyleValue } from 'vue';
export interface BadgeProps {
    /**
     * @description display value.
     */
    value?: string | number;
    /**
     * @description maximum value, shows `{max}+` when exceeded. Only works if value is a number.
     */
    max?: number;
    /**
     * @description if a little dot is displayed.
     */
    isDot?: boolean;
    /**
     * @description hidden badge.
     */
    hidden?: boolean;
    /**
     * @description badge type.
     */
    type?: 'primary' | 'success' | 'warning' | 'info' | 'danger';
    /**
     * @description whether to show badge when value is zero.
     */
    showZero?: boolean;
    /**
     * @description customize dot background color
     */
    color?: string;
    /**
     * @description CSS style of badge
     */
    badgeStyle?: StyleValue;
    /**
     * @description set offset of the badge
     */
    offset?: [number, number];
    /**
     * @description custom class name of badge
     */
    badgeClass?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `BadgeProps` instead.
 */
export declare const badgeProps: {
    readonly value: import("element-plus/es/utils").EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, "", boolean>;
    readonly max: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 99, boolean>;
    readonly isDot: BooleanConstructor;
    readonly hidden: BooleanConstructor;
    readonly type: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "primary" | "success" | "warning" | "info" | "danger", unknown, "danger", boolean>;
    readonly showZero: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly color: StringConstructor;
    readonly badgeStyle: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | false | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | false | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly offset: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => [number, number]) | (() => [number, number]) | ((new (...args: any[]) => [number, number]) | (() => [number, number]))[], unknown, unknown, () => number[], boolean>;
    readonly badgeClass: {
        readonly type: import("vue").PropType<string>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
};
/**
 * @deprecated Removed after 3.0.0, Use `BadgeProps` instead.
 */
export type BadgePropsPublic = ExtractPublicPropTypes<typeof badgeProps>;
