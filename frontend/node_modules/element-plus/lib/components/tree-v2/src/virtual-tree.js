'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var icon = require('../../../utils/vue/icon.js');
var typescript = require('../../../utils/typescript.js');
var types = require('../../../utils/types.js');

const ROOT_TREE_INJECTION_KEY = /* @__PURE__ */ Symbol();
const EMPTY_NODE = {
  key: -1,
  level: -1,
  data: {}
};
var TreeOptionsEnum = /* @__PURE__ */ ((TreeOptionsEnum2) => {
  TreeOptionsEnum2["KEY"] = "id";
  TreeOptionsEnum2["LABEL"] = "label";
  TreeOptionsEnum2["CHILDREN"] = "children";
  TreeOptionsEnum2["DISABLED"] = "disabled";
  TreeOptionsEnum2["CLASS"] = "";
  return TreeOptionsEnum2;
})(TreeOptionsEnum || {});
var SetOperationEnum = /* @__PURE__ */ ((SetOperationEnum2) => {
  SetOperationEnum2["ADD"] = "add";
  SetOperationEnum2["DELETE"] = "delete";
  return SetOperationEnum2;
})(SetOperationEnum || {});
const itemSize = {
  type: Number,
  default: 26
};
const treeProps = runtime.buildProps({
  data: {
    type: runtime.definePropType(Array),
    default: () => typescript.mutable([])
  },
  emptyText: {
    type: String
  },
  height: {
    type: Number,
    default: 200
  },
  props: {
    type: runtime.definePropType(Object),
    default: () => typescript.mutable({
      children: "children" /* CHILDREN */,
      label: "label" /* LABEL */,
      disabled: "disabled" /* DISABLED */,
      value: "id" /* KEY */,
      class: "" /* CLASS */
    })
  },
  highlightCurrent: Boolean,
  showCheckbox: Boolean,
  defaultCheckedKeys: {
    type: runtime.definePropType(Array),
    default: () => typescript.mutable([])
  },
  // Whether checked state of a node not affects its father and
  // child nodes when show-checkbox is true
  checkStrictly: Boolean,
  defaultExpandedKeys: {
    type: runtime.definePropType(Array),
    default: () => typescript.mutable([])
  },
  indent: {
    type: Number,
    default: 16
  },
  itemSize,
  icon: {
    type: icon.iconPropType
  },
  expandOnClickNode: {
    type: Boolean,
    default: true
  },
  checkOnClickNode: Boolean,
  checkOnClickLeaf: {
    type: Boolean,
    default: true
  },
  currentNodeKey: {
    type: runtime.definePropType([String, Number])
  },
  // TODO need to optimization
  accordion: Boolean,
  filterMethod: {
    type: runtime.definePropType(Function)
  },
  // Performance mode will increase memory usage, but scrolling will be smoother
  perfMode: {
    type: Boolean,
    default: true
  },
  /**
   * @description always show scrollbar
   */
  scrollbarAlwaysOn: Boolean
});
const treeNodeProps = runtime.buildProps({
  node: {
    type: runtime.definePropType(Object),
    default: () => typescript.mutable(EMPTY_NODE)
  },
  expanded: Boolean,
  checked: Boolean,
  indeterminate: Boolean,
  showCheckbox: Boolean,
  disabled: Boolean,
  current: Boolean,
  hiddenExpandIcon: Boolean,
  itemSize
});
const treeNodeContentProps = runtime.buildProps({
  node: {
    type: runtime.definePropType(Object),
    required: true
  }
});
const NODE_CLICK = "node-click";
const NODE_DROP = "node-drop";
const NODE_EXPAND = "node-expand";
const NODE_COLLAPSE = "node-collapse";
const CURRENT_CHANGE = "current-change";
const NODE_CHECK = "check";
const NODE_CHECK_CHANGE = "check-change";
const NODE_CONTEXTMENU = "node-contextmenu";
const treeEmits = {
  [NODE_CLICK]: (data, node, e) => data && node && e,
  [NODE_DROP]: (data, node, e) => data && node && e,
  [NODE_EXPAND]: (data, node) => data && node,
  [NODE_COLLAPSE]: (data, node) => data && node,
  [CURRENT_CHANGE]: (data, node) => data && node,
  [NODE_CHECK]: (data, checkedInfo) => data && checkedInfo,
  [NODE_CHECK_CHANGE]: (data, checked) => data && types.isBoolean(checked),
  [NODE_CONTEXTMENU]: (evt, data, node) => evt && data && node
};
const treeNodeEmits = {
  click: (node, e) => !!(node && e),
  drop: (node, e) => !!(node && e),
  toggle: (node) => !!node,
  check: (node, checked) => node && types.isBoolean(checked)
};

exports.CURRENT_CHANGE = CURRENT_CHANGE;
exports.EMPTY_NODE = EMPTY_NODE;
exports.NODE_CHECK = NODE_CHECK;
exports.NODE_CHECK_CHANGE = NODE_CHECK_CHANGE;
exports.NODE_CLICK = NODE_CLICK;
exports.NODE_COLLAPSE = NODE_COLLAPSE;
exports.NODE_CONTEXTMENU = NODE_CONTEXTMENU;
exports.NODE_DROP = NODE_DROP;
exports.NODE_EXPAND = NODE_EXPAND;
exports.ROOT_TREE_INJECTION_KEY = ROOT_TREE_INJECTION_KEY;
exports.SetOperationEnum = SetOperationEnum;
exports.TreeOptionsEnum = TreeOptionsEnum;
exports.treeEmits = treeEmits;
exports.treeNodeContentProps = treeNodeContentProps;
exports.treeNodeEmits = treeNodeEmits;
exports.treeNodeProps = treeNodeProps;
exports.treeProps = treeProps;
//# sourceMappingURL=virtual-tree.js.map
