import type { ExtractPublicPropTypes } from 'vue';
import type Col from './col.vue';
export type ColSizeObject = {
    span?: number;
    offset?: number;
    pull?: number;
    push?: number;
};
export type ColSize = number | ColSizeObject;
export interface ColProps {
    /**
     * @description custom element tag
     */
    tag?: string;
    /**
     * @description number of column the grid spans
     */
    span?: number;
    /**
     * @description number of spacing on the left side of the grid
     */
    offset?: number;
    /**
     * @description number of columns that grid moves to the left
     */
    pull?: number;
    /**
     * @description number of columns that grid moves to the right
     */
    push?: number;
    /**
     * @description `<768px` Responsive columns or column props object
     */
    xs?: ColSize;
    /**
     * @description `≥768px` Responsive columns or column props object
     */
    sm?: ColSize;
    /**
     * @description `≥992px` Responsive columns or column props object
     */
    md?: ColSize;
    /**
     * @description `≥1200px` Responsive columns or column props object
     */
    lg?: ColSize;
    /**
     * @description `≥1920px` Responsive columns or column props object
     */
    xl?: ColSize;
}
/**
 * @deprecated Removed after 3.0.0, Use `ColProps` instead.
 */
export declare const colProps: {
    readonly tag: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "div", boolean>;
    readonly span: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 24, boolean>;
    readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly pull: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly push: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly xs: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => number | ColSizeObject) | (() => ColSize) | ((new (...args: any[]) => number | ColSizeObject) | (() => ColSize))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{}>, boolean>;
    readonly sm: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => number | ColSizeObject) | (() => ColSize) | ((new (...args: any[]) => number | ColSizeObject) | (() => ColSize))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{}>, boolean>;
    readonly md: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => number | ColSizeObject) | (() => ColSize) | ((new (...args: any[]) => number | ColSizeObject) | (() => ColSize))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{}>, boolean>;
    readonly lg: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => number | ColSizeObject) | (() => ColSize) | ((new (...args: any[]) => number | ColSizeObject) | (() => ColSize))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{}>, boolean>;
    readonly xl: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => number | ColSizeObject) | (() => ColSize) | ((new (...args: any[]) => number | ColSizeObject) | (() => ColSize))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{}>, boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `ColProps` instead.
 */
export type ColPropsPublic = ExtractPublicPropTypes<typeof colProps>;
export type ColInstance = InstanceType<typeof Col> & unknown;
