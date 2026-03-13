'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var useOption = require('./useOption.js');
var option = require('./option.js');
var index = require('../../../hooks/use-namespace/index.js');
var index$1 = require('../../../hooks/use-id/index.js');

var _sfc_main = vue.defineComponent({
  name: option.COMPONENT_NAME,
  componentName: option.COMPONENT_NAME,
  props: option.optionProps,
  setup(props) {
    const ns = index.useNamespace("select");
    const id = index$1.useId();
    const containerKls = vue.computed(() => [
      ns.be("dropdown", "item"),
      ns.is("disabled", vue.unref(isDisabled)),
      ns.is("selected", vue.unref(itemSelected)),
      ns.is("hovering", vue.unref(hover))
    ]);
    const states = vue.reactive({
      index: -1,
      groupDisabled: false,
      visible: true,
      hover: false
    });
    const {
      currentLabel,
      itemSelected,
      isDisabled,
      select,
      hoverItem,
      updateOption
    } = useOption.useOption(props, states);
    const { visible, hover } = vue.toRefs(states);
    const vm = vue.getCurrentInstance().proxy;
    select.onOptionCreate(vm);
    vue.onBeforeUnmount(() => {
      const key = vm.value;
      vue.nextTick(() => {
        const { selected: selectedOptions } = select.states;
        const doesSelected = selectedOptions.some((item) => {
          return item.value === vm.value;
        });
        if (select.states.cachedOptions.get(key) === vm && !doesSelected) {
          select.states.cachedOptions.delete(key);
        }
      });
      select.onOptionDestroy(key, vm);
    });
    function selectOptionClick() {
      if (!isDisabled.value) {
        select.handleOptionSelect(vm);
      }
    }
    return {
      ns,
      id,
      containerKls,
      currentLabel,
      itemSelected,
      isDisabled,
      select,
      visible,
      hover,
      states,
      hoverItem,
      updateOption,
      selectOptionClick
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=option.vue2.js.map
