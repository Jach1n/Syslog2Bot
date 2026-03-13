import type { DialogContentProps } from './dialog-content';
declare var __VLS_1: {}, __VLS_13: {}, __VLS_15: {};
type __VLS_Slots = {} & {
    header?: (props: typeof __VLS_1) => any;
} & {
    default?: (props: typeof __VLS_13) => any;
} & {
    footer?: (props: typeof __VLS_15) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<DialogContentProps>, {
    readonly alignCenter: undefined;
    readonly draggable: undefined;
    readonly overflow: undefined;
    readonly showClose: true;
    readonly title: "";
    readonly ariaLevel: "2";
}>, {
    resetPosition: () => void;
    updatePosition: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: () => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<DialogContentProps>, {
    readonly alignCenter: undefined;
    readonly draggable: undefined;
    readonly overflow: undefined;
    readonly showClose: true;
    readonly title: "";
    readonly ariaLevel: "2";
}>>> & {
    onClose?: (() => any) | undefined;
}, {
    title: string;
    overflow: boolean;
    ariaLevel: string;
    alignCenter: boolean;
    draggable: boolean;
    showClose: boolean;
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
