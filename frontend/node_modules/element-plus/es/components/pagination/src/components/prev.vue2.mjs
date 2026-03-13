import { defineComponent, computed, createElementBlock, openBlock, unref, createBlock, toDisplayString, withCtx, resolveDynamicComponent } from 'vue';
import { ElIcon } from '../../../icon/index.mjs';
import { paginationPrevEmits, paginationPrevProps } from './prev.mjs';
import { useLocale } from '../../../../hooks/use-locale/index.mjs';

const _hoisted_1 = ["disabled", "aria-label", "aria-disabled"];
const _hoisted_2 = { key: 0 };
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElPaginationPrev"
  },
  __name: "prev",
  props: paginationPrevProps,
  emits: paginationPrevEmits,
  setup(__props) {
    const props = __props;
    const { t } = useLocale();
    const internalDisabled = computed(
      () => props.disabled || props.currentPage <= 1
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        type: "button",
        class: "btn-prev",
        disabled: internalDisabled.value,
        "aria-label": _ctx.prevText || unref(t)("el.pagination.prev"),
        "aria-disabled": internalDisabled.value,
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event))
      }, [
        _ctx.prevText ? (openBlock(), createElementBlock(
          "span",
          _hoisted_2,
          toDisplayString(_ctx.prevText),
          1
          /* TEXT */
        )) : (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
          default: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(_ctx.prevIcon)))
          ]),
          _: 1
          /* STABLE */
        }))
      ], 8, _hoisted_1);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=prev.vue2.mjs.map
