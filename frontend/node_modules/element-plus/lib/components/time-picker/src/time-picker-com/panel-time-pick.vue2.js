'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var dayjs = require('dayjs');
var constants = require('../constants.js');
var panelTimePicker = require('../props/panel-time-picker.js');
var useTimePanel = require('../composables/use-time-panel.js');
var useTimePicker = require('../composables/use-time-picker.js');
var basicTimeSpinner_vue_vue_type_script_setup_true_lang = require('./basic-time-spinner.vue2.js');
var index = require('../../../../hooks/use-namespace/index.js');
var index$1 = require('../../../../hooks/use-locale/index.js');
var types = require('../../../../utils/types.js');
var event = require('../../../../utils/dom/event.js');
var aria = require('../../../../constants/aria.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "panel-time-pick",
  props: panelTimePicker.panelTimePickerProps,
  emits: ["pick", "select-range", "set-picker-option"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const pickerBase = vue.inject(constants.PICKER_BASE_INJECTION_KEY);
    const {
      arrowControl,
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      defaultValue
    } = pickerBase.props;
    const { getAvailableHours, getAvailableMinutes, getAvailableSeconds } = useTimePicker.buildAvailableTimeSlotGetter(disabledHours, disabledMinutes, disabledSeconds);
    const ns = index.useNamespace("time");
    const { t, lang } = index$1.useLocale();
    const selectionRange = vue.ref([0, 2]);
    const oldValue = useTimePicker.useOldValue(props);
    const transitionName = vue.computed(() => {
      return types.isUndefined(props.actualVisible) ? `${ns.namespace.value}-zoom-in-top` : "";
    });
    const showSeconds = vue.computed(() => {
      return props.format.includes("ss");
    });
    const amPmMode = vue.computed(() => {
      if (props.format.includes("A")) return "A";
      if (props.format.includes("a")) return "a";
      return "";
    });
    const isValidValue = (_date) => {
      const parsedDate = dayjs(_date).locale(lang.value);
      const result = getRangeAvailableTime(parsedDate);
      return parsedDate.isSame(result);
    };
    const handleCancel = () => {
      const old = oldValue.value;
      emit("pick", old, false);
      vue.nextTick(() => {
        oldValue.value = old;
      });
    };
    const handleConfirm = (visible = false, first = false) => {
      if (first) return;
      emit("pick", props.parsedValue, visible);
    };
    const handleChange = (_date) => {
      if (!props.visible) {
        return;
      }
      const result = getRangeAvailableTime(_date).millisecond(0);
      emit("pick", result, true);
    };
    const setSelectionRange = (start, end) => {
      emit("select-range", start, end);
      selectionRange.value = [start, end];
    };
    const changeSelectionRange = (step) => {
      const actualFormat = props.format;
      const hourIndex = actualFormat.indexOf("HH");
      const minuteIndex = actualFormat.indexOf("mm");
      const secondIndex = actualFormat.indexOf("ss");
      const list = [];
      const mapping = [];
      if (hourIndex !== -1) {
        list.push(hourIndex);
        mapping.push("hours");
      }
      if (minuteIndex !== -1) {
        list.push(minuteIndex);
        mapping.push("minutes");
      }
      if (secondIndex !== -1 && showSeconds.value) {
        list.push(secondIndex);
        mapping.push("seconds");
      }
      const index = list.indexOf(selectionRange.value[0]);
      const next = (index + step + list.length) % list.length;
      timePickerOptions["start_emitSelectRange"](mapping[next]);
    };
    const handleKeydown = (event$1) => {
      const code = event.getEventCode(event$1);
      const { left, right, up, down } = aria.EVENT_CODE;
      if ([left, right].includes(code)) {
        const step = code === left ? -1 : 1;
        changeSelectionRange(step);
        event$1.preventDefault();
        return;
      }
      if ([up, down].includes(code)) {
        const step = code === up ? -1 : 1;
        timePickerOptions["start_scrollDown"](step);
        event$1.preventDefault();
        return;
      }
    };
    const { timePickerOptions, onSetOption, getAvailableTime } = useTimePanel.useTimePanel({
      getAvailableHours,
      getAvailableMinutes,
      getAvailableSeconds
    });
    const getRangeAvailableTime = (date) => {
      return getAvailableTime(date, props.datetimeRole || "", true);
    };
    const parseUserInput = (value) => {
      if (!value) return null;
      return dayjs(value, props.format).locale(lang.value);
    };
    const getDefaultValue = () => {
      return dayjs(defaultValue).locale(lang.value);
    };
    emit("set-picker-option", ["isValidValue", isValidValue]);
    emit("set-picker-option", ["parseUserInput", parseUserInput]);
    emit("set-picker-option", ["handleKeydownInput", handleKeydown]);
    emit("set-picker-option", ["getRangeAvailableTime", getRangeAvailableTime]);
    emit("set-picker-option", ["getDefaultValue", getDefaultValue]);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.Transition, { name: transitionName.value }, {
        default: vue.withCtx(() => [
          _ctx.actualVisible || _ctx.visible ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass(vue.unref(ns).b("panel"))
            },
            [
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass([vue.unref(ns).be("panel", "content"), { "has-seconds": showSeconds.value }])
                },
                [
                  vue.createVNode(basicTimeSpinner_vue_vue_type_script_setup_true_lang.default, {
                    ref: "spinner",
                    role: _ctx.datetimeRole || "start",
                    "arrow-control": vue.unref(arrowControl),
                    "show-seconds": showSeconds.value,
                    "am-pm-mode": amPmMode.value,
                    "spinner-date": (
                      // https://github.com/vuejs/language-tools/issues/2104#issuecomment-3092541527
                      _ctx.parsedValue
                    ),
                    "disabled-hours": vue.unref(disabledHours),
                    "disabled-minutes": vue.unref(disabledMinutes),
                    "disabled-seconds": vue.unref(disabledSeconds),
                    onChange: handleChange,
                    onSetOption: vue.unref(onSetOption),
                    onSelectRange: setSelectionRange
                  }, null, 8, ["role", "arrow-control", "show-seconds", "am-pm-mode", "spinner-date", "disabled-hours", "disabled-minutes", "disabled-seconds", "onSetOption"])
                ],
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(vue.unref(ns).be("panel", "footer"))
                },
                [
                  vue.createElementVNode(
                    "button",
                    {
                      type: "button",
                      class: vue.normalizeClass([vue.unref(ns).be("panel", "btn"), "cancel"]),
                      onClick: handleCancel
                    },
                    vue.toDisplayString(vue.unref(t)("el.datepicker.cancel")),
                    3
                    /* TEXT, CLASS */
                  ),
                  vue.createElementVNode(
                    "button",
                    {
                      type: "button",
                      class: vue.normalizeClass([vue.unref(ns).be("panel", "btn"), "confirm"]),
                      onClick: _cache[0] || (_cache[0] = ($event) => handleConfirm())
                    },
                    vue.toDisplayString(vue.unref(t)("el.datepicker.confirm")),
                    3
                    /* TEXT, CLASS */
                  )
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ]),
        _: 1
        /* STABLE */
      }, 8, ["name"]);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=panel-time-pick.vue2.js.map
