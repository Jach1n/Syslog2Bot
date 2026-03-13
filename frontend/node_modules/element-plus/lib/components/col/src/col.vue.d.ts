import type { ColProps } from './col';
declare var __VLS_7: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_7) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<ColProps>, {
    tag: string;
    span: number;
    offset: number;
    pull: number;
    push: number;
    xs: () => {};
    sm: () => {};
    md: () => {};
    lg: () => {};
    xl: () => {};
}>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<ColProps>, {
    tag: string;
    span: number;
    offset: number;
    pull: number;
    push: number;
    xs: () => {};
    sm: () => {};
    md: () => {};
    lg: () => {};
    xl: () => {};
}>>>, {
    span: number;
    push: number;
    offset: number;
    tag: string;
    pull: number;
    xs: import("./col").ColSize;
    sm: import("./col").ColSize;
    md: import("./col").ColSize;
    lg: import("./col").ColSize;
    xl: import("./col").ColSize;
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
