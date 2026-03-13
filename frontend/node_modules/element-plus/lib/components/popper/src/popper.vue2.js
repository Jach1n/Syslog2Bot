'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var popper = require('./popper.js');
var vue = require('vue');
var constants = require('./constants.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElPopper",
    inheritAttrs: false
  },
  __name: "popper",
  props: popper.popperProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const triggerRef = vue.ref();
    const popperInstanceRef = vue.ref();
    const contentRef = vue.ref();
    const referenceRef = vue.ref();
    const role = vue.computed(() => props.role);
    const popperProvides = {
      /**
       * @description trigger element
       */
      triggerRef,
      /**
       * @description popperjs instance
       */
      popperInstanceRef,
      /**
       * @description popper content element
       */
      contentRef,
      /**
       * @description popper reference element
       */
      referenceRef,
      /**
       * @description role determines how aria attributes are distributed
       */
      role
    };
    __expose(popperProvides);
    vue.provide(constants.POPPER_INJECTION_KEY, popperProvides);
    return (_ctx, _cache) => {
      return vue.renderSlot(_ctx.$slots, "default");
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=popper.vue2.js.map
