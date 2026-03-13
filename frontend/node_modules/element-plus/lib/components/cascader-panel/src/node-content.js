'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var types = require('./types.js');
var index = require('../../../hooks/use-namespace/index.js');
var shared = require('@vue/shared');

function isVNodeEmpty(vnodes) {
  return !!(shared.isArray(vnodes) ? vnodes.every(({
    type
  }) => type === vue.Comment) : (vnodes == null ? void 0 : vnodes.type) === vue.Comment);
}
var NodeContent = /* @__PURE__ */ vue.defineComponent({
  name: "NodeContent",
  props: {
    node: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const ns = index.useNamespace("cascader-node");
    const {
      renderLabelFn
    } = vue.inject(types.CASCADER_PANEL_INJECTION_KEY);
    const {
      node
    } = props;
    const {
      data,
      label: nodeLabel
    } = node;
    const label = () => {
      const renderLabel = renderLabelFn == null ? void 0 : renderLabelFn({
        node,
        data
      });
      return isVNodeEmpty(renderLabel) ? nodeLabel : renderLabel != null ? renderLabel : nodeLabel;
    };
    return () => vue.createVNode("span", {
      "class": ns.e("label")
    }, [label()]);
  }
});

exports.default = NodeContent;
//# sourceMappingURL=node-content.js.map
