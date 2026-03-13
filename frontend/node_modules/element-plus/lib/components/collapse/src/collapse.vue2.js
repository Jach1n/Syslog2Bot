'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var collapse = require('./collapse.js');
var vue = require('vue');
var useCollapse = require('./use-collapse.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElCollapse"
  },
  __name: "collapse",
  props: collapse.collapseProps,
  emits: collapse.collapseEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { activeNames, setActiveNames } = useCollapse.useCollapse(props, emit);
    const { rootKls } = useCollapse.useCollapseDOM(props);
    __expose({
      /** @description active names */
      activeNames,
      /** @description set active names */
      setActiveNames
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(vue.unref(rootKls))
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
//# sourceMappingURL=collapse.vue2.js.map
