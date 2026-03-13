import type { ExtractPublicPropTypes } from 'vue';
import type Drawer from './drawer.vue';
import type { DialogProps } from 'element-plus/es/components/dialog';
export interface DrawerProps extends DialogProps {
    /**
     * @description Set the direction in which the Drawer opens
     */
    direction?: 'ltr' | 'rtl' | 'ttb' | 'btt';
    /**
     * @description Whether to enable the resizable function for the drawer
     */
    resizable?: boolean;
    /**
     * @description The size of the Drawer form, when using the number type, is measured in pixels. When using the string type, please pass in 'x%'; otherwise, it will be interpreted as the number type
     */
    size?: string | number;
    /**
     * @description You can remove the title from the drawer, so that your drawer will have more space on the screen. If you want to be visited, you must set the title attribute.
     */
    withHeader?: boolean;
    /**
     * @description The fade-in and fade-out animation switch of the mask layer
     */
    modalFade?: boolean;
    /**
     * @description Help assistive technologies such as screen readers identify content hierarchies
     */
    headerAriaLevel?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `DrawerProps` instead.
 */
export declare const drawerProps: {
    readonly direction: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "ltr" | "rtl" | "ttb" | "btt", unknown, "rtl", boolean>;
    readonly resizable: BooleanConstructor;
    readonly size: import("element-plus/es/utils").EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, "30%", boolean>;
    readonly withHeader: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly modalFade: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly headerAriaLevel: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "2", boolean>;
    readonly appendToBody: BooleanConstructor;
    readonly appendTo: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string | HTMLElement) | (() => import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | ((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement))[], unknown, unknown>) | ((new (...args: any[]) => string | HTMLElement) | (() => import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | ((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement))[], unknown, unknown>))[], unknown, unknown, "body", boolean>;
    readonly beforeClose: {
        readonly type: import("vue").PropType<import("element-plus/es/components/dialog").DialogBeforeCloseFn>;
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
    readonly transition: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string | import("vue").TransitionProps) | (() => import("element-plus/es/components/dialog").DialogTransition) | ((new (...args: any[]) => string | import("vue").TransitionProps) | (() => import("element-plus/es/components/dialog").DialogTransition))[], unknown, unknown, undefined, boolean>;
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
 * @deprecated Removed after 3.0.0, Use `DrawerProps` instead.
 */
export type DrawerPropsPublic = ExtractPublicPropTypes<typeof drawerProps>;
export declare const drawerEmits: {
    'resize-start': (evt: MouseEvent, size: number) => boolean;
    resize: (evt: MouseEvent, size: number) => boolean;
    'resize-end': (evt: MouseEvent, size: number) => boolean;
    open: () => boolean;
    opened: () => boolean;
    close: () => boolean;
    closed: () => boolean;
    "update:modelValue": (value: boolean) => boolean;
    openAutoFocus: () => boolean;
    closeAutoFocus: () => boolean;
};
export type DrawerEmits = typeof drawerEmits;
export type DrawerInstance = InstanceType<typeof Drawer> & unknown;
