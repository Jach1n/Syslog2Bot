'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var layoutObserver = require('../layout-observer.js');
var util = require('../util.js');
var tokens = require('../tokens.js');
var renderHelper = require('./render-helper.js');
var defaults = require('./defaults.js');
var index = require('../../../../hooks/use-namespace/index.js');
var style = require('../../../../utils/dom/style.js');
var core = require('@vueuse/core');
var raf = require('../../../../utils/raf.js');

var TableBody = vue.defineComponent({
  name: "ElTableBody",
  props: defaults.default,
  setup(props) {
    var _a;
    const instance = vue.getCurrentInstance();
    const parent = vue.inject(tokens.TABLE_INJECTION_KEY);
    const ns = index.useNamespace("table");
    const { wrappedRowRender, tooltipContent, tooltipTrigger } = renderHelper.default(props);
    const { onColumnsChange, onScrollableChange } = layoutObserver.default(parent);
    const hoveredCellList = [];
    vue.watch((_a = props.store) == null ? void 0 : _a.states.hoverRow, (newVal, oldVal) => {
      var _a2, _b;
      const el = instance == null ? void 0 : instance.vnode.el;
      const rows = Array.from((el == null ? void 0 : el.children) || []).filter(
        (e) => e == null ? void 0 : e.classList.contains(`${ns.e("row")}`)
      );
      let rowNum = newVal;
      const childNodes = (_a2 = rows[rowNum]) == null ? void 0 : _a2.childNodes;
      if (childNodes == null ? void 0 : childNodes.length) {
        let control = 0;
        const indexes = Array.from(childNodes).reduce((acc, item, index) => {
          var _a3, _b2;
          if (((_a3 = childNodes[index]) == null ? void 0 : _a3.colSpan) > 1) {
            control = (_b2 = childNodes[index]) == null ? void 0 : _b2.colSpan;
          }
          if (item.nodeName !== "TD" && control === 0) {
            acc.push(index);
          }
          control > 0 && control--;
          return acc;
        }, []);
        indexes.forEach((rowIndex) => {
          var _a3;
          rowNum = newVal;
          while (rowNum > 0) {
            const preChildNodes = (_a3 = rows[rowNum - 1]) == null ? void 0 : _a3.childNodes;
            if (preChildNodes[rowIndex] && preChildNodes[rowIndex].nodeName === "TD" && preChildNodes[rowIndex].rowSpan > 1) {
              style.addClass(preChildNodes[rowIndex], "hover-cell");
              hoveredCellList.push(preChildNodes[rowIndex]);
              break;
            }
            rowNum--;
          }
        });
      } else {
        hoveredCellList.forEach((item) => style.removeClass(item, "hover-cell"));
        hoveredCellList.length = 0;
      }
      if (!((_b = props.store) == null ? void 0 : _b.states.isComplex.value) || !core.isClient) return;
      raf.rAF(() => {
        const oldRow = rows[oldVal];
        const newRow = rows[newVal];
        if (oldRow && !oldRow.classList.contains("hover-fixed-row")) {
          style.removeClass(oldRow, "hover-row");
        }
        if (newRow) {
          style.addClass(newRow, "hover-row");
        }
      });
    });
    vue.onUnmounted(() => {
      var _a2;
      (_a2 = util.removePopper) == null ? void 0 : _a2();
    });
    return {
      ns,
      onColumnsChange,
      onScrollableChange,
      wrappedRowRender,
      tooltipContent,
      tooltipTrigger
    };
  },
  render() {
    const { wrappedRowRender, store } = this;
    const data = (store == null ? void 0 : store.states.data.value) || [];
    return vue.h("tbody", { tabIndex: -1 }, [
      data.reduce((acc, row) => {
        return acc.concat(wrappedRowRender(row, acc.length));
      }, [])
    ]);
  }
});

exports.default = TableBody;
//# sourceMappingURL=index.js.map
