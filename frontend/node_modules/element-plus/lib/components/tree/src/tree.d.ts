import type { ComponentInternalInstance, PropType } from 'vue';
import type { EmitFn } from 'element-plus/es/utils';
import type Node from './model/node';
import type { AllowDragFunction, AllowDropFunction, CheckedInfo, NodeDropType, RenderContentFunction, TreeData } from './tree.type';
export declare const treeProps: {
    readonly data: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => TreeData) | (() => TreeData) | ((new (...args: any[]) => TreeData) | (() => TreeData))[], unknown, unknown, () => never[], boolean>;
    readonly emptyText: {
        readonly type: PropType<string>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly renderAfterExpand: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly nodeKey: StringConstructor;
    readonly checkStrictly: BooleanConstructor;
    readonly defaultExpandAll: BooleanConstructor;
    readonly expandOnClickNode: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly checkOnClickNode: BooleanConstructor;
    readonly checkOnClickLeaf: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly checkDescendants: BooleanConstructor;
    readonly autoExpandParent: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly defaultCheckedKeys: {
        readonly type: PropType<import("./tree.type").TreeKey[]>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly defaultExpandedKeys: {
        readonly type: PropType<import("./tree.type").TreeKey[]>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly currentNodeKey: {
        readonly type: PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number) | ((new (...args: any[]) => string | number) | (() => string | number))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly renderContent: {
        readonly type: PropType<RenderContentFunction>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly showCheckbox: BooleanConstructor;
    readonly draggable: BooleanConstructor;
    readonly allowDrag: {
        readonly type: PropType<AllowDragFunction>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly allowDrop: {
        readonly type: PropType<AllowDropFunction>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly props: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./tree.type").TreeOptionProps) | (() => import("./tree.type").TreeOptionProps) | ((new (...args: any[]) => import("./tree.type").TreeOptionProps) | (() => import("./tree.type").TreeOptionProps))[], unknown, unknown, () => {
        children: string;
        label: string;
        disabled: string;
    }, boolean>;
    readonly lazy: BooleanConstructor;
    readonly highlightCurrent: BooleanConstructor;
    readonly load: {
        readonly type: PropType<import("./tree.type").LoadFunction>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly filterNodeMethod: {
        readonly type: PropType<import("./tree.type").FilterNodeMethodFunction>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly accordion: BooleanConstructor;
    readonly indent: import("element-plus/es/utils").EpPropFinalized<NumberConstructor, unknown, unknown, 18, boolean>;
    readonly icon: {
        readonly type: PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component) | ((new (...args: any[]) => (string | import("vue").Component) & {}) | (() => string | import("vue").Component))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
};
export declare const treeEmits: {
    'check-change': (data: any, checked: boolean, indeterminate: boolean) => any;
    'current-change': (data: any | null, node: Node | null) => boolean;
    'node-click': (data: any, node: Node, nodeInstance: ComponentInternalInstance | null, evt: MouseEvent) => any;
    'node-contextmenu': (evt: Event, data: any, node: Node, nodeInstance: ComponentInternalInstance | null) => any;
    'node-collapse': (data: any, node: Node, nodeInstance: ComponentInternalInstance | null) => any;
    'node-expand': (data: any, node: Node, nodeInstance: ComponentInternalInstance | null) => any;
    check: (data: any, checkedInfo: CheckedInfo) => any;
    'node-drag-start': (node: Node, evt: DragEvent) => DragEvent;
    'node-drag-end': (draggingNode: Node, dropNode: Node | null, dropType: NodeDropType, evt: DragEvent) => DragEvent;
    'node-drop': (draggingNode: Node, dropNode: Node, dropType: Exclude<NodeDropType, "none">, evt: DragEvent) => DragEvent;
    'node-drag-leave': (draggingNode: Node, oldDropNode: Node, evt: DragEvent) => DragEvent;
    'node-drag-enter': (draggingNode: Node, dropNode: Node, evt: DragEvent) => DragEvent;
    'node-drag-over': (draggingNode: Node, dropNode: Node, evt: DragEvent) => DragEvent;
};
export type TreeEmits = EmitFn<typeof treeEmits>;
