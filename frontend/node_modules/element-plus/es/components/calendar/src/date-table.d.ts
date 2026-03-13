import type { ExtractPublicPropTypes } from 'vue';
import type { Dayjs } from 'dayjs';
export type CalendarDateCellType = 'next' | 'prev' | 'current';
export type CalendarDateCell = {
    text: number;
    type: CalendarDateCellType;
};
export declare const getPrevMonthLastDays: (date: Dayjs, count: number) => number[];
export declare const getMonthDays: (date: Dayjs) => number[];
export declare const toNestedArr: (days: CalendarDateCell[]) => CalendarDateCell[][];
export interface DateTableProps {
    selectedDay?: Dayjs;
    range?: [Dayjs, Dayjs];
    date: Dayjs;
    hideHeader?: boolean;
}
/**
 *  @deprecated Removed after 3.0.0, Use `DateTableProps` instead.
 */
export declare const dateTableProps: {
    readonly selectedDay: {
        readonly type: import("vue").PropType<Dayjs>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly range: {
        readonly type: import("vue").PropType<[Dayjs, Dayjs]>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly date: {
        readonly type: import("vue").PropType<Dayjs>;
        readonly required: true;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly hideHeader: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
};
/**
 *  @deprecated Removed after 3.0.0, Use `DateTableProps` instead.
 */
export type DateTablePropsPublic = ExtractPublicPropTypes<typeof dateTableProps>;
export declare const dateTableEmits: {
    pick: (value: Dayjs) => boolean;
};
export type DateTableEmits = typeof dateTableEmits;
