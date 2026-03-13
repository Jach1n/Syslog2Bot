import { defineComponent, renderSlot, createBlock, openBlock, Teleport } from 'vue';
import { teleportProps } from './teleport.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "teleport",
  props: teleportProps,
  setup(__props) {
    return (_ctx, _cache) => {
      return _ctx.disabled ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createBlock(Teleport, {
        key: 1,
        to: _ctx.to
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 8, ["to"]));
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=teleport.vue2.mjs.map
