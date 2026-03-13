import { backtopEmits, backtopProps } from './backtop.mjs';
import { defineComponent, computed, createBlock, openBlock, Transition, unref, withCtx, createElementBlock, createCommentVNode, withModifiers, normalizeClass, normalizeStyle, renderSlot, createVNode } from 'vue';
import { ElIcon } from '../../icon/index.mjs';
import { CaretTop } from '@element-plus/icons-vue';
import { useBackTop } from './use-backtop.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const COMPONENT_NAME = "ElBacktop";
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: COMPONENT_NAME
  },
  __name: "backtop",
  props: backtopProps,
  emits: backtopEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("backtop");
    const { handleClick, visible } = useBackTop(props, emit, COMPONENT_NAME);
    const backTopStyle = computed(() => ({
      right: `${props.right}px`,
      bottom: `${props.bottom}px`
    }));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: `${unref(ns).namespace.value}-fade-in`
      }, {
        default: withCtx(() => [
          unref(visible) ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              style: normalizeStyle(backTopStyle.value),
              class: normalizeClass(unref(ns).b()),
              onClick: _cache[0] || (_cache[0] = withModifiers(
                //@ts-ignore
                (...args) => unref(handleClick) && unref(handleClick)(...args),
                ["stop"]
              ))
            },
            [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode(unref(ElIcon), {
                  class: normalizeClass(unref(ns).e("icon"))
                }, {
                  default: withCtx(() => [
                    createVNode(unref(CaretTop))
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["class"])
              ])
            ],
            6
            /* CLASS, STYLE */
          )) : createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["name"]);
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=backtop.vue2.mjs.map
