'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var row = require('./row.js');
var vue = require('vue');
var constants = require('./constants.js');
var index = require('../../../hooks/use-namespace/index.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElRow"
  },
  __name: "row",
  props: row.rowProps,
  setup(__props) {
    const props = __props;
    const ns = index.useNamespace("row");
    const gutter = vue.computed(() => props.gutter);
    vue.provide(constants.rowContextKey, {
      gutter
    });
    const style = vue.computed(() => {
      const styles = {};
      if (!props.gutter) {
        return styles;
      }
      styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`;
      return styles;
    });
    const rowKls = vue.computed(() => [
      ns.b(),
      ns.is(`justify-${props.justify}`, props.justify !== "start"),
      ns.is(`align-${props.align}`, !!props.align)
    ]);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.tag), {
        class: vue.normalizeClass(rowKls.value),
        style: vue.normalizeStyle(style.value)
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["class", "style"]);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=row.vue2.js.map
