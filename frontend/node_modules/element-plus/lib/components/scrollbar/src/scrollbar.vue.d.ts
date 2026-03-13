import type { ScrollbarDirection, ScrollbarProps } from './scrollbar';
import type { CSSProperties, StyleValue } from 'vue';
declare function scrollTo(xCord: number, yCord?: number): void;
declare function scrollTo(options: ScrollToOptions): void;
declare var __VLS_8: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_8) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<ScrollbarProps>, {
    distance: number;
    height: string;
    maxHeight: string;
    wrapStyle: string;
    wrapClass: string;
    viewStyle: string;
    viewClass: string;
    tag: string;
    minSize: number;
    tabindex: undefined;
}>, {
    /** @description scrollbar wrap ref */
    wrapRef: import("vue").Ref<HTMLDivElement | undefined>;
    /** @description update scrollbar state manually */
    update: () => void;
    /** @description scrolls to a particular set of coordinates */
    scrollTo: typeof scrollTo;
    /** @description set distance to scroll top */
    setScrollTop: (value: number) => void;
    /** @description set distance to scroll left */
    setScrollLeft: (value: number) => void;
    /** @description handle scroll event */
    handleScroll: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    scroll: (args_0: {
        scrollTop: number;
        scrollLeft: number;
    }) => void;
    "end-reached": (direction: ScrollbarDirection) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<ScrollbarProps>, {
    distance: number;
    height: string;
    maxHeight: string;
    wrapStyle: string;
    wrapClass: string;
    viewStyle: string;
    viewClass: string;
    tag: string;
    minSize: number;
    tabindex: undefined;
}>>> & {
    onScroll?: ((args_0: {
        scrollTop: number;
        scrollLeft: number;
    }) => any) | undefined;
    "onEnd-reached"?: ((direction: ScrollbarDirection) => any) | undefined;
}, {
    tabindex: number | string;
    height: number | string;
    maxHeight: number | string;
    tag: keyof HTMLElementTagNameMap | (string & {});
    minSize: number;
    distance: number;
    wrapStyle: string | false | CSSProperties | StyleValue[] | null;
    wrapClass: string | string[];
    viewClass: string | string[];
    viewStyle: string | false | CSSProperties | StyleValue[] | null;
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
