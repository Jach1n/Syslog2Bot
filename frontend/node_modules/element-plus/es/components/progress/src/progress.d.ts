import type { ExtractPublicPropTypes, SVGAttributes } from 'vue';
import type Progress from './progress.vue';
export type ProgressColor = {
    color: string;
    percentage: number;
};
export type ProgressFn = (percentage: number) => string;
export interface ProgressProps {
    /**
     * @description type of progress bar
     */
    type?: 'line' | 'circle' | 'dashboard';
    /**
     * @description percentage, required
     */
    percentage?: number;
    /**
     * @description the current status of progress bar
     */
    status?: '' | 'success' | 'exception' | 'warning';
    /**
     * @description set indeterminate progress
     */
    indeterminate?: boolean;
    /**
     * @description control the animation duration of indeterminate progress or striped flow progress
     */
    duration?: number;
    /**
     * @description the width of progress bar
     */
    strokeWidth?: number;
    /**
     * @description butt/circle/dashboard type shape at the end path
     */
    strokeLinecap?: NonNullable<SVGAttributes['stroke-linecap']>;
    /**
     * @description whether to place the percentage inside progress bar, only works when `type` is 'line'
     */
    textInside?: boolean;
    /**
     * @description the canvas width of circle progress bar
     */
    width?: number;
    /**
     * @description whether to show percentage
     */
    showText?: boolean;
    /**
     * @description background color of progress bar. Overrides `status` prop
     */
    color?: string | ProgressColor[] | ProgressFn;
    /**
     * @description stripe over the progress bar's color
     */
    striped?: boolean;
    /**
     * @description get the stripes to flow
     */
    stripedFlow?: boolean;
    /**
     * @description custom text format
     */
    format?: ProgressFn;
}
/**
 * @deprecated Removed after 3.0.0, Use `ProgressProps` instead.
 */
export declare const progressProps: {
    readonly type: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "circle" | "line" | "dashboard", unknown, "line", boolean>;
    readonly percentage: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly status: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "" | "success" | "warning" | "exception", unknown, "", boolean>;
    readonly indeterminate: BooleanConstructor;
    readonly duration: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 3, boolean>;
    readonly strokeWidth: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
    readonly strokeLinecap: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => "inherit" | "round" | "butt" | "square") | (() => NonNullable<"inherit" | "round" | "butt" | "square" | undefined>) | ((new (...args: any[]) => "inherit" | "round" | "butt" | "square") | (() => NonNullable<"inherit" | "round" | "butt" | "square" | undefined>))[], unknown, unknown, "round", boolean>;
    readonly textInside: BooleanConstructor;
    readonly width: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 126, boolean>;
    readonly showText: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly color: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string | ProgressFn | ProgressColor[]) | (() => string | ProgressFn | ProgressColor[]) | ((new (...args: any[]) => string | ProgressFn | ProgressColor[]) | (() => string | ProgressFn | ProgressColor[]))[], unknown, unknown, "", boolean>;
    readonly striped: BooleanConstructor;
    readonly stripedFlow: BooleanConstructor;
    readonly format: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => ProgressFn) | (() => ProgressFn) | {
        (): ProgressFn;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => ProgressFn) | (() => ProgressFn) | {
        (): ProgressFn;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, (percentage: number) => string, boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `ProgressProps` instead.
 */
export type ProgressPropsPublic = ExtractPublicPropTypes<typeof progressProps>;
export type ProgressInstance = InstanceType<typeof Progress> & unknown;
