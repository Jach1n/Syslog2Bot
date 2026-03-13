import type { DialogProps } from './dialog';
declare var __VLS_38: {
    close: () => void;
    titleId: string;
    titleClass: string;
}, __VLS_40: {}, __VLS_42: {}, __VLS_45: {};
type __VLS_Slots = {} & {
    header?: (props: typeof __VLS_38) => any;
} & {
    title?: (props: typeof __VLS_40) => any;
} & {
    default?: (props: typeof __VLS_42) => any;
} & {
    footer?: (props: typeof __VLS_45) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<DialogProps>, {
    readonly appendTo: "body";
    readonly closeOnClickModal: true;
    readonly closeOnPressEscape: true;
    readonly lockScroll: true;
    readonly modal: true;
    readonly openDelay: 0;
    readonly closeDelay: 0;
    readonly headerAriaLevel: "2";
    readonly transition: undefined;
    readonly alignCenter: undefined;
    readonly draggable: undefined;
    readonly overflow: undefined;
    readonly showClose: true;
    readonly title: "";
    readonly ariaLevel: "2";
}>, {
    /** @description whether the dialog is visible */
    visible: import("vue").Ref<boolean>;
    dialogContentRef: import("vue").Ref<any>;
    resetPosition: () => void;
    handleClose: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => void;
    open: () => void;
    close: () => void;
    opened: () => void;
    closed: () => void;
    openAutoFocus: () => void;
    closeAutoFocus: () => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<DialogProps>, {
    readonly appendTo: "body";
    readonly closeOnClickModal: true;
    readonly closeOnPressEscape: true;
    readonly lockScroll: true;
    readonly modal: true;
    readonly openDelay: 0;
    readonly closeDelay: 0;
    readonly headerAriaLevel: "2";
    readonly transition: undefined;
    readonly alignCenter: undefined;
    readonly draggable: undefined;
    readonly overflow: undefined;
    readonly showClose: true;
    readonly title: "";
    readonly ariaLevel: "2";
}>>> & {
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onClose?: (() => any) | undefined;
    onOpen?: (() => any) | undefined;
    onOpened?: (() => any) | undefined;
    onClosed?: (() => any) | undefined;
    onOpenAutoFocus?: (() => any) | undefined;
    onCloseAutoFocus?: (() => any) | undefined;
}, {
    title: string;
    overflow: boolean;
    transition: import("./dialog").DialogTransition;
    ariaLevel: string;
    appendTo: string | HTMLElement;
    alignCenter: boolean;
    draggable: boolean;
    showClose: boolean;
    closeOnClickModal: boolean;
    closeOnPressEscape: boolean;
    lockScroll: boolean;
    modal: boolean;
    openDelay: number;
    closeDelay: number;
    headerAriaLevel: string;
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
