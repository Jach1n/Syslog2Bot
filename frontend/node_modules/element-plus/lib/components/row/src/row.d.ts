import type { ExtractPublicPropTypes } from 'vue';
import type Row from './row.vue';
export declare const RowJustify: readonly ["start", "center", "end", "space-around", "space-between", "space-evenly"];
export declare const RowAlign: readonly ["top", "middle", "bottom"];
export interface RowProps {
    /**
     * @description custom element tag
     */
    tag?: string;
    /**
     * @description grid spacing
     */
    gutter?: number;
    /**
     * @description horizontal alignment of flex layout
     */
    justify?: (typeof RowJustify)[number];
    /**
     * @description vertical alignment of flex layout
     */
    align?: (typeof RowAlign)[number];
}
/**
 * @deprecated Removed after 3.0.0, Use `RowProps` instead.
 */
export declare const rowProps: {
    readonly tag: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "div", boolean>;
    readonly gutter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly justify: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "center" | "end" | "space-around" | "space-between" | "space-evenly" | "start", unknown, "start", boolean>;
    readonly align: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "top" | "bottom" | "middle", unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
};
/**
 * @deprecated Removed after 3.0.0, Use `RowProps` instead.
 */
export type RowPropsPublic = ExtractPublicPropTypes<typeof rowProps>;
export type RowInstance = InstanceType<typeof Row> & unknown;
