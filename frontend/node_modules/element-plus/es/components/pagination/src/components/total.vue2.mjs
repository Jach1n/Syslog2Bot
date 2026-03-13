import { defineComponent, createElementBlock, openBlock, unref, normalizeClass, toDisplayString } from 'vue';
import { usePagination } from '../usePagination.mjs';
import { paginationTotalProps } from './total.mjs';
import { useLocale } from '../../../../hooks/use-locale/index.mjs';
import { useNamespace } from '../../../../hooks/use-namespace/index.mjs';

const _hoisted_1 = ["disabled"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElPaginationTotal"
  },
  __name: "total",
  props: paginationTotalProps,
  setup(__props) {
    const { t } = useLocale();
    const ns = useNamespace("pagination");
    const { disabled } = usePagination();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", {
        class: normalizeClass(unref(ns).e("total")),
        disabled: unref(disabled)
      }, toDisplayString(unref(t)("el.pagination.total", {
        total: _ctx.total
      })), 11, _hoisted_1);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=total.vue2.mjs.map
