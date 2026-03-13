import type { ExtractPublicPropTypes } from 'vue';
export interface EmptyProps {
    /**
     * @description image URL of empty
     */
    image?: string;
    /**
     * @description image size (width) of empty
     */
    imageSize?: number;
    /**
     * @description description of empty
     */
    description?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `EmptyProps` instead.
 */
export declare const emptyProps: {
    readonly image: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly imageSize: NumberConstructor;
    readonly description: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `EmptyProps` instead.
 */
export type EmptyPropsPublic = ExtractPublicPropTypes<typeof emptyProps>;
