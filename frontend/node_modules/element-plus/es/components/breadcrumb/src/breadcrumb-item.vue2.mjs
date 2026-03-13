import { breadcrumbItemProps } from './breadcrumb-item.mjs';
import { defineComponent, getCurrentInstance, inject, createElementBlock, openBlock, normalizeClass, unref, createElementVNode, createBlock, renderSlot, withCtx, resolveDynamicComponent, toDisplayString } from 'vue';
import { ElIcon } from '../../icon/index.mjs';
import { breadcrumbKey } from './constants.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElBreadcrumbItem"
  },
  __name: "breadcrumb-item",
  props: breadcrumbItemProps,
  setup(__props) {
    const props = __props;
    const instance = getCurrentInstance();
    const breadcrumbContext = inject(breadcrumbKey, void 0);
    const ns = useNamespace("breadcrumb");
    const router = instance.appContext.config.globalProperties.$router;
    const onClick = () => {
      if (!props.to || !router) return;
      props.replace ? router.replace(props.to) : router.push(props.to);
    };
    return (_ctx, _cache) => {
      var _a, _b;
      return openBlock(), createElementBlock(
        "span",
        {
          class: normalizeClass(unref(ns).e("item"))
        },
        [
          createElementVNode(
            "span",
            {
              class: normalizeClass([unref(ns).e("inner"), unref(ns).is("link", !!__props.to)]),
              role: "link",
              onClick
            },
            [
              renderSlot(_ctx.$slots, "default")
            ],
            2
            /* CLASS */
          ),
          ((_a = unref(breadcrumbContext)) == null ? void 0 : _a.separatorIcon) ? (openBlock(), createBlock(unref(ElIcon), {
            key: 0,
            class: normalizeClass(unref(ns).e("separator"))
          }, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(unref(breadcrumbContext).separatorIcon)))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["class"])) : (openBlock(), createElementBlock(
            "span",
            {
              key: 1,
              class: normalizeClass(unref(ns).e("separator")),
              role: "presentation"
            },
            toDisplayString((_b = unref(breadcrumbContext)) == null ? void 0 : _b.separator),
            3
            /* TEXT, CLASS */
          ))
        ],
        2
        /* CLASS */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=breadcrumb-item.vue2.mjs.map
