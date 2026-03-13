import { inject, onBeforeUnmount, provide } from 'vue';
import { TREE_NODE_MAP_INJECTION_KEY } from '../tokens.mjs';

function useNodeExpandEventBroadcast(props) {
  const parentNodeMap = inject(
    TREE_NODE_MAP_INJECTION_KEY,
    null
  );
  let currentNodeMap = {
    treeNodeExpand: (node) => {
      var _a;
      if (props.node !== node) {
        (_a = props.node) == null ? void 0 : _a.collapse();
      }
    },
    children: /* @__PURE__ */ new Set()
  };
  if (parentNodeMap) {
    parentNodeMap.children.add(currentNodeMap);
  }
  onBeforeUnmount(() => {
    if (parentNodeMap) {
      parentNodeMap.children.delete(currentNodeMap);
    }
    currentNodeMap = null;
  });
  provide(TREE_NODE_MAP_INJECTION_KEY, currentNodeMap);
  return {
    broadcastExpanded: (node) => {
      if (!props.accordion) return;
      for (const childNode of currentNodeMap.children) {
        childNode.treeNodeExpand(node);
      }
    }
  };
}

export { useNodeExpandEventBroadcast };
//# sourceMappingURL=useNodeExpandEventBroadcast.mjs.map
