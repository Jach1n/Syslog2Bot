import { defineComponent, ref, provide, createVNode, mergeProps } from 'vue';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import { PICKER_POPPER_OPTIONS_INJECTION_KEY, DEFAULT_FORMATS_TIME } from './constants.mjs';
import _sfc_main$2 from './common/picker.vue2.mjs';
import _sfc_main$1 from './time-picker-com/panel-time-pick.vue2.mjs';
import _sfc_main from './time-picker-com/panel-time-range.vue2.mjs';
import { timePickerDefaultProps } from './common/props.mjs';
import { UPDATE_MODEL_EVENT } from '../../../constants/event.mjs';

dayjs.extend(customParseFormat);
var TimePicker = /* @__PURE__ */ defineComponent({
  name: "ElTimePicker",
  install: null,
  props: {
    ...timePickerDefaultProps,
    /**
     * @description whether to pick a time range
     */
    isRange: Boolean
  },
  emits: [UPDATE_MODEL_EVENT],
  setup(props, ctx) {
    const commonPicker = ref();
    const [type, Panel] = props.isRange ? ["timerange", _sfc_main] : ["time", _sfc_main$1];
    const modelUpdater = (value) => ctx.emit(UPDATE_MODEL_EVENT, value);
    provide(PICKER_POPPER_OPTIONS_INJECTION_KEY, props.popperOptions);
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
      const format = (_a = props.format) != null ? _a : DEFAULT_FORMATS_TIME;
      return createVNode(_sfc_main$2, mergeProps(props, {
        "ref": commonPicker,
        "type": type,
        "format": format,
        "onUpdate:modelValue": modelUpdater
      }), {
        default: (props2) => createVNode(Panel, props2, null)
      });
    };
  }
});

export { TimePicker as default };
//# sourceMappingURL=time-picker.mjs.map
