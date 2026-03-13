'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index = require('../../../hooks/use-namespace/index.js');
var style = require('../../../utils/dom/style.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElMenuCollapseTransition"
  },
  __name: "menu-collapse-transition",
  setup(__props) {
    const ns = index.useNamespace("menu");
    const listeners = {
      onBeforeEnter: (el) => el.style.opacity = "0.2",
      onEnter(el, done) {
        style.addClass(el, `${ns.namespace.value}-opacity-transition`);
        el.style.opacity = "1";
        done();
      },
      onAfterEnter(el) {
        style.removeClass(el, `${ns.namespace.value}-opacity-transition`);
        el.style.opacity = "";
      },
      onBeforeLeave(el) {
        if (!el.dataset) el.dataset = {};
        if (style.hasClass(el, ns.m("collapse"))) {
          style.removeClass(el, ns.m("collapse"));
          el.dataset.oldOverflow = el.style.overflow;
          el.dataset.scrollWidth = el.clientWidth.toString();
          style.addClass(el, ns.m("collapse"));
        } else {
          style.addClass(el, ns.m("collapse"));
          el.dataset.oldOverflow = el.style.overflow;
          el.dataset.scrollWidth = el.clientWidth.toString();
          style.removeClass(el, ns.m("collapse"));
        }
        el.style.width = `${el.scrollWidth}px`;
        el.style.overflow = "hidden";
      },
      onLeave(el) {
        style.addClass(el, "horizontal-collapse-transition");
        el.style.width = `${el.dataset.scrollWidth}px`;
      }
    };
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(
        vue.Transition,
        vue.mergeProps({ mode: "out-in" }, listeners),
        {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
          /* FORWARDED */
        },
        16
        /* FULL_PROPS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=menu-collapse-transition.vue2.js.map
