'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index$3 = require('../../scrollbar/index.js');
var iconsVue = require('@element-plus/icons-vue');
var index$4 = require('../../icon/index.js');
var node_vue_vue_type_script_setup_true_lang = require('./node.vue2.js');
var types = require('./types.js');
var index = require('../../../hooks/use-namespace/index.js');
var index$1 = require('../../../hooks/use-locale/index.js');
var index$2 = require('../../../hooks/use-id/index.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElCascaderMenu"
  },
  __name: "menu",
  props: {
    nodes: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const instance = vue.getCurrentInstance();
    const ns = index.useNamespace("cascader-menu");
    const { t } = index$1.useLocale();
    const id = index$2.useId();
    let activeNode;
    let hoverTimer;
    const panel = vue.inject(types.CASCADER_PANEL_INJECTION_KEY);
    const hoverZone = vue.ref();
    const isEmpty = vue.computed(() => !props.nodes.length);
    const isLoading = vue.computed(() => !panel.initialLoaded);
    const menuId = vue.computed(() => `${id.value}-${props.index}`);
    const handleExpand = (e) => {
      activeNode = e.target;
    };
    const handleMouseMove = (e) => {
      var _a;
      if (!panel.isHoverMenu || !activeNode || !hoverZone.value) return;
      if (activeNode.contains(e.target)) {
        clearHoverTimer();
        const el = instance.vnode.el;
        const { left } = el.getBoundingClientRect();
        const { offsetWidth, offsetHeight } = el;
        const startX = e.clientX - left;
        const top = activeNode.offsetTop;
        const bottom = top + activeNode.offsetHeight;
        const scrollTop = ((_a = el.querySelector(`.${ns.e("wrap")}`)) == null ? void 0 : _a.scrollTop) || 0;
        hoverZone.value.innerHTML = `
          <path style="pointer-events: auto;" fill="transparent" d="M${startX} ${top} L${offsetWidth} ${scrollTop} V${top} Z" />
          <path style="pointer-events: auto;" fill="transparent" d="M${startX} ${bottom} L${offsetWidth} ${offsetHeight + scrollTop} V${bottom} Z" />
        `;
      } else if (!hoverTimer) {
        hoverTimer = window.setTimeout(clearHoverZone, panel.config.hoverThreshold);
      }
    };
    const clearHoverTimer = () => {
      if (!hoverTimer) return;
      clearTimeout(hoverTimer);
      hoverTimer = void 0;
    };
    const clearHoverZone = () => {
      if (!hoverZone.value) return;
      hoverZone.value.innerHTML = "";
      clearHoverTimer();
    };
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(index$3.ElScrollbar), {
        key: menuId.value,
        tag: "ul",
        role: "menu",
        class: vue.normalizeClass(vue.unref(ns).b()),
        "wrap-class": vue.unref(ns).e("wrap"),
        "view-class": [vue.unref(ns).e("list"), vue.unref(ns).is("empty", isEmpty.value)],
        onMousemove: handleMouseMove,
        onMouseleave: clearHoverZone
      }, {
        default: vue.withCtx(() => {
          var _a;
          return [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(__props.nodes, (node) => {
                return vue.openBlock(), vue.createBlock(node_vue_vue_type_script_setup_true_lang.default, {
                  key: node.uid,
                  node,
                  "menu-id": menuId.value,
                  onExpand: handleExpand
                }, null, 8, ["node", "menu-id"]);
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            isLoading.value ? (vue.openBlock(), vue.createElementBlock(
              "div",
              {
                key: 0,
                class: vue.normalizeClass(vue.unref(ns).e("empty-text"))
              },
              [
                vue.createVNode(vue.unref(index$4.ElIcon), {
                  size: "14",
                  class: vue.normalizeClass(vue.unref(ns).is("loading"))
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(vue.unref(iconsVue.Loading))
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["class"]),
                vue.createTextVNode(
                  " " + vue.toDisplayString(vue.unref(t)("el.cascader.loading")),
                  1
                  /* TEXT */
                )
              ],
              2
              /* CLASS */
            )) : isEmpty.value ? (vue.openBlock(), vue.createElementBlock(
              "div",
              {
                key: 1,
                class: vue.normalizeClass(vue.unref(ns).e("empty-text"))
              },
              [
                vue.renderSlot(_ctx.$slots, "empty", {}, () => [
                  vue.createTextVNode(
                    vue.toDisplayString(vue.unref(t)("el.cascader.noData")),
                    1
                    /* TEXT */
                  )
                ])
              ],
              2
              /* CLASS */
            )) : ((_a = vue.unref(panel)) == null ? void 0 : _a.isHoverMenu) ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 2 },
              [
                vue.createCommentVNode(" eslint-disable vue/html-self-closing "),
                (vue.openBlock(), vue.createElementBlock(
                  "svg",
                  {
                    ref_key: "hoverZone",
                    ref: hoverZone,
                    class: vue.normalizeClass(vue.unref(ns).e("hover-zone"))
                  },
                  null,
                  2
                  /* CLASS */
                ))
              ],
              2112
              /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" eslint-enable vue/html-self-closing ")
          ];
        }),
        _: 3
        /* FORWARDED */
      }, 8, ["class", "wrap-class", "view-class"]);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=menu.vue2.js.map
