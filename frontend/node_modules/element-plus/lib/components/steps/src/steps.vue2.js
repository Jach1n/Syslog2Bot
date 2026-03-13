'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var steps = require('./steps.js');
var vue = require('vue');
var tokens = require('./tokens.js');
var index = require('../../../hooks/use-namespace/index.js');
var index$1 = require('../../../hooks/use-ordered-children/index.js');
var event = require('../../../constants/event.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElSteps"
  },
  __name: "steps",
  props: steps.stepsProps,
  emits: steps.stepsEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = index.useNamespace("steps");
    const {
      children: steps,
      addChild: addStep,
      removeChild: removeStep,
      ChildrenSorter: StepsSorter
    } = index$1.useOrderedChildren(vue.getCurrentInstance(), "ElStep");
    vue.watch(steps, () => {
      steps.value.forEach((instance, index) => {
        instance.setIndex(index);
      });
    });
    vue.provide(tokens.STEPS_INJECTION_KEY, { props, steps, addStep, removeStep });
    vue.watch(
      () => props.active,
      (newVal, oldVal) => {
        emit(event.CHANGE_EVENT, newVal, oldVal);
      }
    );
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass([vue.unref(ns).b(), vue.unref(ns).m(__props.simple ? "simple" : __props.direction)])
        },
        [
          vue.renderSlot(_ctx.$slots, "default"),
          vue.createVNode(vue.unref(StepsSorter))
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=steps.vue2.js.map
