import Node from './node';
import type { CascaderNodeValue, CascaderOption, CascaderProps, CascaderValue } from './types';
import type { CascaderMenuInstance } from './instance';
import type { CascaderPanelProps } from './config';
declare var __VLS_6: {};
type __VLS_Slots = {} & {
    empty?: (props: typeof __VLS_6) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<CascaderPanelProps>, {
    options: () => CascaderOption[];
    props: () => CascaderProps;
    border: boolean;
}>, {
    menuList: import("vue").Ref<CascaderMenuInstance[]>;
    menus: import("vue").Ref<{
        readonly uid: number;
        readonly level: number;
        readonly value: CascaderNodeValue;
        readonly label: string;
        readonly pathNodes: any[];
        readonly pathValues: CascaderNodeValue[];
        readonly pathLabels: string[];
        childrenData: {
            [x: string]: unknown;
            label?: string | undefined;
            value?: CascaderNodeValue | undefined;
            children?: any[] | undefined;
            disabled?: boolean | undefined;
            leaf?: boolean | undefined;
        }[] | undefined;
        children: any[];
        text: string;
        loaded: boolean;
        checked: boolean;
        indeterminate: boolean;
        loading: boolean;
        readonly data: {
            [x: string]: unknown;
            label?: string | undefined;
            value?: CascaderNodeValue | undefined;
            children?: any[] | undefined;
            disabled?: boolean | undefined;
            leaf?: boolean | undefined;
        };
        readonly config: {
            expandTrigger: import("./types").ExpandTrigger;
            multiple: boolean;
            checkStrictly: boolean;
            emitPath: boolean;
            lazy: boolean;
            lazyLoad: import("./types").LazyLoad;
            value: string;
            label: string;
            children: string;
            disabled: string | import("./types").isDisabled;
            leaf: string | import("./types").isLeaf;
            hoverThreshold: number;
            checkOnClickNode: boolean;
            checkOnClickLeaf: boolean;
            showPrefix: boolean;
        };
        readonly parent?: any | undefined;
        readonly root: boolean;
        readonly isDisabled: boolean;
        readonly isLeaf: boolean;
        readonly valueByOption: CascaderNodeValue | CascaderNodeValue[];
        appendChild: (childData: CascaderOption) => Node;
        calcText: (allLevels: boolean, separator: string) => string;
        broadcast: (checked: boolean) => void;
        emit: () => void;
        onParentCheck: (checked: boolean) => void;
        onChildCheck: () => void;
        setCheckState: (checked: boolean) => void;
        doCheck: (checked: boolean) => void;
    }[][]>;
    checkedNodes: import("vue").Ref<{
        readonly uid: number;
        readonly level: number;
        readonly value: CascaderNodeValue;
        readonly label: string;
        readonly pathNodes: any[];
        readonly pathValues: CascaderNodeValue[];
        readonly pathLabels: string[];
        childrenData: {
            [x: string]: unknown;
            label?: string | undefined;
            value?: CascaderNodeValue | undefined;
            children?: any[] | undefined;
            disabled?: boolean | undefined;
            leaf?: boolean | undefined;
        }[] | undefined;
        children: any[];
        text: string;
        loaded: boolean;
        checked: boolean;
        indeterminate: boolean;
        loading: boolean;
        readonly data: {
            [x: string]: unknown;
            label?: string | undefined;
            value?: CascaderNodeValue | undefined;
            children?: any[] | undefined;
            disabled?: boolean | undefined;
            leaf?: boolean | undefined;
        };
        readonly config: {
            expandTrigger: import("./types").ExpandTrigger;
            multiple: boolean;
            checkStrictly: boolean;
            emitPath: boolean;
            lazy: boolean;
            lazyLoad: import("./types").LazyLoad;
            value: string;
            label: string;
            children: string;
            disabled: string | import("./types").isDisabled;
            leaf: string | import("./types").isLeaf;
            hoverThreshold: number;
            checkOnClickNode: boolean;
            checkOnClickLeaf: boolean;
            showPrefix: boolean;
        };
        readonly parent?: any | undefined;
        readonly root: boolean;
        readonly isDisabled: boolean;
        readonly isLeaf: boolean;
        readonly valueByOption: CascaderNodeValue | CascaderNodeValue[];
        appendChild: (childData: CascaderOption) => Node;
        calcText: (allLevels: boolean, separator: string) => string;
        broadcast: (checked: boolean) => void;
        emit: () => void;
        onParentCheck: (checked: boolean) => void;
        onChildCheck: () => void;
        setCheckState: (checked: boolean) => void;
        doCheck: (checked: boolean) => void;
    }[]>;
    handleKeyDown: (e: KeyboardEvent) => void;
    handleCheckChange: (node: Node, checked: boolean, emitClose?: boolean) => void;
    getFlattedNodes: (leafOnly: boolean) => Node[];
    /**
     * @description get an array of currently selected node,(leafOnly) whether only return the leaf checked nodes, default is `false`
     */
    getCheckedNodes: (leafOnly: boolean) => Node[];
    /**
     * @description clear checked nodes
     */
    clearCheckedNodes: () => void;
    calculateCheckedValue: () => void;
    scrollToExpandingNode: () => void;
    loadLazyRootNodes: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: CascaderValue | null | undefined) => void;
    change: (value: CascaderValue | null | undefined) => void;
    close: () => void;
    "expand-change": (value: import("./types").CascaderNodePathValue) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<CascaderPanelProps>, {
    options: () => CascaderOption[];
    props: () => CascaderProps;
    border: boolean;
}>>> & {
    "onUpdate:modelValue"?: ((value: CascaderValue | null | undefined) => any) | undefined;
    onChange?: ((value: CascaderValue | null | undefined) => any) | undefined;
    onClose?: (() => any) | undefined;
    "onExpand-change"?: ((value: import("./types").CascaderNodePathValue) => any) | undefined;
}, {
    border: boolean;
    props: CascaderProps;
    options: CascaderOption[];
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
