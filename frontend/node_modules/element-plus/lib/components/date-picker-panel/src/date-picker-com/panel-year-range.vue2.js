'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var dayjs = require('dayjs');
var iconsVue = require('@element-plus/icons-vue');
var index$1 = require('../../../icon/index.js');
var panelYearRange = require('../props/panel-year-range.js');
var useYearRangeHeader = require('../composables/use-year-range-header.js');
var useRangePicker = require('../composables/use-range-picker.js');
var utils = require('../utils.js');
var constants = require('../constants.js');
var basicYearTable_vue_vue_type_script_setup_true_lang = require('./basic-year-table.vue2.js');
var index = require('../../../../hooks/use-locale/index.js');
var constants$1 = require('../../../time-picker/src/constants.js');
var useFormCommonProps = require('../../../form/src/hooks/use-form-common-props.js');

const _hoisted_1 = ["disabled", "onClick"];
const _hoisted_2 = ["disabled"];
const _hoisted_3 = ["disabled"];
const _hoisted_4 = ["disabled"];
const _hoisted_5 = ["disabled"];
const step = 10;
const unit = "year";
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "DatePickerYearRange"
  },
  __name: "panel-year-range",
  props: panelYearRange.panelYearRangeProps,
  emits: panelYearRange.panelYearRangeEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { lang } = index.useLocale();
    const leftDate = vue.ref(dayjs().locale(lang.value));
    const rightDate = vue.ref(dayjs().locale(lang.value).add(step, unit));
    const isDefaultFormat = vue.inject(
      constants.ROOT_PICKER_IS_DEFAULT_FORMAT_INJECTION_KEY,
      void 0
    );
    const pickerBase = vue.inject(constants$1.PICKER_BASE_INJECTION_KEY);
    const { shortcuts, disabledDate, cellClassName } = pickerBase.props;
    const format = vue.toRef(pickerBase.props, "format");
    const defaultValue = vue.toRef(pickerBase.props, "defaultValue");
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
      step,
      unit,
      sortDates
    });
    const {
      leftPrevYear,
      rightNextYear,
      leftNextYear,
      rightPrevYear,
      leftLabel,
      rightLabel,
      leftYear,
      rightYear
    } = useYearRangeHeader.useYearRangeHeader({
      unlinkPanels: vue.toRef(props, "unlinkPanels"),
      leftDate,
      rightDate
    });
    const yearRangeDisabled = useFormCommonProps.useFormDisabled();
    const hasShortcuts = vue.computed(() => !!shortcuts.length);
    const panelKls = vue.computed(() => [
      ppNs.b(),
      drpNs.b(),
      ppNs.is("border", props.border),
      ppNs.is("disabled", yearRangeDisabled.value),
      {
        "has-sidebar": Boolean(vue.useSlots().sidebar) || hasShortcuts.value
      }
    ]);
    const leftPanelKls = vue.computed(() => {
      return {
        content: [ppNs.e("content"), drpNs.e("content"), "is-left"],
        arrowLeftBtn: [ppNs.e("icon-btn"), "d-arrow-left"],
        arrowRightBtn: [
          ppNs.e("icon-btn"),
          ppNs.is("disabled", !enableYearArrow.value || yearRangeDisabled.value),
          "d-arrow-right"
        ]
      };
    });
    const rightPanelKls = vue.computed(() => {
      return {
        content: [ppNs.e("content"), drpNs.e("content"), "is-right"],
        arrowLeftBtn: [
          ppNs.e("icon-btn"),
          ppNs.is("disabled", !enableYearArrow.value || yearRangeDisabled.value),
          "d-arrow-left"
        ],
        arrowRightBtn: [ppNs.e("icon-btn"), "d-arrow-right"]
      };
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
    const parseUserInput = (value) => {
      return utils.correctlyParseUserInput(
        value,
        format.value,
        lang.value,
        isDefaultFormat
      );
    };
    const isValidValue = (date) => {
      return utils.isValidRange(date) && (disabledDate ? !disabledDate(date[0].toDate()) && !disabledDate(date[1].toDate()) : true);
    };
    const handleClear = () => {
      let valueOnClear = null;
      if (pickerBase == null ? void 0 : pickerBase.emptyValues) {
        valueOnClear = pickerBase.emptyValues.valueOnClear.value;
      }
      const defaultArr = utils.getDefaultValue(vue.unref(defaultValue), {
        lang: vue.unref(lang),
        step,
        unit,
        unlinkPanels: props.unlinkPanels
      });
      leftDate.value = defaultArr[0];
      rightDate.value = defaultArr[1];
      emit("pick", valueOnClear);
    };
    function sortDates(minDate2, maxDate2) {
      if (props.unlinkPanels && maxDate2) {
        const minDateYear = (minDate2 == null ? void 0 : minDate2.year()) || 0;
        const maxDateYear = maxDate2.year();
        rightDate.value = minDateYear + step > maxDateYear ? maxDate2.add(step, unit) : maxDate2;
      } else {
        rightDate.value = leftDate.value.add(step, unit);
      }
    }
    vue.watch(
      () => props.visible,
      (visible) => {
        if (!visible && rangeState.value.selecting) {
          parseValue(props.parsedValue);
          onSelect(false);
        }
      }
    );
    emit("set-picker-option", ["isValidValue", isValidValue]);
    emit("set-picker-option", ["parseUserInput", parseUserInput]);
    emit("set-picker-option", ["handleClear", handleClear]);
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(panelKls.value)
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
                        disabled: vue.unref(yearRangeDisabled),
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
                      class: vue.normalizeClass(leftPanelKls.value.content)
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
                            class: vue.normalizeClass(leftPanelKls.value.arrowLeftBtn),
                            disabled: vue.unref(yearRangeDisabled),
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
                            disabled: !enableYearArrow.value || vue.unref(yearRangeDisabled),
                            class: vue.normalizeClass(leftPanelKls.value.arrowRightBtn),
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
                      vue.createVNode(basicYearTable_vue_vue_type_script_setup_true_lang.default, {
                        "selection-mode": "range",
                        date: leftDate.value,
                        "min-date": vue.unref(minDate),
                        "max-date": vue.unref(maxDate),
                        "range-state": vue.unref(rangeState),
                        "disabled-date": vue.unref(disabledDate),
                        disabled: vue.unref(yearRangeDisabled),
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
                      class: vue.normalizeClass(rightPanelKls.value.content)
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
                            disabled: !enableYearArrow.value || vue.unref(yearRangeDisabled),
                            class: vue.normalizeClass(rightPanelKls.value.arrowLeftBtn),
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
                            class: vue.normalizeClass(rightPanelKls.value.arrowRightBtn),
                            disabled: vue.unref(yearRangeDisabled),
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
                      vue.createVNode(basicYearTable_vue_vue_type_script_setup_true_lang.default, {
                        "selection-mode": "range",
                        date: rightDate.value,
                        "min-date": vue.unref(minDate),
                        "max-date": vue.unref(maxDate),
                        "range-state": vue.unref(rangeState),
                        "disabled-date": vue.unref(disabledDate),
                        disabled: vue.unref(yearRangeDisabled),
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
//# sourceMappingURL=panel-year-range.vue2.js.map
