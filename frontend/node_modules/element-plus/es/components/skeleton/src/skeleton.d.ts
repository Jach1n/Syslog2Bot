import type Skeleton from './skeleton.vue';
import type { ExtractPublicPropTypes } from 'vue';
import type { ThrottleType } from 'element-plus/es/hooks';
export interface SkeletonProps {
    /**
     * @description whether showing the animation
     */
    animated?: boolean;
    /**
     * @description how many fake items to render to the DOM
     */
    count?: number;
    /**
     * @description numbers of the row, only useful when no template slot were given
     */
    rows?: number;
    /**
     * @description whether showing the real DOM
     */
    loading?: boolean;
    /**
     * @description rendering delay in milliseconds
     */
    throttle?: ThrottleType;
}
/**
 * @deprecated Removed after 3.0.0, Use `SkeletonProps` instead.
 */
export declare const skeletonProps: {
    readonly animated: BooleanConstructor;
    readonly count: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 1, boolean>;
    readonly rows: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 3, boolean>;
    readonly loading: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly throttle: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => number | {
            leading?: number;
            trailing?: number;
            initVal?: boolean;
        }) | (() => ThrottleType) | ((new (...args: any[]) => number | {
            leading?: number;
            trailing?: number;
            initVal?: boolean;
        }) | (() => ThrottleType))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
};
/**
 * @deprecated Removed after 3.0.0, Use `SkeletonProps` instead.
 */
export type SkeletonPropsPublic = ExtractPublicPropTypes<typeof skeletonProps>;
export type SkeletonInstance = InstanceType<typeof Skeleton> & unknown;
