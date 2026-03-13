import type { MentionDropdownProps } from './mention-dropdown';
import type { MentionOption } from './types';
declare var __VLS_1: {}, __VLS_10: {
    item: MentionOption;
    index: number;
}, __VLS_12: {}, __VLS_14: {};
type __VLS_Slots = {} & {
    header?: (props: typeof __VLS_1) => any;
} & {
    label?: (props: typeof __VLS_10) => any;
} & {
    loading?: (props: typeof __VLS_12) => any;
} & {
    footer?: (props: typeof __VLS_14) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<MentionDropdownProps>, {
    options: () => never[];
}>, {
    hoveringIndex: import("vue").Ref<number>;
    navigateOptions: (direction: "next" | "prev") => void;
    selectHoverOption: () => void;
    hoverOption: import("vue").ComputedRef<MentionOption>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    select: (option: MentionOption) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<MentionDropdownProps>, {
    options: () => never[];
}>>> & {
    onSelect?: ((option: MentionOption) => any) | undefined;
}, {
    options: MentionOption[];
}, {}>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
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
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
type __VLS_PrettifyLocal<T> = {
    [K in keyof T as K]: T[K];
} & {};
