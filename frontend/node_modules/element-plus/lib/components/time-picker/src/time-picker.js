'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat.js');
var constants = require('./constants.js');
var picker_vue_vue_type_script_setup_true_lang = require('./common/picker.vue2.js');
var panelTimePick_vue_vue_type_script_setup_true_lang = require('./time-picker-com/panel-time-pick.vue2.js');
var panelTimeRange_vue_vue_type_script_setup_true_lang = require('./time-picker-com/panel-time-range.vue2.js');
var props = require('./common/props.js');
var event = require('../../../constants/event.js');

dayjs.extend(customParseFormat);
var TimePicker = /* @__PURE__ */ vue.defineComponent({
  name: "ElTimePicker",
  install: null,
  props: {
    ...props.timePickerDefaultProps,
    /**
     * @description whether to pick a time range
     */
    isRange: Boolean
  },
  emits: [event.UPDATE_MODEL_EVENT],
  setup(props, ctx) {
    const commonPicker = vue.ref();
    const [type, Panel] = props.isRange ? ["timerange", panelTimeRange_vue_vue_type_script_setup_true_lang.default] : ["time", panelTimePick_vue_vue_type_script_setup_true_lang.default];
    const modelUpdater = (value) => ctx.emit(event.UPDATE_MODEL_EVENT, value);
    vue.provide(constants.PICKER_POPPER_OPTIONS_INJECTION_KEY, props.popperOptions);
    ctx.expose({
      /**
       * @description focus the Input component
       */
      focus: () => {
        var _a;
        (_a = commonPicker.value) == null ? void 0 : _a.focus();
      },
      /**
       * @description blur the Input component
       */
      blur: () => {
        var _a;
        (_a = commonPicker.value) == null ? void 0 : _a.blur();
      },
      /**
       * @description open the TimePicker popper
       */
      handleOpen: () => {
        var _a;
        (_a = commonPicker.value) == null ? void 0 : _a.handleOpen();
      },
      /**
       * @description close the TimePicker popper
       */
      handleClose: () => {
        var _a;
        (_a = commonPicker.value) == null ? void 0 : _a.handleClose();
      }
    });
    return () => {
      var _a;
      const format = (_a = props.format) != null ? _a : constants.DEFAULT_FORMATS_TIME;
      return vue.createVNode(picker_vue_vue_type_script_setup_true_lang.default, vue.mergeProps(props, {
        "ref": commonPicker,
        "type": type,
        "format": format,
        "onUpdate:modelValue": modelUpdater
      }), {
        default: (props2) => vue.createVNode(Panel, props2, null)
      });
    };
  }
});

exports.default = TimePicker;
//# sourceMappingURL=time-picker.js.map
