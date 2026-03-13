import { linkEmits, linkProps } from './link.mjs';
import { defineComponent, computed, createElementBlock, openBlock, normalizeClass, createBlock, createCommentVNode, renderSlot, unref, withCtx, resolveDynamicComponent } from 'vue';
import { ElIcon } from '../../icon/index.mjs';
import { useGlobalConfig } from '../../config-provider/src/hooks/use-global-config.mjs';
import { useDeprecated } from '../../../hooks/use-deprecated/index.mjs';
import { isBoolean } from '../../../utils/types.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const _hoisted_1 = ["href", "target"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElLink"
  },
  __name: "link",
  props: linkProps,
  emits: linkEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const globalConfig = useGlobalConfig("link");
    useDeprecated(
      {
        scope: "el-link",
        from: "The underline option (boolean)",
        replacement: "'always' | 'hover' | 'never'",
        version: "3.0.0",
        ref: "https://element-plus.org/en-US/component/link.html#underline"
      },
      computed(() => isBoolean(props.underline))
    );
    const ns = useNamespace("link");
    const linkKls = computed(() => {
      var _a, _b, _c;
      return [
        ns.b(),
        ns.m((_c = (_b = props.type) != null ? _b : (_a = globalConfig.value) == null ? void 0 : _a.type) != null ? _c : "default"),
        ns.is("disabled", props.disabled),
        ns.is("underline", underline.value === "always"),
        ns.is("hover-underline", underline.value === "hover" && !props.disabled)
      ];
    });
    const underline = computed(() => {
      var _a, _b, _c;
      if (isBoolean(props.underline)) {
        return props.underline ? "hover" : "never";
      } else return (_c = (_b = props.underline) != null ? _b : (_a = globalConfig.value) == null ? void 0 : _a.underline) != null ? _c : "hover";
    });
    function handleClick(event) {
      if (!props.disabled) emit("click", event);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("a", {
        class: normalizeClass(linkKls.value),
        href: __props.disabled || !__props.href ? void 0 : __props.href,
        target: __props.disabled || !__props.href ? void 0 : __props.target,
        onClick: handleClick
      }, [
        __props.icon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
          default: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(__props.icon)))
          ]),
          _: 1
          /* STABLE */
        })) : createCommentVNode("v-if", true),
        _ctx.$slots.default ? (openBlock(), createElementBlock(
          "span",
          {
            key: 1,
            class: normalizeClass(unref(ns).e("inner"))
          },
          [
            renderSlot(_ctx.$slots, "default")
          ],
          2
          /* CLASS */
        )) : createCommentVNode("v-if", true),
        _ctx.$slots.icon ? renderSlot(_ctx.$slots, "icon", { key: 2 }) : createCommentVNode("v-if", true)
      ], 10, _hoisted_1);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=link.vue2.mjs.map
