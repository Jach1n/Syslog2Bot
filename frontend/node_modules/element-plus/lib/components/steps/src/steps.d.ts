import type Steps from './steps.vue';
import type { ExtractPublicPropTypes } from 'vue';
export type StepsStatus = 'wait' | 'process' | 'finish' | 'error' | 'success';
export interface StepsProps {
    /**
     * @description the spacing of each step, will be responsive if omitted. Supports percentage.
     * @default ''
     */
    space?: number | string;
    /**
     * @description current activation step
     * @default 0
     */
    active?: number;
    /**
     * @description display direction
     * @default 'horizontal'
     */
    direction?: 'horizontal' | 'vertical';
    /**
     * @description center title and description
     */
    alignCenter?: boolean;
    /**
     * @description whether to apply simple theme
     */
    simple?: boolean;
    /**
     * @description status of end step
     * @default 'finish'
     */
    finishStatus?: StepsStatus;
    /**
     * @description status of current step
     * @default 'process'
     */
    processStatus?: StepsStatus;
}
/**
 * @deprecated Removed after 3.0.0, Use `StepsProps` instead.
 */
export declare const stepsProps: {
    readonly space: import("element-plus/es/utils").EpPropFinalized<readonly [NumberConstructor, StringConstructor], unknown, unknown, "", boolean>;
    readonly active: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly direction: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "horizontal" | "vertical", unknown, "horizontal", boolean>;
    readonly alignCenter: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly simple: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly finishStatus: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "wait" | "error" | "finish" | "success" | "process", unknown, "finish", boolean>;
    readonly processStatus: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "wait" | "error" | "finish" | "success" | "process", unknown, "process", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `StepsProps` instead.
 */
export type StepsPropsPublic = ExtractPublicPropTypes<typeof stepsProps>;
export declare const stepsEmits: {
    change: (newVal: number, oldVal: number) => boolean;
};
export type StepsEmits = typeof stepsEmits;
export type StepsInstance = InstanceType<typeof Steps> & unknown;
