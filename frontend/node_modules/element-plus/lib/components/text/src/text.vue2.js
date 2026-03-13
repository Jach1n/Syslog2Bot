'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var text = require('./text.js');
var vue = require('vue');
var useFormCommonProps = require('../../form/src/hooks/use-form-common-props.js');
var index = require('../../../hooks/use-namespace/index.js');
var types = require('../../../utils/types.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElText"
  },
  __name: "text",
  props: text.textProps,
  setup(__props) {
    const props = __props;
    const textRef = vue.ref();
    const textSize = useFormCommonProps.useFormSize();
    const ns = index.useNamespace("text");
    const textKls = vue.computed(() => [
      ns.b(),
      ns.m(props.type),
      ns.m(textSize.value),
      ns.is("truncated", props.truncated),
      ns.is("line-clamp", !types.isUndefined(props.lineClamp))
    ]);
    const bindTitle = () => {
      var _a, _b, _c, _d, _e, _f, _g;
      const inheritTitle = vue.useAttrs().title;
      if (inheritTitle) return;
      let shouldAddTitle = false;
      const text = ((_a = textRef.value) == null ? void 0 : _a.textContent) || "";
      if (props.truncated) {
        const width = (_b = textRef.value) == null ? void 0 : _b.offsetWidth;
        const scrollWidth = (_c = textRef.value) == null ? void 0 : _c.scrollWidth;
        if (width && scrollWidth && scrollWidth > width) {
          shouldAddTitle = true;
        }
      } else if (!types.isUndefined(props.lineClamp)) {
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
    vue.onMounted(bindTitle);
    vue.onUpdated(bindTitle);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.tag), {
        ref_key: "textRef",
        ref: textRef,
        class: vue.normalizeClass(textKls.value),
        style: vue.normalizeStyle({ "-webkit-line-clamp": __props.lineClamp })
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["class", "style"]);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=text.vue2.js.map
