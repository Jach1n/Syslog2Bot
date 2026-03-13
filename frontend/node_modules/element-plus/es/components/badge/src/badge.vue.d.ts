import type { StyleValue } from 'vue';
import type { BadgeProps } from './badge';
declare var __VLS_1: {}, __VLS_8: {
    value: string;
};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
} & {
    content?: (props: typeof __VLS_8) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<BadgeProps>, {
    badgeStyle: undefined;
    value: string;
    max: number;
    type: string;
    showZero: boolean;
    offset: () => number[];
}>, {
    /** @description badge content */
    content: import("vue").ComputedRef<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<BadgeProps>, {
    badgeStyle: undefined;
    value: string;
    max: number;
    type: string;
    showZero: boolean;
    offset: () => number[];
}>>>, {
    offset: [number, number];
    value: string | number;
    type: "primary" | "success" | "warning" | "info" | "danger";
    max: number;
    showZero: boolean;
    badgeStyle: string | false | import("vue").CSSProperties | StyleValue[] | null;
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
