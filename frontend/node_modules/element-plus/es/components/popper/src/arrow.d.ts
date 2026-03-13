import type { ExtractPublicPropTypes } from 'vue';
import type Arrow from './arrow.vue';
export interface PopperArrowProps {
    /**
     * @description arrow offset
     */
    arrowOffset?: number;
}
/**
 * @deprecated Removed after 3.0.0, Use `PopperArrowProps` instead.
 */
export declare const popperArrowProps: {
    readonly arrowOffset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 5, boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `PopperArrowProps` instead.
 */
export type PopperArrowPropsPublic = ExtractPublicPropTypes<typeof popperArrowProps>;
export declare const popperArrowPropsDefaults: {
    readonly arrowOffset: 5;
};
export type PopperArrowInstance = InstanceType<typeof Arrow> & unknown;
/** @deprecated use `popperArrowProps` instead, and it will be deprecated in the next major version */
export declare const usePopperArrowProps: {
    readonly arrowOffset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 5, boolean>;
};
/** @deprecated use `PopperArrowProps` instead, and it will be deprecated in the next major version */
export type UsePopperArrowProps = PopperArrowProps;
/** @deprecated use `PopperArrowInstance` instead, and it will be deprecated in the next major version */
export type ElPopperArrowInstance = PopperArrowInstance;
