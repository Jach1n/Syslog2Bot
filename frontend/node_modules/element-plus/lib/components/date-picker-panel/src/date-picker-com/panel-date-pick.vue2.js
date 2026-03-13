'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var dayjs = require('dayjs');
var index$5 = require('../../../button/index.js');
var index$2 = require('../../../input/index.js');
require('../../../time-picker/index.js');
var index$4 = require('../../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');
var panelDatePick = require('../props/panel-date-pick.js');
var utils$1 = require('../utils.js');
var constants$1 = require('../constants.js');
var basicDateTable_vue_vue_type_script_setup_true_lang = require('./basic-date-table.vue2.js');
var basicMonthTable_vue_vue_type_script_setup_true_lang = require('./basic-month-table.vue2.js');
var basicYearTable_vue_vue_type_script_setup_true_lang = require('./basic-year-table.vue2.js');
var constants = require('../../../time-picker/src/constants.js');
var utils = require('../../../time-picker/src/utils.js');
var arrays = require('../../../../utils/arrays.js');
var panelTimePick_vue_vue_type_script_setup_true_lang = require('../../../time-picker/src/time-picker-com/panel-time-pick.vue2.js');
var index$3 = require('../../../../directives/click-outside/index.js');
var index = require('../../../../hooks/use-namespace/index.js');
var index$1 = require('../../../../hooks/use-locale/index.js');
var useFormCommonProps = require('../../../form/src/hooks/use-form-common-props.js');
var shared = require('@vue/shared');
var event = require('../../../../utils/dom/event.js');
var aria = require('../../../../constants/aria.js');

const _hoisted_1 = ["disabled", "onClick"];
const _hoisted_2 = ["aria-label", "disabled"];
const _hoisted_3 = ["aria-label", "disabled"];
const _hoisted_4 = ["tabindex", "aria-disabled"];
const _hoisted_5 = ["tabindex", "aria-disabled"];
const _hoisted_6 = ["aria-label", "disabled"];
const _hoisted_7 = ["aria-label", "disabled"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "panel-date-pick",
  props: panelDatePick.panelDatePickProps,
  emits: ["pick", "set-picker-option", "panel-change"],
  setup(__props, { emit: __emit }) {
    const timeWithinRange = (_, __, ___) => true;
    const props = __props;
    const contextEmit = __emit;
    const ppNs = index.useNamespace("picker-panel");
    const dpNs = index.useNamespace("date-picker");
    const attrs = vue.useAttrs();
    const slots = vue.useSlots();
    const { t, lang } = index$1.useLocale();
    const pickerBase = vue.inject(constants.PICKER_BASE_INJECTION_KEY);
    const isDefaultFormat = vue.inject(
      constants$1.ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY,
      void 0
    );
    const { shortcuts, disabledDate, cellClassName, defaultTime } = pickerBase.props;
    const defaultValue = vue.toRef(pickerBase.props, "defaultValue");
    const currentViewRef = vue.ref();
    const innerDate = vue.ref(dayjs().locale(lang.value));
    const isChangeToNow = vue.ref(false);
    let isShortcut = false;
    const defaultTimeD = vue.computed(() => {
      return dayjs(defaultTime).locale(lang.value);
    });
    const month = vue.computed(() => {
      return innerDate.value.month();
    });
    const year = vue.computed(() => {
      return innerDate.value.year();
    });
    const selectableRange = vue.ref([]);
    const userInputDate = vue.ref(null);
    const userInputTime = vue.ref(null);
    const checkDateWithinRange = (date) => {
      return selectableRange.value.length > 0 ? timeWithinRange(date, selectableRange.value, props.format || "HH:mm:ss") : true;
    };
    const formatEmit = (emitDayjs) => {
      if (defaultTime && !visibleTime.value && !isChangeToNow.value && !isShortcut) {
        return defaultTimeD.value.year(emitDayjs.year()).month(emitDayjs.month()).date(emitDayjs.date());
      }
      if (showTime.value) return emitDayjs.millisecond(0);
      return emitDayjs.startOf("day");
    };
    const emit = (value, ...args) => {
      if (!value) {
        contextEmit("pick", value, ...args);
      } else if (shared.isArray(value)) {
        const dates = value.map(formatEmit);
        contextEmit("pick", dates, ...args);
      } else {
        contextEmit("pick", formatEmit(value), ...args);
      }
      userInputDate.value = null;
      userInputTime.value = null;
      isChangeToNow.value = false;
      isShortcut = false;
    };
    const handleDatePick = async (value, keepOpen) => {
      if (selectionMode.value === "date" && dayjs.isDayjs(value)) {
        const parsedDateValue = arrays.extractFirst(props.parsedValue);
        let newDate = parsedDateValue ? parsedDateValue.year(value.year()).month(value.month()).date(value.date()) : value;
        if (!checkDateWithinRange(newDate)) ;
        innerDate.value = newDate;
        emit(newDate, showTime.value || keepOpen);
      } else if (selectionMode.value === "week") {
        emit(value.date);
      } else if (selectionMode.value === "dates") {
        emit(value, true);
      }
    };
    const moveByMonth = (forward) => {
      const action = forward ? "add" : "subtract";
      innerDate.value = innerDate.value[action](1, "month");
      handlePanelChange("month");
    };
    const moveByYear = (forward) => {
      const currentDate = innerDate.value;
      const action = forward ? "add" : "subtract";
      innerDate.value = currentView.value === "year" ? currentDate[action](10, "year") : currentDate[action](1, "year");
      handlePanelChange("year");
    };
    const currentView = vue.ref("date");
    const yearLabel = vue.computed(() => {
      const yearTranslation = t("el.datepicker.year");
      if (currentView.value === "year") {
        const startYear = Math.floor(year.value / 10) * 10;
        if (yearTranslation) {
          return `${startYear} ${yearTranslation} - ${startYear + 9} ${yearTranslation}`;
        }
        return `${startYear} - ${startYear + 9}`;
      }
      return `${year.value} ${yearTranslation}`;
    });
    const handleShortcutClick = (shortcut) => {
      const shortcutValue = shared.isFunction(shortcut.value) ? shortcut.value() : shortcut.value;
      if (shortcutValue) {
        isShortcut = true;
        emit(dayjs(shortcutValue).locale(lang.value));
        return;
      }
      if (shortcut.onClick) {
        shortcut.onClick({
          attrs,
          slots,
          emit: contextEmit
        });
      }
    };
    const selectionMode = vue.computed(() => {
      const { type } = props;
      if (["week", "month", "months", "year", "years", "dates"].includes(type))
        return type;
      return "date";
    });
    const isMultipleType = vue.computed(() => {
      return selectionMode.value === "dates" || selectionMode.value === "months" || selectionMode.value === "years";
    });
    const keyboardMode = vue.computed(() => {
      return selectionMode.value === "date" ? currentView.value : selectionMode.value;
    });
    const hasShortcuts = vue.computed(() => !!shortcuts.length);
    const handleMonthPick = async (month2, keepOpen) => {
      if (selectionMode.value === "month") {
        innerDate.value = utils$1.getValidDateOfMonth(
          innerDate.value,
          innerDate.value.year(),
          month2,
          lang.value,
          disabledDate
        );
        emit(innerDate.value, false);
      } else if (selectionMode.value === "months") {
        emit(month2, keepOpen != null ? keepOpen : true);
      } else {
        innerDate.value = utils$1.getValidDateOfMonth(
          innerDate.value,
          innerDate.value.year(),
          month2,
          lang.value,
          disabledDate
        );
        currentView.value = "date";
        if (["month", "year", "date", "week"].includes(selectionMode.value)) {
          emit(innerDate.value, true);
          await vue.nextTick();
          handleFocusPicker();
        }
      }
      handlePanelChange("month");
    };
    const handleYearPick = async (year2, keepOpen) => {
      if (selectionMode.value === "year") {
        const data = innerDate.value.startOf("year").year(year2);
        innerDate.value = utils$1.getValidDateOfYear(data, lang.value, disabledDate);
        emit(innerDate.value, false);
      } else if (selectionMode.value === "years") {
        emit(year2, keepOpen != null ? keepOpen : true);
      } else {
        const data = innerDate.value.year(year2);
        innerDate.value = utils$1.getValidDateOfYear(data, lang.value, disabledDate);
        currentView.value = "month";
        if (["month", "year", "date", "week"].includes(selectionMode.value)) {
          emit(innerDate.value, true);
          await vue.nextTick();
          handleFocusPicker();
        }
      }
      handlePanelChange("year");
    };
    const dateDisabled = useFormCommonProps.useFormDisabled();
    const showPicker = async (view) => {
      if (dateDisabled.value) return;
      currentView.value = view;
      await vue.nextTick();
      handleFocusPicker();
    };
    const showTime = vue.computed(
      () => props.type === "datetime" || props.type === "datetimerange"
    );
    const footerVisible = vue.computed(() => {
      const showDateFooter = showTime.value || selectionMode.value === "dates";
      const showYearFooter = selectionMode.value === "years";
      const showMonthFooter = selectionMode.value === "months";
      const isDateView = currentView.value === "date";
      const isYearView = currentView.value === "year";
      const isMonthView = currentView.value === "month";
      return showDateFooter && isDateView || showYearFooter && isYearView || showMonthFooter && isMonthView;
    });
    const footerFilled = vue.computed(
      () => !isMultipleType.value && props.showNow || props.showConfirm
    );
    const disabledConfirm = vue.computed(() => {
      if (!disabledDate) return false;
      if (!props.parsedValue) return true;
      if (shared.isArray(props.parsedValue)) {
        return disabledDate(props.parsedValue[0].toDate());
      }
      return disabledDate(props.parsedValue.toDate());
    });
    const onConfirm = () => {
      if (isMultipleType.value) {
        emit(props.parsedValue);
      } else {
        let result = arrays.extractFirst(props.parsedValue);
        if (!result) {
          const defaultTimeD2 = dayjs(defaultTime).locale(lang.value);
          const defaultValueD = getDefaultValue();
          result = defaultTimeD2.year(defaultValueD.year()).month(defaultValueD.month()).date(defaultValueD.date());
        }
        innerDate.value = result;
        emit(result);
      }
    };
    const disabledNow = vue.computed(() => {
      if (!disabledDate) return false;
      return disabledDate(dayjs().locale(lang.value).toDate());
    });
    const changeToNow = () => {
      const now = dayjs().locale(lang.value);
      const nowDate = now.toDate();
      isChangeToNow.value = true;
      if ((!disabledDate || !disabledDate(nowDate)) && checkDateWithinRange(nowDate)) {
        innerDate.value = dayjs().locale(lang.value);
        emit(innerDate.value);
      }
    };
    const timeFormat = vue.computed(() => {
      return props.timeFormat || utils.extractTimeFormat(props.format) || constants.DEFAULT_FORMATS_TIME;
    });
    const dateFormat = vue.computed(() => {
      return props.dateFormat || utils.extractDateFormat(props.format) || constants.DEFAULT_FORMATS_DATE;
    });
    const visibleTime = vue.computed(() => {
      if (userInputTime.value) return userInputTime.value;
      if (!props.parsedValue && !defaultValue.value) return;
      const dateValue = arrays.extractFirst(props.parsedValue) || innerDate.value;
      return dateValue.format(timeFormat.value);
    });
    const visibleDate = vue.computed(() => {
      if (userInputDate.value) return userInputDate.value;
      if (!props.parsedValue && !defaultValue.value) return;
      const dateValue = arrays.extractFirst(props.parsedValue) || innerDate.value;
      return dateValue.format(dateFormat.value);
    });
    const timePickerVisible = vue.ref(false);
    const onTimePickerInputFocus = () => {
      timePickerVisible.value = true;
    };
    const handleTimePickClose = () => {
      timePickerVisible.value = false;
    };
    const getUnits = (date) => {
      return {
        hour: date.hour(),
        minute: date.minute(),
        second: date.second(),
        year: date.year(),
        month: date.month(),
        date: date.date()
      };
    };
    const handleTimePick = (value, visible, first) => {
      const { hour, minute, second } = getUnits(value);
      const parsedDateValue = arrays.extractFirst(props.parsedValue);
      const newDate = parsedDateValue ? parsedDateValue.hour(hour).minute(minute).second(second) : value;
      innerDate.value = newDate;
      emit(innerDate.value, true);
      if (!first) {
        timePickerVisible.value = visible;
      }
    };
    const handleVisibleTimeChange = (value) => {
      const newDate = dayjs(value, timeFormat.value).locale(lang.value);
      if (newDate.isValid() && checkDateWithinRange(newDate)) {
        const { year: year2, month: month2, date } = getUnits(innerDate.value);
        innerDate.value = newDate.year(year2).month(month2).date(date);
        userInputTime.value = null;
        timePickerVisible.value = false;
        emit(innerDate.value, true);
      }
    };
    const handleVisibleDateChange = (value) => {
      const newDate = utils$1.correctlyParseUserInput(
        value,
        dateFormat.value,
        lang.value,
        isDefaultFormat
      );
      if (newDate.isValid()) {
        if (disabledDate && disabledDate(newDate.toDate())) {
          return;
        }
        const { hour, minute, second } = getUnits(innerDate.value);
        innerDate.value = newDate.hour(hour).minute(minute).second(second);
        userInputDate.value = null;
        emit(innerDate.value, true);
      }
    };
    const isValidValue = (date) => {
      return dayjs.isDayjs(date) && date.isValid() && (disabledDate ? !disabledDate(date.toDate()) : true);
    };
    const parseUserInput = (value) => {
      return utils$1.correctlyParseUserInput(
        value,
        props.format,
        lang.value,
        isDefaultFormat
      );
    };
    const getDefaultValue = () => {
      const parseDate = dayjs(defaultValue.value).locale(lang.value);
      if (!defaultValue.value) {
        const defaultTimeDValue = defaultTimeD.value;
        return dayjs().hour(defaultTimeDValue.hour()).minute(defaultTimeDValue.minute()).second(defaultTimeDValue.second()).locale(lang.value);
      }
      return parseDate;
    };
    const handleFocusPicker = () => {
      var _a;
      if (["week", "month", "year", "date"].includes(selectionMode.value)) {
        (_a = currentViewRef.value) == null ? void 0 : _a.focus();
      }
    };
    const _handleFocusPicker = () => {
      handleFocusPicker();
      if (selectionMode.value === "week") {
        handleKeyControl(aria.EVENT_CODE.down);
      }
    };
    const handleKeydownTable = (event$1) => {
      const code = event.getEventCode(event$1);
      const validCode = [
        aria.EVENT_CODE.up,
        aria.EVENT_CODE.down,
        aria.EVENT_CODE.left,
        aria.EVENT_CODE.right,
        aria.EVENT_CODE.home,
        aria.EVENT_CODE.end,
        aria.EVENT_CODE.pageUp,
        aria.EVENT_CODE.pageDown
      ];
      if (validCode.includes(code)) {
        handleKeyControl(code);
        event$1.stopPropagation();
        event$1.preventDefault();
      }
      if ([aria.EVENT_CODE.enter, aria.EVENT_CODE.space, aria.EVENT_CODE.numpadEnter].includes(
        code
      ) && userInputDate.value === null && userInputTime.value === null) {
        event$1.preventDefault();
        emit(innerDate.value, false);
      }
    };
    const handleKeyControl = (code) => {
      var _a;
      const { up, down, left, right, home, end, pageUp, pageDown } = aria.EVENT_CODE;
      const mapping = {
        year: {
          [up]: -4,
          [down]: 4,
          [left]: -1,
          [right]: 1,
          offset: (date, step) => date.setFullYear(date.getFullYear() + step)
        },
        month: {
          [up]: -4,
          [down]: 4,
          [left]: -1,
          [right]: 1,
          offset: (date, step) => date.setMonth(date.getMonth() + step)
        },
        week: {
          [up]: -1,
          [down]: 1,
          [left]: -1,
          [right]: 1,
          offset: (date, step) => date.setDate(date.getDate() + step * 7)
        },
        date: {
          [up]: -7,
          [down]: 7,
          [left]: -1,
          [right]: 1,
          [home]: (date) => -date.getDay(),
          [end]: (date) => -date.getDay() + 6,
          [pageUp]: (date) => -new Date(date.getFullYear(), date.getMonth(), 0).getDate(),
          [pageDown]: (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
          offset: (date, step) => date.setDate(date.getDate() + step)
        }
      };
      const newDate = innerDate.value.toDate();
      while (Math.abs(innerDate.value.diff(newDate, "year", true)) < 1) {
        const map = mapping[keyboardMode.value];
        if (!map) return;
        map.offset(
          newDate,
          shared.isFunction(map[code]) ? map[code](newDate) : (_a = map[code]) != null ? _a : 0
        );
        if (disabledDate && disabledDate(newDate)) {
          break;
        }
        const result = dayjs(newDate).locale(lang.value);
        innerDate.value = result;
        contextEmit("pick", result, true);
        break;
      }
    };
    const handlePanelChange = (mode) => {
      contextEmit("panel-change", innerDate.value.toDate(), mode, currentView.value);
    };
    vue.watch(
      () => selectionMode.value,
      (val) => {
        if (["month", "year"].includes(val)) {
          currentView.value = val;
          return;
        } else if (val === "years") {
          currentView.value = "year";
          return;
        } else if (val === "months") {
          currentView.value = "month";
          return;
        }
        currentView.value = "date";
      },
      { immediate: true }
    );
    vue.watch(
      () => defaultValue.value,
      (val) => {
        if (val) {
          innerDate.value = getDefaultValue();
        }
      },
      { immediate: true }
    );
    vue.watch(
      () => props.parsedValue,
      (val) => {
        if (val) {
          if (isMultipleType.value) return;
          if (shared.isArray(val)) return;
          innerDate.value = val;
        } else {
          innerDate.value = getDefaultValue();
        }
      },
      { immediate: true }
    );
    contextEmit("set-picker-option", ["isValidValue", isValidValue]);
    contextEmit("set-picker-option", ["parseUserInput", parseUserInput]);
    contextEmit("set-picker-option", ["handleFocusPicker", _handleFocusPicker]);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass([
            vue.unref(ppNs).b(),
            vue.unref(dpNs).b(),
            vue.unref(ppNs).is("border", _ctx.border),
            vue.unref(ppNs).is("disabled", vue.unref(dateDisabled)),
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
                    vue.renderList(vue.unref(shortcuts), (shortcut, key) => {
                      return vue.openBlock(), vue.createElementBlock("button", {
                        key,
                        type: "button",
                        disabled: vue.unref(dateDisabled),
                        class: vue.normalizeClass(vue.unref(ppNs).e("shortcut")),
                        onClick: ($event) => handleShortcutClick(shortcut)
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
                      class: vue.normalizeClass(vue.unref(dpNs).e("time-header"))
                    },
                    [
                      vue.createElementVNode(
                        "span",
                        {
                          class: vue.normalizeClass(vue.unref(dpNs).e("editor-wrap"))
                        },
                        [
                          vue.createVNode(vue.unref(index$2.ElInput), {
                            placeholder: vue.unref(t)("el.datepicker.selectDate"),
                            "model-value": visibleDate.value,
                            size: "small",
                            "validate-event": false,
                            disabled: vue.unref(dateDisabled),
                            readonly: !_ctx.editable,
                            onInput: _cache[0] || (_cache[0] = (val) => userInputDate.value = val),
                            onChange: handleVisibleDateChange
                          }, null, 8, ["placeholder", "model-value", "disabled", "readonly"])
                        ],
                        2
                        /* CLASS */
                      ),
                      vue.withDirectives((vue.openBlock(), vue.createElementBlock(
                        "span",
                        {
                          class: vue.normalizeClass(vue.unref(dpNs).e("editor-wrap"))
                        },
                        [
                          vue.createVNode(vue.unref(index$2.ElInput), {
                            placeholder: vue.unref(t)("el.datepicker.selectTime"),
                            "model-value": visibleTime.value,
                            size: "small",
                            "validate-event": false,
                            disabled: vue.unref(dateDisabled),
                            readonly: !_ctx.editable,
                            onFocus: onTimePickerInputFocus,
                            onInput: _cache[1] || (_cache[1] = (val) => userInputTime.value = val),
                            onChange: handleVisibleTimeChange
                          }, null, 8, ["placeholder", "model-value", "disabled", "readonly"]),
                          vue.createVNode(vue.unref(panelTimePick_vue_vue_type_script_setup_true_lang.default), {
                            visible: timePickerVisible.value,
                            format: timeFormat.value,
                            "parsed-value": innerDate.value,
                            onPick: handleTimePick
                          }, null, 8, ["visible", "format", "parsed-value"])
                        ],
                        2
                        /* CLASS */
                      )), [
                        [vue.unref(index$3.default), handleTimePickClose]
                      ])
                    ],
                    2
                    /* CLASS */
                  )) : vue.createCommentVNode("v-if", true),
                  vue.withDirectives(vue.createElementVNode(
                    "div",
                    {
                      class: vue.normalizeClass([
                        vue.unref(dpNs).e("header"),
                        (currentView.value === "year" || currentView.value === "month") && vue.unref(dpNs).em("header", "bordered")
                      ])
                    },
                    [
                      vue.createElementVNode(
                        "span",
                        {
                          class: vue.normalizeClass(vue.unref(dpNs).e("prev-btn"))
                        },
                        [
                          vue.createElementVNode("button", {
                            type: "button",
                            "aria-label": vue.unref(t)(`el.datepicker.prevYear`),
                            class: vue.normalizeClass(["d-arrow-left", vue.unref(ppNs).e("icon-btn")]),
                            disabled: vue.unref(dateDisabled),
                            onClick: _cache[2] || (_cache[2] = ($event) => moveByYear(false))
                          }, [
                            vue.renderSlot(_ctx.$slots, "prev-year", {}, () => [
                              vue.createVNode(vue.unref(index$4.ElIcon), null, {
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
                            "aria-label": vue.unref(t)(`el.datepicker.prevMonth`),
                            class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "arrow-left"]),
                            disabled: vue.unref(dateDisabled),
                            onClick: _cache[3] || (_cache[3] = ($event) => moveByMonth(false))
                          }, [
                            vue.renderSlot(_ctx.$slots, "prev-month", {}, () => [
                              vue.createVNode(vue.unref(index$4.ElIcon), null, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(iconsVue.ArrowLeft))
                                ]),
                                _: 1
                                /* STABLE */
                              })
                            ])
                          ], 10, _hoisted_3), [
                            [vue.vShow, currentView.value === "date"]
                          ])
                        ],
                        2
                        /* CLASS */
                      ),
                      vue.createElementVNode("span", {
                        role: "button",
                        class: vue.normalizeClass(vue.unref(dpNs).e("header-label")),
                        "aria-live": "polite",
                        tabindex: _ctx.disabled ? void 0 : 0,
                        "aria-disabled": _ctx.disabled,
                        onKeydown: _cache[4] || (_cache[4] = vue.withKeys(($event) => showPicker("year"), ["enter"])),
                        onClick: _cache[5] || (_cache[5] = ($event) => showPicker("year"))
                      }, vue.toDisplayString(yearLabel.value), 43, _hoisted_4),
                      vue.withDirectives(vue.createElementVNode("span", {
                        role: "button",
                        "aria-live": "polite",
                        tabindex: _ctx.disabled ? void 0 : 0,
                        "aria-disabled": _ctx.disabled,
                        class: vue.normalizeClass([
                          vue.unref(dpNs).e("header-label"),
                          { active: currentView.value === "month" }
                        ]),
                        onKeydown: _cache[6] || (_cache[6] = vue.withKeys(($event) => showPicker("month"), ["enter"])),
                        onClick: _cache[7] || (_cache[7] = ($event) => showPicker("month"))
                      }, vue.toDisplayString(vue.unref(t)(`el.datepicker.month${month.value + 1}`)), 43, _hoisted_5), [
                        [vue.vShow, currentView.value === "date"]
                      ]),
                      vue.createElementVNode(
                        "span",
                        {
                          class: vue.normalizeClass(vue.unref(dpNs).e("next-btn"))
                        },
                        [
                          vue.withDirectives(vue.createElementVNode("button", {
                            type: "button",
                            "aria-label": vue.unref(t)(`el.datepicker.nextMonth`),
                            class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "arrow-right"]),
                            disabled: vue.unref(dateDisabled),
                            onClick: _cache[8] || (_cache[8] = ($event) => moveByMonth(true))
                          }, [
                            vue.renderSlot(_ctx.$slots, "next-month", {}, () => [
                              vue.createVNode(vue.unref(index$4.ElIcon), null, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(iconsVue.ArrowRight))
                                ]),
                                _: 1
                                /* STABLE */
                              })
                            ])
                          ], 10, _hoisted_6), [
                            [vue.vShow, currentView.value === "date"]
                          ]),
                          vue.createElementVNode("button", {
                            type: "button",
                            "aria-label": vue.unref(t)(`el.datepicker.nextYear`),
                            class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "d-arrow-right"]),
                            disabled: vue.unref(dateDisabled),
                            onClick: _cache[9] || (_cache[9] = ($event) => moveByYear(true))
                          }, [
                            vue.renderSlot(_ctx.$slots, "next-year", {}, () => [
                              vue.createVNode(vue.unref(index$4.ElIcon), null, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(iconsVue.DArrowRight))
                                ]),
                                _: 1
                                /* STABLE */
                              })
                            ])
                          ], 10, _hoisted_7)
                        ],
                        2
                        /* CLASS */
                      )
                    ],
                    2
                    /* CLASS */
                  ), [
                    [vue.vShow, currentView.value !== "time"]
                  ]),
                  vue.createElementVNode(
                    "div",
                    {
                      class: vue.normalizeClass(vue.unref(ppNs).e("content")),
                      onKeydown: handleKeydownTable
                    },
                    [
                      currentView.value === "date" ? (vue.openBlock(), vue.createBlock(basicDateTable_vue_vue_type_script_setup_true_lang.default, {
                        key: 0,
                        ref_key: "currentViewRef",
                        ref: currentViewRef,
                        "selection-mode": selectionMode.value,
                        date: innerDate.value,
                        "parsed-value": _ctx.parsedValue,
                        "disabled-date": vue.unref(disabledDate),
                        disabled: vue.unref(dateDisabled),
                        "cell-class-name": vue.unref(cellClassName),
                        "show-week-number": _ctx.showWeekNumber,
                        onPick: handleDatePick
                      }, null, 8, ["selection-mode", "date", "parsed-value", "disabled-date", "disabled", "cell-class-name", "show-week-number"])) : vue.createCommentVNode("v-if", true),
                      currentView.value === "year" ? (vue.openBlock(), vue.createBlock(basicYearTable_vue_vue_type_script_setup_true_lang.default, {
                        key: 1,
                        ref_key: "currentViewRef",
                        ref: currentViewRef,
                        "selection-mode": selectionMode.value,
                        date: innerDate.value,
                        "disabled-date": vue.unref(disabledDate),
                        disabled: vue.unref(dateDisabled),
                        "parsed-value": _ctx.parsedValue,
                        "cell-class-name": vue.unref(cellClassName),
                        onPick: handleYearPick
                      }, null, 8, ["selection-mode", "date", "disabled-date", "disabled", "parsed-value", "cell-class-name"])) : vue.createCommentVNode("v-if", true),
                      currentView.value === "month" ? (vue.openBlock(), vue.createBlock(basicMonthTable_vue_vue_type_script_setup_true_lang.default, {
                        key: 2,
                        ref_key: "currentViewRef",
                        ref: currentViewRef,
                        "selection-mode": selectionMode.value,
                        date: innerDate.value,
                        "parsed-value": _ctx.parsedValue,
                        "disabled-date": vue.unref(disabledDate),
                        disabled: vue.unref(dateDisabled),
                        "cell-class-name": vue.unref(cellClassName),
                        onPick: handleMonthPick
                      }, null, 8, ["selection-mode", "date", "parsed-value", "disabled-date", "disabled", "cell-class-name"])) : vue.createCommentVNode("v-if", true)
                    ],
                    34
                    /* CLASS, NEED_HYDRATION */
                  )
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          ),
          _ctx.showFooter && footerVisible.value && footerFilled.value ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass(vue.unref(ppNs).e("footer"))
            },
            [
              vue.withDirectives(vue.createVNode(vue.unref(index$5.ElButton), {
                text: "",
                size: "small",
                class: vue.normalizeClass(vue.unref(ppNs).e("link-btn")),
                disabled: disabledNow.value,
                onClick: changeToNow
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(
                    vue.toDisplayString(vue.unref(t)("el.datepicker.now")),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["class", "disabled"]), [
                [vue.vShow, !isMultipleType.value && _ctx.showNow]
              ]),
              _ctx.showConfirm ? (vue.openBlock(), vue.createBlock(vue.unref(index$5.ElButton), {
                key: 0,
                plain: "",
                size: "small",
                class: vue.normalizeClass(vue.unref(ppNs).e("link-btn")),
                disabled: disabledConfirm.value,
                onClick: onConfirm
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
//# sourceMappingURL=panel-date-pick.vue2.js.map
