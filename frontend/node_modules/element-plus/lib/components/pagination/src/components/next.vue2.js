'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index$1 = require('../../../icon/index.js');
var next = require('./next.js');
var index = require('../../../../hooks/use-locale/index.js');

const _hoisted_1 = ["disabled", "aria-label", "aria-disabled"];
const _hoisted_2 = { key: 0 };
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElPaginationNext"
  },
  __name: "next",
  props: next.paginationNextProps,
  emits: ["click"],
  setup(__props) {
    const props = __props;
    const { t } = index.useLocale();
    const internalDisabled = vue.computed(
      () => props.disabled || props.currentPage === props.pageCount || props.pageCount === 0
    );
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("button", {
        type: "button",
        class: "btn-next",
        disabled: internalDisabled.value,
        "aria-label": _ctx.nextText || vue.unref(t)("el.pagination.next"),
        "aria-disabled": internalDisabled.value,
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event))
      }, [
        _ctx.nextText ? (vue.openBlock(), vue.createElementBlock(
          "span",
          _hoisted_2,
          vue.toDisplayString(_ctx.nextText),
          1
          /* TEXT */
        )) : (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElIcon), { key: 1 }, {
          default: vue.withCtx(() => [
            (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.nextIcon)))
          ]),
          _: 1
          /* STABLE */
        }))
      ], 8, _hoisted_1);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=next.vue2.js.map
