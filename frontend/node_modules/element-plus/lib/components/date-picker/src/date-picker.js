'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../time-picker/index.js');
var index = require('../../date-picker-panel/index.js');
var props = require('./props.js');
var constants = require('../../date-picker-panel/src/constants.js');
var constants$1 = require('../../time-picker/src/constants.js');
var picker_vue_vue_type_script_setup_true_lang = require('../../time-picker/src/common/picker.vue2.js');
var event = require('../../../constants/event.js');

function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
var DatePicker = /* @__PURE__ */ vue.defineComponent({
  name: "ElDatePicker",
  install: null,
  props: props.datePickerProps,
  emits: [event.UPDATE_MODEL_EVENT],
  setup(props, {
    expose,
    emit,
    slots
  }) {
    const isDefaultFormat = vue.computed(() => {
      return !props.format;
    });
    vue.provide(constants.ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY, isDefaultFormat);
    vue.provide(constants$1.PICKER_POPPER_OPTIONS_INJECTION_KEY, vue.reactive(vue.toRef(props, "popperOptions")));
    const commonPicker = vue.ref();
    const refProps = {
      focus: () => {
        var _a;
        (_a = commonPicker.value) == null ? void 0 : _a.focus();
      },
      blur: () => {
        var _a;
        (_a = commonPicker.value) == null ? void 0 : _a.blur();
      },
      handleOpen: () => {
        var _a;
        (_a = commonPicker.value) == null ? void 0 : _a.handleOpen();
      },
      handleClose: () => {
        var _a;
        (_a = commonPicker.value) == null ? void 0 : _a.handleClose();
      }
    };
    expose(refProps);
    const onModelValueUpdated = (val) => {
      emit(event.UPDATE_MODEL_EVENT, val);
    };
    return () => {
      var _a;
      const format = (_a = props.format) != null ? _a : constants$1.DEFAULT_FORMATS_DATEPICKER[props.type] || constants$1.DEFAULT_FORMATS_DATE;
      return vue.createVNode(picker_vue_vue_type_script_setup_true_lang.default, vue.mergeProps(props, {
        "format": format,
        "type": props.type,
        "ref": commonPicker,
        "onUpdate:modelValue": onModelValueUpdated
      }), {
        default: (scopedProps) => vue.createVNode(index.ElDatePickerPanel, vue.mergeProps({
          "disabled": props.disabled,
          "editable": props.editable,
          "border": false
        }, scopedProps), _isSlot(slots) ? slots : {
          default: () => [slots]
        }),
        "range-separator": slots["range-separator"]
      });
    };
  }
});

exports.default = DatePicker;
//# sourceMappingURL=date-picker.js.map
