import type { ExtractPublicPropTypes } from 'vue';
import type { Dayjs } from 'dayjs';
export interface SelectControllerProps {
    date: Dayjs;
    formatter?: (value: number, type: 'year' | 'month') => string | number;
}
/**
 *  @deprecated Removed after 3.0.0, Use `SelectControllerProps` instead.
 */
export declare const selectControllerProps: {
    readonly date: {
        readonly type: import("vue").PropType<Dayjs>;
        readonly required: true;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly formatter: {
        readonly type: import("vue").PropType<(value: number, type: "year" | "month") => string | number>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
};
/**
 *  @deprecated Removed after 3.0.0, Use `SelectControllerProps` instead.
 */
export type SelectControllerPropsPublic = ExtractPublicPropTypes<typeof selectControllerProps>;
export declare const selectControllerEmits: {
    'date-change': (date: Dayjs | "today") => boolean;
};
export type SelectControllerEmits = typeof selectControllerEmits;
