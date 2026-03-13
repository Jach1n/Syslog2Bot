import type { ProgressColor, ProgressProps } from './progress';
declare var __VLS_1: {
    percentage: number;
}, __VLS_3: {
    percentage: number;
};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
} & {
    default?: (props: typeof __VLS_3) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<ProgressProps>, {
    type: string;
    percentage: number;
    status: string;
    duration: number;
    strokeWidth: number;
    strokeLinecap: string;
    width: number;
    showText: boolean;
    color: string;
    format: (percentage: number) => string;
}>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<ProgressProps>, {
    type: string;
    percentage: number;
    status: string;
    duration: number;
    strokeWidth: number;
    strokeLinecap: string;
    width: number;
    showText: boolean;
    color: string;
    format: (percentage: number) => string;
}>>>, {
    width: number;
    color: string | ProgressColor[] | import("./progress").ProgressFn;
    strokeLinecap: NonNullable<import("vue").SVGAttributes["stroke-linecap"]>;
    strokeWidth: number;
    type: "line" | "circle" | "dashboard";
    format: import("./progress").ProgressFn;
    duration: number;
    percentage: number;
    status: "" | "success" | "exception" | "warning";
    showText: boolean;
}, {}>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<Required<T>[K]>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaultsLocal<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_PrettifyLocal<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
type __VLS_PrettifyLocal<T> = {
    [K in keyof T as K]: T[K];
} & {};
