'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var calendar = require('./calendar.js');
var vue = require('vue');
var index$2 = require('../../button/index.js');
var dateTable_vue_vue_type_script_setup_true_lang = require('./date-table.vue2.js');
var useCalendar = require('./use-calendar.js');
var selectController_vue_vue_type_script_setup_true_lang = require('./select-controller.vue2.js');
var index = require('../../../hooks/use-namespace/index.js');
var index$1 = require('../../../hooks/use-locale/index.js');

const COMPONENT_NAME = "ElCalendar";
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: COMPONENT_NAME
  },
  __name: "calendar",
  props: calendar.calendarProps,
  emits: calendar.calendarEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const ns = index.useNamespace("calendar");
    const props = __props;
    const emit = __emit;
    const {
      calculateValidatedDateRange,
      date,
      pickDay,
      realSelectedDay,
      selectDate,
      validatedRange,
      handleDateChange
    } = useCalendar.useCalendar(props, emit, COMPONENT_NAME);
    const { t } = index$1.useLocale();
    const i18nDate = vue.computed(() => {
      const pickedMonth = `el.datepicker.month${date.value.format("M")}`;
      return `${date.value.year()} ${t("el.datepicker.year")} ${t(pickedMonth)}`;
    });
    __expose({
      /** @description currently selected date */
      selectedDay: realSelectedDay,
      /** @description select a specific date */
      pickDay,
      /** @description select date */
      selectDate,
      /** @description Calculate the validate date range according to the start and end dates */
      calculateValidatedDateRange
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass(vue.unref(ns).b())
        },
        [
          vue.createElementVNode(
            "div",
            {
              class: vue.normalizeClass(vue.unref(ns).e("header"))
            },
            [
              vue.renderSlot(_ctx.$slots, "header", { date: i18nDate.value }, () => [
                vue.createElementVNode(
                  "div",
                  {
                    class: vue.normalizeClass(vue.unref(ns).e("title"))
                  },
                  vue.toDisplayString(i18nDate.value),
                  3
                  /* TEXT, CLASS */
                ),
                vue.unref(validatedRange).length === 0 && __props.controllerType === "button" ? (vue.openBlock(), vue.createElementBlock(
                  "div",
                  {
                    key: 0,
                    class: vue.normalizeClass(vue.unref(ns).e("button-group"))
                  },
                  [
                    vue.createVNode(vue.unref(index$2.ElButtonGroup), null, {
                      default: vue.withCtx(() => [
                        vue.createVNode(vue.unref(index$2.ElButton), {
                          size: "small",
                          onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(selectDate)("prev-month"))
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode(
                              vue.toDisplayString(vue.unref(t)("el.datepicker.prevMonth")),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 1
                          /* STABLE */
                        }),
                        vue.createVNode(vue.unref(index$2.ElButton), {
                          size: "small",
                          onClick: _cache[1] || (_cache[1] = ($event) => vue.unref(selectDate)("today"))
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode(
                              vue.toDisplayString(vue.unref(t)("el.datepicker.today")),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 1
                          /* STABLE */
                        }),
                        vue.createVNode(vue.unref(index$2.ElButton), {
                          size: "small",
                          onClick: _cache[2] || (_cache[2] = ($event) => vue.unref(selectDate)("next-month"))
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode(
                              vue.toDisplayString(vue.unref(t)("el.datepicker.nextMonth")),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 1
                          /* STABLE */
                        })
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ],
                  2
                  /* CLASS */
                )) : vue.unref(validatedRange).length === 0 && __props.controllerType === "select" ? (vue.openBlock(), vue.createElementBlock(
                  "div",
                  {
                    key: 1,
                    class: vue.normalizeClass(vue.unref(ns).e("select-controller"))
                  },
                  [
                    vue.createVNode(selectController_vue_vue_type_script_setup_true_lang.default, {
                      date: vue.unref(date),
                      formatter: __props.formatter,
                      onDateChange: vue.unref(handleDateChange)
                    }, null, 8, ["date", "formatter", "onDateChange"])
                  ],
                  2
                  /* CLASS */
                )) : vue.createCommentVNode("v-if", true)
              ])
            ],
            2
            /* CLASS */
          ),
          vue.unref(validatedRange).length === 0 ? (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 0,
              class: vue.normalizeClass(vue.unref(ns).e("body"))
            },
            [
              vue.createVNode(dateTable_vue_vue_type_script_setup_true_lang.default, {
                date: vue.unref(date),
                "selected-day": vue.unref(realSelectedDay),
                onPick: vue.unref(pickDay)
              }, vue.createSlots({
                _: 2
                /* DYNAMIC */
              }, [
                _ctx.$slots["date-cell"] ? {
                  name: "date-cell",
                  fn: vue.withCtx((data) => [
                    vue.renderSlot(_ctx.$slots, "date-cell", vue.normalizeProps(vue.guardReactiveProps(data)))
                  ]),
                  key: "0"
                } : void 0
              ]), 1032, ["date", "selected-day", "onPick"])
            ],
            2
            /* CLASS */
          )) : (vue.openBlock(), vue.createElementBlock(
            "div",
            {
              key: 1,
              class: vue.normalizeClass(vue.unref(ns).e("body"))
            },
            [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(vue.unref(validatedRange), (range_, index) => {
                  return vue.openBlock(), vue.createBlock(dateTable_vue_vue_type_script_setup_true_lang.default, {
                    key: index,
                    date: range_[0],
                    "selected-day": vue.unref(realSelectedDay),
                    range: range_,
                    "hide-header": index !== 0,
                    onPick: vue.unref(pickDay)
                  }, vue.createSlots({
                    _: 2
                    /* DYNAMIC */
                  }, [
                    _ctx.$slots["date-cell"] ? {
                      name: "date-cell",
                      fn: vue.withCtx((data) => [
                        vue.renderSlot(_ctx.$slots, "date-cell", vue.mergeProps({ ref_for: true }, data))
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["date", "selected-day", "range", "hide-header", "onPick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            2
            /* CLASS */
          ))
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=calendar.vue2.js.map
