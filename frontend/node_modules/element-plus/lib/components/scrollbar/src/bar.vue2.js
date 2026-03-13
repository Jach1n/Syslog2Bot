'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var bar = require('./bar.js');
var vue = require('vue');
var util = require('./util.js');
var thumb_vue_vue_type_script_setup_true_lang = require('./thumb.vue2.js');
var constants = require('./constants.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "bar",
  props: bar.barProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const scrollbar = vue.inject(constants.scrollbarContextKey);
    const moveX = vue.ref(0);
    const moveY = vue.ref(0);
    const sizeWidth = vue.ref("");
    const sizeHeight = vue.ref("");
    const ratioY = vue.ref(1);
    const ratioX = vue.ref(1);
    const handleScroll = (wrap) => {
      if (wrap) {
        const offsetHeight = wrap.offsetHeight - util.GAP;
        const offsetWidth = wrap.offsetWidth - util.GAP;
        moveY.value = wrap.scrollTop * 100 / offsetHeight * ratioY.value;
        moveX.value = wrap.scrollLeft * 100 / offsetWidth * ratioX.value;
      }
    };
    const update = () => {
      const wrap = scrollbar == null ? void 0 : scrollbar.wrapElement;
      if (!wrap) return;
      const offsetHeight = wrap.offsetHeight - util.GAP;
      const offsetWidth = wrap.offsetWidth - util.GAP;
      const originalHeight = offsetHeight ** 2 / wrap.scrollHeight;
      const originalWidth = offsetWidth ** 2 / wrap.scrollWidth;
      const height = Math.max(originalHeight, props.minSize);
      const width = Math.max(originalWidth, props.minSize);
      ratioY.value = originalHeight / (offsetHeight - originalHeight) / (height / (offsetHeight - height));
      ratioX.value = originalWidth / (offsetWidth - originalWidth) / (width / (offsetWidth - width));
      sizeHeight.value = height + util.GAP < offsetHeight ? `${height}px` : "";
      sizeWidth.value = width + util.GAP < offsetWidth ? `${width}px` : "";
    };
    __expose({
      handleScroll,
      update
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        null,
        [
          vue.createVNode(thumb_vue_vue_type_script_setup_true_lang.default, {
            move: moveX.value,
            ratio: ratioX.value,
            size: sizeWidth.value,
            always: __props.always
          }, null, 8, ["move", "ratio", "size", "always"]),
          vue.createVNode(thumb_vue_vue_type_script_setup_true_lang.default, {
            move: moveY.value,
            ratio: ratioY.value,
            size: sizeHeight.value,
            vertical: "",
            always: __props.always
          }, null, 8, ["move", "ratio", "size", "always"])
        ],
        64
        /* STABLE_FRAGMENT */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=bar.vue2.js.map
