'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dateTable = require('./date-table.js');
var vue = require('vue');
var useDateTable = require('./use-date-table.js');
var index = require('../../../hooks/use-namespace/index.js');

const _hoisted_1 = { key: 0 };
const _hoisted_2 = ["onClick"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "DateTable"
  },
  __name: "date-table",
  props: dateTable.dateTableProps,
  emits: dateTable.dateTableEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const {
      isInRange,
      now,
      rows,
      weekDays,
      getFormattedDate,
      handlePickDay,
      getSlotData
    } = useDateTable.useDateTable(props, emit);
    const nsTable = index.useNamespace("calendar-table");
    const nsDay = index.useNamespace("calendar-day");
    const getCellClass = ({ text, type }) => {
      const classes = [type];
      if (type === "current") {
        const date = getFormattedDate(text, type);
        if (date.isSame(props.selectedDay, "day")) {
          classes.push(nsDay.is("selected"));
        }
        if (date.isSame(now, "day")) {
          classes.push(nsDay.is("today"));
        }
      }
      return classes;
    };
    __expose({
      /** @description toggle date panel */
      getFormattedDate
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(
        "table",
        {
          class: vue.normalizeClass([vue.unref(nsTable).b(), vue.unref(nsTable).is("range", vue.unref(isInRange))]),
          cellspacing: "0",
          cellpadding: "0"
        },
        [
          !__props.hideHeader ? (vue.openBlock(), vue.createElementBlock("thead", _hoisted_1, [
            vue.createElementVNode("tr", null, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(vue.unref(weekDays), (day) => {
                  return vue.openBlock(), vue.createElementBlock(
                    "th",
                    {
                      key: day,
                      scope: "col"
                    },
                    vue.toDisplayString(day),
                    1
                    /* TEXT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("tbody", null, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(vue.unref(rows), (row, index) => {
                return vue.openBlock(), vue.createElementBlock(
                  "tr",
                  {
                    key: index,
                    class: vue.normalizeClass({
                      [vue.unref(nsTable).e("row")]: true,
                      [vue.unref(nsTable).em("row", "hide-border")]: index === 0 && __props.hideHeader
                    })
                  },
                  [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(row, (cell, key) => {
                        return vue.openBlock(), vue.createElementBlock("td", {
                          key,
                          class: vue.normalizeClass(getCellClass(cell)),
                          onClick: ($event) => vue.unref(handlePickDay)(cell)
                        }, [
                          vue.createElementVNode(
                            "div",
                            {
                              class: vue.normalizeClass(vue.unref(nsDay).b())
                            },
                            [
                              vue.renderSlot(_ctx.$slots, "date-cell", {
                                data: vue.unref(getSlotData)(cell)
                              }, () => [
                                vue.createElementVNode(
                                  "span",
                                  null,
                                  vue.toDisplayString(cell.text),
                                  1
                                  /* TEXT */
                                )
                              ])
                            ],
                            2
                            /* CLASS */
                          )
                        ], 10, _hoisted_2);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ],
                  2
                  /* CLASS */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ],
        2
        /* CLASS */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=date-table.vue2.js.map
