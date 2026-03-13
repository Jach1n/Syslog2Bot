import type { AffixProps } from './affix';
declare var __VLS_6: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_6) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<AffixProps>, {
    zIndex: number;
    target: string;
    offset: number;
    position: string;
    appendTo: string;
}>, {
    /** @description update affix status */
    update: () => void;
    /** @description update rootRect info */
    updateRoot: () => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (fixed: boolean) => void;
    scroll: (args_0: {
        scrollTop: number;
        fixed: boolean;
    }) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<AffixProps>, {
    zIndex: number;
    target: string;
    offset: number;
    position: string;
    appendTo: string;
}>>> & {
    onChange?: ((fixed: boolean) => any) | undefined;
    onScroll?: ((args_0: {
        scrollTop: number;
        fixed: boolean;
    }) => any) | undefined;
}, {
    position: "top" | "bottom";
    zIndex: import("csstype").Property.ZIndex;
    offset: number;
    target: string;
    appendTo: string | HTMLElement;
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
