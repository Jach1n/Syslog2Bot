'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var basicDateTable = require('../props/basic-date-table.js');
var useBasicDateTable = require('../composables/use-basic-date-table.js');
var basicCellRender = require('./basic-cell-render.js');

const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["aria-label"];
const _hoisted_3 = ["aria-current", "aria-selected", "tabindex", "aria-disabled"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "basic-date-table",
  props: basicDateTable.basicDateTableProps,
  emits: basicDateTable.basicDateTableEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const {
      WEEKS,
      rows,
      tbodyRef,
      currentCellRef,
      focus,
      isCurrent,
      isWeekActive,
      isSelectedCell,
      handlePickDate,
      handleMouseUp,
      handleMouseDown,
      handleMouseMove,
      handleFocus
    } = useBasicDateTable.useBasicDateTable(props, emit);
    const { tableLabel, tableKls, getCellClasses, getRowKls, weekHeaderClass, t } = useBasicDateTable.useBasicDateTableDOM(props, {
      isCurrent,
      isWeekActive
    });
    let isUnmounting = false;
    vue.onBeforeUnmount(() => {
      isUnmounting = true;
    });
    __expose({
      /**
       * @description focus on current cell
       */
      focus
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("table", {
        "aria-label": vue.unref(tableLabel),
        class: vue.normalizeClass(vue.unref(tableKls)),
        cellspacing: "0",
        cellpadding: "0",
        role: "grid",
        onClick: _cache[1] || (_cache[1] = //@ts-ignore
        (...args) => vue.unref(handlePickDate) && vue.unref(handlePickDate)(...args)),
        onMousemove: _cache[2] || (_cache[2] = //@ts-ignore
        (...args) => vue.unref(handleMouseMove) && vue.unref(handleMouseMove)(...args)),
        onMousedown: _cache[3] || (_cache[3] = //@ts-ignore
        (...args) => vue.unref(handleMouseDown) && vue.unref(handleMouseDown)(...args)),
        onMouseup: _cache[4] || (_cache[4] = //@ts-ignore
        (...args) => vue.unref(handleMouseUp) && vue.unref(handleMouseUp)(...args))
      }, [
        vue.createElementVNode(
          "tbody",
          {
            ref_key: "tbodyRef",
            ref: tbodyRef
          },
          [
            vue.createElementVNode("tr", null, [
              _ctx.showWeekNumber ? (vue.openBlock(), vue.createElementBlock(
                "th",
                {
                  key: 0,
                  scope: "col",
                  class: vue.normalizeClass(vue.unref(weekHeaderClass))
                },
                null,
                2
                /* CLASS */
              )) : vue.createCommentVNode("v-if", true),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(vue.unref(WEEKS), (week, key) => {
                  return vue.openBlock(), vue.createElementBlock("th", {
                    key,
                    "aria-label": vue.unref(t)("el.datepicker.weeksFull." + week),
                    scope: "col"
                  }, vue.toDisplayString(vue.unref(t)("el.datepicker.weeks." + week)), 9, _hoisted_2);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(vue.unref(rows), (row, rowKey) => {
                return vue.openBlock(), vue.createElementBlock(
                  "tr",
                  {
                    key: rowKey,
                    class: vue.normalizeClass(vue.unref(getRowKls)(_ctx.showWeekNumber ? row[2] : row[1]))
                  },
                  [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(row, (cell, columnKey) => {
                        return vue.openBlock(), vue.createElementBlock("td", {
                          key: `${rowKey}.${columnKey}`,
                          ref_for: true,
                          ref: (el) => !vue.unref(isUnmounting) && vue.unref(isSelectedCell)(cell) && (currentCellRef.value = el),
                          class: vue.normalizeClass(vue.unref(getCellClasses)(cell)),
                          "aria-current": cell.isCurrent ? "date" : void 0,
                          "aria-selected": cell.isCurrent,
                          tabindex: _ctx.disabled ? void 0 : vue.unref(isSelectedCell)(cell) ? 0 : -1,
                          "aria-disabled": _ctx.disabled,
                          onFocus: _cache[0] || (_cache[0] = //@ts-ignore
                          (...args) => vue.unref(handleFocus) && vue.unref(handleFocus)(...args))
                        }, [
                          vue.createVNode(vue.unref(basicCellRender.default), { cell }, null, 8, ["cell"])
                        ], 42, _hoisted_3);
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
          ],
          512
          /* NEED_PATCH */
        )
      ], 42, _hoisted_1);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=basic-date-table.vue2.js.map
