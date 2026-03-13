import type { ExtractPublicPropTypes } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
export interface BreadcrumbItemProps {
    /**
     * @description target route of the link, same as `to` of `vue-router`
     */
    to?: RouteLocationRaw;
    /**
     * @description if `true`, the navigation will not leave a history record
     */
    replace?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `BreadcrumbItemProps` instead.
 */
export declare const breadcrumbItemProps: {
    readonly to: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string | import("vue-router").RouteLocationAsRelativeGeneric | import("vue-router").RouteLocationAsPathGeneric) | (() => string | import("vue-router").RouteLocationAsRelativeGeneric | import("vue-router").RouteLocationAsPathGeneric) | ((new (...args: any[]) => string | import("vue-router").RouteLocationAsRelativeGeneric | import("vue-router").RouteLocationAsPathGeneric) | (() => string | import("vue-router").RouteLocationAsRelativeGeneric | import("vue-router").RouteLocationAsPathGeneric))[], unknown, unknown, "", boolean>;
    readonly replace: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `BreadcrumbItemProps` instead.
 */
export type BreadcrumbItemPropsPublic = ExtractPublicPropTypes<typeof breadcrumbItemProps>;
