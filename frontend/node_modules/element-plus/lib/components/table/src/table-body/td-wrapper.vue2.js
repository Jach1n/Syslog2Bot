'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

const _hoisted_1 = ["colspan", "rowspan"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "TableTdWrapper"
  },
  __name: "td-wrapper",
  props: {
    colspan: {
      type: Number,
      default: 1
    },
    rowspan: {
      type: Number,
      default: 1
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("td", {
        colspan: __props.colspan,
        rowspan: __props.rowspan
      }, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 8, _hoisted_1);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=td-wrapper.vue2.js.map
