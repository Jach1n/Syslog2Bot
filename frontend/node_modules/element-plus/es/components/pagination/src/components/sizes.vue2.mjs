import { defineComponent, ref, watch, computed, createElementBlock, openBlock, normalizeClass, unref, createVNode, withCtx, Fragment, renderList, createBlock } from 'vue';
import { isEqual } from 'lodash-unified';
import { ElSelect, ElOption } from '../../../select/index.mjs';
import { usePagination } from '../usePagination.mjs';
import { paginationSizesProps } from './sizes.mjs';
import { useLocale } from '../../../../hooks/use-locale/index.mjs';
import { useNamespace } from '../../../../hooks/use-namespace/index.mjs';
import { isArray } from '@vue/shared';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElPaginationSizes"
  },
  __name: "sizes",
  props: paginationSizesProps,
  emits: ["page-size-change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useLocale();
    const ns = useNamespace("pagination");
    const pagination = usePagination();
    const innerPageSize = ref(props.pageSize);
    watch(
      () => props.pageSizes,
      (newVal, oldVal) => {
        if (isEqual(newVal, oldVal)) return;
        if (isArray(newVal)) {
          const pageSize = newVal.includes(props.pageSize) ? props.pageSize : props.pageSizes[0];
          emit("page-size-change", pageSize);
        }
      }
    );
    watch(
      () => props.pageSize,
      (newVal) => {
        innerPageSize.value = newVal;
      }
    );
    const innerPageSizes = computed(() => props.pageSizes);
    function handleChange(val) {
      var _a;
      if (val !== innerPageSize.value) {
        innerPageSize.value = val;
        (_a = pagination.handleSizeChange) == null ? void 0 : _a.call(pagination, Number(val));
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "span",
        {
          class: normalizeClass(unref(ns).e("sizes"))
        },
        [
          createVNode(unref(ElSelect), {
            "model-value": innerPageSize.value,
            disabled: _ctx.disabled,
            "popper-class": _ctx.popperClass,
            "popper-style": _ctx.popperStyle,
            size: _ctx.size,
            teleported: _ctx.teleported,
            "validate-event": false,
            "append-to": _ctx.appendSizeTo,
            onChange: handleChange
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(innerPageSizes.value, (item) => {
                  return openBlock(), createBlock(unref(ElOption), {
                    key: item,
                    value: item,
                    label: item + unref(t)("el.pagination.pagesize")
                  }, null, 8, ["value", "label"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["model-value", "disabled", "popper-class", "popper-style", "size", "teleported", "append-to"])
        ],
        2
        /* CLASS */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=sizes.vue2.mjs.map
