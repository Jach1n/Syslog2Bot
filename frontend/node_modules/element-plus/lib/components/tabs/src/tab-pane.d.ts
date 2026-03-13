import type { ExtractPublicPropTypes } from 'vue';
import type TabPane from './tab-pane.vue';
/**
 * @deprecated Removed after 3.0.0, Use `TabPaneProps` instead.
 */
export declare const tabPaneProps: {
    readonly label: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly name: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly closable: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
    readonly disabled: BooleanConstructor;
    readonly lazy: BooleanConstructor;
};
export type TabPaneProps = {
    /**
     * @description title of the tab
     */
    label?: string;
    /**
     * @description identifier corresponding to the name of Tabs, representing the alias of the tab-pane, the default is ordinal number of the tab-pane in the sequence, e.g. the first tab-pane is '0'
     */
    name?: string | number;
    /**
     * @description whether Tab is closable
     */
    closable?: boolean;
    /**
     * @description whether Tab is disabled
     */
    disabled?: boolean;
    /**
     * @description whether Tab is lazily rendered
     */
    lazy?: boolean;
};
/**
 * @deprecated Removed after 3.0.0, Use `TabPaneProps` instead.
 */
export type TabPanePropsPublic = ExtractPublicPropTypes<typeof tabPaneProps>;
export type TabPaneInstance = InstanceType<typeof TabPane> & unknown;
