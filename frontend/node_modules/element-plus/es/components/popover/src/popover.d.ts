import type { ExtractPublicPropTypes, PropType } from 'vue';
import type Popover from './popover.vue';
import type { Placement } from 'element-plus/es/components/popper';
import type { Options } from '@popperjs/core';
import type { ElTooltipContentProps, UseTooltipTriggerProps } from 'element-plus/es/components/tooltip';
export interface PopoverProps {
    /**
     * @description how the popover is triggered, not valid in controlled mode
     */
    trigger?: UseTooltipTriggerProps['trigger'];
    /**
     * @description When you click the mouse to focus on the trigger element, you can define a set of keyboard codes to control the display of popover through the keyboard, not valid in controlled mode
     */
    triggerKeys?: UseTooltipTriggerProps['triggerKeys'];
    /**
     * @description popover placement
     */
    placement?: Placement;
    /**
     * @description whether Popover is disabled
     */
    disabled?: UseTooltipTriggerProps['disabled'];
    /**
     * @description whether popover is visible
     */
    visible?: ElTooltipContentProps['visible'];
    /**
     * @description popover transition animation
     */
    transition?: ElTooltipContentProps['transition'];
    /**
     * @description parameters for [popper.js](https://popper.js.org/docs/v2/)
     */
    popperOptions?: Partial<Options>;
    /**
     * @description [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of Popover
     */
    tabindex?: string | number;
    /**
     * @description popover content, can be replaced with a default `slot`
     */
    content?: ElTooltipContentProps['content'];
    /**
     * @description custom style for popover
     */
    popperStyle?: ElTooltipContentProps['popperStyle'];
    /**
     * @description custom class name for popover
     */
    popperClass?: ElTooltipContentProps['popperClass'];
    /**
     * @description whether the mouse can enter the popover
     */
    enterable?: ElTooltipContentProps['enterable'];
    /**
     * @description Tooltip theme, built-in theme: `dark` / `light`
     */
    effect?: ElTooltipContentProps['effect'];
    /**
     * @description whether popover dropdown is teleported to the body
     */
    teleported?: ElTooltipContentProps['teleported'];
    /**
     * @description which select dropdown appends to
     */
    appendTo?: ElTooltipContentProps['appendTo'];
    /**
     * @description popover title
     */
    title?: string;
    /**
     * @description popover width
     */
    width?: string | number;
    /**
     * @description popover offset
     */
    offset?: number;
    /**
     * @description delay of appearance, in millisecond, not valid in controlled mode
     */
    showAfter?: number;
    /**
     * @description delay of disappear, in millisecond, not valid in controlled mode
     */
    hideAfter?: number;
    /**
     * @description timeout in milliseconds to hide tooltip, not valid in controlled mode
     */
    autoClose?: number;
    /**
     * @description whether a tooltip arrow is displayed or not. For more info, please refer to [ElPopper](https://github.com/element-plus/element-plus/tree/dev/packages/components/popper)
     */
    showArrow?: boolean;
    /**
     * @description when popover inactive and `persistent` is `false` , popover will be destroyed
     */
    persistent?: boolean;
    /**
     * @description update:visible event handler
     */
    'onUpdate:visible'?: (visible: boolean) => void;
}
/**
 * @deprecated Removed after 3.0.0, Use `PopoverProps` instead.
 */
export declare const popoverProps: {
    readonly trigger: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => "click" | "focus" | "contextmenu" | "hover" | import("element-plus/es/components/tooltip").TooltipTriggerType[]) | (() => import("element-plus/es/utils").Arrayable<import("element-plus/es/components/tooltip").TooltipTriggerType>) | ((new (...args: any[]) => "click" | "focus" | "contextmenu" | "hover" | import("element-plus/es/components/tooltip").TooltipTriggerType[]) | (() => import("element-plus/es/utils").Arrayable<import("element-plus/es/components/tooltip").TooltipTriggerType>))[], unknown, unknown, "hover", boolean>;
    readonly triggerKeys: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string[]) | (() => string[]) | ((new (...args: any[]) => string[]) | (() => string[]))[], unknown, unknown, () => string[], boolean>;
    readonly placement: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => "left" | "right" | "top" | "bottom" | "auto" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | ((new (...args: any[]) => "left" | "right" | "top" | "bottom" | "auto" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement))[], unknown, unknown, "bottom", boolean>;
    readonly disabled: BooleanConstructor;
    readonly visible: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => boolean) | (() => boolean | null) | ((new (...args: any[]) => boolean) | (() => boolean | null))[], unknown, unknown, null, boolean>;
    readonly transition: StringConstructor;
    readonly popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | ((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>))[], unknown, unknown, () => {}, boolean>;
    readonly tabindex: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string | number) | (() => string | number) | ((new (...args: any[]) => string | number) | (() => string | number))[], unknown, unknown, 0, boolean>;
    readonly content: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly popperStyle: {
        readonly type: PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | false | import("vue").CSSProperties | import("vue").StyleValue[]) | (() => import("vue").StyleValue) | ((new (...args: any[]) => string | false | import("vue").CSSProperties | import("vue").StyleValue[]) | (() => import("vue").StyleValue))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly popperClass: {
        readonly type: PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | any)[])[])[])[])[])[])[])[])[])[])[]) | ((new (...args: any[]) => string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | (string | {
            [x: string]: boolean;
        } | any)[])[])[])[])[])[])[])[])[])[])[]))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly enterable: {
        readonly default: true;
        readonly type: PropType<import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        readonly __epPropKey: true;
    };
    readonly effect: {
        readonly default: "light";
        readonly type: PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string) | (() => import("element-plus/es/components/popper").PopperEffect) | ((new (...args: any[]) => string) | (() => import("element-plus/es/components/popper").PopperEffect))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        readonly __epPropKey: true;
    };
    readonly teleported: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly appendTo: {
        readonly type: PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | ((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement))[], unknown, unknown>) | ((new (...args: any[]) => string | HTMLElement) | (() => import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | ((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement))[], unknown, unknown>))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly title: StringConstructor;
    readonly width: import("element-plus/es/utils").EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, 150, boolean>;
    readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, undefined, boolean>;
    readonly showAfter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly hideAfter: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 200, boolean>;
    readonly autoClose: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly showArrow: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly persistent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly 'onUpdate:visible': {
        readonly type: PropType<(visible: boolean) => void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
};
/**
 * @deprecated Removed after 3.0.0, Use `PopoverProps` instead.
 */
export type PopoverPropsPublic = ExtractPublicPropTypes<typeof popoverProps>;
export declare const popoverEmits: {
    'update:visible': (value: boolean) => boolean;
    'before-enter': () => boolean;
    'before-leave': () => boolean;
    'after-enter': () => boolean;
    'after-leave': () => boolean;
};
export type PopoverEmits = typeof popoverEmits;
export type PopoverInstance = InstanceType<typeof Popover> & unknown;
/**
 * @description default values for PopoverProps
 */
export declare const popoverPropsDefaults: {
    readonly trigger: "hover";
    readonly triggerKeys: () => string[];
    readonly placement: "bottom";
    readonly visible: null;
    readonly popperOptions: () => {};
    readonly tabindex: 0;
    readonly content: "";
    readonly popperStyle: undefined;
    readonly enterable: true;
    readonly effect: "light";
    readonly teleported: true;
    readonly width: 150;
    readonly offset: undefined;
    readonly showAfter: 0;
    readonly hideAfter: 200;
    readonly autoClose: 0;
    readonly showArrow: true;
    readonly persistent: true;
};
