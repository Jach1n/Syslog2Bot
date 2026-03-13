import type { Component, ExtractPublicPropTypes } from 'vue';
import type ImageViewer from './image-viewer.vue';
export type ImageViewerAction = 'zoomIn' | 'zoomOut' | 'clockwise' | 'anticlockwise';
export type ImageViewerCrossorigin = 'anonymous' | 'use-credentials' | '';
export interface ImageViewerProps {
    /**
     * @description preview link list.
     */
    urlList?: string[];
    /**
     * @description preview backdrop z-index.
     */
    zIndex?: number;
    /**
     * @description the initial preview image index, less than or equal to the length of `url-list`.
     */
    initialIndex?: number;
    /**
     * @description whether preview is infinite.
     */
    infinite?: boolean;
    /**
     * @description whether user can emit close event when clicking backdrop.
     */
    hideOnClickModal?: boolean;
    /**
     * @description whether to append image itself to body. A nested parent element attribute transform should have this attribute set to `true`.
     */
    teleported?: boolean;
    /**
     * @description whether the image-viewer can be closed by pressing ESC.
     */
    closeOnPressEscape?: boolean;
    /**
     * @description the zoom rate of the image viewer zoom event.
     */
    zoomRate?: number;
    /**
     * @description preview image scale.
     */
    scale?: number;
    /**
     * @description the min scale of the image viewer zoom event.
     */
    minScale?: number;
    /**
     * @description the max scale of the image viewer zoom event.
     */
    maxScale?: number;
    /**
     * @description show preview image progress content.
     */
    showProgress?: boolean;
    /**
     * @description set HTML attribute: crossorigin.
     */
    crossorigin?: ImageViewerCrossorigin;
}
/**
 * @deprecated Removed after 3.0.0, Use `ImageViewerProps` instead.
 */
export declare const imageViewerProps: {
    readonly urlList: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string[]) | (() => string[]) | ((new (...args: any[]) => string[]) | (() => string[]))[], unknown, unknown, () => [], boolean>;
    readonly zIndex: {
        readonly type: import("vue").PropType<number>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly initialIndex: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly infinite: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly hideOnClickModal: BooleanConstructor;
    readonly teleported: BooleanConstructor;
    readonly closeOnPressEscape: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly zoomRate: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 1.2, boolean>;
    readonly scale: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 1, boolean>;
    readonly minScale: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0.2, boolean>;
    readonly maxScale: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 7, boolean>;
    readonly showProgress: BooleanConstructor;
    readonly crossorigin: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => "" | "anonymous" | "use-credentials") | (() => ImageViewerCrossorigin) | ((new (...args: any[]) => "" | "anonymous" | "use-credentials") | (() => ImageViewerCrossorigin))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
};
/**
 * @deprecated Removed after 3.0.0, Use `ImageViewerProps` instead.
 */
export type ImageViewerPropsPublic = ExtractPublicPropTypes<typeof imageViewerProps>;
export declare const imageViewerEmits: {
    close: () => boolean;
    error: (evt: Event) => boolean;
    switch: (index: number) => boolean;
    rotate: (deg: number) => boolean;
};
export type ImageViewerEmits = typeof imageViewerEmits;
export interface ImageViewerMode {
    name: string;
    icon: Component;
}
export type ImageViewerInstance = InstanceType<typeof ImageViewer> & unknown;
