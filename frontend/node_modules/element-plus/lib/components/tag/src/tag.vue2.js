'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tag = require('./tag.js');
var vue = require('vue');
var index$2 = require('../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');
var useFormCommonProps = require('../../form/src/hooks/use-form-common-props.js');
var index = require('../../../hooks/use-locale/index.js');
var index$1 = require('../../../hooks/use-namespace/index.js');

const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["aria-label"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElTag"
  },
  __name: "tag",
  props: tag.tagProps,
  emits: tag.tagEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const tagSize = useFormCommonProps.useFormSize();
    const { t } = index.useLocale();
    const ns = index$1.useNamespace("tag");
    const containerKls = vue.computed(() => {
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
      return __props.disableTransitions ? (vue.openBlock(), vue.createElementBlock(
        "span",
        {
          key: 0,
          class: vue.normalizeClass(containerKls.value),
          style: vue.normalizeStyle({ backgroundColor: __props.color }),
          onClick: handleClick
        },
        [
          vue.createElementVNode(
            "span",
            {
              class: vue.normalizeClass(vue.unref(ns).e("content"))
            },
            [
              vue.renderSlot(_ctx.$slots, "default")
            ],
            2
            /* CLASS */
          ),
          __props.closable ? (vue.openBlock(), vue.createElementBlock("button", {
            key: 0,
            "aria-label": vue.unref(t)("el.tag.close"),
            class: vue.normalizeClass(vue.unref(ns).e("close")),
            type: "button",
            onClick: vue.withModifiers(handleClose, ["stop"])
          }, [
            vue.createVNode(vue.unref(index$2.ElIcon), null, {
              default: vue.withCtx(() => [
                vue.createVNode(vue.unref(iconsVue.Close))
              ]),
              _: 1
              /* STABLE */
            })
          ], 10, _hoisted_1)) : vue.createCommentVNode("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      )) : (vue.openBlock(), vue.createBlock(vue.Transition, {
        key: 1,
        name: `${vue.unref(ns).namespace.value}-zoom-in-center`,
        appear: "",
        onVnodeMounted: handleVNodeMounted
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode(
            "span",
            {
              class: vue.normalizeClass(containerKls.value),
              style: vue.normalizeStyle({ backgroundColor: __props.color }),
              onClick: handleClick
            },
            [
              vue.createElementVNode(
                "span",
                {
                  class: vue.normalizeClass(vue.unref(ns).e("content"))
                },
                [
                  vue.renderSlot(_ctx.$slots, "default")
                ],
                2
                /* CLASS */
              ),
              __props.closable ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 0,
                "aria-label": vue.unref(t)("el.tag.close"),
                class: vue.normalizeClass(vue.unref(ns).e("close")),
                type: "button",
                onClick: vue.withModifiers(handleClose, ["stop"])
              }, [
                vue.createVNode(vue.unref(index$2.ElIcon), null, {
                  default: vue.withCtx(() => [
                    vue.createVNode(vue.unref(iconsVue.Close))
                  ]),
                  _: 1
                  /* STABLE */
                })
              ], 10, _hoisted_2)) : vue.createCommentVNode("v-if", true)
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

exports.default = _sfc_main;
//# sourceMappingURL=tag.vue2.js.map
