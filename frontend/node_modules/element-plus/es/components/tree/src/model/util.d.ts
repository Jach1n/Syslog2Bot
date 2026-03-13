import type Node from './node';
import type { TreeEmits } from '../tree';
import type { RootTreeType, TreeKey, TreeNodeData } from '../tree.type';
export declare const NODE_KEY = "$treeNodeId";
export declare const markNodeData: (node: Node, data: TreeNodeData | null) => void;
export declare const getNodeKey: (key: TreeKey | undefined, data: TreeNodeData) => any;
export declare const handleCurrentChange: (store: RootTreeType["store"], emit: TreeEmits, setCurrent: () => void) => void;
