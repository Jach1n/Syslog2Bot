import type { ExtractPublicPropTypes } from 'vue';
import type Color from '../utils/color';
export interface SvPanelProps {
    color: Color;
    disabled?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `SvPanelProps` instead.
 */
export declare const svPanelProps: {
    readonly color: {
        readonly type: import("vue").PropType<Color>;
        readonly required: true;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly disabled: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `SvPanelProps` instead.
 */
export type SvPanelPropsPublic = ExtractPublicPropTypes<typeof svPanelProps>;
