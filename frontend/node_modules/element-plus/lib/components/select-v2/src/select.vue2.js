'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index$2 = require('../../tooltip/index.js');
var index$3 = require('../../tag/index.js');
var index$1 = require('../../icon/index.js');
var selectDropdown = require('./select-dropdown.js');
var useSelect = require('./useSelect.js');
var defaults = require('./defaults.js');
var token = require('./token.js');
var index = require('../../../directives/click-outside/index.js');
var shared = require('@vue/shared');
var index$4 = require('../../../hooks/use-calc-input-width/index.js');
var index$5 = require('../../../hooks/use-id/index.js');
var form = require('../../../constants/form.js');

var _sfc_main = vue.defineComponent({
  name: "ElSelectV2",
  components: {
    ElSelectMenu: selectDropdown.default,
    ElTag: index$3.ElTag,
    ElTooltip: index$2.ElTooltip,
    ElIcon: index$1.ElIcon
  },
  directives: { ClickOutside: index.default },
  props: defaults.selectV2Props,
  emits: defaults.selectV2Emits,
  setup(props, { emit }) {
    const modelValue = vue.computed(() => {
      const { modelValue: rawModelValue, multiple } = props;
      const fallback = multiple ? [] : void 0;
      if (shared.isArray(rawModelValue)) {
        return multiple ? rawModelValue : fallback;
      }
      return multiple ? fallback : rawModelValue;
    });
    const API = useSelect.default(
      vue.reactive({
        ...vue.toRefs(props),
        modelValue
      }),
      emit
    );
    const { calculatorRef, inputStyle } = index$4.useCalcInputWidth();
    const contentId = index$5.useId();
    vue.provide(token.selectV2InjectionKey, {
      props: vue.reactive({
        ...vue.toRefs(props),
        height: API.popupHeight,
        modelValue
      }),
      expanded: API.expanded,
      tooltipRef: API.tooltipRef,
      contentId,
      onSelect: API.onSelect,
      onHover: API.onHover,
      onKeyboardNavigate: API.onKeyboardNavigate,
      onKeyboardSelect: API.onKeyboardSelect
    });
    const selectedLabel = vue.computed(() => {
      if (!props.multiple) {
        return API.states.selectedLabel;
      }
      return API.states.cachedOptions.map((i) => API.getLabel(i));
    });
    return {
      ...API,
      modelValue,
      selectedLabel,
      calculatorRef,
      inputStyle,
      contentId,
      BORDER_HORIZONTAL_WIDTH: form.BORDER_HORIZONTAL_WIDTH
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=select.vue2.js.map
