import type { ExtractPublicPropTypes } from 'vue';
import type { TabPaneName, TabsPaneContext } from './constants';
import type TabBar from './tab-bar.vue';
/**
 * @deprecated Removed after 3.0.0, Use `TabBarProps` instead.
 */
export declare const tabBarProps: {
    readonly tabs: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => {
        uid: number;
        getVnode: () => import("vue").VNode;
        slots: import("vue").Slots;
        props: {
            label?: string | undefined;
            name?: (string | number) | undefined;
            closable?: boolean | undefined;
            disabled?: boolean | undefined;
            lazy?: boolean | undefined;
        };
        paneName: TabPaneName | undefined;
        active: boolean;
        index: string | undefined;
        isClosable: boolean;
        isFocusInsidePane: () => boolean | undefined;
    }[]) | (() => {
        uid: number;
        getVnode: () => import("vue").VNode;
        slots: import("vue").Slots;
        props: {
            label?: string | undefined;
            name?: (string | number) | undefined;
            closable?: boolean | undefined;
            disabled?: boolean | undefined;
            lazy?: boolean | undefined;
        };
        paneName: TabPaneName | undefined;
        active: boolean;
        index: string | undefined;
        isClosable: boolean;
        isFocusInsidePane: () => boolean | undefined;
    }[]) | ((new (...args: any[]) => {
        uid: number;
        getVnode: () => import("vue").VNode;
        slots: import("vue").Slots;
        props: {
            label?: string | undefined;
            name?: (string | number) | undefined;
            closable?: boolean | undefined;
            disabled?: boolean | undefined;
            lazy?: boolean | undefined;
        };
        paneName: TabPaneName | undefined;
        active: boolean;
        index: string | undefined;
        isClosable: boolean;
        isFocusInsidePane: () => boolean | undefined;
    }[]) | (() => {
        uid: number;
        getVnode: () => import("vue").VNode;
        slots: import("vue").Slots;
        props: {
            label?: string | undefined;
            name?: (string | number) | undefined;
            closable?: boolean | undefined;
            disabled?: boolean | undefined;
            lazy?: boolean | undefined;
        };
        paneName: TabPaneName | undefined;
        active: boolean;
        index: string | undefined;
        isClosable: boolean;
        isFocusInsidePane: () => boolean | undefined;
    }[]))[], unknown, unknown, () => [], boolean>;
    readonly tabRefs: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => {
        [key: string]: HTMLDivElement;
        [key: number]: HTMLDivElement;
    }) | (() => {
        [key: string]: HTMLDivElement;
        [key: number]: HTMLDivElement;
    }) | ((new (...args: any[]) => {
        [key: string]: HTMLDivElement;
        [key: number]: HTMLDivElement;
    }) | (() => {
        [key: string]: HTMLDivElement;
        [key: number]: HTMLDivElement;
    }))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{}>, boolean>;
};
export type TabBarProps = {
    tabs?: TabsPaneContext[];
    tabRefs?: {
        [key: TabPaneName]: HTMLDivElement;
    };
};
/**
 * @deprecated Removed after 3.0.0, Use `TabBarProps` instead.
 */
export type TabBarPropsPublic = ExtractPublicPropTypes<typeof tabBarProps>;
export type TabBarInstance = InstanceType<typeof TabBar> & unknown;
