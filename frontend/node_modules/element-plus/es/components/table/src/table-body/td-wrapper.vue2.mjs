import { defineComponent, createElementBlock, openBlock, renderSlot } from 'vue';

const _hoisted_1 = ["colspan", "rowspan"];
var _sfc_main = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createElementBlock("td", {
        colspan: __props.colspan,
        rowspan: __props.rowspan
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 8, _hoisted_1);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=td-wrapper.vue2.mjs.map
