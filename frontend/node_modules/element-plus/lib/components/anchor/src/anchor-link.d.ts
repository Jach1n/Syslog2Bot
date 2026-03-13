import type { ExtractPublicPropTypes } from 'vue';
export interface AnchorLinkProps {
    /**
     * @description the text content of the anchor link
     */
    title?: string;
    /**
     * @description The address of the anchor link
     */
    href?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `AnchorLinkProps` instead.
 */
export declare const anchorLinkProps: {
    title: StringConstructor;
    href: StringConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `AnchorLinkProps` instead.
 */
export type AnchorLinkPropsPublic = ExtractPublicPropTypes<typeof anchorLinkProps>;
