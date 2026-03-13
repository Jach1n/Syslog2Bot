import type { PopperTriggerProps } from 'element-plus/es/components/popper';
import type { Arrayable } from 'element-plus/es/utils';
import type { ExtractPublicPropTypes } from 'vue';
export type TooltipTriggerType = 'hover' | 'focus' | 'click' | 'contextmenu';
export interface UseTooltipTriggerProps extends PopperTriggerProps {
    /**
     * @description whether Tooltip is disabled
     */
    disabled?: boolean;
    /**
     * @description How should the tooltip be triggered (to show), not valid in controlled mode
     */
    trigger?: Arrayable<TooltipTriggerType>;
    /**
     * @description When you click the mouse to focus on the trigger element, you can define a set of keyboard codes to control the display of tooltip through the keyboard, not valid in controlled mode
     */
    triggerKeys?: string[];
    /**
     * @description when triggering tooltips through hover, whether to focus the trigger element, which improves accessibility
     */
    focusOnTarget?: boolean;
}
export declare const useTooltipTriggerPropsDefaults: {
    readonly trigger: "hover";
    readonly triggerKeys: () => string[];
};
/**
 * @deprecated Removed after 3.0.0, Use `UseTooltipTriggerProps` instead.
 */
export declare const useTooltipTriggerProps: {
    readonly disabled: BooleanConstructor;
    readonly trigger: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => "click" | "focus" | "contextmenu" | "hover" | TooltipTriggerType[]) | (() => Arrayable<TooltipTriggerType>) | ((new (...args: any[]) => "click" | "focus" | "contextmenu" | "hover" | TooltipTriggerType[]) | (() => Arrayable<TooltipTriggerType>))[], unknown, unknown, "hover", boolean>;
    readonly triggerKeys: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string[]) | (() => string[]) | ((new (...args: any[]) => string[]) | (() => string[]))[], unknown, unknown, () => string[], boolean>;
    readonly focusOnTarget: BooleanConstructor;
    readonly virtualRef: {
        readonly type: import("vue").PropType<import("element-plus/es/components/popper").Measurable>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly virtualTriggering: BooleanConstructor;
    readonly onMouseenter: {
        readonly type: import("vue").PropType<(e: MouseEvent) => void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onMouseleave: {
        readonly type: import("vue").PropType<(e: MouseEvent) => void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onClick: {
        readonly type: import("vue").PropType<(e: PointerEvent) => void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onKeydown: {
        readonly type: import("vue").PropType<(e: KeyboardEvent) => void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onFocus: {
        readonly type: import("vue").PropType<(e: FocusEvent) => void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onBlur: {
        readonly type: import("vue").PropType<(e: FocusEvent) => void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly onContextmenu: {
        readonly type: import("vue").PropType<(e: PointerEvent) => void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly id: StringConstructor;
    readonly open: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `UseTooltipTriggerProps` instead.
 */
export type ElTooltipTriggerProps = UseTooltipTriggerProps;
/**
 * @deprecated Removed after 3.0.0, Use `UseTooltipTriggerProps` instead.
 */
export type ElTooltipTriggerPropsPublic = ExtractPublicPropTypes<typeof useTooltipTriggerProps>;
