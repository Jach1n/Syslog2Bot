'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var usePagination = require('../usePagination.js');
var total = require('./total.js');
var index = require('../../../../hooks/use-locale/index.js');
var index$1 = require('../../../../hooks/use-namespace/index.js');

const _hoisted_1 = ["disabled"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElPaginationTotal"
  },
  __name: "total",
  props: total.paginationTotalProps,
  setup(__props) {
    const { t } = index.useLocale();
    const ns = index$1.useNamespace("pagination");
    const { disabled } = usePagination.usePagination();
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("span", {
        class: vue.normalizeClass(vue.unref(ns).e("total")),
        disabled: vue.unref(disabled)
      }, vue.toDisplayString(vue.unref(t)("el.pagination.total", {
        total: _ctx.total
      })), 11, _hoisted_1);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=total.vue2.js.map
