import type { TransferPanelProps } from './transfer-panel';
declare var __VLS_29: {}, __VLS_31: {};
type __VLS_Slots = {} & {
    empty?: (props: typeof __VLS_29) => any;
} & {
    default?: (props: typeof __VLS_31) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<TransferPanelProps>, {
    data: () => never[];
    format: () => {};
    defaultChecked: () => never[];
    props: () => import("element-plus/es/utils").Mutable<{
        label: string;
        key: string;
        disabled: string;
    }>;
}>, {
    /** @description filter keyword */
    query: import("vue").Ref<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "checked-change": (value: import("element-plus").TransferKey[], movedKeys?: import("element-plus").TransferKey[] | undefined) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<TransferPanelProps>, {
    data: () => never[];
    format: () => {};
    defaultChecked: () => never[];
    props: () => import("element-plus/es/utils").Mutable<{
        label: string;
        key: string;
        disabled: string;
    }>;
}>>> & {
    "onChecked-change"?: ((value: import("element-plus").TransferKey[], movedKeys?: import("element-plus").TransferKey[] | undefined) => any) | undefined;
}, {
    data: import("element-plus").TransferDataItem[];
    props: import("element-plus").TransferPropsAlias;
    format: import("element-plus").TransferFormat;
    defaultChecked: import("element-plus").TransferKey[];
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
