import { textProps } from './text.mjs';
import { defineComponent, ref, computed, onMounted, onUpdated, createBlock, openBlock, resolveDynamicComponent, normalizeStyle, normalizeClass, withCtx, renderSlot, useAttrs } from 'vue';
import { useFormSize } from '../../form/src/hooks/use-form-common-props.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { isUndefined } from '../../../utils/types.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElText"
  },
  __name: "text",
  props: textProps,
  setup(__props) {
    const props = __props;
    const textRef = ref();
    const textSize = useFormSize();
    const ns = useNamespace("text");
    const textKls = computed(() => [
      ns.b(),
      ns.m(props.type),
      ns.m(textSize.value),
      ns.is("truncated", props.truncated),
      ns.is("line-clamp", !isUndefined(props.lineClamp))
    ]);
    const bindTitle = () => {
      var _a, _b, _c, _d, _e, _f, _g;
      const inheritTitle = useAttrs().title;
      if (inheritTitle) return;
      let shouldAddTitle = false;
      const text = ((_a = textRef.value) == null ? void 0 : _a.textContent) || "";
      if (props.truncated) {
        const width = (_b = textRef.value) == null ? void 0 : _b.offsetWidth;
        const scrollWidth = (_c = textRef.value) == null ? void 0 : _c.scrollWidth;
        if (width && scrollWidth && scrollWidth > width) {
          shouldAddTitle = true;
        }
      } else if (!isUndefined(props.lineClamp)) {
        const height = (_d = textRef.value) == null ? void 0 : _d.offsetHeight;
        const scrollHeight = (_e = textRef.value) == null ? void 0 : _e.scrollHeight;
        if (height && scrollHeight && scrollHeight > height) {
          shouldAddTitle = true;
        }
      }
      if (shouldAddTitle) {
        (_f = textRef.value) == null ? void 0 : _f.setAttribute("title", text);
      } else {
        (_g = textRef.value) == null ? void 0 : _g.removeAttribute("title");
      }
    };
    onMounted(bindTitle);
    onUpdated(bindTitle);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(__props.tag), {
        ref_key: "textRef",
        ref: textRef,
        class: normalizeClass(textKls.value),
        style: normalizeStyle({ "-webkit-line-clamp": __props.lineClamp })
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["class", "style"]);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=text.vue2.mjs.map
