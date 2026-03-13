import type { ExtractPublicPropTypes } from 'vue';
import type Image from './image.vue';
export type ImageFitType = '' | 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
export type ImageCrossorigin = 'anonymous' | 'use-credentials' | '';
export interface ImageProps {
    /**
     * @description when enabling preview, use this flag to control whether clicking on backdrop can exit preview mode.
     */
    hideOnClickModal?: boolean;
    /**
     * @description image source, same as native.
     */
    src?: string;
    /**
     * @description indicate how the image should be resized to fit its container, same as [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).
     */
    fit?: ImageFitType;
    /**
     * @description Indicates how the browser should load the image, same as [native](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#loading)
     */
    loading?: 'eager' | 'lazy';
    /**
     * @description whether to use lazy load.
     */
    lazy?: boolean;
    /**
     * @description the container to add scroll listener when using lazy load.
     */
    scrollContainer?: string | HTMLElement;
    /**
     * @description allow big image preview.
     */
    previewSrcList?: string[];
    /**
     * @description whether to append image-viewer to body. A nested parent element attribute transform should have this attribute set to `true`.
     */
    previewTeleported?: boolean;
    /**
     * @description set image preview z-index.
     */
    zIndex?: number;
    /**
     * @description initial preview image index, less than the length of `url-list`.
     */
    initialIndex?: number;
    /**
     * @description whether the viewer preview is infinite.
     */
    infinite?: boolean;
    /**
     * @description whether the image-viewer can be closed by pressing ESC.
     */
    closeOnPressEscape?: boolean;
    /**
     * @description the zoom rate of the image viewer zoom event
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
    crossorigin?: ImageCrossorigin;
}
/**
 * @deprecated Removed after 3.0.0, Use `ImageProps` instead.
 */
export declare const imageProps: {
    readonly hideOnClickModal: BooleanConstructor;
    readonly src: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly fit: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "" | "fill" | "contain" | "none" | "cover" | "scale-down", unknown, "", boolean>;
    readonly loading: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "lazy" | "eager", unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly lazy: BooleanConstructor;
    readonly scrollContainer: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement | undefined) | ((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement | undefined))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly previewSrcList: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string[]) | (() => string[]) | ((new (...args: any[]) => string[]) | (() => string[]))[], unknown, unknown, () => [], boolean>;
    readonly previewTeleported: BooleanConstructor;
    readonly zIndex: {
        readonly type: import("vue").PropType<number>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly initialIndex: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly infinite: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly closeOnPressEscape: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly zoomRate: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 1.2, boolean>;
    readonly scale: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 1, boolean>;
    readonly minScale: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0.2, boolean>;
    readonly maxScale: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 7, boolean>;
    readonly showProgress: BooleanConstructor;
    readonly crossorigin: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => "" | "anonymous" | "use-credentials") | (() => ImageCrossorigin) | ((new (...args: any[]) => "" | "anonymous" | "use-credentials") | (() => ImageCrossorigin))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
};
/**
 * @deprecated Removed after 3.0.0, Use `ImageProps` instead.
 */
export type ImagePropsPublic = ExtractPublicPropTypes<typeof imageProps>;
export declare const imageEmits: {
    load: (evt: Event) => boolean;
    error: (evt: Event) => boolean;
    switch: (val: number) => boolean;
    close: () => boolean;
    show: () => boolean;
};
export type ImageEmits = typeof imageEmits;
export type ImageInstance = InstanceType<typeof Image> & unknown;
