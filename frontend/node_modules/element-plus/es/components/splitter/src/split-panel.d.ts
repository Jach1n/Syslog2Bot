import type { ExtractPublicPropTypes } from 'vue';
import type SplitterPanel from './split-panel.vue';
export interface SplitterPanelProps {
    min?: string | number;
    max?: string | number;
    size?: string | number;
    resizable?: boolean;
    collapsible?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `SplitterPanelProps` instead.
 */
export declare const splitterPanelProps: {
    readonly min: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly max: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly size: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly resizable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly collapsible: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `SplitterPanelProps` instead.
 */
export type SplitterPanelPropsPublic = ExtractPublicPropTypes<typeof splitterPanelProps>;
export type SplitterPanelInstance = InstanceType<typeof SplitterPanel> & unknown;
export declare const splitterPanelEmits: {
    'update:size': (value: number | string) => boolean;
};
export type SplitterPanelEmits = typeof splitterPanelEmits;
