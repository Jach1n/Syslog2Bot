import type { TransferDataItem, TransferDirection, TransferProps } from './transfer';
import type { TransferPanelInstance } from './transfer-panel';
declare var __VLS_11: {}, __VLS_13: {}, __VLS_61: {}, __VLS_63: {};
type __VLS_Slots = {} & {
    'left-empty'?: (props: typeof __VLS_11) => any;
} & {
    'left-footer'?: (props: typeof __VLS_13) => any;
} & {
    'right-empty'?: (props: typeof __VLS_61) => any;
} & {
    'right-footer'?: (props: typeof __VLS_63) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<TransferProps>, {
    data: () => never[];
    titles: () => [string, string];
    buttonTexts: () => [string, string];
    leftDefaultChecked: () => never[];
    rightDefaultChecked: () => never[];
    modelValue: () => never[];
    format: () => {};
    props: () => {
        label: string;
        key: string;
        disabled: string;
    };
    targetOrder: string;
    validateEvent: boolean;
}>, {
    /** @description clear the filter keyword of a certain panel */
    clearQuery: (which: TransferDirection) => void;
    /** @description left panel ref */
    leftPanel: import("vue").Ref<TransferPanelInstance | undefined>;
    /** @description right panel ref */
    rightPanel: import("vue").Ref<TransferPanelInstance | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: import("./transfer").TransferKey[]) => void;
    change: (value: import("./transfer").TransferKey[], direction: TransferDirection, movedKeys: import("./transfer").TransferKey[]) => void;
    "left-check-change": (value: import("./transfer").TransferKey[], movedKeys?: import("./transfer").TransferKey[] | undefined) => void;
    "right-check-change": (value: import("./transfer").TransferKey[], movedKeys?: import("./transfer").TransferKey[] | undefined) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<TransferProps>, {
    data: () => never[];
    titles: () => [string, string];
    buttonTexts: () => [string, string];
    leftDefaultChecked: () => never[];
    rightDefaultChecked: () => never[];
    modelValue: () => never[];
    format: () => {};
    props: () => {
        label: string;
        key: string;
        disabled: string;
    };
    targetOrder: string;
    validateEvent: boolean;
}>>> & {
    "onUpdate:modelValue"?: ((value: import("./transfer").TransferKey[]) => any) | undefined;
    onChange?: ((value: import("./transfer").TransferKey[], direction: TransferDirection, movedKeys: import("./transfer").TransferKey[]) => any) | undefined;
    "onLeft-check-change"?: ((value: import("./transfer").TransferKey[], movedKeys?: import("./transfer").TransferKey[] | undefined) => any) | undefined;
    "onRight-check-change"?: ((value: import("./transfer").TransferKey[], movedKeys?: import("./transfer").TransferKey[] | undefined) => any) | undefined;
}, {
    data: TransferDataItem[];
    props: import("./transfer").TransferPropsAlias;
    titles: [string, string];
    modelValue: import("./transfer").TransferKey[];
    format: import("./transfer").TransferFormat;
    validateEvent: boolean;
    buttonTexts: [string, string];
    leftDefaultChecked: import("./transfer").TransferKey[];
    rightDefaultChecked: import("./transfer").TransferKey[];
    targetOrder: "original" | "push" | "unshift";
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
