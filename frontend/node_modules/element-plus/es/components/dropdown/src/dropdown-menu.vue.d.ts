declare const __VLS_export: import("vue").DefineComponent<{
    onKeydown: {
        readonly type: import("vue").PropType<(e: KeyboardEvent) => void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}, {
    size: import("vue").ComputedRef<string> | undefined;
    rovingFocusGroupRootStyle: import("vue").Ref<import("vue").StyleValue>;
    dropdownKls: import("vue").ComputedRef<string[]>;
    role: import("vue").ComputedRef<"dialog" | "menu" | "grid" | "listbox" | "tooltip" | "tree" | "group" | "navigation" | undefined>;
    triggerId: import("vue").ComputedRef<string>;
    dropdownListWrapperRef: (el: Element | import("vue").ComponentPublicInstance | null) => void;
    handleKeydown: (event: KeyboardEvent) => void;
    onBlur: (e: Event) => void;
    handleFocus: (e: FocusEvent) => void;
    onMousedown: (e: Event) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    onKeydown: {
        readonly type: import("vue").PropType<(e: KeyboardEvent) => void>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}>>, {}, {}>;
declare const _default: typeof __VLS_export;
export default _default;
