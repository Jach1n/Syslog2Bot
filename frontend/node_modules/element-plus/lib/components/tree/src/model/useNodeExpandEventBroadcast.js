'use strict';

var vue = require('vue');
var tokens = require('../tokens.js');

function useNodeExpandEventBroadcast(props) {
  const parentNodeMap = vue.inject(
    tokens.TREE_NODE_MAP_INJECTION_KEY,
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
  vue.onBeforeUnmount(() => {
    if (parentNodeMap) {
      parentNodeMap.children.delete(currentNodeMap);
    }
    currentNodeMap = null;
  });
  vue.provide(tokens.TREE_NODE_MAP_INJECTION_KEY, currentNodeMap);
  return {
    broadcastExpanded: (node) => {
      if (!props.accordion) return;
      for (const childNode of currentNodeMap.children) {
        childNode.treeNodeExpand(node);
      }
    }
  };
}

exports.useNodeExpandEventBroadcast = useNodeExpandEventBroadcast;
//# sourceMappingURL=useNodeExpandEventBroadcast.js.map
