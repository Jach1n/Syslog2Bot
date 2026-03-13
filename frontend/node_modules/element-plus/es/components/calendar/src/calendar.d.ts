import type { ExtractPublicPropTypes } from 'vue';
export type CalendarDateType = 'prev-month' | 'next-month' | 'prev-year' | 'next-year' | 'today';
export interface CalendarProps {
    /**
     * @description binding value
     */
    modelValue?: Date;
    /**
     * @description time range, including start time and end time.
     *   Start time must be start day of week, end time must be end day of week, the time span cannot exceed two months.
     */
    range?: [Date, Date];
    /**
     * @description type of the controller for the Calendar header
     */
    controllerType?: 'button' | 'select';
    /**
     * @description format label when `controller-type` is 'select'
     */
    formatter?: (value: number, type: 'year' | 'month') => string | number;
}
/**
 * @deprecated Removed after 3.0.0, Use `CalendarProps` instead.
 */
export declare const calendarProps: {
    readonly modelValue: {
        readonly type: import("vue").PropType<Date>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly range: {
        readonly type: import("vue").PropType<[Date, Date]>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly controllerType: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "button" | "select", unknown, "button", boolean>;
    readonly formatter: {
        readonly type: import("vue").PropType<(value: number, type: "year" | "month") => string | number>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
};
/**
 *  @deprecated Removed after 3.0.0, Use `CalendarProps` instead.
 */
export type CalendarPropsPublic = ExtractPublicPropTypes<typeof calendarProps>;
export declare const calendarEmits: {
    "update:modelValue": (value: Date) => boolean;
    input: (value: Date) => boolean;
};
export type CalendarEmits = typeof calendarEmits;
