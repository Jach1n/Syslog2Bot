declare const __VLS_export: import("vue").DefineComponent<{
    focusable: {
        type: BooleanConstructor;
        default: boolean;
    };
    active: BooleanConstructor;
}, {
    id: import("vue").Ref<string>;
    handleKeydown: (event: Event) => void;
    handleFocus: (event: Event) => void;
    handleMousedown: (event: Event) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("focus" | "keydown" | "mousedown")[], "focus" | "keydown" | "mousedown", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    focusable: {
        type: BooleanConstructor;
        default: boolean;
    };
    active: BooleanConstructor;
}>> & {
    onFocus?: ((...args: any[]) => any) | undefined;
    onKeydown?: ((...args: any[]) => any) | undefined;
    onMousedown?: ((...args: any[]) => any) | undefined;
}, {
    active: boolean;
    focusable: boolean;
}, {}>;
declare const _default: typeof __VLS_export;
export default _default;
