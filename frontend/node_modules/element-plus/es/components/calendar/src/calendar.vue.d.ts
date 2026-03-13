import type { CalendarProps } from './calendar';
declare var __VLS_1: {
    date: string;
}, __VLS_47: {
    data: {
        isSelected: boolean;
        type: string;
        day: string;
        date: Date;
    };
}, __VLS_57: {
    data: {
        isSelected: boolean;
        type: string;
        day: string;
        date: Date;
    };
};
type __VLS_Slots = {} & {
    header?: (props: typeof __VLS_1) => any;
} & {
    'date-cell'?: (props: typeof __VLS_47) => any;
} & {
    'date-cell'?: (props: typeof __VLS_57) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<CalendarProps>, {
    controllerType: string;
}>, {
    /** @description currently selected date */
    selectedDay: import("vue").WritableComputedRef<import("dayjs").Dayjs | undefined>;
    /** @description select a specific date */
    pickDay: (day: import("dayjs").Dayjs) => void;
    /** @description select date */
    selectDate: (type: import("./calendar").CalendarDateType) => void;
    /** @description Calculate the validate date range according to the start and end dates */
    calculateValidatedDateRange: (startDayjs: import("dayjs").Dayjs, endDayjs: import("dayjs").Dayjs) => [import("dayjs").Dayjs, import("dayjs").Dayjs][];
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: Date) => void;
    input: (value: Date) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<CalendarProps>, {
    controllerType: string;
}>>> & {
    "onUpdate:modelValue"?: ((value: Date) => any) | undefined;
    onInput?: ((value: Date) => any) | undefined;
}, {
    controllerType: "button" | "select";
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
