'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var lodashUnified = require('lodash-unified');
var dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat.js');
var advancedFormat = require('dayjs/plugin/advancedFormat.js');
var localeData = require('dayjs/plugin/localeData.js');
var weekOfYear = require('dayjs/plugin/weekOfYear.js');
var weekYear = require('dayjs/plugin/weekYear.js');
var dayOfYear = require('dayjs/plugin/dayOfYear.js');
var isSameOrAfter = require('dayjs/plugin/isSameOrAfter.js');
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore.js');
var datePickerPanel = require('./props/date-picker-panel.js');
var constants$1 = require('./constants.js');
var panelUtils = require('./panel-utils.js');
var useCommonPicker = require('../../time-picker/src/composables/use-common-picker.js');
var constants = require('../../time-picker/src/constants.js');
var event = require('../../../constants/event.js');
var index = require('../../../hooks/use-namespace/index.js');
var types = require('../../../utils/types.js');

function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
dayjs.extend(localeData);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(dayOfYear);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
var DatePickerPanel = /* @__PURE__ */ vue.defineComponent({
  name: "ElDatePickerPanel",
  install: null,
  inheritAttrs: false,
  props: datePickerPanel.datePickerPanelProps,
  emits: [event.UPDATE_MODEL_EVENT, "calendar-change", "panel-change", "visible-change", "clear"],
  setup(props, {
    slots,
    emit,
    attrs
  }) {
    const ns = index.useNamespace("picker-panel");
    const pickerInjection = vue.inject(constants.PICKER_BASE_INJECTION_KEY, void 0);
    if (types.isUndefined(pickerInjection)) {
      const _props = vue.reactive({
        ...vue.toRefs(props)
      });
      vue.provide(constants.PICKER_BASE_INJECTION_KEY, {
        props: _props
      });
    }
    vue.provide(constants$1.ROOT_PICKER_INJECTION_KEY, {
      slots,
      pickerNs: ns
    });
    const {
      parsedValue,
      onCalendarChange,
      onPanelChange,
      onSetPickerOption,
      onPick
    } = vue.inject(constants.ROOT_COMMON_PICKER_INJECTION_KEY, () => useCommonPicker.useCommonPicker(props, emit), true);
    return () => {
      const Component = panelUtils.getPanel(props.type);
      return vue.createVNode(Component, vue.mergeProps(lodashUnified.omit(attrs, "onPick"), props, {
        "parsedValue": parsedValue.value,
        "onSet-picker-option": onSetPickerOption,
        "onCalendar-change": onCalendarChange,
        "onPanel-change": onPanelChange,
        "onClear": () => emit("clear"),
        "onPick": onPick
      }), _isSlot(slots) ? slots : {
        default: () => [slots]
      });
    };
  }
});

exports.default = DatePickerPanel;
//# sourceMappingURL=date-picker-panel.js.map
