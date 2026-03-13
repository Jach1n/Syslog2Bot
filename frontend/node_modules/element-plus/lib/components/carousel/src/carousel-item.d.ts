import type { ExtractPublicPropTypes } from 'vue';
export interface CarouselItemProps {
    /**
     * @description name of the item, can be used in `setActiveItem`
     */
    name?: string;
    /**
     * @description text content for the corresponding indicator
     */
    label?: string | number;
}
/**
 * @deprecated Removed after 3.0.0, Use `CarouselItemProps` instead.
 */
export declare const carouselItemProps: {
    readonly name: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly label: import("element-plus/es/utils").EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, "", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `CarouselItemProps` instead.
 */
export type CarouselItemPropsPublic = ExtractPublicPropTypes<typeof carouselItemProps>;
