import type { ExtractPublicPropTypes } from 'vue';
import type Icon from './icon.vue';
export interface IconProps {
    /**
     * @description SVG icon size, size x size
     */
    size?: number | string;
    /**
     * @description SVG tag's fill attribute
     */
    color?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `IconProps` instead.
 */
export declare const iconProps: {
    readonly size: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number) | ((new (...args: any[]) => string | number) | (() => string | number))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly color: {
        readonly type: import("vue").PropType<string>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
};
/**
 * @deprecated Removed after 3.0.0, Use `IconProps` instead.
 */
export type IconPropsPublic = ExtractPublicPropTypes<typeof iconProps>;
export type IconInstance = InstanceType<typeof Icon> & unknown;
