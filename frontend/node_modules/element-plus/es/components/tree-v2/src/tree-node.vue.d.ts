import type { TreeNode, TreeNodeProps } from './types';
import type { CheckboxValueType } from 'element-plus/es/components/checkbox';
declare const __VLS_export: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<TreeNodeProps>, {
    node: () => import("element-plus/es/utils").Mutable<{
        readonly key: -1;
        readonly level: -1;
        readonly data: {};
    }>;
    itemSize: number;
}>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (node: TreeNode, e: MouseEvent) => void;
    drop: (node: TreeNode, e: DragEvent) => void;
    toggle: (node: TreeNode) => void;
    check: (node: TreeNode, checked: CheckboxValueType) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<TreeNodeProps>, {
    node: () => import("element-plus/es/utils").Mutable<{
        readonly key: -1;
        readonly level: -1;
        readonly data: {};
    }>;
    itemSize: number;
}>>> & {
    onClick?: ((node: TreeNode, e: MouseEvent) => any) | undefined;
    onDrop?: ((node: TreeNode, e: DragEvent) => any) | undefined;
    onToggle?: ((node: TreeNode) => any) | undefined;
    onCheck?: ((node: TreeNode, checked: CheckboxValueType) => any) | undefined;
}, {
    itemSize: number;
    node: TreeNode;
}, {}>;
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
type __VLS_PrettifyLocal<T> = {
    [K in keyof T as K]: T[K];
} & {};
