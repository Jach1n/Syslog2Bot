import { defineComponent, onBeforeUnmount, createElementBlock, openBlock, unref, normalizeClass, createElementVNode, createCommentVNode, Fragment, renderList, toDisplayString, createVNode } from 'vue';
import { basicDateTableEmits, basicDateTableProps } from '../props/basic-date-table.mjs';
import { useBasicDateTable, useBasicDateTableDOM } from '../composables/use-basic-date-table.mjs';
import ElDatePickerCell from './basic-cell-render.mjs';

const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["aria-label"];
const _hoisted_3 = ["aria-current", "aria-selected", "tabindex", "aria-disabled"];
var _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "basic-date-table",
  props: basicDateTableProps,
  emits: basicDateTableEmits,
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
    } = useBasicDateTable(props, emit);
    const { tableLabel, tableKls, getCellClasses, getRowKls, weekHeaderClass, t } = useBasicDateTableDOM(props, {
      isCurrent,
      isWeekActive
    });
    let isUnmounting = false;
    onBeforeUnmount(() => {
      isUnmounting = true;
    });
    __expose({
      /**
       * @description focus on current cell
       */
      focus
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("table", {
        "aria-label": unref(tableLabel),
        class: normalizeClass(unref(tableKls)),
        cellspacing: "0",
        cellpadding: "0",
        role: "grid",
        onClick: _cache[1] || (_cache[1] = //@ts-ignore
        (...args) => unref(handlePickDate) && unref(handlePickDate)(...args)),
        onMousemove: _cache[2] || (_cache[2] = //@ts-ignore
        (...args) => unref(handleMouseMove) && unref(handleMouseMove)(...args)),
        onMousedown: _cache[3] || (_cache[3] = //@ts-ignore
        (...args) => unref(handleMouseDown) && unref(handleMouseDown)(...args)),
        onMouseup: _cache[4] || (_cache[4] = //@ts-ignore
        (...args) => unref(handleMouseUp) && unref(handleMouseUp)(...args))
      }, [
        createElementVNode(
          "tbody",
          {
            ref_key: "tbodyRef",
            ref: tbodyRef
          },
          [
            createElementVNode("tr", null, [
              _ctx.showWeekNumber ? (openBlock(), createElementBlock(
                "th",
                {
                  key: 0,
                  scope: "col",
                  class: normalizeClass(unref(weekHeaderClass))
                },
                null,
                2
                /* CLASS */
              )) : createCommentVNode("v-if", true),
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(unref(WEEKS), (week, key) => {
                  return openBlock(), createElementBlock("th", {
                    key,
                    "aria-label": unref(t)("el.datepicker.weeksFull." + week),
                    scope: "col"
                  }, toDisplayString(unref(t)("el.datepicker.weeks." + week)), 9, _hoisted_2);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(unref(rows), (row, rowKey) => {
                return openBlock(), createElementBlock(
                  "tr",
                  {
                    key: rowKey,
                    class: normalizeClass(unref(getRowKls)(_ctx.showWeekNumber ? row[2] : row[1]))
                  },
                  [
                    (openBlock(true), createElementBlock(
                      Fragment,
                      null,
                      renderList(row, (cell, columnKey) => {
                        return openBlock(), createElementBlock("td", {
                          key: `${rowKey}.${columnKey}`,
                          ref_for: true,
                          ref: (el) => !unref(isUnmounting) && unref(isSelectedCell)(cell) && (currentCellRef.value = el),
                          class: normalizeClass(unref(getCellClasses)(cell)),
                          "aria-current": cell.isCurrent ? "date" : void 0,
                          "aria-selected": cell.isCurrent,
                          tabindex: _ctx.disabled ? void 0 : unref(isSelectedCell)(cell) ? 0 : -1,
                          "aria-disabled": _ctx.disabled,
                          onFocus: _cache[0] || (_cache[0] = //@ts-ignore
                          (...args) => unref(handleFocus) && unref(handleFocus)(...args))
                        }, [
                          createVNode(unref(ElDatePickerCell), { cell }, null, 8, ["cell"])
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

export { _sfc_main as default };
//# sourceMappingURL=basic-date-table.vue2.mjs.map
