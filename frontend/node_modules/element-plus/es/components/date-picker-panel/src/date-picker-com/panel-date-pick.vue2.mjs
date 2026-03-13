import { defineComponent, useAttrs, useSlots, inject, toRef, ref, computed, watch, createElementBlock, openBlock, normalizeClass, unref, createElementVNode, createCommentVNode, renderSlot, Fragment, renderList, toDisplayString, withDirectives, createVNode, withCtx, vShow, withKeys, createBlock, createTextVNode, nextTick } from 'vue';
import dayjs from 'dayjs';
import { ElButton } from '../../../button/index.mjs';
import { ElInput } from '../../../input/index.mjs';
import '../../../time-picker/index.mjs';
import { ElIcon } from '../../../icon/index.mjs';
import { DArrowLeft, ArrowLeft, ArrowRight, DArrowRight } from '@element-plus/icons-vue';
import { panelDatePickProps } from '../props/panel-date-pick.mjs';
import { getValidDateOfMonth, getValidDateOfYear, correctlyParseUserInput } from '../utils.mjs';
import { ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY } from '../constants.mjs';
import _sfc_main$2 from './basic-date-table.vue2.mjs';
import _sfc_main$4 from './basic-month-table.vue2.mjs';
import _sfc_main$3 from './basic-year-table.vue2.mjs';
import { PICKER_BASE_INJECTION_KEY, DEFAULT_FORMATS_TIME, DEFAULT_FORMATS_DATE } from '../../../time-picker/src/constants.mjs';
import { extractTimeFormat, extractDateFormat } from '../../../time-picker/src/utils.mjs';
import { extractFirst } from '../../../../utils/arrays.mjs';
import _sfc_main$1 from '../../../time-picker/src/time-picker-com/panel-time-pick.vue2.mjs';
import ClickOutside from '../../../../directives/click-outside/index.mjs';
import { useNamespace } from '../../../../hooks/use-namespace/index.mjs';
import { useLocale } from '../../../../hooks/use-locale/index.mjs';
import { useFormDisabled } from '../../../form/src/hooks/use-form-common-props.mjs';
import { isArray, isFunction } from '@vue/shared';
import { getEventCode } from '../../../../utils/dom/event.mjs';
import { EVENT_CODE } from '../../../../constants/aria.mjs';

const _hoisted_1 = ["disabled", "onClick"];
const _hoisted_2 = ["aria-label", "disabled"];
const _hoisted_3 = ["aria-label", "disabled"];
const _hoisted_4 = ["tabindex", "aria-disabled"];
const _hoisted_5 = ["tabindex", "aria-disabled"];
const _hoisted_6 = ["aria-label", "disabled"];
const _hoisted_7 = ["aria-label", "disabled"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "panel-date-pick",
  props: panelDatePickProps,
  emits: ["pick", "set-picker-option", "panel-change"],
  setup(__props, { emit: __emit }) {
    const timeWithinRange = (_, __, ___) => true;
    const props = __props;
    const contextEmit = __emit;
    const ppNs = useNamespace("picker-panel");
    const dpNs = useNamespace("date-picker");
    const attrs = useAttrs();
    const slots = useSlots();
    const { t, lang } = useLocale();
    const pickerBase = inject(PICKER_BASE_INJECTION_KEY);
    const isDefaultFormat = inject(
      ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY,
      void 0
    );
    const { shortcuts, disabledDate, cellClassName, defaultTime } = pickerBase.props;
    const defaultValue = toRef(pickerBase.props, "defaultValue");
    const currentViewRef = ref();
    const innerDate = ref(dayjs().locale(lang.value));
    const isChangeToNow = ref(false);
    let isShortcut = false;
    const defaultTimeD = computed(() => {
      return dayjs(defaultTime).locale(lang.value);
    });
    const month = computed(() => {
      return innerDate.value.month();
    });
    const year = computed(() => {
      return innerDate.value.year();
    });
    const selectableRange = ref([]);
    const userInputDate = ref(null);
    const userInputTime = ref(null);
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
      } else if (isArray(value)) {
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
        const parsedDateValue = extractFirst(props.parsedValue);
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
    const currentView = ref("date");
    const yearLabel = computed(() => {
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
      const shortcutValue = isFunction(shortcut.value) ? shortcut.value() : shortcut.value;
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
    const selectionMode = computed(() => {
      const { type } = props;
      if (["week", "month", "months", "year", "years", "dates"].includes(type))
        return type;
      return "date";
    });
    const isMultipleType = computed(() => {
      return selectionMode.value === "dates" || selectionMode.value === "months" || selectionMode.value === "years";
    });
    const keyboardMode = computed(() => {
      return selectionMode.value === "date" ? currentView.value : selectionMode.value;
    });
    const hasShortcuts = computed(() => !!shortcuts.length);
    const handleMonthPick = async (month2, keepOpen) => {
      if (selectionMode.value === "month") {
        innerDate.value = getValidDateOfMonth(
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
        innerDate.value = getValidDateOfMonth(
          innerDate.value,
          innerDate.value.year(),
          month2,
          lang.value,
          disabledDate
        );
        currentView.value = "date";
        if (["month", "year", "date", "week"].includes(selectionMode.value)) {
          emit(innerDate.value, true);
          await nextTick();
          handleFocusPicker();
        }
      }
      handlePanelChange("month");
    };
    const handleYearPick = async (year2, keepOpen) => {
      if (selectionMode.value === "year") {
        const data = innerDate.value.startOf("year").year(year2);
        innerDate.value = getValidDateOfYear(data, lang.value, disabledDate);
        emit(innerDate.value, false);
      } else if (selectionMode.value === "years") {
        emit(year2, keepOpen != null ? keepOpen : true);
      } else {
        const data = innerDate.value.year(year2);
        innerDate.value = getValidDateOfYear(data, lang.value, disabledDate);
        currentView.value = "month";
        if (["month", "year", "date", "week"].includes(selectionMode.value)) {
          emit(innerDate.value, true);
          await nextTick();
          handleFocusPicker();
        }
      }
      handlePanelChange("year");
    };
    const dateDisabled = useFormDisabled();
    const showPicker = async (view) => {
      if (dateDisabled.value) return;
      currentView.value = view;
      await nextTick();
      handleFocusPicker();
    };
    const showTime = computed(
      () => props.type === "datetime" || props.type === "datetimerange"
    );
    const footerVisible = computed(() => {
      const showDateFooter = showTime.value || selectionMode.value === "dates";
      const showYearFooter = selectionMode.value === "years";
      const showMonthFooter = selectionMode.value === "months";
      const isDateView = currentView.value === "date";
      const isYearView = currentView.value === "year";
      const isMonthView = currentView.value === "month";
      return showDateFooter && isDateView || showYearFooter && isYearView || showMonthFooter && isMonthView;
    });
    const footerFilled = computed(
      () => !isMultipleType.value && props.showNow || props.showConfirm
    );
    const disabledConfirm = computed(() => {
      if (!disabledDate) return false;
      if (!props.parsedValue) return true;
      if (isArray(props.parsedValue)) {
        return disabledDate(props.parsedValue[0].toDate());
      }
      return disabledDate(props.parsedValue.toDate());
    });
    const onConfirm = () => {
      if (isMultipleType.value) {
        emit(props.parsedValue);
      } else {
        let result = extractFirst(props.parsedValue);
        if (!result) {
          const defaultTimeD2 = dayjs(defaultTime).locale(lang.value);
          const defaultValueD = getDefaultValue();
          result = defaultTimeD2.year(defaultValueD.year()).month(defaultValueD.month()).date(defaultValueD.date());
        }
        innerDate.value = result;
        emit(result);
      }
    };
    const disabledNow = computed(() => {
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
    const timeFormat = computed(() => {
      return props.timeFormat || extractTimeFormat(props.format) || DEFAULT_FORMATS_TIME;
    });
    const dateFormat = computed(() => {
      return props.dateFormat || extractDateFormat(props.format) || DEFAULT_FORMATS_DATE;
    });
    const visibleTime = computed(() => {
      if (userInputTime.value) return userInputTime.value;
      if (!props.parsedValue && !defaultValue.value) return;
      const dateValue = extractFirst(props.parsedValue) || innerDate.value;
      return dateValue.format(timeFormat.value);
    });
    const visibleDate = computed(() => {
      if (userInputDate.value) return userInputDate.value;
      if (!props.parsedValue && !defaultValue.value) return;
      const dateValue = extractFirst(props.parsedValue) || innerDate.value;
      return dateValue.format(dateFormat.value);
    });
    const timePickerVisible = ref(false);
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
      const parsedDateValue = extractFirst(props.parsedValue);
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
      const newDate = correctlyParseUserInput(
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
      return correctlyParseUserInput(
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
        handleKeyControl(EVENT_CODE.down);
      }
    };
    const handleKeydownTable = (event) => {
      const code = getEventCode(event);
      const validCode = [
        EVENT_CODE.up,
        EVENT_CODE.down,
        EVENT_CODE.left,
        EVENT_CODE.right,
        EVENT_CODE.home,
        EVENT_CODE.end,
        EVENT_CODE.pageUp,
        EVENT_CODE.pageDown
      ];
      if (validCode.includes(code)) {
        handleKeyControl(code);
        event.stopPropagation();
        event.preventDefault();
      }
      if ([EVENT_CODE.enter, EVENT_CODE.space, EVENT_CODE.numpadEnter].includes(
        code
      ) && userInputDate.value === null && userInputTime.value === null) {
        event.preventDefault();
        emit(innerDate.value, false);
      }
    };
    const handleKeyControl = (code) => {
      var _a;
      const { up, down, left, right, home, end, pageUp, pageDown } = EVENT_CODE;
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
          isFunction(map[code]) ? map[code](newDate) : (_a = map[code]) != null ? _a : 0
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
    watch(
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
    watch(
      () => defaultValue.value,
      (val) => {
        if (val) {
          innerDate.value = getDefaultValue();
        }
      },
      { immediate: true }
    );
    watch(
      () => props.parsedValue,
      (val) => {
        if (val) {
          if (isMultipleType.value) return;
          if (isArray(val)) return;
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
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([
            unref(ppNs).b(),
            unref(dpNs).b(),
            unref(ppNs).is("border", _ctx.border),
            unref(ppNs).is("disabled", unref(dateDisabled)),
            {
              "has-sidebar": _ctx.$slots.sidebar || hasShortcuts.value,
              "has-time": showTime.value
            }
          ])
        },
        [
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ppNs).e("body-wrapper"))
            },
            [
              renderSlot(_ctx.$slots, "sidebar", {
                class: normalizeClass(unref(ppNs).e("sidebar"))
              }),
              hasShortcuts.value ? (openBlock(), createElementBlock(
                "div",
                {
                  key: 0,
                  class: normalizeClass(unref(ppNs).e("sidebar"))
                },
                [
                  (openBlock(true), createElementBlock(
                    Fragment,
                    null,
                    renderList(unref(shortcuts), (shortcut, key) => {
                      return openBlock(), createElementBlock("button", {
                        key,
                        type: "button",
                        disabled: unref(dateDisabled),
                        class: normalizeClass(unref(ppNs).e("shortcut")),
                        onClick: ($event) => handleShortcutClick(shortcut)
                      }, toDisplayString(shortcut.text), 11, _hoisted_1);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                2
                /* CLASS */
              )) : createCommentVNode("v-if", true),
              createElementVNode(
                "div",
                {
                  class: normalizeClass(unref(ppNs).e("body"))
                },
                [
                  showTime.value ? (openBlock(), createElementBlock(
                    "div",
                    {
                      key: 0,
                      class: normalizeClass(unref(dpNs).e("time-header"))
                    },
                    [
                      createElementVNode(
                        "span",
                        {
                          class: normalizeClass(unref(dpNs).e("editor-wrap"))
                        },
                        [
                          createVNode(unref(ElInput), {
                            placeholder: unref(t)("el.datepicker.selectDate"),
                            "model-value": visibleDate.value,
                            size: "small",
                            "validate-event": false,
                            disabled: unref(dateDisabled),
                            readonly: !_ctx.editable,
                            onInput: _cache[0] || (_cache[0] = (val) => userInputDate.value = val),
                            onChange: handleVisibleDateChange
                          }, null, 8, ["placeholder", "model-value", "disabled", "readonly"])
                        ],
                        2
                        /* CLASS */
                      ),
                      withDirectives((openBlock(), createElementBlock(
                        "span",
                        {
                          class: normalizeClass(unref(dpNs).e("editor-wrap"))
                        },
                        [
                          createVNode(unref(ElInput), {
                            placeholder: unref(t)("el.datepicker.selectTime"),
                            "model-value": visibleTime.value,
                            size: "small",
                            "validate-event": false,
                            disabled: unref(dateDisabled),
                            readonly: !_ctx.editable,
                            onFocus: onTimePickerInputFocus,
                            onInput: _cache[1] || (_cache[1] = (val) => userInputTime.value = val),
                            onChange: handleVisibleTimeChange
                          }, null, 8, ["placeholder", "model-value", "disabled", "readonly"]),
                          createVNode(unref(_sfc_main$1), {
                            visible: timePickerVisible.value,
                            format: timeFormat.value,
                            "parsed-value": innerDate.value,
                            onPick: handleTimePick
                          }, null, 8, ["visible", "format", "parsed-value"])
                        ],
                        2
                        /* CLASS */
                      )), [
                        [unref(ClickOutside), handleTimePickClose]
                      ])
                    ],
                    2
                    /* CLASS */
                  )) : createCommentVNode("v-if", true),
                  withDirectives(createElementVNode(
                    "div",
                    {
                      class: normalizeClass([
                        unref(dpNs).e("header"),
                        (currentView.value === "year" || currentView.value === "month") && unref(dpNs).em("header", "bordered")
                      ])
                    },
                    [
                      createElementVNode(
                        "span",
                        {
                          class: normalizeClass(unref(dpNs).e("prev-btn"))
                        },
                        [
                          createElementVNode("button", {
                            type: "button",
                            "aria-label": unref(t)(`el.datepicker.prevYear`),
                            class: normalizeClass(["d-arrow-left", unref(ppNs).e("icon-btn")]),
                            disabled: unref(dateDisabled),
                            onClick: _cache[2] || (_cache[2] = ($event) => moveByYear(false))
                          }, [
                            renderSlot(_ctx.$slots, "prev-year", {}, () => [
                              createVNode(unref(ElIcon), null, {
                                default: withCtx(() => [
                                  createVNode(unref(DArrowLeft))
                                ]),
                                _: 1
                                /* STABLE */
                              })
                            ])
                          ], 10, _hoisted_2),
                          withDirectives(createElementVNode("button", {
                            type: "button",
                            "aria-label": unref(t)(`el.datepicker.prevMonth`),
                            class: normalizeClass([unref(ppNs).e("icon-btn"), "arrow-left"]),
                            disabled: unref(dateDisabled),
                            onClick: _cache[3] || (_cache[3] = ($event) => moveByMonth(false))
                          }, [
                            renderSlot(_ctx.$slots, "prev-month", {}, () => [
                              createVNode(unref(ElIcon), null, {
                                default: withCtx(() => [
                                  createVNode(unref(ArrowLeft))
                                ]),
                                _: 1
                                /* STABLE */
                              })
                            ])
                          ], 10, _hoisted_3), [
                            [vShow, currentView.value === "date"]
                          ])
                        ],
                        2
                        /* CLASS */
                      ),
                      createElementVNode("span", {
                        role: "button",
                        class: normalizeClass(unref(dpNs).e("header-label")),
                        "aria-live": "polite",
                        tabindex: _ctx.disabled ? void 0 : 0,
                        "aria-disabled": _ctx.disabled,
                        onKeydown: _cache[4] || (_cache[4] = withKeys(($event) => showPicker("year"), ["enter"])),
                        onClick: _cache[5] || (_cache[5] = ($event) => showPicker("year"))
                      }, toDisplayString(yearLabel.value), 43, _hoisted_4),
                      withDirectives(createElementVNode("span", {
                        role: "button",
                        "aria-live": "polite",
                        tabindex: _ctx.disabled ? void 0 : 0,
                        "aria-disabled": _ctx.disabled,
                        class: normalizeClass([
                          unref(dpNs).e("header-label"),
                          { active: currentView.value === "month" }
                        ]),
                        onKeydown: _cache[6] || (_cache[6] = withKeys(($event) => showPicker("month"), ["enter"])),
                        onClick: _cache[7] || (_cache[7] = ($event) => showPicker("month"))
                      }, toDisplayString(unref(t)(`el.datepicker.month${month.value + 1}`)), 43, _hoisted_5), [
                        [vShow, currentView.value === "date"]
                      ]),
                      createElementVNode(
                        "span",
                        {
                          class: normalizeClass(unref(dpNs).e("next-btn"))
                        },
                        [
                          withDirectives(createElementVNode("button", {
                            type: "button",
                            "aria-label": unref(t)(`el.datepicker.nextMonth`),
                            class: normalizeClass([unref(ppNs).e("icon-btn"), "arrow-right"]),
                            disabled: unref(dateDisabled),
                            onClick: _cache[8] || (_cache[8] = ($event) => moveByMonth(true))
                          }, [
                            renderSlot(_ctx.$slots, "next-month", {}, () => [
                              createVNode(unref(ElIcon), null, {
                                default: withCtx(() => [
                                  createVNode(unref(ArrowRight))
                                ]),
                                _: 1
                                /* STABLE */
                              })
                            ])
                          ], 10, _hoisted_6), [
                            [vShow, currentView.value === "date"]
                          ]),
                          createElementVNode("button", {
                            type: "button",
                            "aria-label": unref(t)(`el.datepicker.nextYear`),
                            class: normalizeClass([unref(ppNs).e("icon-btn"), "d-arrow-right"]),
                            disabled: unref(dateDisabled),
                            onClick: _cache[9] || (_cache[9] = ($event) => moveByYear(true))
                          }, [
                            renderSlot(_ctx.$slots, "next-year", {}, () => [
                              createVNode(unref(ElIcon), null, {
                                default: withCtx(() => [
                                  createVNode(unref(DArrowRight))
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
                    [vShow, currentView.value !== "time"]
                  ]),
                  createElementVNode(
                    "div",
                    {
                      class: normalizeClass(unref(ppNs).e("content")),
                      onKeydown: handleKeydownTable
                    },
                    [
                      currentView.value === "date" ? (openBlock(), createBlock(_sfc_main$2, {
                        key: 0,
                        ref_key: "currentViewRef",
                        ref: currentViewRef,
                        "selection-mode": selectionMode.value,
                        date: innerDate.value,
                        "parsed-value": _ctx.parsedValue,
                        "disabled-date": unref(disabledDate),
                        disabled: unref(dateDisabled),
                        "cell-class-name": unref(cellClassName),
                        "show-week-number": _ctx.showWeekNumber,
                        onPick: handleDatePick
                      }, null, 8, ["selection-mode", "date", "parsed-value", "disabled-date", "disabled", "cell-class-name", "show-week-number"])) : createCommentVNode("v-if", true),
                      currentView.value === "year" ? (openBlock(), createBlock(_sfc_main$3, {
                        key: 1,
                        ref_key: "currentViewRef",
                        ref: currentViewRef,
                        "selection-mode": selectionMode.value,
                        date: innerDate.value,
                        "disabled-date": unref(disabledDate),
                        disabled: unref(dateDisabled),
                        "parsed-value": _ctx.parsedValue,
                        "cell-class-name": unref(cellClassName),
                        onPick: handleYearPick
                      }, null, 8, ["selection-mode", "date", "disabled-date", "disabled", "parsed-value", "cell-class-name"])) : createCommentVNode("v-if", true),
                      currentView.value === "month" ? (openBlock(), createBlock(_sfc_main$4, {
                        key: 2,
                        ref_key: "currentViewRef",
                        ref: currentViewRef,
                        "selection-mode": selectionMode.value,
                        date: innerDate.value,
                        "parsed-value": _ctx.parsedValue,
                        "disabled-date": unref(disabledDate),
                        disabled: unref(dateDisabled),
                        "cell-class-name": unref(cellClassName),
                        onPick: handleMonthPick
                      }, null, 8, ["selection-mode", "date", "parsed-value", "disabled-date", "disabled", "cell-class-name"])) : createCommentVNode("v-if", true)
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
          _ctx.showFooter && footerVisible.value && footerFilled.value ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(unref(ppNs).e("footer"))
            },
            [
              withDirectives(createVNode(unref(ElButton), {
                text: "",
                size: "small",
                class: normalizeClass(unref(ppNs).e("link-btn")),
                disabled: disabledNow.value,
                onClick: changeToNow
              }, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString(unref(t)("el.datepicker.now")),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["class", "disabled"]), [
                [vShow, !isMultipleType.value && _ctx.showNow]
              ]),
              _ctx.showConfirm ? (openBlock(), createBlock(unref(ElButton), {
                key: 0,
                plain: "",
                size: "small",
                class: normalizeClass(unref(ppNs).e("link-btn")),
                disabled: disabledConfirm.value,
                onClick: onConfirm
              }, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString(unref(t)("el.datepicker.confirm")),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["class", "disabled"])) : createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )) : createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=panel-date-pick.vue2.mjs.map
