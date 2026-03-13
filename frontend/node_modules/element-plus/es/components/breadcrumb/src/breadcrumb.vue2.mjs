import { breadcrumbProps } from './breadcrumb.mjs';
import { defineComponent, ref, provide, onMounted, createElementBlock, openBlock, unref, normalizeClass, renderSlot } from 'vue';
import { breadcrumbKey } from './constants.mjs';
import { useLocale } from '../../../hooks/use-locale/index.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const _hoisted_1 = ["aria-label"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElBreadcrumb"
  },
  __name: "breadcrumb",
  props: breadcrumbProps,
  setup(__props) {
    const { t } = useLocale();
    const props = __props;
    const ns = useNamespace("breadcrumb");
    const breadcrumb = ref();
    provide(breadcrumbKey, props);
    onMounted(() => {
      const items = breadcrumb.value.querySelectorAll(`.${ns.e("item")}`);
      if (items.length) {
        items[items.length - 1].setAttribute("aria-current", "page");
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "breadcrumb",
        ref: breadcrumb,
        class: normalizeClass(unref(ns).b()),
        "aria-label": unref(t)("el.breadcrumb.label"),
        role: "navigation"
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_1);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=breadcrumb.vue2.mjs.map
