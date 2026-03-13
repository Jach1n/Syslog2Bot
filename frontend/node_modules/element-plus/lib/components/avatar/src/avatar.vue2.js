'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var avatar = require('./avatar.js');
var vue = require('vue');
var index$1 = require('../../icon/index.js');
var constants = require('./constants.js');
var index = require('../../../hooks/use-namespace/index.js');
var shared = require('@vue/shared');
var types = require('../../../utils/types.js');
var style = require('../../../utils/dom/style.js');

const _hoisted_1 = ["src", "alt", "srcset"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElAvatar"
  },
  __name: "avatar",
  props: avatar.avatarProps,
  emits: avatar.avatarEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const avatarGroupContext = vue.inject(constants.avatarGroupContextKey, void 0);
    const ns = index.useNamespace("avatar");
    const hasLoadError = vue.ref(false);
    const size = vue.computed(() => {
      var _a;
      return (_a = props.size) != null ? _a : avatarGroupContext == null ? void 0 : avatarGroupContext.size;
    });
    const shape = vue.computed(
      () => {
        var _a, _b;
        return (_b = (_a = props.shape) != null ? _a : avatarGroupContext == null ? void 0 : avatarGroupContext.shape) != null ? _b : "circle";
      }
    );
    const avatarClass = vue.computed(() => {
      const { icon } = props;
      const classList = [ns.b()];
      if (shared.isString(size.value)) classList.push(ns.m(size.value));
      if (icon) classList.push(ns.m("icon"));
      if (shape.value) classList.push(ns.m(shape.value));
      return classList;
    });
    const sizeStyle = vue.computed(() => {
      return types.isNumber(size.value) ? ns.cssVarBlock({
        size: style.addUnit(size.value)
      }) : void 0;
    });
    const fitStyle = vue.computed(() => ({
      objectFit: props.fit
    }));
    vue.watch(
      () => [props.src, props.srcSet],
      () => hasLoadError.value = false
    );
    function handleError(e) {
      hasLoadError.value = true;
      emit("error", e);
    }
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "span",
        {
          class: vue.normalizeClass(avatarClass.value),
          style: vue.normalizeStyle(sizeStyle.value)
        },
        [
          (__props.src || __props.srcSet) && !hasLoadError.value ? (vue.openBlock(), vue.createElementBlock("img", {
            key: 0,
            src: __props.src,
            alt: __props.alt,
            srcset: __props.srcSet,
            style: vue.normalizeStyle(fitStyle.value),
            onError: handleError
          }, null, 44, _hoisted_1)) : __props.icon ? (vue.openBlock(), vue.createBlock(vue.unref(index$1.ElIcon), { key: 1 }, {
            default: vue.withCtx(() => [
              (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.icon)))
            ]),
            _: 1
            /* STABLE */
          })) : vue.renderSlot(_ctx.$slots, "default", { key: 2 })
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=avatar.vue2.js.map
