declare const __VLS_export: import("vue").DefineComponent<{
    readonly command: import("element-plus/es/utils").EpPropFinalized<readonly [ObjectConstructor, StringConstructor, NumberConstructor], unknown, unknown, () => {}, boolean>;
    readonly disabled: BooleanConstructor;
    readonly divided: BooleanConstructor;
    readonly textValue: StringConstructor;
    readonly icon: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component) | ((new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}, {
    handleClick: (event: PointerEvent) => void;
    handlePointerMove: (event: PointerEvent) => void;
    handlePointerLeave: (event: PointerEvent) => void;
    propsAndAttrs: import("vue").ComputedRef<{
        disabled: boolean;
        command: import("element-plus/es/utils").EpPropMergeType<readonly [ObjectConstructor, StringConstructor, NumberConstructor], unknown, unknown>;
        divided: boolean;
        icon: import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component) | ((new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component))[], unknown, unknown> | undefined;
        textValue: string | undefined;
        onClick: ((...args: any[]) => any) | undefined;
        onPointerleave: ((...args: any[]) => any) | undefined;
        onPointermove: ((...args: any[]) => any) | undefined;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("click" | "pointerleave" | "pointermove")[], "click" | "pointerleave" | "pointermove", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly command: import("element-plus/es/utils").EpPropFinalized<readonly [ObjectConstructor, StringConstructor, NumberConstructor], unknown, unknown, () => {}, boolean>;
    readonly disabled: BooleanConstructor;
    readonly divided: BooleanConstructor;
    readonly textValue: StringConstructor;
    readonly icon: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component) | ((new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
    onPointerleave?: ((...args: any[]) => any) | undefined;
    onPointermove?: ((...args: any[]) => any) | undefined;
}, {
    readonly disabled: boolean;
    readonly command: import("element-plus/es/utils").EpPropMergeType<readonly [ObjectConstructor, StringConstructor, NumberConstructor], unknown, unknown>;
    readonly divided: boolean;
}, {}>;
declare const _default: typeof __VLS_export;
export default _default;
