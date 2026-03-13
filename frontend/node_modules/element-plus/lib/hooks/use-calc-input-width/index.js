'use strict';

var vue = require('vue');
var core = require('@vueuse/core');
var form = require('../../constants/form.js');

function useCalcInputWidth() {
  const calculatorRef = vue.shallowRef();
  const calculatorWidth = vue.ref(0);
  const inputStyle = vue.computed(() => ({
    minWidth: `${Math.max(calculatorWidth.value, form.MINIMUM_INPUT_WIDTH)}px`
  }));
  const resetCalculatorWidth = () => {
    var _a, _b;
    calculatorWidth.value = (_b = (_a = calculatorRef.value) == null ? void 0 : _a.getBoundingClientRect().width) != null ? _b : 0;
  };
  core.useResizeObserver(calculatorRef, resetCalculatorWidth);
  return {
    calculatorRef,
    calculatorWidth,
    inputStyle
  };
}

exports.useCalcInputWidth = useCalcInputWidth;
//# sourceMappingURL=index.js.map
