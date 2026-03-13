import type { TabBarProps } from './tab-bar';
import type { CSSProperties } from 'vue';
declare const __VLS_export: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<TabBarProps>, {
    tabs: () => never[];
    tabRefs: () => {};
}>, {
    /** @description tab root html element */
    ref: import("vue").Ref<HTMLDivElement | undefined>;
    /** @description method to manually update tab bar style */
    update: () => CSSProperties;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<TabBarProps>, {
    tabs: () => never[];
    tabRefs: () => {};
}>>>, {
    tabs: import("./constants").TabsPaneContext[];
    tabRefs: {
        [key: import("./constants").TabPaneName]: HTMLDivElement;
    };
}, {}>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<Required<T>[K]>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaultsLocal<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_PrettifyLocal<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_PrettifyLocal<T> = {
    [K in keyof T as K]: T[K];
} & {};
