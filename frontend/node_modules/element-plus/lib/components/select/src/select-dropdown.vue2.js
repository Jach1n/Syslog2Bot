'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var core = require('@vueuse/core');
var token = require('./token.js');
var form = require('../../../constants/form.js');
var index = require('../../../hooks/use-namespace/index.js');

var _sfc_main = vue.defineComponent({
  name: "ElSelectDropdown",
  componentName: "ElSelectDropdown",
  setup() {
    const select = vue.inject(token.selectKey);
    const ns = index.useNamespace("select");
    const popperClass = vue.computed(() => select.props.popperClass);
    const isMultiple = vue.computed(() => select.props.multiple);
    const isFitInputWidth = vue.computed(() => select.props.fitInputWidth);
    const minWidth = vue.ref("");
    function updateMinWidth() {
      var _a;
      const offsetWidth = (_a = select.selectRef) == null ? void 0 : _a.offsetWidth;
      if (offsetWidth) {
        minWidth.value = `${offsetWidth - form.BORDER_HORIZONTAL_WIDTH}px`;
      } else {
        minWidth.value = "";
      }
    }
    vue.onMounted(() => {
      updateMinWidth();
      core.useResizeObserver(select.selectRef, updateMinWidth);
    });
    return {
      ns,
      minWidth,
      popperClass,
      isMultiple,
      isFitInputWidth
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=select-dropdown.vue2.js.map
