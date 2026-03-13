'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var dayjs = require('dayjs');
var index$1 = require('../../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');
var utils = require('../utils.js');
var panelMonthRange = require('../props/panel-month-range.js');
var useMonthRangeHeader = require('../composables/use-month-range-header.js');
var useRangePicker = require('../composables/use-range-picker.js');
var constants$1 = require('../constants.js');
var basicMonthTable_vue_vue_type_script_setup_true_lang = require('./basic-month-table.vue2.js');
var index = require('../../../../hooks/use-locale/index.js');
var constants = require('../../../time-picker/src/constants.js');
var useFormCommonProps = require('../../../form/src/hooks/use-form-common-props.js');

const _hoisted_1 = ["disabled", "onClick"];
const _hoisted_2 = ["disabled"];
const _hoisted_3 = ["disabled"];
const _hoisted_4 = ["disabled"];
const _hoisted_5 = ["disabled"];
const unit = "year";
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "DatePickerMonthRange"
  },
  __name: "panel-month-range",
  props: panelMonthRange.panelMonthRangeProps,
  emits: panelMonthRange.panelMonthRangeEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { lang } = index.useLocale();
    const pickerBase = vue.inject(constants.PICKER_BASE_INJECTION_KEY);
    const isDefaultFormat = vue.inject(
      constants$1.ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY,
      void 0
    );
    const { shortcuts, disabledDate, cellClassName } = pickerBase.props;
    const format = vue.toRef(pickerBase.props, "format");
    const defaultValue = vue.toRef(pickerBase.props, "defaultValue");
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
      parseValue
    } = useRangePicker.useRangePicker(props, {
      defaultValue,
      leftDate,
      rightDate,
      unit,
      sortDates
    });
    const hasShortcuts = vue.computed(() => !!shortcuts.length);
    const {
      leftPrevYear,
      rightNextYear,
      leftNextYear,
      rightPrevYear,
      leftLabel,
      rightLabel,
      leftYear,
      rightYear
    } = useMonthRangeHeader.useMonthRangeHeader({
      unlinkPanels: vue.toRef(props, "unlinkPanels"),
      leftDate,
      rightDate
    });
    const enableYearArrow = vue.computed(() => {
      return props.unlinkPanels && rightYear.value > leftYear.value + 1;
    });
    const handleRangePick = (val, close = true) => {
      const minDate_ = val.minDate;
      const maxDate_ = val.maxDate;
      if (maxDate.value === maxDate_ && minDate.value === minDate_) {
        return;
      }
      emit("calendar-change", [minDate_.toDate(), maxDate_ && maxDate_.toDate()]);
      maxDate.value = maxDate_;
      minDate.value = minDate_;
      if (!close) return;
      handleRangeConfirm();
    };
    const handleClear = () => {
      let valueOnClear = null;
      if (pickerBase == null ? void 0 : pickerBase.emptyValues) {
        valueOnClear = pickerBase.emptyValues.valueOnClear.value;
      }
      leftDate.value = utils.getDefaultValue(vue.unref(defaultValue), {
        lang: vue.unref(lang),
        unit: "year",
        unlinkPanels: props.unlinkPanels
      })[0];
      rightDate.value = leftDate.value.add(1, "year");
      emit("pick", valueOnClear);
    };
    const parseUserInput = (value) => {
      return utils.correctlyParseUserInput(
        value,
        format.value,
        lang.value,
        isDefaultFormat
      );
    };
    function sortDates(minDate2, maxDate2) {
      if (props.unlinkPanels && maxDate2) {
        const minDateYear = (minDate2 == null ? void 0 : minDate2.year()) || 0;
        const maxDateYear = maxDate2.year();
        rightDate.value = minDateYear === maxDateYear ? maxDate2.add(1, unit) : maxDate2;
      } else {
        rightDate.value = leftDate.value.add(1, unit);
      }
    }
    const monthRangeDisabled = useFormCommonProps.useFormDisabled();
    vue.watch(
      () => props.visible,
      (visible) => {
        if (!visible && rangeState.value.selecting) {
          parseValue(props.parsedValue);
          onSelect(false);
        }
      }
    );
    emit("set-picker-option", ["isValidValue", utils.isValidRange]);
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
            vue.unref(ppNs).is("disabled", vue.unref(monthRangeDisabled)),
            {
              "has-sidebar": Boolean(_ctx.$slots.sidebar) || hasShortcuts.value
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
                        class: vue.normalizeClass(vue.unref(ppNs).e("shortcut")),
                        disabled: vue.unref(monthRangeDisabled),
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
                            disabled: vue.unref(monthRangeDisabled),
                            onClick: _cache[0] || (_cache[0] = //@ts-ignore
                            (...args) => vue.unref(leftPrevYear) && vue.unref(leftPrevYear)(...args))
                          }, [
                            vue.renderSlot(_ctx.$slots, "prev-year", {}, () => [
                              vue.createVNode(vue.unref(index$1.ElIcon), null, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(iconsVue.DArrowLeft))
                                ]),
                                _: 1
                                /* STABLE */
                              })
                            ])
                          ], 10, _hoisted_2),
                          _ctx.unlinkPanels ? (vue.openBlock(), vue.createElementBlock("button", {
                            key: 0,
                            type: "button",
                            disabled: !enableYearArrow.value || vue.unref(monthRangeDisabled),
                            class: vue.normalizeClass([[
                              vue.unref(ppNs).e("icon-btn"),
                              vue.unref(ppNs).is("disabled", !enableYearArrow.value || vue.unref(monthRangeDisabled))
                            ], "d-arrow-right"]),
                            onClick: _cache[1] || (_cache[1] = //@ts-ignore
                            (...args) => vue.unref(leftNextYear) && vue.unref(leftNextYear)(...args))
                          }, [
                            vue.renderSlot(_ctx.$slots, "next-year", {}, () => [
                              vue.createVNode(vue.unref(index$1.ElIcon), null, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(iconsVue.DArrowRight))
                                ]),
                                _: 1
                                /* STABLE */
                              })
                            ])
                          ], 10, _hoisted_3)) : vue.createCommentVNode("v-if", true),
                          vue.createElementVNode(
                            "div",
                            null,
                            vue.toDisplayString(vue.unref(leftLabel)),
                            1
                            /* TEXT */
                          )
                        ],
                        2
                        /* CLASS */
                      ),
                      vue.createVNode(basicMonthTable_vue_vue_type_script_setup_true_lang.default, {
                        "selection-mode": "range",
                        date: leftDate.value,
                        "min-date": vue.unref(minDate),
                        "max-date": vue.unref(maxDate),
                        "range-state": vue.unref(rangeState),
                        "disabled-date": vue.unref(disabledDate),
                        disabled: vue.unref(monthRangeDisabled),
                        "cell-class-name": vue.unref(cellClassName),
                        onChangerange: vue.unref(handleChangeRange),
                        onPick: handleRangePick,
                        onSelect: vue.unref(onSelect)
                      }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "disabled", "cell-class-name", "onChangerange", "onSelect"])
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
                            disabled: !enableYearArrow.value || vue.unref(monthRangeDisabled),
                            class: vue.normalizeClass([[
                              vue.unref(ppNs).e("icon-btn"),
                              vue.unref(ppNs).is("disabled", !enableYearArrow.value || vue.unref(monthRangeDisabled))
                            ], "d-arrow-left"]),
                            onClick: _cache[2] || (_cache[2] = //@ts-ignore
                            (...args) => vue.unref(rightPrevYear) && vue.unref(rightPrevYear)(...args))
                          }, [
                            vue.renderSlot(_ctx.$slots, "prev-year", {}, () => [
                              vue.createVNode(vue.unref(index$1.ElIcon), null, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(iconsVue.DArrowLeft))
                                ]),
                                _: 1
                                /* STABLE */
                              })
                            ])
                          ], 10, _hoisted_4)) : vue.createCommentVNode("v-if", true),
                          vue.createElementVNode("button", {
                            type: "button",
                            class: vue.normalizeClass([vue.unref(ppNs).e("icon-btn"), "d-arrow-right"]),
                            disabled: vue.unref(monthRangeDisabled),
                            onClick: _cache[3] || (_cache[3] = //@ts-ignore
                            (...args) => vue.unref(rightNextYear) && vue.unref(rightNextYear)(...args))
                          }, [
                            vue.renderSlot(_ctx.$slots, "next-year", {}, () => [
                              vue.createVNode(vue.unref(index$1.ElIcon), null, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(iconsVue.DArrowRight))
                                ]),
                                _: 1
                                /* STABLE */
                              })
                            ])
                          ], 10, _hoisted_5),
                          vue.createElementVNode(
                            "div",
                            null,
                            vue.toDisplayString(vue.unref(rightLabel)),
                            1
                            /* TEXT */
                          )
                        ],
                        2
                        /* CLASS */
                      ),
                      vue.createVNode(basicMonthTable_vue_vue_type_script_setup_true_lang.default, {
                        "selection-mode": "range",
                        date: rightDate.value,
                        "min-date": vue.unref(minDate),
                        "max-date": vue.unref(maxDate),
                        "range-state": vue.unref(rangeState),
                        "disabled-date": vue.unref(disabledDate),
                        disabled: vue.unref(monthRangeDisabled),
                        "cell-class-name": vue.unref(cellClassName),
                        onChangerange: vue.unref(handleChangeRange),
                        onPick: handleRangePick,
                        onSelect: vue.unref(onSelect)
                      }, null, 8, ["date", "min-date", "max-date", "range-state", "disabled-date", "disabled", "cell-class-name", "onChangerange", "onSelect"])
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
          )
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=panel-month-range.vue2.js.map
