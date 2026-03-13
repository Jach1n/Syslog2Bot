import { popperProps } from './popper.mjs';
import { defineComponent, ref, computed, provide, renderSlot } from 'vue';
import { POPPER_INJECTION_KEY } from './constants.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElPopper",
    inheritAttrs: false
  },
  __name: "popper",
  props: popperProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const triggerRef = ref();
    const popperInstanceRef = ref();
    const contentRef = ref();
    const referenceRef = ref();
    const role = computed(() => props.role);
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
    provide(POPPER_INJECTION_KEY, popperProvides);
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default");
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=popper.vue2.mjs.map
