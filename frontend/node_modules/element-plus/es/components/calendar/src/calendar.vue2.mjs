import { calendarEmits, calendarProps } from './calendar.mjs';
import { defineComponent, computed, createElementBlock, openBlock, normalizeClass, unref, createElementVNode, renderSlot, createCommentVNode, toDisplayString, createVNode, withCtx, createTextVNode, createSlots, normalizeProps, guardReactiveProps, Fragment, renderList, createBlock, mergeProps } from 'vue';
import { ElButtonGroup, ElButton } from '../../button/index.mjs';
import _sfc_main$2 from './date-table.vue2.mjs';
import { useCalendar } from './use-calendar.mjs';
import _sfc_main$1 from './select-controller.vue2.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { useLocale } from '../../../hooks/use-locale/index.mjs';

const COMPONENT_NAME = "ElCalendar";
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: COMPONENT_NAME
  },
  __name: "calendar",
  props: calendarProps,
  emits: calendarEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const ns = useNamespace("calendar");
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
    } = useCalendar(props, emit, COMPONENT_NAME);
    const { t } = useLocale();
    const i18nDate = computed(() => {
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
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass(unref(ns).b())
        },
        [
          createElementVNode(
            "div",
            {
              class: normalizeClass(unref(ns).e("header"))
            },
            [
              renderSlot(_ctx.$slots, "header", { date: i18nDate.value }, () => [
                createElementVNode(
                  "div",
                  {
                    class: normalizeClass(unref(ns).e("title"))
                  },
                  toDisplayString(i18nDate.value),
                  3
                  /* TEXT, CLASS */
                ),
                unref(validatedRange).length === 0 && __props.controllerType === "button" ? (openBlock(), createElementBlock(
                  "div",
                  {
                    key: 0,
                    class: normalizeClass(unref(ns).e("button-group"))
                  },
                  [
                    createVNode(unref(ElButtonGroup), null, {
                      default: withCtx(() => [
                        createVNode(unref(ElButton), {
                          size: "small",
                          onClick: _cache[0] || (_cache[0] = ($event) => unref(selectDate)("prev-month"))
                        }, {
                          default: withCtx(() => [
                            createTextVNode(
                              toDisplayString(unref(t)("el.datepicker.prevMonth")),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 1
                          /* STABLE */
                        }),
                        createVNode(unref(ElButton), {
                          size: "small",
                          onClick: _cache[1] || (_cache[1] = ($event) => unref(selectDate)("today"))
                        }, {
                          default: withCtx(() => [
                            createTextVNode(
                              toDisplayString(unref(t)("el.datepicker.today")),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 1
                          /* STABLE */
                        }),
                        createVNode(unref(ElButton), {
                          size: "small",
                          onClick: _cache[2] || (_cache[2] = ($event) => unref(selectDate)("next-month"))
                        }, {
                          default: withCtx(() => [
                            createTextVNode(
                              toDisplayString(unref(t)("el.datepicker.nextMonth")),
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
                )) : unref(validatedRange).length === 0 && __props.controllerType === "select" ? (openBlock(), createElementBlock(
                  "div",
                  {
                    key: 1,
                    class: normalizeClass(unref(ns).e("select-controller"))
                  },
                  [
                    createVNode(_sfc_main$1, {
                      date: unref(date),
                      formatter: __props.formatter,
                      onDateChange: unref(handleDateChange)
                    }, null, 8, ["date", "formatter", "onDateChange"])
                  ],
                  2
                  /* CLASS */
                )) : createCommentVNode("v-if", true)
              ])
            ],
            2
            /* CLASS */
          ),
          unref(validatedRange).length === 0 ? (openBlock(), createElementBlock(
            "div",
            {
              key: 0,
              class: normalizeClass(unref(ns).e("body"))
            },
            [
              createVNode(_sfc_main$2, {
                date: unref(date),
                "selected-day": unref(realSelectedDay),
                onPick: unref(pickDay)
              }, createSlots({
                _: 2
                /* DYNAMIC */
              }, [
                _ctx.$slots["date-cell"] ? {
                  name: "date-cell",
                  fn: withCtx((data) => [
                    renderSlot(_ctx.$slots, "date-cell", normalizeProps(guardReactiveProps(data)))
                  ]),
                  key: "0"
                } : void 0
              ]), 1032, ["date", "selected-day", "onPick"])
            ],
            2
            /* CLASS */
          )) : (openBlock(), createElementBlock(
            "div",
            {
              key: 1,
              class: normalizeClass(unref(ns).e("body"))
            },
            [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(unref(validatedRange), (range_, index) => {
                  return openBlock(), createBlock(_sfc_main$2, {
                    key: index,
                    date: range_[0],
                    "selected-day": unref(realSelectedDay),
                    range: range_,
                    "hide-header": index !== 0,
                    onPick: unref(pickDay)
                  }, createSlots({
                    _: 2
                    /* DYNAMIC */
                  }, [
                    _ctx.$slots["date-cell"] ? {
                      name: "date-cell",
                      fn: withCtx((data) => [
                        renderSlot(_ctx.$slots, "date-cell", mergeProps({ ref_for: true }, data))
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

export { _sfc_main as default };
//# sourceMappingURL=calendar.vue2.mjs.map
