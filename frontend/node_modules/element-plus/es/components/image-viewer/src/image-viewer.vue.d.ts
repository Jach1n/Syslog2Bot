import type { ImageViewerAction, ImageViewerProps } from './image-viewer';
declare function toggleMode(): void;
declare function setActiveItem(index: number): void;
declare function prev(): void;
declare function next(): void;
declare function handleActions(action: ImageViewerAction, options?: {}): void;
declare var __VLS_51: {
    activeIndex: number;
    total: number;
}, __VLS_53: {
    actions: typeof handleActions;
    prev: typeof prev;
    next: typeof next;
    reset: typeof toggleMode;
    activeIndex: number;
    setActiveItem: typeof setActiveItem;
}, __VLS_120: {
    activeIndex: number;
    src: string;
}, __VLS_122: {};
type __VLS_Slots = {} & {
    progress?: (props: typeof __VLS_51) => any;
} & {
    toolbar?: (props: typeof __VLS_53) => any;
} & {
    'viewer-error'?: (props: typeof __VLS_120) => any;
} & {
    default?: (props: typeof __VLS_122) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<ImageViewerProps>, {
    urlList: () => never[];
    initialIndex: number;
    infinite: boolean;
    closeOnPressEscape: boolean;
    zoomRate: number;
    scale: number;
    minScale: number;
    maxScale: number;
}>, {
    /**
     * @description manually switch image
     */
    setActiveItem: typeof setActiveItem;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    switch: (index: number) => void;
    rotate: (deg: number) => void;
    close: () => void;
    error: (evt: Event) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<ImageViewerProps>, {
    urlList: () => never[];
    initialIndex: number;
    infinite: boolean;
    closeOnPressEscape: boolean;
    zoomRate: number;
    scale: number;
    minScale: number;
    maxScale: number;
}>>> & {
    onClose?: (() => any) | undefined;
    onError?: ((evt: Event) => any) | undefined;
    onSwitch?: ((index: number) => any) | undefined;
    onRotate?: ((deg: number) => any) | undefined;
}, {
    scale: number;
    infinite: boolean;
    closeOnPressEscape: boolean;
    initialIndex: number;
    urlList: string[];
    zoomRate: number;
    minScale: number;
    maxScale: number;
}, {}>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<Required<T>[K]>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaultsLocal<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_PrettifyLocal<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
type __VLS_PrettifyLocal<T> = {
    [K in keyof T as K]: T[K];
} & {};
