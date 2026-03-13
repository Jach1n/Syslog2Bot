'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var lodashUnified = require('lodash-unified');
var util = require('../util.js');
var tokens = require('../tokens.js');
var style = require('../../../../utils/dom/style.js');

function isGreaterThan(a, b, epsilon = 0.03) {
  return a - b > epsilon;
}
function useEvents(props) {
  const parent = vue.inject(tokens.TABLE_INJECTION_KEY);
  const tooltipContent = vue.ref("");
  const tooltipTrigger = vue.ref(vue.h("div"));
  const handleEvent = (event, row, name) => {
    var _a, _b, _c;
    const table = parent;
    const cell = util.getCell(event);
    let column = null;
    const namespace = (_a = table == null ? void 0 : table.vnode.el) == null ? void 0 : _a.dataset.prefix;
    if (cell) {
      column = util.getColumnByCell(
        {
          columns: (_c = (_b = props.store) == null ? void 0 : _b.states.columns.value) != null ? _c : []
        },
        cell,
        namespace
      );
      if (column) {
        table == null ? void 0 : table.emit(`cell-${name}`, row, column, cell, event);
      }
    }
    table == null ? void 0 : table.emit(`row-${name}`, row, column, event);
  };
  const handleDoubleClick = (event, row) => {
    handleEvent(event, row, "dblclick");
  };
  const handleClick = (event, row) => {
    var _a;
    (_a = props.store) == null ? void 0 : _a.commit("setCurrentRow", row);
    handleEvent(event, row, "click");
  };
  const handleContextMenu = (event, row) => {
    handleEvent(event, row, "contextmenu");
  };
  const handleMouseEnter = lodashUnified.debounce((index) => {
    var _a;
    (_a = props.store) == null ? void 0 : _a.commit("setHoverRow", index);
  }, 30);
  const handleMouseLeave = lodashUnified.debounce(() => {
    var _a;
    (_a = props.store) == null ? void 0 : _a.commit("setHoverRow", null);
  }, 30);
  const getPadding = (el) => {
    const style = window.getComputedStyle(el, null);
    const paddingLeft = Number.parseInt(style.paddingLeft, 10) || 0;
    const paddingRight = Number.parseInt(style.paddingRight, 10) || 0;
    const paddingTop = Number.parseInt(style.paddingTop, 10) || 0;
    const paddingBottom = Number.parseInt(style.paddingBottom, 10) || 0;
    return {
      left: paddingLeft,
      right: paddingRight,
      top: paddingTop,
      bottom: paddingBottom
    };
  };
  const toggleRowClassByCell = (rowSpan, event, toggle) => {
    var _a;
    let node = (_a = event == null ? void 0 : event.target) == null ? void 0 : _a.parentNode;
    while (rowSpan > 1) {
      node = node == null ? void 0 : node.nextSibling;
      if (!node || node.nodeName !== "TR") break;
      toggle(node, "hover-row hover-fixed-row");
      rowSpan--;
    }
  };
  const handleCellMouseEnter = (event, row, tooltipOptions) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    if (!parent) return;
    const table = parent;
    const cell = util.getCell(event);
    const namespace = (_a = table == null ? void 0 : table.vnode.el) == null ? void 0 : _a.dataset.prefix;
    let column = null;
    if (cell) {
      column = util.getColumnByCell(
        {
          columns: (_c = (_b = props.store) == null ? void 0 : _b.states.columns.value) != null ? _c : []
        },
        cell,
        namespace
      );
      if (!column) {
        return;
      }
      if (cell.rowSpan > 1) {
        toggleRowClassByCell(cell.rowSpan, event, style.addClass);
      }
      const hoverState = table.hoverState = {
        cell,
        column,
        row
      };
      table == null ? void 0 : table.emit(
        "cell-mouse-enter",
        hoverState.row,
        hoverState.column,
        hoverState.cell,
        event
      );
    }
    if (!tooltipOptions) {
      if (((_d = util.removePopper) == null ? void 0 : _d.trigger) === cell) {
        (_e = util.removePopper) == null ? void 0 : _e();
      }
      return;
    }
    const cellChild = event.target.querySelector(
      ".cell"
    );
    if (!(style.hasClass(cellChild, `${namespace}-tooltip`) && cellChild.childNodes.length && ((_f = cellChild.textContent) == null ? void 0 : _f.trim()))) {
      return;
    }
    const range = document.createRange();
    range.setStart(cellChild, 0);
    range.setEnd(cellChild, cellChild.childNodes.length);
    const { width: rangeWidth, height: rangeHeight } = range.getBoundingClientRect();
    const { width: cellChildWidth, height: cellChildHeight } = cellChild.getBoundingClientRect();
    const { top, left, right, bottom } = getPadding(cellChild);
    const horizontalPadding = left + right;
    const verticalPadding = top + bottom;
    if (isGreaterThan(rangeWidth + horizontalPadding, cellChildWidth) || isGreaterThan(rangeHeight + verticalPadding, cellChildHeight) || // When using a high-resolution screen, it is possible that a returns cellChild.scrollWidth value of 1921 and
    // cellChildWidth returns a value of 1920.994140625. #16856 #16673
    isGreaterThan(cellChild.scrollWidth, cellChildWidth)) {
      util.createTablePopper(
        tooltipOptions,
        (_g = (cell == null ? void 0 : cell.innerText) || (cell == null ? void 0 : cell.textContent)) != null ? _g : "",
        row,
        column,
        cell,
        table
      );
    } else if (((_h = util.removePopper) == null ? void 0 : _h.trigger) === cell) {
      (_i = util.removePopper) == null ? void 0 : _i();
    }
  };
  const handleCellMouseLeave = (event) => {
    const cell = util.getCell(event);
    if (!cell) return;
    if (cell.rowSpan > 1) {
      toggleRowClassByCell(cell.rowSpan, event, style.removeClass);
    }
    const oldHoverState = parent == null ? void 0 : parent.hoverState;
    parent == null ? void 0 : parent.emit(
      "cell-mouse-leave",
      oldHoverState == null ? void 0 : oldHoverState.row,
      oldHoverState == null ? void 0 : oldHoverState.column,
      oldHoverState == null ? void 0 : oldHoverState.cell,
      event
    );
  };
  return {
    handleDoubleClick,
    handleClick,
    handleContextMenu,
    handleMouseEnter,
    handleMouseLeave,
    handleCellMouseEnter,
    handleCellMouseLeave,
    tooltipContent,
    tooltipTrigger
  };
}

exports.default = useEvents;
//# sourceMappingURL=events-helper.js.map
