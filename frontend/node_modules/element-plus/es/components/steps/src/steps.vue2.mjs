import { stepsEmits, stepsProps } from './steps.mjs';
import { defineComponent, getCurrentInstance, watch, provide, createElementBlock, openBlock, normalizeClass, unref, renderSlot, createVNode } from 'vue';
import { STEPS_INJECTION_KEY } from './tokens.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { useOrderedChildren } from '../../../hooks/use-ordered-children/index.mjs';
import { CHANGE_EVENT } from '../../../constants/event.mjs';

var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElSteps"
  },
  __name: "steps",
  props: stepsProps,
  emits: stepsEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("steps");
    const {
      children: steps,
      addChild: addStep,
      removeChild: removeStep,
      ChildrenSorter: StepsSorter
    } = useOrderedChildren(getCurrentInstance(), "ElStep");
    watch(steps, () => {
      steps.value.forEach((instance, index) => {
        instance.setIndex(index);
      });
    });
    provide(STEPS_INJECTION_KEY, { props, steps, addStep, removeStep });
    watch(
      () => props.active,
      (newVal, oldVal) => {
        emit(CHANGE_EVENT, newVal, oldVal);
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([unref(ns).b(), unref(ns).m(__props.simple ? "simple" : __props.direction)])
        },
        [
          renderSlot(_ctx.$slots, "default"),
          createVNode(unref(StepsSorter))
        ],
        2
        /* CLASS */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=steps.vue2.mjs.map
