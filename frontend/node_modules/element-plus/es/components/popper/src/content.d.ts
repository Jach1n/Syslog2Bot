import type { PopperEffect } from './popper';
import type { ExtractPublicPropTypes, StyleValue } from 'vue';
import type { Options, Placement } from '@popperjs/core';
import type { Measurable } from './constants';
import type Content from './content.vue';
import type { PopperArrowProps } from './arrow';
type ClassObjectType = Record<string, boolean>;
type ClassType = string | ClassObjectType | ClassType[];
declare const POSITIONING_STRATEGIES: readonly ["fixed", "absolute"];
export interface CreatePopperInstanceParams {
    referenceEl: Measurable;
    popperContentEl: HTMLElement;
    arrowEl: HTMLElement | undefined;
}
export interface PopperCoreConfigProps {
    boundariesPadding?: number;
    fallbackPlacements?: Placement[];
    gpuAcceleration?: boolean;
    /**
     * @description offset of the Tooltip
     */
    offset?: number;
    /**
     * @description position of Tooltip
     */
    placement?: Placement;
    /**
     * @description [popper.js](https://popper.js.org/docs/v2/) parameters
     */
    popperOptions?: Partial<Options>;
    strategy?: (typeof POSITIONING_STRATEGIES)[number];
}
/**
 * @deprecated Removed after 3.0.0, Use `PopperCoreConfigProps` instead.
 */
export declare const popperCoreConfigProps: {
    readonly boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Placement[]) | (() => Placement[]) | ((new (...args: any[]) => Placement[]) | (() => Placement[]))[], unknown, unknown, undefined, boolean>;
    readonly gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
    readonly placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, Placement, unknown, "bottom", boolean>;
    readonly popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | ((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>))[], unknown, unknown, () => {}, boolean>;
    readonly strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `PopperCoreConfigProps` instead.
 */
export type PopperCoreConfigPropsPublic = ExtractPublicPropTypes<typeof popperCoreConfigProps>;
export interface PopperContentProps extends PopperCoreConfigProps, PopperArrowProps {
    id?: string;
    style?: StyleValue;
    className?: ClassType;
    effect?: PopperEffect;
    visible?: boolean;
    enterable?: boolean;
    pure?: boolean;
    focusOnShow?: boolean;
    trapping?: boolean;
    popperClass?: ClassType;
    popperStyle?: StyleValue;
    referenceEl?: HTMLElement;
    triggerTargetEl?: HTMLElement;
    stopPopperMouseEvent?: boolean;
    virtualTriggering?: boolean;
    zIndex?: number;
    ariaLabel?: string;
    loop?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `PopperContentProps` instead.
 */
export declare const popperContentProps: {
    readonly loop: BooleanConstructor;
    readonly ariaLabel: StringConstructor;
    readonly id: StringConstructor;
    readonly style: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | false | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | false | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly className: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | ClassObjectType | ClassType[]) | (() => ClassType) | ((new (...args: any[]) => string | ClassObjectType | ClassType[]) | (() => ClassType))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => PopperEffect) | ((new (...args: any[]) => string) | (() => PopperEffect))[], unknown, unknown, "dark", boolean>;
    readonly visible: BooleanConstructor;
    readonly enterable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly pure: BooleanConstructor;
    readonly focusOnShow: BooleanConstructor;
    readonly trapping: BooleanConstructor;
    readonly popperClass: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | ClassObjectType | ClassType[]) | (() => ClassType) | ((new (...args: any[]) => string | ClassObjectType | ClassType[]) | (() => ClassType))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly popperStyle: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | false | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | false | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly referenceEl: {
        readonly type: import("vue").PropType<HTMLElement>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly triggerTargetEl: {
        readonly type: import("vue").PropType<HTMLElement>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly virtualTriggering: BooleanConstructor;
    readonly zIndex: NumberConstructor;
    readonly arrowOffset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 5, boolean>;
    readonly boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Placement[]) | (() => Placement[]) | ((new (...args: any[]) => Placement[]) | (() => Placement[]))[], unknown, unknown, undefined, boolean>;
    readonly gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
    readonly placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, Placement, unknown, "bottom", boolean>;
    readonly popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | ((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>))[], unknown, unknown, () => {}, boolean>;
    readonly strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `PopperContentProps` instead.
 */
export type PopperContentPropsPublic = ExtractPublicPropTypes<typeof popperContentProps>;
export declare const popperCoreConfigPropsDefaults: {
    readonly boundariesPadding: 0;
    readonly gpuAcceleration: true;
    readonly offset: 12;
    readonly placement: "bottom";
    readonly popperOptions: () => {};
    readonly strategy: "absolute";
};
export declare const popperContentPropsDefaults: {
    readonly effect: "dark";
    readonly enterable: true;
    readonly stopPopperMouseEvent: true;
    readonly visible: false;
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
};
export declare const popperContentEmits: {
    mouseenter: (evt: MouseEvent) => boolean;
    mouseleave: (evt: MouseEvent) => boolean;
    focus: () => boolean;
    blur: () => boolean;
    close: () => boolean;
};
export type PopperContentEmits = typeof popperContentEmits;
export type PopperContentInstance = InstanceType<typeof Content> & unknown;
/** @deprecated use `popperCoreConfigProps` instead, and it will be deprecated in the next major version */
export declare const usePopperCoreConfigProps: {
    readonly boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Placement[]) | (() => Placement[]) | ((new (...args: any[]) => Placement[]) | (() => Placement[]))[], unknown, unknown, undefined, boolean>;
    readonly gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
    readonly placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, Placement, unknown, "bottom", boolean>;
    readonly popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | ((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>))[], unknown, unknown, () => {}, boolean>;
    readonly strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
};
/** @deprecated use `popperContentProps` instead, and it will be deprecated in the next major version */
export declare const usePopperContentProps: {
    readonly loop: BooleanConstructor;
    readonly ariaLabel: StringConstructor;
    readonly id: StringConstructor;
    readonly style: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | false | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | false | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly className: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | ClassObjectType | ClassType[]) | (() => ClassType) | ((new (...args: any[]) => string | ClassObjectType | ClassType[]) | (() => ClassType))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly effect: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => PopperEffect) | ((new (...args: any[]) => string) | (() => PopperEffect))[], unknown, unknown, "dark", boolean>;
    readonly visible: BooleanConstructor;
    readonly enterable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly pure: BooleanConstructor;
    readonly focusOnShow: BooleanConstructor;
    readonly trapping: BooleanConstructor;
    readonly popperClass: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | ClassObjectType | ClassType[]) | (() => ClassType) | ((new (...args: any[]) => string | ClassObjectType | ClassType[]) | (() => ClassType))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly popperStyle: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | false | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | false | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly referenceEl: {
        readonly type: import("vue").PropType<HTMLElement>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly triggerTargetEl: {
        readonly type: import("vue").PropType<HTMLElement>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly stopPopperMouseEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly virtualTriggering: BooleanConstructor;
    readonly zIndex: NumberConstructor;
    readonly arrowOffset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 5, boolean>;
    readonly boundariesPadding: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
    readonly fallbackPlacements: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Placement[]) | (() => Placement[]) | ((new (...args: any[]) => Placement[]) | (() => Placement[]))[], unknown, unknown, undefined, boolean>;
    readonly gpuAcceleration: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly offset: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
    readonly placement: import("element-plus/es/utils").EpPropFinalized<StringConstructor, Placement, unknown, "bottom", boolean>;
    readonly popperOptions: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | ((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>))[], unknown, unknown, () => {}, boolean>;
    readonly strategy: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
};
/** @deprecated use `popperContentEmits` instead, and it will be deprecated in the next major version */
export declare const usePopperContentEmits: {
    mouseenter: (evt: MouseEvent) => boolean;
    mouseleave: (evt: MouseEvent) => boolean;
    focus: () => boolean;
    blur: () => boolean;
    close: () => boolean;
};
/** @deprecated use `PopperCoreConfigProps` instead, and it will be deprecated in the next major version */
export type UsePopperCoreConfigProps = PopperCoreConfigProps;
/** @deprecated use `PopperContentProps` instead, and it will be deprecated in the next major version */
export type UsePopperContentProps = PopperContentProps;
/** @deprecated use `PopperContentInstance` instead, and it will be deprecated in the next major version */
export type ElPopperArrowContent = PopperContentInstance;
export {};
