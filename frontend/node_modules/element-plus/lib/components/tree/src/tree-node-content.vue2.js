'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index$1 = require('../../text/index.js');
var tokens = require('./tokens.js');
var index = require('../../../hooks/use-namespace/index.js');

var _sfc_main = vue.defineComponent({
  name: "ElTreeNodeContent",
  props: {
    node: {
      type: Object,
      required: true
    },
    renderContent: Function
  },
  setup(props) {
    const ns = index.useNamespace("tree");
    const nodeInstance = vue.inject(
      tokens.NODE_INSTANCE_INJECTION_KEY
    );
    const tree = vue.inject(tokens.ROOT_TREE_INJECTION_KEY);
    return () => {
      const node = props.node;
      const { data, store } = node;
      return props.renderContent ? props.renderContent(vue.h, { _self: nodeInstance, node, data, store }) : vue.renderSlot(tree.ctx.slots, "default", { node, data }, () => [
        vue.h(
          index$1.ElText,
          { tag: "span", truncated: true, class: ns.be("node", "label") },
          () => [node.label]
        )
      ]);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=tree-node-content.vue2.js.map
