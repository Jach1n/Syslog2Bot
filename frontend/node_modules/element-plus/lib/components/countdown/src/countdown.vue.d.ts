import type { CountdownProps } from './countdown';
declare var __VLS_9: string | number, __VLS_10: {};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_9>]?: (props: typeof __VLS_10) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<CountdownProps>, {
    format: string;
    value: number;
    valueStyle: undefined;
}>, {
    /**
     * @description current display value
     */
    displayValue: import("vue").ComputedRef<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (value: number) => void;
    finish: () => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<CountdownProps>, {
    format: string;
    value: number;
    valueStyle: undefined;
}>>> & {
    onChange?: ((value: number) => any) | undefined;
    onFinish?: (() => any) | undefined;
}, {
    value: number | import("dayjs").Dayjs;
    format: string;
    valueStyle: string | false | import("vue").CSSProperties | import("vue").StyleValue[] | null;
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
