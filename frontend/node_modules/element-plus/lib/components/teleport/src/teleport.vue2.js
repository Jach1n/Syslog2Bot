'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var teleport = require('./teleport.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "teleport",
  props: teleport.teleportProps,
  setup(__props) {
    return (_ctx, _cache) => {
      return _ctx.disabled ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }) : (vue.openBlock(), vue.createBlock(vue.Teleport, {
        key: 1,
        to: _ctx.to
      }, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 8, ["to"]));
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=teleport.vue2.js.map
