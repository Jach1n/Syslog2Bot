import type { ExtractPublicPropTypes, StyleValue } from 'vue';
import type { Dayjs } from 'dayjs';
import type Statistic from './statistic.vue';
export interface StatisticProps {
    /**
     * @description Setting the decimal point
     */
    decimalSeparator?: string;
    /**
     * @description Sets the thousandth identifier
     */
    groupSeparator?: string;
    /**
     * @description numerical precision
     */
    precision?: number;
    /**
     * @description Custom numerical presentation
     */
    formatter?: (...args: any[]) => string | number;
    /**
     * @description Numerical content
     */
    value?: number | Dayjs;
    /**
     * @description Sets the prefix of a number
     */
    prefix?: string;
    /**
     * @description  Sets the suffix of a number
     */
    suffix?: string;
    /**
     * @description Numeric titles
     */
    title?: string;
    /**
     * @description Styles numeric values
     */
    valueStyle?: StyleValue;
}
/**
 * @deprecated Removed after 3.0.0, Use `StatisticProps` instead.
 */
export declare const statisticProps: {
    readonly decimalSeparator: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, ".", boolean>;
    readonly groupSeparator: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, ",", boolean>;
    readonly precision: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly formatter: FunctionConstructor;
    readonly value: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => number | Dayjs) | (() => number | Dayjs) | ((new (...args: any[]) => number | Dayjs) | (() => number | Dayjs))[], unknown, unknown, 0, boolean>;
    readonly prefix: StringConstructor;
    readonly suffix: StringConstructor;
    readonly title: StringConstructor;
    readonly valueStyle: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | false | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | false | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
};
/**
 * @deprecated Removed after 3.0.0, Use `StatisticProps` instead.
 */
export type StatisticPropsPublic = ExtractPublicPropTypes<typeof statisticProps>;
export type StatisticInstance = InstanceType<typeof Statistic> & unknown;
