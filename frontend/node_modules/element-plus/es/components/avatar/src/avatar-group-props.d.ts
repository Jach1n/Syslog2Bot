import type { ExtractPropTypes, ExtractPublicPropTypes, StyleValue } from 'vue';
import type { Placement, PopperEffect } from 'element-plus/es/components/popper';
export declare const avatarGroupProps: {
    /**
     * @description control the size of avatars in this avatar-group
     */
    readonly size: {
        readonly type: import("vue").PropType<number | "" | "small" | "default" | "large" | undefined>;
        readonly values: readonly ["", "default", "small", "large"];
        readonly validator: (val: unknown) => val is number;
    };
    /**
     * @description control the shape of avatars in this avatar-group
     */
    readonly shape: {
        readonly type: import("vue").PropType<"circle" | "square" | undefined>;
        readonly values: readonly ["circle", "square"];
    };
    /**
     * @description whether to collapse avatars
     */
    readonly collapseAvatars: BooleanConstructor;
    /**
     * @description whether show all collapsed avatars when mouse hover text of the collapse-avatar. To use this, `collapse-avatars` must be true
     */
    readonly collapseAvatarsTooltip: BooleanConstructor;
    /**
     * @description the max avatars number to be shown. To use this, `collapse-avatars` must be true
     */
    readonly maxCollapseAvatars: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    /**
     * @description tooltip theme, built-in theme: `dark` / `light`
     */
    readonly effect: {
        readonly type: import("vue").PropType<PopperEffect>;
        readonly default: "light";
    };
    /**
     * @description placement of tooltip
     */
    readonly placement: {
        readonly type: import("vue").PropType<Placement>;
        readonly values: Placement[];
        readonly default: "top";
    };
    /**
     * @description custom class name for tooltip
     */
    readonly popperClass: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | {
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
    /**
     * @description custom style for tooltip
     */
    readonly popperStyle: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | false | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | false | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    /**
     * @description custom class name for the collapse-avatar
     */
    readonly collapseClass: StringConstructor;
    /**
     * @description custom style for the collapse-avatar
     */
    readonly collapseStyle: {
        readonly type: import("vue").PropType<StyleValue>;
    };
};
export type AvatarGroupProps = ExtractPropTypes<typeof avatarGroupProps>;
export type AvatarGroupPropsPublic = ExtractPublicPropTypes<typeof avatarGroupProps>;
