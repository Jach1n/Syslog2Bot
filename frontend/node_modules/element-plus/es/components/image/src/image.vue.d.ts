import type { ImageProps } from './image';
declare function clickHandler(): void;
declare var __VLS_1: {}, __VLS_3: {}, __VLS_14: {}, __VLS_17: {
    activeIndex: number;
    total: number;
}, __VLS_20: {
    actions: (action: import("element-plus/es/components/image-viewer").ImageViewerAction, options?: {}) => void;
    prev: () => void;
    next: () => void;
    reset: () => void;
    activeIndex: number;
    setActiveItem: (index: number) => void;
}, __VLS_23: {
    activeIndex: number;
    src: string;
};
type __VLS_Slots = {} & {
    error?: (props: typeof __VLS_1) => any;
} & {
    placeholder?: (props: typeof __VLS_3) => any;
} & {
    viewer?: (props: typeof __VLS_14) => any;
} & {
    progress?: (props: typeof __VLS_17) => any;
} & {
    toolbar?: (props: typeof __VLS_20) => any;
} & {
    'viewer-error'?: (props: typeof __VLS_23) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<ImageProps>, {
    src: string;
    fit: string;
    previewSrcList: () => never[];
    initialIndex: number;
    infinite: boolean;
    closeOnPressEscape: boolean;
    zoomRate: number;
    scale: number;
    minScale: number;
    maxScale: number;
}>, {
    /** @description manually open preview */
    showPreview: typeof clickHandler;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    switch: (val: number) => void;
    show: () => void;
    close: () => void;
    error: (evt: Event) => void;
    load: (evt: Event) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<ImageProps>, {
    src: string;
    fit: string;
    previewSrcList: () => never[];
    initialIndex: number;
    infinite: boolean;
    closeOnPressEscape: boolean;
    zoomRate: number;
    scale: number;
    minScale: number;
    maxScale: number;
}>>> & {
    onShow?: (() => any) | undefined;
    onClose?: (() => any) | undefined;
    onError?: ((evt: Event) => any) | undefined;
    onLoad?: ((evt: Event) => any) | undefined;
    onSwitch?: ((val: number) => any) | undefined;
}, {
    scale: number;
    infinite: boolean;
    src: string;
    fit: import("./image").ImageFitType;
    closeOnPressEscape: boolean;
    initialIndex: number;
    zoomRate: number;
    minScale: number;
    maxScale: number;
    previewSrcList: string[];
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
