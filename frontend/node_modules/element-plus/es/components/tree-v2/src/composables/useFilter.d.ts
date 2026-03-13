import type { Ref } from 'vue';
import type { Tree, TreeKey, TreeNode, TreeProps } from '../types';
export declare function useFilter(props: TreeProps, tree: Ref<Tree | undefined>): {
    hiddenExpandIconKeySet: Ref<Set<TreeKey> & Omit<Set<TreeKey>, keyof Set<any>>>;
    hiddenNodeKeySet: Ref<Set<TreeKey> & Omit<Set<TreeKey>, keyof Set<any>>>;
    doFilter: (query: string) => Set<TreeKey> | undefined;
    isForceHiddenExpandIcon: (node: TreeNode) => boolean;
};
