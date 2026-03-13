import type { ExtractPublicPropTypes } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import type { MenuItemRegistered } from './types';
export interface MenuItemProps {
    /**
     * @description unique identification
     * - will be required in the next major version
     * - required: true
     */
    index?: string | null;
    /**
     * @description Vue Router object
     */
    route?: RouteLocationRaw;
    /**
     * @description whether disabled
     */
    disabled?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `MenuItemProps` instead.
 */
export declare const menuItemProps: {
    readonly index: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => string) | (() => string | null) | ((new (...args: any[]) => string) | (() => string | null))[], unknown, unknown, null, boolean>;
    readonly route: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | import("vue-router").RouteLocationAsRelativeGeneric | import("vue-router").RouteLocationAsPathGeneric) | (() => string | import("vue-router").RouteLocationAsRelativeGeneric | import("vue-router").RouteLocationAsPathGeneric) | ((new (...args: any[]) => string | import("vue-router").RouteLocationAsRelativeGeneric | import("vue-router").RouteLocationAsPathGeneric) | (() => string | import("vue-router").RouteLocationAsRelativeGeneric | import("vue-router").RouteLocationAsPathGeneric))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly disabled: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `MenuItemProps` instead.
 */
export type MenuItemPropsPublic = ExtractPublicPropTypes<typeof menuItemProps>;
export declare const menuItemEmits: {
    click: (item: MenuItemRegistered) => boolean;
};
export type MenuItemEmits = typeof menuItemEmits;
