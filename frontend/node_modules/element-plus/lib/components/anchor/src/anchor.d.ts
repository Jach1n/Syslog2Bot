import type { ExtractPublicPropTypes } from 'vue';
import type Anchor from './anchor.vue';
export interface AnchorProps {
    /**
     * @description scroll container
     */
    container?: string | HTMLElement | Window | null;
    /**
     * @description Set the offset of the anchor scroll
     */
    offset?: number;
    /**
     * @description The offset of the element starting to trigger the anchor
     */
    bound?: number;
    /**
     * @description Set the scroll duration of the container when the anchor is clicked, in milliseconds
     */
    duration?: number;
    /**
     * @description Whether to show the marker
     */
    marker?: boolean;
    /**
     * @description Set Anchor type
     */
    type?: 'default' | 'underline';
    /**
     * @description Set Anchor direction
     */
    direction?: 'vertical' | 'horizontal';
    /**
     * @description Scroll whether link is selected at the top
     */
    selectScrollTop?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `AnchorProps` instead.
 */
export declare const anchorProps: {
    container: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement | Window) | (() => string | HTMLElement | Window | null) | ((new (...args: any[]) => string | HTMLElement | Window) | (() => string | HTMLElement | Window | null))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    bound: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    duration: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    marker: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
    type: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => "default" | "underline") | (() => "default" | "underline") | ((new (...args: any[]) => "default" | "underline") | (() => "default" | "underline"))[], unknown, unknown, string, boolean>;
    direction: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => "horizontal" | "vertical") | (() => "horizontal" | "vertical") | ((new (...args: any[]) => "horizontal" | "vertical") | (() => "horizontal" | "vertical"))[], unknown, unknown, string, boolean>;
    selectScrollTop: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `AnchorProps` instead.
 */
export type AnchorPropsPublic = ExtractPublicPropTypes<typeof anchorProps>;
export type AnchorInstance = InstanceType<typeof Anchor> & unknown;
export declare const anchorEmits: {
    change: (href: string) => boolean;
    click: (e: MouseEvent, href?: string) => boolean;
};
export type AnchorEmits = typeof anchorEmits;
