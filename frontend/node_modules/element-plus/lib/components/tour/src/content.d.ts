import type { ExtractPublicPropTypes } from 'vue';
import type { Placement, Strategy, VirtualElement } from '@floating-ui/dom';
export declare const tourStrategies: readonly ["absolute", "fixed"];
export declare const tourPlacements: readonly ["top-start", "top-end", "top", "bottom-start", "bottom-end", "bottom", "left-start", "left-end", "left", "right-start", "right-end", "right"];
export interface TourContentProps {
    /**
     * @description position of the guide card relative to the target element
     */
    placement?: Placement;
    /**
     * @description the reference dom
     */
    reference?: HTMLElement | VirtualElement | null;
    /**
     * @description position strategy of the content
     */
    strategy?: Strategy;
    /**
     * @description offset of the arrow
     */
    offset?: number;
    /**
     * @description whether to show the arrow
     */
    showArrow?: boolean;
    /**
     * @description content's zIndex
     */
    zIndex?: number;
}
/**
 * @deprecated Removed after 3.0.0, Use `TourContentProps` instead.
 */
export declare const tourContentProps: {
    placement: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => "left" | "right" | "top" | "bottom" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | ((new (...args: any[]) => "left" | "right" | "top" | "bottom" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement))[], "left" | "right" | "top" | "bottom" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown, string, boolean>;
    reference: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => HTMLElement | VirtualElement) | (() => HTMLElement | VirtualElement | null) | ((new (...args: any[]) => HTMLElement | VirtualElement) | (() => HTMLElement | VirtualElement | null))[], unknown, unknown, null, boolean>;
    strategy: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => "fixed" | "absolute") | (() => Strategy) | ((new (...args: any[]) => "fixed" | "absolute") | (() => Strategy))[], "fixed" | "absolute", unknown, string, boolean>;
    offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    showArrow: BooleanConstructor;
    zIndex: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `TourContentProps` instead.
 */
export type TourContentPropsPublic = ExtractPublicPropTypes<typeof tourContentProps>;
export declare const tourContentEmits: {
    close: () => boolean;
};
export type TourContentEmits = typeof tourContentEmits;
