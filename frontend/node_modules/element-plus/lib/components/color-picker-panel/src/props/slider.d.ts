import type { ExtractPublicPropTypes } from 'vue';
import type Color from '../utils/color';
export interface AlphaSliderProps {
    color: Color;
    vertical?: boolean;
    disabled?: boolean;
}
export interface HueSliderProps extends AlphaSliderProps {
}
/**
 * @deprecated Removed after 3.0.0, Use `AlphaSliderProps` instead.
 */
export declare const alphaSliderProps: {
    readonly color: {
        readonly type: import("vue").PropType<Color>;
        readonly required: true;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly vertical: BooleanConstructor;
    readonly disabled: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `HueSliderProps` instead.
 */
export declare const hueSliderProps: {
    readonly color: {
        readonly type: import("vue").PropType<Color>;
        readonly required: true;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly vertical: BooleanConstructor;
    readonly disabled: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `AlphaSliderProps` instead.
 */
export type AlphaSliderPropsPublic = ExtractPublicPropTypes<typeof alphaSliderProps>;
