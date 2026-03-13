'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index$1 = require('../../../icon/index.js');
var prev = require('./prev.js');
var index = require('../../../../hooks/use-locale/index.js');

const _hoisted_1 = ["disabled", "aria-label", "aria-disabled"];
const _hoisted_2 = { key: 0 };
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElPaginationPrev"
  },
  __name: "prev",
  props: prev.paginationPrevProps,
  emits: prev.paginationPrevEmits,
  setup(__props) {
    const props = __props;
    const { t } = index.useLocale();
    const internalDisabled = vue.computed(
      () => props.disabled || props.currentPage <= 1
    );
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("button", {
        type: "button",
        class: "btn-prev",
        disabled: internalDisabled.value,
        "aria-label": _ctx.prevText || vue.unref(t)("el.pagination.prev"),
        "aria-disabled": internalDisabled.value,
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event))
      }, [
        _ctx.prevText ? (vue.openBlock(), vue.createElementBlock(
          "span",
          _hoisted_2,
          vue.toDisplayString(_ctx.prevText),
          1
          /* TEXT */
        )) : (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElIcon), { key: 1 }, {
          default: vue.withCtx(() => [
            (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.prevIcon)))
          ]),
          _: 1
          /* STABLE */
        }))
      ], 8, _hoisted_1);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=prev.vue2.js.map
