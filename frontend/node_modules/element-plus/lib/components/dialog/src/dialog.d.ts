import type { ExtractPublicPropTypes, InjectionKey, TransitionProps } from 'vue';
import type { DialogContentProps } from './dialog-content';
import type Dialog from './dialog.vue';
type DoneFn = (cancel?: boolean) => void;
export type DialogBeforeCloseFn = (done: DoneFn) => void;
export type DialogTransition = string | TransitionProps;
/**
 * @description dialog component props
 */
export interface DialogProps extends DialogContentProps {
    /**
     * @description whether to append Dialog itself to body. A nested Dialog should have this attribute set to `true`
     */
    appendToBody?: boolean;
    /**
     * @description which element the Dialog appends to
     */
    appendTo?: string | HTMLElement;
    /**
     * @description callback before Dialog closes, and it will prevent Dialog from closing, use done to close the dialog
     */
    beforeClose?: DialogBeforeCloseFn;
    /**
     * @description destroy elements in Dialog when closed
     */
    destroyOnClose?: boolean;
    /**
     * @description whether the Dialog can be closed by clicking the mask
     */
    closeOnClickModal?: boolean;
    /**
     * @description whether the Dialog can be closed by pressing ESC
     */
    closeOnPressEscape?: boolean;
    /**
     * @description whether scroll of body is disabled while Dialog is displayed
     */
    lockScroll?: boolean;
    /**
     * @description whether a mask is displayed
     */
    modal?: boolean;
    /**
     * @description whether the mask is penetrable
     */
    modalPenetrable?: boolean;
    /**
     * @description the Time(milliseconds) before open
     */
    openDelay?: number;
    /**
     * @description the Time(milliseconds) before close
     */
    closeDelay?: number;
    /**
     * @description value for `margin-top` of Dialog CSS, default is 15vh
     */
    top?: string;
    /**
     * @description visibility of Dialog
     */
    modelValue?: boolean;
    /**
     * @description custom class names for mask
     */
    modalClass?: string;
    /**
     * @description width of Dialog, default is 50%
     */
    width?: string | number;
    /**
     * @description same as z-index in native CSS, z-order of dialog
     */
    zIndex?: number;
    /**
     * @description trap focus within dialog
     */
    trapFocus?: boolean;
    /**
     * @description header's aria-level attribute
     */
    headerAriaLevel?: string;
    /**
     * @description custom transition configuration for dialog animation, it can be a string (transition name) or an object with Vue transition props
     */
    transition?: DialogTransition;
}
/**
 * @deprecated Removed after 3.0.0, Use `DialogProps` instead.
 */
export declare const dialogProps: {
    readonly appendToBody: BooleanConstructor;
    readonly appendTo: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string | HTMLElement) | (() => import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | ((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement))[], unknown, unknown>) | ((new (...args: any[]) => string | HTMLElement) | (() => import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | ((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement))[], unknown, unknown>))[], unknown, unknown, "body", boolean>;
    readonly beforeClose: {
        readonly type: import("vue").PropType<DialogBeforeCloseFn>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly destroyOnClose: BooleanConstructor;
    readonly closeOnClickModal: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly closeOnPressEscape: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly lockScroll: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly modal: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly modalPenetrable: BooleanConstructor;
    readonly openDelay: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly closeDelay: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly top: {
        readonly type: import("vue").PropType<string>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly modelValue: BooleanConstructor;
    readonly modalClass: StringConstructor;
    readonly headerClass: StringConstructor;
    readonly bodyClass: StringConstructor;
    readonly footerClass: StringConstructor;
    readonly width: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly zIndex: {
        readonly type: import("vue").PropType<number>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly trapFocus: BooleanConstructor;
    readonly headerAriaLevel: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "2", boolean>;
    readonly transition: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string | TransitionProps) | (() => DialogTransition) | ((new (...args: any[]) => string | TransitionProps) | (() => DialogTransition))[], unknown, unknown, undefined, boolean>;
    readonly center: BooleanConstructor;
    readonly alignCenter: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
    readonly closeIcon: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component) | ((new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly draggable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
    readonly overflow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
    readonly fullscreen: BooleanConstructor;
    readonly showClose: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly title: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly ariaLevel: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "2", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `DialogProps` instead.
 */
export type DialogPropsPublic = ExtractPublicPropTypes<typeof dialogProps>;
export declare const dialogEmits: {
    open: () => boolean;
    opened: () => boolean;
    close: () => boolean;
    closed: () => boolean;
    "update:modelValue": (value: boolean) => boolean;
    openAutoFocus: () => boolean;
    closeAutoFocus: () => boolean;
};
export type DialogEmits = typeof dialogEmits;
export type DialogInstance = InstanceType<typeof Dialog> & unknown;
export interface DialogConfigContext {
    alignCenter?: boolean;
    draggable?: boolean;
    overflow?: boolean;
    transition?: DialogTransition;
}
export declare const dialogContextKey: InjectionKey<DialogConfigContext>;
export declare const dialogPropsDefaults: {
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
};
export {};
