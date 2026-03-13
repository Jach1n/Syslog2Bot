import type { PropType } from 'vue';
declare const __VLS_export: import("vue").DefineComponent<{
    loop: BooleanConstructor;
    trapped: BooleanConstructor;
    focusTrapEl: PropType<HTMLElement>;
    focusStartEl: {
        type: PropType<"container" | "first" | HTMLElement>;
        default: string;
    };
}, {
    onKeydown: (e: KeyboardEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("focusin" | "focusout" | "focusAfterTrapped" | "focusAfterReleased" | "focusout-prevented" | "release-requested")[], "focusin" | "focusout" | "focusAfterTrapped" | "focusAfterReleased" | "focusout-prevented" | "release-requested", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    loop: BooleanConstructor;
    trapped: BooleanConstructor;
    focusTrapEl: PropType<HTMLElement>;
    focusStartEl: {
        type: PropType<"container" | "first" | HTMLElement>;
        default: string;
    };
}>> & {
    onFocusin?: ((...args: any[]) => any) | undefined;
    onFocusout?: ((...args: any[]) => any) | undefined;
    onFocusAfterTrapped?: ((...args: any[]) => any) | undefined;
    onFocusAfterReleased?: ((...args: any[]) => any) | undefined;
    "onFocusout-prevented"?: ((...args: any[]) => any) | undefined;
    "onRelease-requested"?: ((...args: any[]) => any) | undefined;
}, {
    loop: boolean;
    trapped: boolean;
    focusStartEl: HTMLElement | "container" | "first";
}, {}>;
declare const _default: typeof __VLS_export;
export default _default;
