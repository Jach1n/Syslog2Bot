'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var dayjs = require('dayjs');
var basicYearTable = require('../props/basic-year-table.js');
var utils = require('../utils.js');
var basicCellRender = require('./basic-cell-render.js');
var index = require('../../../../hooks/use-namespace/index.js');
var index$1 = require('../../../../hooks/use-locale/index.js');
var arrays = require('../../../../utils/arrays.js');
var style = require('../../../../utils/dom/style.js');
var utils$1 = require('../../../time-picker/src/utils.js');

const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["aria-selected", "aria-label", "tabindex", "onKeydown"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "basic-year-table",
  props: basicYearTable.basicYearTableProps,
  emits: ["changerange", "pick", "select"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const datesInYear = (year, lang2) => {
      const firstDay = dayjs(String(year)).locale(lang2).startOf("year");
      const lastDay = firstDay.endOf("year");
      const numOfDays = lastDay.dayOfYear();
      return utils$1.rangeArr(numOfDays).map((n) => firstDay.add(n, "day").toDate());
    };
    const props = __props;
    const emit = __emit;
    const ns = index.useNamespace("year-table");
    const { t, lang } = index$1.useLocale();
    const tbodyRef = vue.ref();
    const currentCellRef = vue.ref();
    const startYear = vue.computed(() => {
      return Math.floor(props.date.year() / 10) * 10;
    });
    const tableRows = vue.ref([[], [], []]);
    const lastRow = vue.ref();
    const lastColumn = vue.ref();
    const rows = vue.computed(() => {
      var _a, _b, _c;
      const rows2 = tableRows.value;
      const now = dayjs().locale(lang.value).startOf("year");
      for (let i = 0; i < 3; i++) {
        const row = rows2[i];
        for (let j = 0; j < 4; j++) {
          if (i * 4 + j >= 10) {
            break;
          }
          let cell = row[j];
          if (!cell) {
            cell = {
              row: i,
              column: j,
              type: "normal",
              inRange: false,
              start: false,
              end: false,
              text: -1,
              disabled: false,
              isSelected: false,
              customClass: void 0,
              date: void 0,
              dayjs: void 0,
              isCurrent: void 0,
              selected: void 0,
              renderText: void 0,
              timestamp: void 0
            };
          }
          cell.type = "normal";
          const index = i * 4 + j + startYear.value;
          const calTime = dayjs().year(index);
          const calEndDate = props.rangeState.endDate || props.maxDate || props.rangeState.selecting && props.minDate || null;
          cell.inRange = !!(props.minDate && calTime.isSameOrAfter(props.minDate, "year") && calEndDate && calTime.isSameOrBefore(calEndDate, "year")) || !!(props.minDate && calTime.isSameOrBefore(props.minDate, "year") && calEndDate && calTime.isSameOrAfter(calEndDate, "year"));
          if ((_a = props.minDate) == null ? void 0 : _a.isSameOrAfter(calEndDate)) {
            cell.start = !!(calEndDate && calTime.isSame(calEndDate, "year"));
            cell.end = !!(props.minDate && calTime.isSame(props.minDate, "year"));
          } else {
            cell.start = !!(props.minDate && calTime.isSame(props.minDate, "year"));
            cell.end = !!(calEndDate && calTime.isSame(calEndDate, "year"));
          }
          const isToday = now.isSame(calTime);
          if (isToday) {
            cell.type = "today";
          }
          cell.text = index;
          const cellDate = calTime.toDate();
          cell.disabled = ((_b = props.disabledDate) == null ? void 0 : _b.call(props, cellDate)) || false;
          cell.date = cellDate;
          cell.customClass = (_c = props.cellClassName) == null ? void 0 : _c.call(props, cellDate);
          cell.dayjs = calTime;
          cell.timestamp = calTime.valueOf();
          cell.isSelected = isSelectedCell(cell);
          row[j] = cell;
        }
      }
      return rows2;
    });
    const focus = () => {
      var _a;
      (_a = currentCellRef.value) == null ? void 0 : _a.focus();
    };
    const getCellKls = (cell) => {
      const kls = {};
      const today = dayjs().locale(lang.value);
      const year = cell.text;
      kls.disabled = props.disabled || (props.disabledDate ? datesInYear(year, lang.value).every(props.disabledDate) : false);
      kls.today = today.year() === year;
      kls.current = arrays.castArray(props.parsedValue).some((d) => d.year() === year);
      if (cell.customClass) {
        kls[cell.customClass] = true;
      }
      if (cell.inRange) {
        kls["in-range"] = true;
        if (cell.start) {
          kls["start-date"] = true;
        }
        if (cell.end) {
          kls["end-date"] = true;
        }
      }
      return kls;
    };
    const isSelectedCell = (cell) => {
      const year = cell.text;
      return arrays.castArray(props.date).some((date) => date.year() === year);
    };
    const handleYearTableClick = (event) => {
      var _a;
      if (props.disabled) return;
      const target = (_a = event.target) == null ? void 0 : _a.closest(
        "td"
      );
      if (!target || !target.textContent || style.hasClass(target, "disabled")) return;
      const column = target.cellIndex;
      const row = target.parentNode.rowIndex;
      const selectedYear = row * 4 + column + startYear.value;
      const newDate = dayjs().year(selectedYear);
      if (props.selectionMode === "range") {
        if (!props.rangeState.selecting) {
          emit("pick", { minDate: newDate, maxDate: null });
          emit("select", true);
        } else {
          if (props.minDate && newDate >= props.minDate) {
            emit("pick", { minDate: props.minDate, maxDate: newDate });
          } else {
            emit("pick", { minDate: newDate, maxDate: props.minDate });
          }
          emit("select", false);
        }
      } else if (props.selectionMode === "years") {
        if (event.type === "keydown") {
          emit("pick", arrays.castArray(props.parsedValue), false);
          return;
        }
        const vaildYear = utils.getValidDateOfYear(
          newDate.startOf("year"),
          lang.value,
          props.disabledDate
        );
        const newValue = style.hasClass(target, "current") ? arrays.castArray(props.parsedValue).filter((d) => (d == null ? void 0 : d.year()) !== selectedYear) : arrays.castArray(props.parsedValue).concat([vaildYear]);
        emit("pick", newValue);
      } else {
        emit("pick", selectedYear);
      }
    };
    const handleMouseMove = (event) => {
      var _a;
      if (!props.rangeState.selecting) return;
      const target = (_a = event.target) == null ? void 0 : _a.closest(
        "td"
      );
      if (!target) return;
      const row = target.parentNode.rowIndex;
      const column = target.cellIndex;
      if (rows.value[row][column].disabled) return;
      if (row !== lastRow.value || column !== lastColumn.value) {
        lastRow.value = row;
        lastColumn.value = column;
        emit("changerange", {
          selecting: true,
          endDate: dayjs().year(startYear.value).add(row * 4 + column, "year")
        });
      }
    };
    vue.watch(
      () => props.date,
      async () => {
        var _a, _b;
        if ((_a = tbodyRef.value) == null ? void 0 : _a.contains(document.activeElement)) {
          await vue.nextTick();
          (_b = currentCellRef.value) == null ? void 0 : _b.focus();
        }
      }
    );
    __expose({
      /**
       * @description focus on the current cell
       */
      focus
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("table", {
        role: "grid",
        "aria-label": vue.unref(t)("el.datepicker.yearTablePrompt"),
        class: vue.normalizeClass(vue.unref(ns).b()),
        onClick: handleYearTableClick,
        onMousemove: handleMouseMove
      }, [
        vue.createElementVNode(
          "tbody",
          {
            ref_key: "tbodyRef",
            ref: tbodyRef
          },
          [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(rows.value, (row, rowKey) => {
                return vue.openBlock(), vue.createElementBlock("tr", { key: rowKey }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(row, (cell, cellKey) => {
                      return vue.openBlock(), vue.createElementBlock("td", {
                        key: `${rowKey}_${cellKey}`,
                        ref_for: true,
                        ref: (el) => cell.isSelected && (currentCellRef.value = el),
                        class: vue.normalizeClass(["available", getCellKls(cell)]),
                        "aria-selected": cell.isSelected,
                        "aria-label": String(cell.text),
                        tabindex: cell.isSelected ? 0 : -1,
                        onKeydown: [
                          vue.withKeys(vue.withModifiers(handleYearTableClick, ["prevent", "stop"]), ["space"]),
                          vue.withKeys(vue.withModifiers(handleYearTableClick, ["prevent", "stop"]), ["enter"])
                        ]
                      }, [
                        vue.createVNode(vue.unref(basicCellRender.default), { cell }, null, 8, ["cell"])
                      ], 42, _hoisted_2);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]);
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
//# sourceMappingURL=basic-year-table.vue2.js.map
