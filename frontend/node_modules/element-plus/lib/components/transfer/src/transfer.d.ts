import type { ExtractPublicPropTypes, h as H, VNode } from 'vue';
import type Transfer from './transfer.vue';
export type TransferKey = string | number;
export type TransferDirection = 'left' | 'right';
export type TransferDataItem = Record<string, any>;
export type renderContent = (h: typeof H, option: TransferDataItem) => VNode | VNode[];
export interface TransferFormat {
    noChecked?: string;
    hasChecked?: string;
}
export interface TransferPropsAlias {
    label?: string;
    key?: string;
    disabled?: string;
}
export interface TransferCheckedState {
    leftChecked: TransferKey[];
    rightChecked: TransferKey[];
}
export declare const LEFT_CHECK_CHANGE_EVENT = "left-check-change";
export declare const RIGHT_CHECK_CHANGE_EVENT = "right-check-change";
export interface TransferProps {
    /**
     * @description data source
     */
    data?: TransferDataItem[];
    /**
     * @description custom list titles
     */
    titles?: [string, string];
    /**
     * @description custom button texts
     */
    buttonTexts?: [string, string];
    /**
     * @description placeholder for the filter input
     */
    filterPlaceholder?: string;
    /**
     * @description custom filter method
     */
    filterMethod?: (query: string, item: TransferDataItem) => boolean;
    /**
     * @description key array of initially checked data items of the left list
     */
    leftDefaultChecked?: TransferKey[];
    /**
     * @description key array of initially checked data items of the right list
     */
    rightDefaultChecked?: TransferKey[];
    /**
     * @description custom render function for data items
     */
    renderContent?: renderContent;
    /**
     * @description binding value
     */
    modelValue?: TransferKey[];
    /**
     * @description texts for checking status in list header
     */
    format?: TransferFormat;
    /**
     * @description whether Transfer is filterable
     */
    filterable?: boolean;
    /**
     * @description prop aliases for data source
     */
    props?: TransferPropsAlias;
    /**
     * @description order strategy for elements in the target list. If set to `original`, the elements will keep the same order as the data source. If set to `push`, the newly added elements will be pushed to the bottom. If set to `unshift`, the newly added elements will be inserted on the top
     */
    targetOrder?: 'original' | 'push' | 'unshift';
    /**
     * @description whether to trigger form validation
     */
    validateEvent?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `TransferProps` instead.
 */
export declare const transferProps: {
    readonly data: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => TransferDataItem[]) | (() => TransferDataItem[]) | ((new (...args: any[]) => TransferDataItem[]) | (() => TransferDataItem[]))[], unknown, unknown, () => never[], boolean>;
    readonly titles: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => [string, string]) | (() => [string, string]) | ((new (...args: any[]) => [string, string]) | (() => [string, string]))[], unknown, unknown, () => never[], boolean>;
    readonly buttonTexts: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => [string, string]) | (() => [string, string]) | ((new (...args: any[]) => [string, string]) | (() => [string, string]))[], unknown, unknown, () => never[], boolean>;
    readonly filterPlaceholder: StringConstructor;
    readonly filterMethod: {
        readonly type: import("vue").PropType<(query: string, item: TransferDataItem) => boolean>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly leftDefaultChecked: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => TransferKey[]) | (() => TransferKey[]) | ((new (...args: any[]) => TransferKey[]) | (() => TransferKey[]))[], unknown, unknown, () => never[], boolean>;
    readonly rightDefaultChecked: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => TransferKey[]) | (() => TransferKey[]) | ((new (...args: any[]) => TransferKey[]) | (() => TransferKey[]))[], unknown, unknown, () => never[], boolean>;
    readonly renderContent: {
        readonly type: import("vue").PropType<renderContent>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly modelValue: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => TransferKey[]) | (() => TransferKey[]) | ((new (...args: any[]) => TransferKey[]) | (() => TransferKey[]))[], unknown, unknown, () => never[], boolean>;
    readonly format: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => TransferFormat) | (() => TransferFormat) | ((new (...args: any[]) => TransferFormat) | (() => TransferFormat))[], unknown, unknown, () => {}, boolean>;
    readonly filterable: BooleanConstructor;
    readonly props: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => TransferPropsAlias) | (() => TransferPropsAlias) | ((new (...args: any[]) => TransferPropsAlias) | (() => TransferPropsAlias))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{
        readonly label: "label";
        readonly key: "key";
        readonly disabled: "disabled";
    }>, boolean>;
    readonly targetOrder: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "push" | "unshift" | "original", unknown, "original", boolean>;
    readonly validateEvent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `TransferProps` instead.
 */
export type TransferPropsPublic = ExtractPublicPropTypes<typeof transferProps>;
export declare const transferCheckedChangeFn: (value: TransferKey[], movedKeys?: TransferKey[]) => boolean;
export declare const transferEmits: {
    change: (value: TransferKey[], direction: TransferDirection, movedKeys: TransferKey[]) => boolean;
    "update:modelValue": (value: TransferKey[]) => boolean;
    "left-check-change": (value: TransferKey[], movedKeys?: TransferKey[]) => boolean;
    "right-check-change": (value: TransferKey[], movedKeys?: TransferKey[]) => boolean;
};
export type TransferEmits = typeof transferEmits;
export type TransferInstance = InstanceType<typeof Transfer> & unknown;
