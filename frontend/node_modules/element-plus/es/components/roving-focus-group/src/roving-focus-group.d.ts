import type { ExtractPropTypes, ExtractPublicPropTypes, StyleValue } from 'vue';
export declare const rovingFocusGroupProps: {
    style: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | false | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue) | ((new (...args: any[]) => string | false | import("vue").CSSProperties | StyleValue[]) | (() => StyleValue))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    currentTabId: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string) | (() => string | null) | ((new (...args: any[]) => string) | (() => string | null))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    defaultCurrentTabId: StringConstructor;
    loop: BooleanConstructor;
    dir: import("element-plus/es/utils").EpPropFinalized<StringConstructor, string, unknown, string, boolean>;
    orientation: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => "horizontal" | "vertical") | (() => "horizontal" | "vertical" | undefined) | ((new (...args: any[]) => "horizontal" | "vertical") | (() => "horizontal" | "vertical" | undefined))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    onBlur: FunctionConstructor;
    onFocus: FunctionConstructor;
    onMousedown: FunctionConstructor;
};
export type ElRovingFocusGroupProps = ExtractPropTypes<typeof rovingFocusGroupProps>;
export type ElRovingFocusGroupPropsPublic = ExtractPublicPropTypes<typeof rovingFocusGroupProps>;
declare const ElCollection: {
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<ExtractPropTypes<{}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<ExtractPropTypes<{}>>, {}, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<ExtractPropTypes<{}>>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<ExtractPropTypes<{}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & {
    name: string;
    setup(): void;
}, ElCollectionItem: {
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<ExtractPropTypes<{}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<ExtractPropTypes<{}>>, {}, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<ExtractPropTypes<{}>>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<ExtractPropTypes<{}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & {
    name: string;
    setup(_: unknown, { attrs }: import("vue").SetupContext): void;
}, COLLECTION_INJECTION_KEY: import("vue").InjectionKey<import("element-plus/es/components/collection").ElCollectionInjectionContext>, COLLECTION_ITEM_INJECTION_KEY: import("vue").InjectionKey<import("element-plus/es/components/collection").ElCollectionItemInjectionContext>;
export { ElCollection, ElCollectionItem, COLLECTION_INJECTION_KEY as ROVING_FOCUS_COLLECTION_INJECTION_KEY, COLLECTION_ITEM_INJECTION_KEY as ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY, };
