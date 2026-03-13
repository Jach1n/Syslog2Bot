import { avatarEmits, avatarProps } from './avatar.mjs';
import { defineComponent, inject, ref, computed, watch, createElementBlock, openBlock, normalizeStyle, normalizeClass, createBlock, renderSlot, unref, withCtx, resolveDynamicComponent } from 'vue';
import { ElIcon } from '../../icon/index.mjs';
import { avatarGroupContextKey } from './constants.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { isString } from '@vue/shared';
import { isNumber } from '../../../utils/types.mjs';
import { addUnit } from '../../../utils/dom/style.mjs';

const _hoisted_1 = ["src", "alt", "srcset"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElAvatar"
  },
  __name: "avatar",
  props: avatarProps,
  emits: avatarEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const avatarGroupContext = inject(avatarGroupContextKey, void 0);
    const ns = useNamespace("avatar");
    const hasLoadError = ref(false);
    const size = computed(() => {
      var _a;
      return (_a = props.size) != null ? _a : avatarGroupContext == null ? void 0 : avatarGroupContext.size;
    });
    const shape = computed(
      () => {
        var _a, _b;
        return (_b = (_a = props.shape) != null ? _a : avatarGroupContext == null ? void 0 : avatarGroupContext.shape) != null ? _b : "circle";
      }
    );
    const avatarClass = computed(() => {
      const { icon } = props;
      const classList = [ns.b()];
      if (isString(size.value)) classList.push(ns.m(size.value));
      if (icon) classList.push(ns.m("icon"));
      if (shape.value) classList.push(ns.m(shape.value));
      return classList;
    });
    const sizeStyle = computed(() => {
      return isNumber(size.value) ? ns.cssVarBlock({
        size: addUnit(size.value)
      }) : void 0;
    });
    const fitStyle = computed(() => ({
      objectFit: props.fit
    }));
    watch(
      () => [props.src, props.srcSet],
      () => hasLoadError.value = false
    );
    function handleError(e) {
      hasLoadError.value = true;
      emit("error", e);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "span",
        {
          class: normalizeClass(avatarClass.value),
          style: normalizeStyle(sizeStyle.value)
        },
        [
          (__props.src || __props.srcSet) && !hasLoadError.value ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: __props.src,
            alt: __props.alt,
            srcset: __props.srcSet,
            style: normalizeStyle(fitStyle.value),
            onError: handleError
          }, null, 44, _hoisted_1)) : __props.icon ? (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
            default: withCtx(() => [
              (openBlock(), createBlock(resolveDynamicComponent(__props.icon)))
            ]),
            _: 1
            /* STABLE */
          })) : renderSlot(_ctx.$slots, "default", { key: 2 })
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=avatar.vue2.mjs.map
