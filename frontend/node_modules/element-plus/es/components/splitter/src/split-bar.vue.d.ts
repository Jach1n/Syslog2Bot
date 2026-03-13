declare var __VLS_1: {}, __VLS_8: {};
type __VLS_Slots = {} & {
    'start-collapsible'?: (props: typeof __VLS_1) => any;
} & {
    'end-collapsible'?: (props: typeof __VLS_8) => any;
};
declare const __VLS_base: import("vue").DefineComponent<{
    index: {
        type: NumberConstructor;
        required: true;
    };
    layout: {
        type: StringConstructor;
        values: readonly ["horizontal", "vertical"];
        default: string;
    };
    resizable: {
        type: BooleanConstructor;
        default: boolean;
    };
    lazy: BooleanConstructor;
    startCollapsible: BooleanConstructor;
    endCollapsible: BooleanConstructor;
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    collapse: (...args: any[]) => void;
    moveStart: (...args: any[]) => void;
    moving: (...args: any[]) => void;
    moveEnd: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    index: {
        type: NumberConstructor;
        required: true;
    };
    layout: {
        type: StringConstructor;
        values: readonly ["horizontal", "vertical"];
        default: string;
    };
    resizable: {
        type: BooleanConstructor;
        default: boolean;
    };
    lazy: BooleanConstructor;
    startCollapsible: BooleanConstructor;
    endCollapsible: BooleanConstructor;
}>> & {
    onCollapse?: ((...args: any[]) => any) | undefined;
    onMoveStart?: ((...args: any[]) => any) | undefined;
    onMoving?: ((...args: any[]) => any) | undefined;
    onMoveEnd?: ((...args: any[]) => any) | undefined;
}, {
    layout: string;
    lazy: boolean;
    resizable: boolean;
    startCollapsible: boolean;
    endCollapsible: boolean;
}, {}>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
