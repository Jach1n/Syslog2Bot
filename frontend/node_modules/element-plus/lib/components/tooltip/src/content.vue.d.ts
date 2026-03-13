import type { ElTooltipContentProps } from './content';
import type { PopperContentInstance } from 'element-plus/es/components/popper';
declare var __VLS_31: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_31) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<ElTooltipContentProps>, {
    readonly content: "";
    readonly visible: null;
    readonly teleported: true;
    readonly effect: "dark";
    readonly enterable: true;
    readonly stopPopperMouseEvent: true;
    readonly pure: false;
    readonly focusOnShow: false;
    readonly trapping: false;
    readonly virtualTriggering: false;
    readonly loop: false;
    readonly style: undefined;
    readonly popperStyle: undefined;
    readonly arrowOffset: 5;
    readonly boundariesPadding: 0;
    readonly gpuAcceleration: true;
    readonly offset: 12;
    readonly placement: "bottom";
    readonly popperOptions: () => {};
    readonly strategy: "absolute";
    readonly showAfter: 0;
    readonly hideAfter: 200;
    readonly autoClose: 0;
}>, {
    /**
     * @description el-popper-content component instance
     */
    contentRef: import("vue").Ref<PopperContentInstance | undefined>;
    /**
     * @description validate current focus event is trigger inside el-popper-content
     */
    isFocusInsideContent: (event?: FocusEvent) => boolean | undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<ElTooltipContentProps>, {
    readonly content: "";
    readonly visible: null;
    readonly teleported: true;
    readonly effect: "dark";
    readonly enterable: true;
    readonly stopPopperMouseEvent: true;
    readonly pure: false;
    readonly focusOnShow: false;
    readonly trapping: false;
    readonly virtualTriggering: false;
    readonly loop: false;
    readonly style: undefined;
    readonly popperStyle: undefined;
    readonly arrowOffset: 5;
    readonly boundariesPadding: 0;
    readonly gpuAcceleration: true;
    readonly offset: 12;
    readonly placement: "bottom";
    readonly popperOptions: () => {};
    readonly strategy: "absolute";
    readonly showAfter: 0;
    readonly hideAfter: 200;
    readonly autoClose: 0;
}>>>, {
    style: string | false | import("vue").CSSProperties | import("vue").StyleValue[] | null;
    content: string;
    offset: number;
    visible: boolean | null;
    placement: import("element-plus/es/components/popper").Placement;
    strategy: "fixed" | "absolute";
    effect: import("element-plus/es/components/popper").PopperEffect;
    showAfter: number;
    hideAfter: number;
    autoClose: number;
    teleported: boolean;
    virtualTriggering: boolean;
    loop: boolean;
    arrowOffset: number;
    boundariesPadding: number;
    gpuAcceleration: boolean;
    popperOptions: Partial<import("element-plus/es/components/popper").Options>;
    enterable: boolean;
    pure: boolean;
    focusOnShow: boolean;
    trapping: boolean;
    popperStyle: string | false | import("vue").CSSProperties | import("vue").StyleValue[] | null;
    stopPopperMouseEvent: boolean;
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
