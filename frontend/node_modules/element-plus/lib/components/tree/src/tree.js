'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var icon = require('../../../utils/vue/icon.js');
var types = require('../../../utils/types.js');

const treeProps = runtime.buildProps({
  data: {
    type: runtime.definePropType(Array),
    default: () => []
  },
  emptyText: {
    type: String
  },
  renderAfterExpand: {
    type: Boolean,
    default: true
  },
  nodeKey: String,
  checkStrictly: Boolean,
  defaultExpandAll: Boolean,
  expandOnClickNode: {
    type: Boolean,
    default: true
  },
  checkOnClickNode: Boolean,
  checkOnClickLeaf: {
    type: Boolean,
    default: true
  },
  checkDescendants: Boolean,
  autoExpandParent: {
    type: Boolean,
    default: true
  },
  defaultCheckedKeys: {
    type: Array
  },
  defaultExpandedKeys: {
    type: Array
  },
  currentNodeKey: {
    type: [String, Number]
  },
  renderContent: {
    type: runtime.definePropType(Function)
  },
  showCheckbox: Boolean,
  draggable: Boolean,
  allowDrag: {
    type: runtime.definePropType(Function)
  },
  allowDrop: {
    type: runtime.definePropType(Function)
  },
  props: {
    type: Object,
    default: () => ({
      children: "children",
      label: "label",
      disabled: "disabled"
    })
  },
  lazy: Boolean,
  highlightCurrent: Boolean,
  load: {
    type: Function
  },
  filterNodeMethod: {
    type: Function
  },
  accordion: Boolean,
  indent: {
    type: Number,
    default: 18
  },
  icon: {
    type: icon.iconPropType
  }
});
const treeEmits = {
  "check-change": (data, checked, indeterminate) => data && types.isBoolean(checked) && types.isBoolean(indeterminate),
  "current-change": (data, node) => true,
  "node-click": (data, node, nodeInstance, evt) => data && node && evt instanceof Event,
  "node-contextmenu": (evt, data, node, nodeInstance) => evt instanceof Event && data && node,
  "node-collapse": (data, node, nodeInstance) => data && node,
  "node-expand": (data, node, nodeInstance) => data && node,
  check: (data, checkedInfo) => data && checkedInfo,
  "node-drag-start": (node, evt) => node && evt,
  "node-drag-end": (draggingNode, dropNode, dropType, evt) => draggingNode && evt,
  "node-drop": (draggingNode, dropNode, dropType, evt) => draggingNode && dropNode && evt,
  "node-drag-leave": (draggingNode, oldDropNode, evt) => draggingNode && oldDropNode && evt,
  "node-drag-enter": (draggingNode, dropNode, evt) => draggingNode && dropNode && evt,
  "node-drag-over": (draggingNode, dropNode, evt) => draggingNode && dropNode && evt
};

exports.treeEmits = treeEmits;
exports.treeProps = treeProps;
//# sourceMappingURL=tree.js.map
