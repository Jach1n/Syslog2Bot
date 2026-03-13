import type { ExtractPublicPropTypes } from 'vue';
export interface CarouselProps {
    /**
     * @description index of the initially active slide (starting from 0)
     */
    initialIndex?: number;
    /**
     * @description height of the carousel
     */
    height?: string;
    /**
     * @description how indicators are triggered
     */
    trigger?: 'hover' | 'click';
    /**
     * @description whether automatically loop the slides
     */
    autoplay?: boolean;
    /**
     * @description interval of the auto loop, in milliseconds
     */
    interval?: number;
    /**
     * @description position of the indicators
     */
    indicatorPosition?: '' | 'none' | 'outside';
    /**
     * @description when arrows are shown
     */
    arrow?: 'always' | 'hover' | 'never';
    /**
     * @description type of the Carousel
     */
    type?: '' | 'card';
    /**
     * @description when type is card, scaled size of secondary cards
     */
    cardScale?: number;
    /**
     * @description display the items in loop
     */
    loop?: boolean;
    /**
     * @description display direction
     */
    direction?: 'horizontal' | 'vertical';
    /**
     * @description pause autoplay when hover
     */
    pauseOnHover?: boolean;
    /**
     * @description infuse dynamism and smoothness into the carousel
     */
    motionBlur?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `CarouselProps` instead.
 */
export declare const carouselProps: {
    readonly initialIndex: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly height: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly trigger: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "click" | "hover", unknown, "hover", boolean>;
    readonly autoplay: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly interval: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 3000, boolean>;
    readonly indicatorPosition: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "" | "none" | "outside", unknown, "", boolean>;
    readonly arrow: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "always" | "never" | "hover", unknown, "hover", boolean>;
    readonly type: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "" | "card", unknown, "", boolean>;
    readonly cardScale: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0.83, boolean>;
    readonly loop: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly direction: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "horizontal" | "vertical", unknown, "horizontal", boolean>;
    readonly pauseOnHover: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly motionBlur: BooleanConstructor;
};
export declare const carouselEmits: {
    /**
     * @description triggers when the active slide switches
     * @param current index of the new active slide
     * @param prev index of the old active slide
     */
    change: (current: number, prev: number) => boolean;
};
/**
 * @deprecated Removed after 3.0.0, Use `CarouselProps` instead.
 */
export type CarouselPropsPublic = ExtractPublicPropTypes<typeof carouselProps>;
export type CarouselEmits = typeof carouselEmits;
