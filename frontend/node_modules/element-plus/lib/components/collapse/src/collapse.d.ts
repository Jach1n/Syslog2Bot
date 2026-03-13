import type { ExtractPublicPropTypes } from 'vue';
import type { Arrayable, Awaitable } from 'element-plus/es/utils';
export type CollapseActiveName = string | number;
export type CollapseModelValue = Arrayable<CollapseActiveName>;
export type CollapseIconPositionType = 'left' | 'right';
export declare const emitChangeFn: (value: CollapseModelValue) => value is string | number | CollapseActiveName[];
export interface CollapseProps {
    /**
     * @description whether to activate accordion mode
     */
    accordion?: boolean;
    /**
     * @description currently active panel, the type is `string` in accordion mode, otherwise it is `array`
     */
    modelValue?: CollapseModelValue;
    /**
     * @description set expand icon position
     */
    expandIconPosition?: CollapseIconPositionType;
    /**
     * @description before-collapse hook before the collapse state changes. If `false` is returned or a `Promise` is returned and then is rejected, will stop collapsing
     */
    beforeCollapse?: (name: CollapseActiveName) => Awaitable<boolean>;
}
/**
 * @deprecated Removed after 3.0.0, Use `CollapseProps` instead.
 */
export declare const collapseProps: {
    readonly accordion: BooleanConstructor;
    readonly modelValue: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string | number | CollapseActiveName[]) | (() => CollapseModelValue) | ((new (...args: any[]) => string | number | CollapseActiveName[]) | (() => CollapseModelValue))[], unknown, unknown, () => [], boolean>;
    readonly expandIconPosition: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => "left" | "right") | (() => CollapseIconPositionType) | ((new (...args: any[]) => "left" | "right") | (() => CollapseIconPositionType))[], unknown, unknown, "right", boolean>;
    readonly beforeCollapse: {
        readonly type: import("vue").PropType<(name: CollapseActiveName) => Awaitable<boolean>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
};
/**
 * @deprecated Removed after 3.0.0, Use `CollapseProps` instead.
 */
export type CollapsePropsPublic = ExtractPublicPropTypes<typeof collapseProps>;
export declare const collapseEmits: {
    "update:modelValue": (value: CollapseModelValue) => value is string | number | CollapseActiveName[];
    change: (value: CollapseModelValue) => value is string | number | CollapseActiveName[];
};
export type CollapseEmits = typeof collapseEmits;
