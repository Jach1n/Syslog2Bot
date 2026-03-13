import type { Option } from './types';
import type { ExtractPublicPropTypes } from 'vue';
import type { ComponentSize } from 'element-plus/es/constants';
import type Segmented from './segmented.vue';
export interface Props {
    label?: string;
    value?: string;
    disabled?: string;
}
export declare const defaultProps: Required<Props>;
export interface SegmentedProps {
    direction?: 'vertical' | 'horizontal';
    /**
     * @description options of segmented
     */
    options?: Option[];
    /**
     * @description binding value
     */
    modelValue?: string | number | boolean;
    /**
     * @description configuration options, see the following table
     */
    props?: Props;
    /**
     * @description fit width of parent content
     */
    block?: boolean;
    /**
     * @description size of component
     */
    size?: ComponentSize;
    /**
     * @description whether segmented is disabled
     */
    disabled?: boolean;
    /**
     * @description whether to trigger form validation
     */
    validateEvent?: boolean;
    /**
     * @description native input id
     */
    id?: string;
    /**
     * @description native `name` attribute
     */
    name?: string;
    /**
     * @description native `aria-label` attribute
     */
    ariaLabel?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `SegmentedProps` instead.
 */
export declare const segmentedProps: {
    ariaLabel: StringConstructor;
    direction: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => "horizontal" | "vertical") | (() => "horizontal" | "vertical") | ((new (...args: any[]) => "horizontal" | "vertical") | (() => "horizontal" | "vertical"))[], unknown, unknown, string, boolean>;
    options: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Option[]) | (() => Option[]) | ((new (...args: any[]) => Option[]) | (() => Option[]))[], unknown, unknown, () => never[], boolean>;
    modelValue: import("element-plus/es/utils").EpPropFinalized<(NumberConstructor | StringConstructor | BooleanConstructor)[], unknown, unknown, undefined, boolean>;
    props: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Props) | (() => Props) | ((new (...args: any[]) => Props) | (() => Props))[], unknown, unknown, () => Required<Props>, boolean>;
    block: BooleanConstructor;
    size: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    disabled: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
    validateEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
    id: StringConstructor;
    name: StringConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `SegmentedProps` instead.
 */
export type SegmentedPropsPublic = ExtractPublicPropTypes<typeof segmentedProps>;
export declare const segmentedEmits: {
    "update:modelValue": (val: any) => val is string | number | boolean;
    change: (val: any) => val is string | number | boolean;
};
export type SegmentedEmits = typeof segmentedEmits;
export type SegmentedInstance = InstanceType<typeof Segmented> & unknown;
