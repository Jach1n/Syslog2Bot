import type { CarouselProps } from './carousel';
declare var __VLS_36: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_36) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<CarouselProps>, {
    initialIndex: number;
    height: string;
    trigger: string;
    autoplay: boolean;
    interval: number;
    indicatorPosition: string;
    arrow: string;
    type: string;
    cardScale: number;
    loop: boolean;
    direction: string;
    pauseOnHover: boolean;
}>, {
    /** @description active slide index */
    activeIndex: import("vue").WritableComputedRef<number>;
    /** @description manually switch slide, index of the slide to be switched to, starting from 0; or the `name` of corresponding `el-carousel-item` */
    setActiveItem: (index: number | string) => void;
    /** @description switch to the previous slide */
    prev: () => void;
    /** @description switch to the next slide */
    next: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (current: number, prev: number) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<CarouselProps>, {
    initialIndex: number;
    height: string;
    trigger: string;
    autoplay: boolean;
    interval: number;
    indicatorPosition: string;
    arrow: string;
    type: string;
    cardScale: number;
    loop: boolean;
    direction: string;
    pauseOnHover: boolean;
}>>> & {
    onChange?: ((current: number, prev: number) => any) | undefined;
}, {
    height: string;
    direction: "horizontal" | "vertical";
    type: "" | "card";
    arrow: "always" | "hover" | "never";
    trigger: "hover" | "click";
    loop: boolean;
    interval: number;
    initialIndex: number;
    autoplay: boolean;
    indicatorPosition: "" | "none" | "outside";
    cardScale: number;
    pauseOnHover: boolean;
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
