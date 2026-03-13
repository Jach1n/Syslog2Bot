'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var dayjs = require('dayjs');
var index$4 = require('../../../button/index.js');
var index$1 = require('../../../input/index.js');
require('../../../time-picker/index.js');
var index$3 = require('../../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');
var panelDateRange = require('../props/panel-date-range.js');
var useRangePicker = require('../composables/use-range-picker.js');
var utils$1 = require('../utils.js');
var usePanelDateRange = require('../composables/use-panel-date-range.js');
var constants$1 = require('../constants.js');
var basicYearTable_vue_vue_type_script_setup_true_lang = require('./basic-year-table.vue2.js');
var basicMonthTable_vue_vue_type_script_setup_true_lang = require('./basic-month-table.vue2.js');
var basicDateTable_vue_vue_type_script_setup_true_lang = require('./basic-date-table.vue2.js');
var panelTimePick_vue_vue_type_script_setup_true_lang = require('../../../time-picker/src/time-picker-com/panel-time-pick.vue2.js');
var index$2 = require('../../../../directives/click-outside/index.js');
var constants = require('../../../time-picker/src/constants.js');
var index = require('../../../../hooks/use-locale/index.js');
var utils = require('../../../time-picker/src/utils.js');
var useFormCommonProps = require('../../../form/src/hooks/use-form-common-props.js');

const _hoisted_1 = ["disabled", "onClick"];
const _hoisted_2 = ["aria-label", "disabled"];
const _hoisted_3 = ["aria-label", "disabled"];
const _hoisted_4 = ["disabled", "aria-label"];
const _hoisted_5 = ["disabled", "aria-label"];
const _hoisted_6 = ["tabindex", "aria-disabled"];
const _hoisted_7 = ["tabindex", "aria-disabled"];
const _hoisted_8 = ["disabled", "aria-label"];
const _hoisted_9 = ["disabled", "aria-label"];
const _hoisted_10 = ["aria-label", "disabled"];
const _hoisted_11 = ["disabled", "aria-label"];
const _hoisted_12 = ["tabindex", "aria-disabled"];
const _hoisted_13 = ["tabindex", "aria-disabled"];
const unit = "month";
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "panel-date-range",
  props: panelDateRange.panelDateRangeProps,
  emits: [
    "pick",
    "set-picker-option",
    "calendar-change",
    "panel-change",
    "clear"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const pickerBase = vue.inject(constants.PICKER_BASE_INJECTION_KEY);
    const isDefaultFormat = vue.inject(
      constants$1.ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY,
      void 0
    );
    const { disabledDate, cellClassName, defaultTime, clearable } = pickerBase.props;
    const format = vue.toRef(pickerBase.props, "format");
    const shortcuts = vue.toRef(pickerBase.props, "shortcuts");
    const defaultValue = vue.toRef(pickerBase.props, "defaultValue");
    const { lang } = index.useLocale();
    const leftDate = vue.ref(dayjs().locale(lang.value));
    const rightDate = vue.ref(dayjs().locale(lang.value).add(1, unit));
    const {
      minDate,
      maxDate,
      rangeState,
      ppNs,
      drpNs,
      handleChangeRange,
      handleRangeConfirm,
      handleShortcutClick,
      onSelect,
      parseValue,
      t
    } = useRangePicker.useRangePicker(props, {
      defaultValue,
      defaultTime,
      leftDate,
      rightDate,
      unit,
      sortDates
    });
    vue.watch(
      () => props.visible,
      (visible) => {
        if (!visible && rangeState.value.selecting) {
          parseValue(props.parsedValue);
          onSelect(false);
        }
      }
    );
    const dateUserInput = vue.ref({
      min: null,
      max: null
    });
    const timeUserInput = vue.ref({
      min: null,
      max: null
    });
    const {
      leftCurrentView,
      rightCurrentView,
      leftCurrentViewRef,
      rightCurrentViewRef,
      leftYear,
      rightYear,
      leftMonth,
      rightMonth,
      leftYearLabel,
      rightYearLabel,
      showLeftPicker,
      showRightPicker,
      handleLeftYearPick,
      handleRightYearPick,
      handleLeftMonthPick,
      handleRightMonthPick,
      handlePanelChange,
      adjustDateByView
    } = usePanelDateRange.usePanelDateRange(props, emit, leftDate, rightDate);
    const hasShortcuts = vue.computed(() => !!shortcuts.value.length);
    const minVisibleDate = vue.computed(() => {
      if (dateUserInput.value.min !== null) return dateUserInput.value.min;
      if (minDate.value) return minDate.value.format(dateFormat.value);
      return "";
    });
    const maxVisibleDate = vue.computed(() => {
      if (dateUserInput.value.max !== null) return dateUserInput.value.max;
      if (maxDate.value || minDate.value)
        return (maxDate.value || minDate.value).format(dateFormat.value);
      return "";
    });
    const minVisibleTime = vue.computed(() => {
      if (timeUserInput.value.min !== null) return timeUserInput.value.min;
      if (minDate.value) return minDate.value.format(timeFormat.value);
      return "";
    });
    const maxVisibleTime = vue.computed(() => {
      if (timeUserInput.value.max !== null) return timeUserInput.value.max;
      if (maxDate.value || minDate.value)
        return (maxDate.value || minDate.value).format(timeFormat.value);
      return "";
    });
    const timeFormat = vue.computed(() => {
      return props.timeFormat || utils.extractTimeFormat(format.value || "") || constants.DEFAULT_FORMATS_TIME;
    });
    const dateFormat = vue.computed(() => {
      return props.dateFormat || utils.extractDateFormat(format.value || "") || constants.DEFAULT_FORMATS_DATE;
    });
    const isValidValue = (date) => {
      return utils$1.isValidRange(date) && (disabledDate ? !disabledDate(date[0].toDate()) && !disabledDate(date[1].toDate()) : true);
    };
    const leftPrevYear = () => {
      leftDate.value = adjustDateByView(
        leftCurrentView.value,
        leftDate.value,
        false
      );
      if (!props.unlinkPanels) {
        rightDate.value = leftDate.value.add(1, "month");
      }
      handlePanelChange("year");
    };
    const leftPrevMonth = () => {
      leftDate.value = leftDate.value.subtract(1, "month");
      if (!props.unlinkPanels) {
        rightDate.value = leftDate.value.add(1, "month");
      }
      handlePanelChange("month");
    };
    const rightNextYear = () => {
      if (!props.unlinkPanels) {
        leftDate.value = adjustDateByView(
          rightCurrentView.value,
          leftDate.value,
          true
        );
        rightDate.value = leftDate.value.add(1, "month");
      } else {
        rightDate.value = adjustDateByView(
          rightCurrentView.value,
          rightDate.value,
          true
        );
      }
      handlePanelChange("year");
    };
    const rightNextMonth = () => {
      if (!props.unlinkPanels) {
        leftDate.value = leftDate.value.add(1, "month");
        rightDate.value = leftDate.value.add(1, "month");
      } else {
        rightDate.value = rightDate.value.add(1, "month");
      }
      handlePanelChange("month");
    };
    const leftNextYear = () => {
      leftDate.value = adjustDateByView(leftCurrentView.value, leftDate.value, true);
      handlePanelChange("year");
    };
    const leftNextMonth = () => {
      leftDate.value = leftDate.value.add(1, "month");
      handlePanelChange("month");
    };
    const rightPrevYear = () => {
      rightDate.value = adjustDateByView(
        rightCurrentView.value,
        rightDate.value,
        false
      );
      handlePanelChange("year");
    };
    const rightPrevMonth = () => {
      rightDate.value = rightDate.value.subtract(1, "month");
      handlePanelChange("month");
    };
    const enableMonthArrow = vue.computed(() => {
      const nextMonth = (leftMonth.value + 1) % 12;
      const yearOffset = leftMonth.value + 1 >= 12 ? 1 : 0;
      return props.unlinkPanels && new Date(leftYear.value + yearOffset, nextMonth) < new Date(rightYear.value, rightMonth.value);
    });
    const enableYearArrow = vue.computed(() => {
      return props.unlinkPanels && rightYear.value * 12 + rightMonth.value - (leftYear.value * 12 + leftMonth.value + 1) >= 12;
    });
    const dateRangeDisabled = useFormCommonProps.useFormDisabled();
    const btnDisabled = vue.computed(() => {
      return !(minDate.value && maxDate.value && !rangeState.value.selecting && utils$1.isValidRange([minDate.value, maxDate.value]) && !dateRangeDisabled.value);
    });
    const showTime = vue.computed(
      () => props.type === "datetime" || props.type === "datetimerange"
    );
    const formatEmit = (emitDayjs, index) => {
      if (!emitDayjs) return;
      if (defaultTime) {
        const defaultTimeD = dayjs(
          defaultTime[index] || defaultTime
        ).locale(lang.value);
        return defaultTimeD.year(emitDayjs.year()).month(emitDayjs.month()).date(emitDayjs.date());
      }
      return emitDayjs;
    };
    const handleRangePick = (val, close = true) => {
      const min_ = val.minDate;
      const max_ = val.maxDate;
      const minDate_ = formatEmit(min_, 0);
      const maxDate_ = formatEmit(max_, 1);
      if (maxDate.value === maxDate_ && minDate.value === minDate_) {
        return;
      }
      emit("calendar-change", [min_.toDate(), max_ && max_.toDate()]);
      maxDate.value = maxDate_;
      minDate.value = minDate_;
      if (!showTime.value && close) {
        close = !minDate_ || !maxDate_;
      }
      handleRangeConfirm(close);
    };
    const minTimePickerVisible = vue.ref(false);
    const maxTimePickerVisible = vue.ref(false);
    const handleMinTimeClose = () => {
      minTimePickerVisible.value = false;
    };
    const handleMaxTimeClose = () => {
      maxTimePickerVisible.value = false;
    };
    const handleDateInput = (value, type) => {
      dateUserInput.value[type] = value;
      const parsedValueD = dayjs(value, dateFormat.value).locale(lang.value);
      if (parsedValueD.isValid()) {
        if (disabledDate && disabledDate(parsedValueD.toDate())) {
          return;
        }
        if (type === "min") {
          leftDate.value = parsedValueD;
          minDate.value = (minDate.value || leftDate.value).year(parsedValueD.year()).month(parsedValueD.month()).date(parsedValueD.date());
          if (!props.unlinkPanels && (!maxDate.value || maxDate.value.isBefore(minDate.value))) {
            rightDate.value = parsedValueD.add(1, "month");
            maxDate.value = minDate.value.add(1, "month");
          }
        } else {
          rightDate.value = parsedValueD;
          maxDate.value = (maxDate.value || rightDate.value).year(parsedValueD.year()).month(parsedValueD.month()).date(parsedValueD.date());
          if (!props.unlinkPanels && (!minDate.value || minDate.value.isAfter(maxDate.value))) {
            leftDate.value = parsedValueD.subtract(1, "month");
            minDate.value = maxDate.value.subtract(1, "month");
          }
        }
        sortDates(minDate.value, maxDate.value);
        handleRangeConfirm(true);
      }
    };
    const handleDateChange = (_, type) => {
      dateUserInput.value[type] = null;
    };
    const handleTimeInput = (value, type) => {
      timeUserInput.value[type] = value;
      const parsedValueD = dayjs(value, timeFormat.value).locale(lang.value);
      if (parsedValueD.isValid()) {
        if (type === "min") {
          minTimePickerVisible.value = true;
          minDate.value = (minDate.value || leftDate.value).hour(parsedValueD.hour()).minute(parsedValueD.minute()).second(parsedValueD.second());
          leftDate.value = minDate.value;
        } else {
          maxTimePickerVisible.value = true;
          maxDate.value = (maxDate.value || rightDate.value).hour(parsedValueD.hour()).minute(parsedValueD.minute()).second(parsedValueD.second());
          rightDate.value = maxDate.value;
        }
      }
    };
    const handleTimeChange = (_value, type) => {
      timeUserInput.value[type] = null;
      if (type === "min") {
        leftDate.value = minDate.value;
        minTimePickerVisible.value = false;
        if (!maxDate.value || maxDate.value.isBefore(minDate.value)) {
          maxDate.value = minDate.value;
        }
      } else {
        rightDate.value = maxDate.value;
        maxTimePickerVisible.value = false;
        if (maxDate.value && maxDate.value.isBefore(minDate.value)) {
          minDate.value = maxDate.value;
        }
      }
      handleRangeConfirm(true);
    };
    const handleMinTimePick = (value, visible, first) => {
      if (timeUserInput.value.min) return;
      if (value) {
        minDate.value = (minDate.value || leftDate.value).hour(value.hour()).minute(value.minute()).second(value.second());
      }
      if (!first) {
        minTimePickerVisible.value = visible;
      }
      if (!maxDate.value || maxDate.value.isBefore(minDate.value)) {
        maxDate.value = minDate.value;
        rightDate.value = value;
        vue.nextTick(() => {
          parseValue(props.parsedValue);
        });
      }
      handleRangeConfirm(true);
    };
    const handleMaxTimePick = (value, visible, first) => {
      if (timeUserInput.value.max) return;
      if (value) {
        maxDate.value = (maxDate.value || rightDate.value).hour(value.hour()).minute(value.minute()).second(value.second());
      }
      if (!first) {
        maxTimePickerVisible.value = visible;
      }
      if (maxDate.value && maxDate.value.isBefore(minDate.value)) {
        minDate.value = maxDate.value;
      }
      handleRangeConfirm(true);
    };
    const onClear = () => {
      handleClear();
      emit("clear");
    };
    const handleClear = () => {
      let valueOnClear = null;
      if (pickerBase == null ? void 0 : pickerBase.emptyValues) {
        valueOnClear = pickerBase.emptyValues.valueOnClear.value;
      }
      leftDate.value = utils$1.getDefaultValue(vue.unref(defaultValue), {
        lang: vue.unref(lang),
        unit: "month",
        unlinkPanels: props.unlinkPanels
      })[0];
      rightDate.value = leftDate.value.add(1, "month");
      maxDate.value = void 0;
      minDate.value = void 0;
      handleRangeConfirm(true);
      emit("pick", valueOnClear);
    };
    const parseUserInput = (value) => {
      return utils$1.correctlyParseUserInput(
        value,
        format.value || "",
        lang.value,
        isDefaultFormat
      );
    };
    function sortDates(minDate2, maxDate2) {
      if (props.unlinkPanels && maxDate2) {
        const minDateYear = (minDate2 == null ? void 0 : minDate2.year()) || 0;
        const minDateMonth = (minDate2 == null ? void 0 : minDate2.month()) || 0;
        const maxDateYear = maxDate2.year();
        const maxDateMonth = maxDate2.month();
        rightDate.value = minDateYear === maxDateYear && minDateMonth === maxDateMonth ? maxDate2.add(1, unit) : maxDate2;
      } else {
        rightDate.value = leftDate.value.add(1, unit);
        if (maxDate2) {
          rightDate.value = rightDate.value.hour(maxDate2.hour()).minute(maxDate2.minute()).second(maxDate2.second());
        }
      }
    }
    emit("set-picker-option", ["isValidValue", isValidValue]);
    emit("set-picker-option", ["parseUserInput", parseUserInput]);
    emit("set-picker-option", ["handleClear", handleClear]);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass([
            vue.unref(ppNs).b(),
            vue.unref(drpNs).b(),
            vue.unref(ppNs).is("border", _ctx.border),
            vue.unref(ppNs).is("disabled", vue.unref(dateRangeDisabled)),
            {
              "has-sidebar": _ctx.$slots.sidebar || hasShortcuts.value,
              "has-time": showTime.value
            }
          ])
        },
        [
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(vue.unref(ppNs).e("body-wrapper"))
            },
            [
              vue.renderSlot(_ctx.$slots, "sidebar", {
                class: vue.normalizeClass(vue.unref(ppNs).e("sidebar"))
              }),
              hasShortcuts.value ? (vue.openBlock(), vue.createElementBlock(
                "div",
                {
                  key: 0,
                  class: vue.normalizeClass(vue.unref(ppNs).e("sidebar"))
                },
                [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(shortcuts.value, (shortcut, key) => {
                      return vue.openBlock(), vue.createElementBlock("button", {
                        key,
                        type: "button",
                        disabled: vue.unref(dateRangeDisabled),
                        class: vue.normalizeClass(vue.unref(ppNs).e("shortcut")),
                        onClick: ($event) => vue.unref(handleShortcutClick)(shortcut)
                      }, vue.toDisplayString(shortcut.text), 11, _hoisted_1);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                2
                /* CLASS */
              )) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode(
                "div",
                {
                  class: vue.normalizeClass(vue.unref(ppNs).e("body"))
                },
                [
                  showTime.value ? (vue.openBlock(), vue.createElementBlock(
                    "div",
                    {
                      key: 0,
                      class: vue.normalizeClass(vue.unref(drpNs).e("time-header"))
                    },
                    [
                      vue.createElementVNode(
                        "span",
                        {
                          class: vue.normalizeClass(vue.unref(drpNs).e("editors-wrap"))
                        },
                        [
                          vue.createElementVNode(
                            "span",
                            {
                              class: vue.normalizeClass(vue.unref(drpNs).e("time-picker-wrap"))
                            },
                            [
                              vue.createVNode(vue.unref(index$1.ElInput), {
                                size: "small",
                                disabled: vue.unref(rangeState).selecting || vue.unref(dateRangeDisabled),
                                placeholder: vue.unref(t)("el.datepicker.startDate"),
                                class: vue.normalizeClass(vue.unref(drpNs).e("editor")),
                                "model-value": minVisibleDate.value,
                                "validate-event": false,
                                readonly: !_ctx.editable,
                                onInput: _cache[0] || (_cache[0] = (val) => handleDateInput(val, "min")),
                                onChange: _cache[1] || (_cache[1] = (val) => handleDateChange(val, "min"))
                              }, null, 8, ["disabled", "placeholder", "class", "model-value", "readonly"])
                            ],
                            2
                            /* CLASS */
                          ),
                          vue.withDirectives((vue.openBlock(), vue.createElementBlock(
                            "span",
                            {
                              class: vue.normalizeClass(vue.unref(drpNs).e("time-picker-wrap"))
                            },
                            [
                              vue.createVNode(vue.unref(index$1.ElInput), {
                                size: "small",
                                class: vue.normalizeClass(vue.unref(drpNs).e("editor")),
                                disabled: vue.unref(rangeState).selecting || vue.unref(dateRangeDisabled),
                                placeholder: vue.unref(t)("el.datepicker.startTime"),
                                "model-value": minVisibleTime.value,
                                "validate-event": false,
                                readonly: !_ctx.editable,
                                onFocus: _cache[2] || (_cache[2] = ($event) => minTimePickerVisible.value = true),
                                onInput: _cache[3] || (_cache[3] = (val) => handleTimeInput(val, "min")),
                                onChange: _cache[4] || (_cache[4] = (val) => handleTimeChange(val, "min"))
                              }, null, 8, ["class", "disabled", "placeholder", "model-value", "readonly"]),
                              vue.createVNode(vue.unref(panelTimePick_vue_vue_type_script_setup_true_lang.default), {
                                visible: minTimePickerVisible.value,
                                format: timeFormat.value,
                                "datetime-role": "start",
                                "parsed-value": vue.unref(minDate) || leftDate.value,
                                onPick: handleMinTimePick
                              }, null, 8, ["visible", "format", "parsed-value"])
                            ],
                            2
                            /* CLASS */
                          )), [
                            [vue.unref(index$2.default), handleMinTimeClose]
                          ])
                        ],
                        2
                        /* CLASS */
                      ),
                      vue.createElementVNode("span", null, [
                        vue.createVNode(vue.unref(index$3.ElIcon), null, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(iconsVue.ArrowRight))
                          ]),
                          _: 1
                          /* STABLE */
                        })
                      ]),
                      vue.createElementVNode(
                        "span",
                        {
                          class: vue.normalizeClass([vue.unref(drpNs).e("editors-wrap"), "is-right"])
                        },
                        [
                          vue.createElementVNode(
                            "span",
                            {
                              class: vue.normalizeClass(vue.unref(drpNs).e("time-picker-wrap"))
                            },
                            [
                              vue.createVNode(vue.unref(index$1.ElInput), {
                                size: "small",
                                class: vue.normalizeClass(vue.unref(drpNs).e("editor")),
                                disabled: vue.unref(rangeState).selecting || vue.unref(dateRangeDisabled),
                                placeholder: vue.unref(t)("el.datepicker.endDate"),
                                "model-value": maxVisibleDate.value,
                                readonly: !vue.unref(minDate) || !_ctx.editable,
                                "validate-event": false,
                                onInput: _cache[5] || (_cache[5] = (val) => handleDateInput(val, "max")),
                                onChange: _cache[6] || (_cache[6] = (val) => handleDateChange(val, "max"))
                              }, null, 8, ["class", "disabled", "placeholder", "model-value", "readonly"])
                            ],
                            2
                            /* CLASS */
                          ),
                          vue.withDirectives((vue.openBlock(), vue.createElementBlock(
                            "span",
                            {
                              class: vue.normalizeClass(vue.unref(drpNs).e("time-picker-wrap"))
                            },
                            [
                              vue.createVNode(vue.unref(index$1.ElInput), {
                                size: "small",
                                class: vue.normalizeClass(vue.unref(drpNs).e("editor")),
                                disabled: vue.unref(rangeState).selecting || vue.unref(dateRangeDisabled),
                                placeholder: vue.unref(t)("el.datepicker.endTime"),
                                "model-value": maxVisibleTime.value,
                                readonly: !vue.unref(minDate) || !_ctx.editable,
                                "validate-event": false,
                                onFocus: _cache[7] || (_cache[7] = ($event) => vue.unref(minDate) && (maxTimePickerVisible.value = true)),
                                onInput: _cache[8] || (_cache[8] = (val) => handleTimeInput(val, "max")),
                                onChange: _cache[9] || (_cache[9] = (val) => handleTimeChange(val, "max"))
                              }, null, 8, ["class", "disabled", "placeholder", "model-value", "readonly"]),
                              vue.createVNode(vue.unref(panelTimePick_vue_vue_type_script_setup_true_lang.default), {
                                "datetime-role": "end",
                                visible: maxTimePickerVisible.value,
                                format: timeFormat.value,
                                "parsed-value": vue.unref(maxDate) || rightDate.value,
                                onPick: handleMaxTimePick
                              }, null, 8, ["visible", "format", "parsed-value"])
                            ],
                            2
                            /* CLASS */
                          )), [
                            [vue.unref(index$2.default), handleMaxTimeClose]
                          ])
                        ],
                        2
                        /* CLASS */
                      )
                    ],
                    2
                    /* CLASS */
                  )) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode(
                    "div",
                    {
                      class: vue.normalizeClass([[vue.unref(ppNs).e("content"), vue.unref(drpNs).e("content")], "is-left"])
                    },
                    [
                      vue.createElementVNode(
                        "div",
                        {
                          class: vue.normalizeClass(vue.unref(drpNs).e("header"))
                        },
                        [
                          vue.createElementVNode("button", {
                            type: "button",
                            class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "d-arrow-left"]),
                            "aria-label": vue.unref(t)(`el.datepicker.prevYear`),
                            disabled: vue.unref(dateRangeDisabled),
                            onClick: leftPrevYear
                          }, [
                            vue.renderSlot(_ctx.$slots, "prev-year", {}, () => [
                              vue.createVNode(vue.unref(index$3.ElIcon), null, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(iconsVue.DArrowLeft))
                                ]),
                                _: 1
                                /* STABLE */
                              })
                            ])
                          ], 10, _hoisted_2),
                          vue.withDirectives(vue.createElementVNode("button", {
                            type: "button",
                            class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "arrow-left"]),
                            "aria-label": vue.unref(t)(`el.datepicker.prevMonth`),
                            disabled: vue.unref(dateRangeDisabled),
                            onClick: leftPrevMonth
                          }, [
                            vue.renderSlot(_ctx.$slots, "prev-month", {}, () => [
                              vue.createVNode(vue.unref(index$3.ElIcon), null, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(iconsVue.ArrowLeft))
                                ]),
                                _: 1
                                /* STABLE */
                              })
                            ])
                          ], 10, _hoisted_3), [
                            [vue.vShow, vue.unref(leftCurrentView) === "date"]
                          ]),
                          _ctx.unlinkPanels ? (vue.openBlock(), vue.createElementBlock("button", {
                            key: 0,
                            type: "button",
                            disabled: !enableYearArrow.value || vue.unref(dateRangeDisabled),
                            class: vue.normalizeClass([[
                              vue.unref(ppNs).e("icon-btn"),
                              vue.unref(ppNs).is("disabled", !enableYearArrow.value || vue.unref(dateRangeDisabled))
                            ], "d-arrow-right"]),
                            "aria-label": vue.unref(t)(`el.datepicker.nextYear`),
                            onClick: leftNextYear
                          }, [
                            vue.renderSlot(_ctx.$slots, "next-year", {}, () => [
                              vue.createVNode(vue.unref(index$3.ElIcon), null, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(iconsVue.DArrowRight))
                                ]),
                                _: 1
                                /* STABLE */
                              })
                            ])
                          ], 10, _hoisted_4)) : vue.createCommentVNode("v-if", true),
                          _ctx.unlinkPanels && vue.unref(leftCurrentView) === "date" ? (vue.openBlock(), vue.createElementBlock("button", {
                            key: 1,
                            type: "button",
                            disabled: !enableMonthArrow.value || vue.unref(dateRangeDisabled),
                            class: vue.normalizeClass([[
                              vue.unref(ppNs).e("icon-btn"),
                              vue.unref(ppNs).is("disabled", !enableMonthArrow.value || vue.unref(dateRangeDisabled))
                            ], "arrow-right"]),
                            "aria-label": vue.unref(t)(`el.datepicker.nextMonth`),
                            onClick: leftNextMonth
                          }, [
                            vue.renderSlot(_ctx.$slots, "next-month", {}, () => [
                              vue.createVNode(vue.unref(index$3.ElIcon), null, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(iconsVue.ArrowRight))
                                ]),
                                _: 1
                                /* STABLE */
                              })
                            ])
                          ], 10, _hoisted_5)) : vue.createCommentVNode("v-if", true),
                          vue.createElementVNode("div", null, [
                            vue.createElementVNode("span", {
                              role: "button",
                              class: vue.normalizeClass(vue.unref(drpNs).e("header-label")),
                              "aria-live": "polite",
                              tabindex: _ctx.disabled ? void 0 : 0,
                              "aria-disabled": _ctx.disabled,
                              onKeydown: _cache[10] || (_cache[10] = vue.withKeys(($event) => vue.unref(showLeftPicker)("year"), ["enter"])),
                              onClick: _cache[11] || (_cache[11] = ($event) => vue.unref(showLeftPicker)("year"))
                            }, vue.toDisplayString(vue.unref(leftYearLabel)), 43, _hoisted_6),
                            vue.withDirectives(vue.createElementVNode("span", {
                              role: "button",
                              "aria-live": "polite",
                              tabindex: _ctx.disabled ? void 0 : 0,
                              "aria-disabled": _ctx.disabled,
                              class: vue.normalizeClass([
                                vue.unref(drpNs).e("header-label"),
                                { active: vue.unref(leftCurrentView) === "month" }
                              ]),
                              onKeydown: _cache[12] || (_cache[12] = vue.withKeys(($event) => vue.unref(showLeftPicker)("month"), ["enter"])),
                              onClick: _cache[13] || (_cache[13] = ($event) => vue.unref(showLeftPicker)("month"))
                            }, vue.toDisplayString(vue.unref(t)(`el.datepicker.month${leftDate.value.month() + 1}`)), 43, _hoisted_7), [
                              [vue.vShow, vue.unref(leftCurrentView) === "date"]
                            ])
                          ])
                        ],
                        2
                        /* CLASS */
                      ),
                      vue.unref(leftCurrentView) === "date" ? (vue.openBlock(), vue.createBlock(basicDateTable_vue_vue_type_script_setup_true_lang.default, {
                        key: 0,
                        ref_key: "leftCurrentViewRef",
                        ref: leftCurrentViewRef,
                        "selection-mode": "range",
                        date: leftDate.value,
                        "min-date": vue.unref(minDate),
                        "max-date": vue.unref(maxDate),
                        "range-state": vue.unref(rangeState),
                        "disabled-date": vue.unref(disabledDate),
                        "cell-class-name": vue.unref(cellClassName),
                        "show-week-number": _ctx.showWeekNumber,
                        disabled: vue.unref(dateRangeDisabled),
                        onChangerange: vue.unref(handleChangeRange),
                        onPick: handleRangePick,
                        onSelect: vue.unref(onSelect)
                      }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "cell-class-name", "show-week-number", "disabled", "onChangerange", "onSelect"])) : vue.createCommentVNode("v-if", true),
                      vue.unref(leftCurrentView) === "year" ? (vue.openBlock(), vue.createBlock(basicYearTable_vue_vue_type_script_setup_true_lang.default, {
                        key: 1,
                        ref_key: "leftCurrentViewRef",
                        ref: leftCurrentViewRef,
                        "selection-mode": "year",
                        date: leftDate.value,
                        "disabled-date": vue.unref(disabledDate),
                        "parsed-value": _ctx.parsedValue,
                        disabled: vue.unref(dateRangeDisabled),
                        onPick: vue.unref(handleLeftYearPick)
                      }, null, 8, ["date", "disabled-date", "parsed-value", "disabled", "onPick"])) : vue.createCommentVNode("v-if", true),
                      vue.unref(leftCurrentView) === "month" ? (vue.openBlock(), vue.createBlock(basicMonthTable_vue_vue_type_script_setup_true_lang.default, {
                        key: 2,
                        ref_key: "leftCurrentViewRef",
                        ref: leftCurrentViewRef,
                        "selection-mode": "month",
                        date: leftDate.value,
                        "parsed-value": _ctx.parsedValue,
                        "disabled-date": vue.unref(disabledDate),
                        disabled: vue.unref(dateRangeDisabled),
                        onPick: vue.unref(handleLeftMonthPick)
                      }, null, 8, ["date", "parsed-value", "disabled-date", "disabled", "onPick"])) : vue.createCommentVNode("v-if", true)
                    ],
                    2
                    /* CLASS */
                  ),
                  vue.createElementVNode(
                    "div",
                    {
                      class: vue.normalizeClass([[vue.unref(ppNs).e("content"), vue.unref(drpNs).e("content")], "is-right"])
                    },
                    [
                      vue.createElementVNode(
                        "div",
                        {
                          class: vue.normalizeClass(vue.unref(drpNs).e("header"))
                        },
                        [
                          _ctx.unlinkPanels ? (vue.openBlock(), vue.createElementBlock("button", {
                            key: 0,
                            type: "button",
                            disabled: !enableYearArrow.value || vue.unref(dateRangeDisabled),
                            class: vue.normalizeClass([[
                              vue.unref(ppNs).e("icon-btn"),
                              vue.unref(ppNs).is("disabled", !enableYearArrow.value || vue.unref(dateRangeDisabled))
                            ], "d-arrow-left"]),
                            "aria-label": vue.unref(t)(`el.datepicker.prevYear`),
                            onClick: rightPrevYear
                          }, [
                            vue.renderSlot(_ctx.$slots, "prev-year", {}, () => [
                              vue.createVNode(vue.unref(index$3.ElIcon), null, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(iconsVue.DArrowLeft))
                                ]),
                                _: 1
                                /* STABLE */
                              })
                            ])
                          ], 10, _hoisted_8)) : vue.createCommentVNode("v-if", true),
                          _ctx.unlinkPanels && vue.unref(rightCurrentView) === "date" ? (vue.openBlock(), vue.createElementBlock("button", {
                            key: 1,
                            type: "button",
                            disabled: !enableMonthArrow.value || vue.unref(dateRangeDisabled),
                            class: vue.normalizeClass([[
                              vue.unref(ppNs).e("icon-btn"),
                              vue.unref(ppNs).is("disabled", !enableMonthArrow.value || vue.unref(dateRangeDisabled))
                            ], "arrow-left"]),
                            "aria-label": vue.unref(t)(`el.datepicker.prevMonth`),
                            onClick: rightPrevMonth
                          }, [
                            vue.renderSlot(_ctx.$slots, "prev-month", {}, () => [
                              vue.createVNode(vue.unref(index$3.ElIcon), null, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(iconsVue.ArrowLeft))
                                ]),
                                _: 1
                                /* STABLE */
                              })
                            ])
                          ], 10, _hoisted_9)) : vue.createCommentVNode("v-if", true),
                          vue.createElementVNode("button", {
                            type: "button",
                            "aria-label": vue.unref(t)(`el.datepicker.nextYear`),
                            class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "d-arrow-right"]),
                            disabled: vue.unref(dateRangeDisabled),
                            onClick: rightNextYear
                          }, [
                            vue.renderSlot(_ctx.$slots, "next-year", {}, () => [
                              vue.createVNode(vue.unref(index$3.ElIcon), null, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(iconsVue.DArrowRight))
                                ]),
                                _: 1
                                /* STABLE */
                              })
                            ])
                          ], 10, _hoisted_10),
                          vue.withDirectives(vue.createElementVNode("button", {
                            type: "button",
                            class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "arrow-right"]),
                            disabled: vue.unref(dateRangeDisabled),
                            "aria-label": vue.unref(t)(`el.datepicker.nextMonth`),
                            onClick: rightNextMonth
                          }, [
                            vue.renderSlot(_ctx.$slots, "next-month", {}, () => [
                              vue.createVNode(vue.unref(index$3.ElIcon), null, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(iconsVue.ArrowRight))
                                ]),
                                _: 1
                                /* STABLE */
                              })
                            ])
                          ], 10, _hoisted_11), [
                            [vue.vShow, vue.unref(rightCurrentView) === "date"]
                          ]),
                          vue.createElementVNode("div", null, [
                            vue.createElementVNode("span", {
                              role: "button",
                              class: vue.normalizeClass(vue.unref(drpNs).e("header-label")),
                              "aria-live": "polite",
                              tabindex: _ctx.disabled ? void 0 : 0,
                              "aria-disabled": _ctx.disabled,
                              onKeydown: _cache[14] || (_cache[14] = vue.withKeys(($event) => vue.unref(showRightPicker)("year"), ["enter"])),
                              onClick: _cache[15] || (_cache[15] = ($event) => vue.unref(showRightPicker)("year"))
                            }, vue.toDisplayString(vue.unref(rightYearLabel)), 43, _hoisted_12),
                            vue.withDirectives(vue.createElementVNode("span", {
                              role: "button",
                              "aria-live": "polite",
                              tabindex: _ctx.disabled ? void 0 : 0,
                              "aria-disabled": _ctx.disabled,
                              class: vue.normalizeClass([
                                vue.unref(drpNs).e("header-label"),
                                { active: vue.unref(rightCurrentView) === "month" }
                              ]),
                              onKeydown: _cache[16] || (_cache[16] = vue.withKeys(($event) => vue.unref(showRightPicker)("month"), ["enter"])),
                              onClick: _cache[17] || (_cache[17] = ($event) => vue.unref(showRightPicker)("month"))
                            }, vue.toDisplayString(vue.unref(t)(`el.datepicker.month${rightDate.value.month() + 1}`)), 43, _hoisted_13), [
                              [vue.vShow, vue.unref(rightCurrentView) === "date"]
                            ])
                          ])
                        ],
                        2
                        /* CLASS */
                      ),
                      vue.unref(rightCurrentView) === "date" ? (vue.openBlock(), vue.createBlock(basicDateTable_vue_vue_type_script_setup_true_lang.default, {
                        key: 0,
                        ref_key: "rightCurrentViewRef",
                        ref: rightCurrentViewRef,
                        "selection-mode": "range",
                        date: rightDate.value,
                        "min-date": vue.unref(minDate),
                        "max-date": vue.unref(maxDate),
                        "range-state": vue.unref(rangeState),
                        "disabled-date": vue.unref(disabledDate),
                        "cell-class-name": vue.unref(cellClassName),
                        "show-week-number": _ctx.showWeekNumber,
                        disabled: vue.unref(dateRangeDisabled),
                        onChangerange: vue.unref(handleChangeRange),
                        onPick: handleRangePick,
                        onSelect: vue.unref(onSelect)
                      }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "cell-class-name", "show-week-number", "disabled", "onChangerange", "onSelect"])) : vue.createCommentVNode("v-if", true),
                      vue.unref(rightCurrentView) === "year" ? (vue.openBlock(), vue.createBlock(basicYearTable_vue_vue_type_script_setup_true_lang.default, {
                        key: 1,
                        ref_key: "rightCurrentViewRef",
                        ref: rightCurrentViewRef,
                        "selection-mode": "year",
                        date: rightDate.value,
                        "disabled-date": vue.unref(disabledDate),
                        "parsed-value": _ctx.parsedValue,
                        disabled: vue.unref(dateRangeDisabled),
                        onPick: vue.unref(handleRightYearPick)
                      }, null, 8, ["date", "disabled-date", "parsed-value", "disabled", "onPick"])) : vue.createCommentVNode("v-if", true),
                      vue.unref(rightCurrentView) === "month" ? (vue.openBlock(), vue.createBlock(basicMonthTable_vue_vue_type_script_setup_true_lang.default, {
                        key: 2,
                        ref_key: "rightCurrentViewRef",
                        ref: rightCurrentViewRef,
                        "selection-mode": "month",
                        date: rightDate.value,
                        "parsed-value": _ctx.parsedValue,
                        "disabled-date": vue.unref(disabledDate),
                        disabled: vue.unref(dateRangeDisabled),
                        onPick: vue.unref(handleRightMonthPick)
                      }, null, 8, ["date", "parsed-value", "disabled-date", "disabled", "onPick"])) : vue.createCommentVNode("v-if", true)
                    ],
                    2
                    /* CLASS */
                  )
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          ),
          _ctx.showFooter && showTime.value && (_ctx.showConfirm || vue.unref(clearable)) ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass(vue.unref(ppNs).e("footer"))
            },
            [
              vue.unref(clearable) ? (vue.openBlock(), vue.createBlock(vue.unref(index$4.ElButton), {
                key: 0,
                text: "",
                size: "small",
                class: vue.normalizeClass(vue.unref(ppNs).e("link-btn")),
                onClick: onClear
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(
                    vue.toDisplayString(vue.unref(t)("el.datepicker.clear")),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
              _ctx.showConfirm ? (vue.openBlock(), vue.createBlock(vue.unref(index$4.ElButton), {
                key: 1,
                plain: "",
                size: "small",
                class: vue.normalizeClass(vue.unref(ppNs).e("link-btn")),
                disabled: btnDisabled.value,
                onClick: _cache[18] || (_cache[18] = ($event) => vue.unref(handleRangeConfirm)(false))
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(
                    vue.toDisplayString(vue.unref(t)("el.datepicker.confirm")),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["class", "disabled"])) : vue.createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=panel-date-range.vue2.js.map
