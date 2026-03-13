import { tagEmits, tagProps } from './tag.mjs';
import { defineComponent, computed, createElementBlock, createBlock, openBlock, normalizeStyle, normalizeClass, createElementVNode, createCommentVNode, unref, renderSlot, withModifiers, createVNode, withCtx, Transition } from 'vue';
import { ElIcon } from '../../icon/index.mjs';
import { Close } from '@element-plus/icons-vue';
import { useFormSize } from '../../form/src/hooks/use-form-common-props.mjs';
import { useLocale } from '../../../hooks/use-locale/index.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["aria-label"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElTag"
  },
  __name: "tag",
  props: tagProps,
  emits: tagEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const tagSize = useFormSize();
    const { t } = useLocale();
    const ns = useNamespace("tag");
    const containerKls = computed(() => {
      const { type, hit, effect, closable, round } = props;
      return [
        ns.b(),
        ns.is("closable", closable),
        ns.m(type || "primary"),
        ns.m(tagSize.value),
        ns.m(effect),
        ns.is("hit", hit),
        ns.is("round", round)
      ];
    });
    const handleClose = (event) => {
      emit("close", event);
    };
    const handleClick = (event) => {
      emit("click", event);
    };
    const handleVNodeMounted = (vnode) => {
      var _a, _b, _c;
      if ((_c = (_b = (_a = vnode == null ? void 0 : vnode.component) == null ? void 0 : _a.subTree) == null ? void 0 : _b.component) == null ? void 0 : _c.bum) {
        vnode.component.subTree.component.bum = null;
      }
    };
    return (_ctx, _cache) => {
      return __props.disableTransitions ? (openBlock(), createElementBlock(
        "span",
        {
          key: 0,
          class: normalizeClass(containerKls.value),
          style: normalizeStyle({ backgroundColor: __props.color }),
          onClick: handleClick
        },
        [
          createElementVNode(
            "span",
            {
              class: normalizeClass(unref(ns).e("content"))
            },
            [
              renderSlot(_ctx.$slots, "default")
            ],
            2
            /* CLASS */
          ),
          __props.closable ? (openBlock(), createElementBlock("button", {
            key: 0,
            "aria-label": unref(t)("el.tag.close"),
            class: normalizeClass(unref(ns).e("close")),
            type: "button",
            onClick: withModifiers(handleClose, ["stop"])
          }, [
            createVNode(unref(ElIcon), null, {
              default: withCtx(() => [
                createVNode(unref(Close))
              ]),
              _: 1
              /* STABLE */
            })
          ], 10, _hoisted_1)) : createCommentVNode("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      )) : (openBlock(), createBlock(Transition, {
        key: 1,
        name: `${unref(ns).namespace.value}-zoom-in-center`,
        appear: "",
        onVnodeMounted: handleVNodeMounted
      }, {
        default: withCtx(() => [
          createElementVNode(
            "span",
            {
              class: normalizeClass(containerKls.value),
              style: normalizeStyle({ backgroundColor: __props.color }),
              onClick: handleClick
            },
            [
              createElementVNode(
                "span",
                {
                  class: normalizeClass(unref(ns).e("content"))
                },
                [
                  renderSlot(_ctx.$slots, "default")
                ],
                2
                /* CLASS */
              ),
              __props.closable ? (openBlock(), createElementBlock("button", {
                key: 0,
                "aria-label": unref(t)("el.tag.close"),
                class: normalizeClass(unref(ns).e("close")),
                type: "button",
                onClick: withModifiers(handleClose, ["stop"])
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(Close))
                  ]),
                  _: 1
                  /* STABLE */
                })
              ], 10, _hoisted_2)) : createCommentVNode("v-if", true)
            ],
            6
            /* CLASS, STYLE */
          )
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["name"]));
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=tag.vue2.mjs.map
