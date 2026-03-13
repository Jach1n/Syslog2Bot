import type { ExtractPublicPropTypes } from 'vue';
import type { PosInfo } from './types';
export interface MaskProps {
    /**
     * @description mask's zIndex
     */
    zIndex?: number;
    /**
     * @description whether to show the mask
     */
    visible?: boolean;
    /**
     * @description mask's fill
     */
    fill?: string;
    /***
     * @description mask's transparent space position
     */
    pos?: PosInfo | null;
    /**
     * @description whether the target element can be clickable, when using mask
     */
    targetAreaClickable?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `MaskProps` instead.
 */
export declare const maskProps: {
    zIndex: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
    visible: BooleanConstructor;
    fill: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
    pos: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => PosInfo) | (() => PosInfo | null) | ((new (...args: any[]) => PosInfo) | (() => PosInfo | null))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    targetAreaClickable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `MaskProps` instead.
 */
export type MaskPropsPublic = ExtractPublicPropTypes<typeof maskProps>;
