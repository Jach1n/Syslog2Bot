'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var col = require('./col.js');
var vue = require('vue');
var constants = require('../../row/src/constants.js');
var index = require('../../../hooks/use-namespace/index.js');
var types = require('../../../utils/types.js');
var shared = require('@vue/shared');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElCol"
  },
  __name: "col",
  props: col.colProps,
  setup(__props) {
    const props = __props;
    const { gutter } = vue.inject(constants.rowContextKey, { gutter: vue.computed(() => 0) });
    const ns = index.useNamespace("col");
    const style = vue.computed(() => {
      const styles = {};
      if (gutter.value) {
        styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`;
      }
      return styles;
    });
    const colKls = vue.computed(() => {
      const classes = [];
      const pos = ["span", "offset", "pull", "push"];
      pos.forEach((prop) => {
        const size = props[prop];
        if (types.isNumber(size)) {
          if (prop === "span") classes.push(ns.b(`${props[prop]}`));
          else if (size > 0) classes.push(ns.b(`${prop}-${props[prop]}`));
        }
      });
      const sizes = ["xs", "sm", "md", "lg", "xl"];
      sizes.forEach((size) => {
        if (types.isNumber(props[size])) {
          classes.push(ns.b(`${size}-${props[size]}`));
        } else if (shared.isObject(props[size])) {
          Object.entries(props[size]).forEach(([prop, sizeProp]) => {
            classes.push(
              prop !== "span" ? ns.b(`${size}-${prop}-${sizeProp}`) : ns.b(`${size}-${sizeProp}`)
            );
          });
        }
      });
      if (gutter.value) {
        classes.push(ns.is("guttered"));
      }
      return [ns.b(), classes];
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.tag), {
        class: vue.normalizeClass(colKls.value),
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
//# sourceMappingURL=col.vue2.js.map
