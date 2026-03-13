import type SkeletonItem from './skeleton-item.vue';
import type { ExtractPublicPropTypes } from 'vue';
export interface SkeletonItemProps {
    /**
     * @description the current rendering skeleton type
     */
    variant?: 'circle' | 'rect' | 'h1' | 'h3' | 'text' | 'caption' | 'p' | 'image' | 'button';
}
/**
 * @deprecated Removed after 3.0.0, Use `SkeletonItemProps` instead.
 */
export declare const skeletonItemProps: {
    readonly variant: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "button" | "caption" | "h1" | "h3" | "p" | "circle" | "image" | "rect" | "text", unknown, "text", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `SkeletonItemProps` instead.
 */
export type SkeletonItemPropsPublic = ExtractPublicPropTypes<typeof skeletonItemProps>;
export type SkeletonItemInstance = InstanceType<typeof SkeletonItem> & unknown;
