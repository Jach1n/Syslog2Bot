import { emptyProps } from './empty.mjs';
import { defineComponent, computed, createElementBlock, openBlock, normalizeClass, unref, createElementVNode, createCommentVNode, normalizeStyle, renderSlot, createVNode, toDisplayString } from 'vue';
import _sfc_main$1 from './img-empty.vue2.mjs';
import { useLocale } from '../../../hooks/use-locale/index.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { addUnit } from '../../../utils/dom/style.mjs';

const _hoisted_1 = ["src"];
const _hoisted_2 = { key: 1 };
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElEmpty"
  },
  __name: "empty",
  props: emptyProps,
  setup(__props) {
    const props = __props;
    const { t } = useLocale();
    const ns = useNamespace("empty");
    const emptyDescription = computed(
      () => props.description || t("el.table.emptyText")
    );
    const imageStyle = computed(() => ({
      width: addUnit(props.imageSize)
    }));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(unref(ns).b())
        },
        [
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ns).e("image")),
              style: normalizeStyle(imageStyle.value)
            },
            [
              __props.image ? (openBlock(), createElementBlock("img", {
                key: 0,
                src: __props.image,
                ondragstart: "return false"
              }, null, 8, _hoisted_1)) : renderSlot(_ctx.$slots, "image", { key: 1 }, () => [
                createVNode(_sfc_main$1)
              ])
            ],
            6
            /* CLASS, STYLE */
          ),
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ns).e("description"))
            },
            [
              _ctx.$slots.description ? renderSlot(_ctx.$slots, "description", { key: 0 }) : (openBlock(), createElementBlock(
                "p",
                _hoisted_2,
                toDisplayString(emptyDescription.value),
                1
                /* TEXT */
              ))
            ],
            2
            /* CLASS */
          ),
          _ctx.$slots.default ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(unref(ns).e("bottom"))
            },
            [
              renderSlot(_ctx.$slots, "default")
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=empty.vue2.mjs.map
