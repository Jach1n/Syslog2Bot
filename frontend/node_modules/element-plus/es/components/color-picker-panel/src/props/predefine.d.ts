import type { ExtractPublicPropTypes } from 'vue';
import type Color from '../utils/color';
export interface PredefineProps {
    colors: string[];
    color: Color;
    enableAlpha: boolean;
    disabled?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `PredefineProps` instead.
 */
export declare const predefineProps: {
    readonly colors: {
        readonly type: import("vue").PropType<string[]>;
        readonly required: true;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly color: {
        readonly type: import("vue").PropType<Color>;
        readonly required: true;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly enableAlpha: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>>;
        readonly required: true;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly disabled: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `PredefineProps` instead.
 */
export type PredefinePropsPublic = ExtractPublicPropTypes<typeof predefineProps>;
