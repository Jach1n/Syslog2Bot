'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var buttonGroup = require('./button-group.js');
var vue = require('vue');
var constants = require('./constants.js');
var index = require('../../../hooks/use-namespace/index.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElButtonGroup"
  },
  __name: "button-group",
  props: buttonGroup.buttonGroupProps,
  setup(__props) {
    const props = __props;
    vue.provide(
      constants.buttonGroupContextKey,
      vue.reactive({
        size: vue.toRef(props, "size"),
        type: vue.toRef(props, "type")
      })
    );
    const ns = index.useNamespace("button");
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass([vue.unref(ns).b("group"), vue.unref(ns).bm("group", props.direction)])
        },
        [
          vue.renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=button-group.vue2.js.map
