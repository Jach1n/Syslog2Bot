'use strict';

var vue = require('vue');
var index$1 = require('../../checkbox/index.js');
var index = require('../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');
var objects = require('../../../utils/objects.js');
var types = require('../../../utils/types.js');
var shared = require('@vue/shared');

const defaultClassNames = {
  selection: "table-column--selection",
  expand: "table__expand-column"
};
const cellStarts = {
  default: {
    order: ""
  },
  selection: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ""
  },
  expand: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ""
  },
  index: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ""
  }
};
const getDefaultClassName = (type) => {
  return defaultClassNames[type] || "";
};
const cellForced = {
  selection: {
    renderHeader({ store }) {
      var _a;
      function isDisabled() {
        return store.states.data.value && store.states.data.value.length === 0;
      }
      return vue.h(index$1.ElCheckbox, {
        disabled: isDisabled(),
        size: store.states.tableSize.value,
        indeterminate: store.states.selection.value.length > 0 && !store.states.isAllSelected.value,
        "onUpdate:modelValue": (_a = store.toggleAllSelection) != null ? _a : void 0,
        modelValue: store.states.isAllSelected.value,
        ariaLabel: store.t("el.table.selectAllLabel")
      });
    },
    renderCell({
      row,
      column,
      store,
      $index
    }) {
      return vue.h(index$1.ElCheckbox, {
        disabled: column.selectable ? !column.selectable.call(null, row, $index) : false,
        size: store.states.tableSize.value,
        onChange: () => {
          store.commit("rowSelectedChanged", row);
        },
        onClick: (event) => event.stopPropagation(),
        modelValue: store.isSelected(row),
        ariaLabel: store.t("el.table.selectRowLabel")
      });
    },
    sortable: false,
    resizable: false
  },
  index: {
    renderHeader({
      column
    }) {
      return column.label || "#";
    },
    renderCell({
      column,
      $index
    }) {
      let i = $index + 1;
      const index = column.index;
      if (types.isNumber(index)) {
        i = $index + index;
      } else if (shared.isFunction(index)) {
        i = index($index);
      }
      return vue.h("div", {}, [i]);
    },
    sortable: false
  },
  expand: {
    renderHeader({
      column
    }) {
      return column.label || "";
    },
    renderCell({
      column,
      row,
      store,
      expanded,
      $index
    }) {
      var _a, _b, _c;
      const { ns } = store;
      const classes = [ns.e("expand-icon")];
      if (!column.renderExpand && expanded) {
        classes.push(ns.em("expand-icon", "expanded"));
      }
      const callback = function(e) {
        e.stopPropagation();
        store.toggleRowExpansion(row);
      };
      const isRowExpandable = (_c = (_b = (_a = store.states.rowExpandable).value) == null ? void 0 : _b.call(_a, row, $index)) != null ? _c : true;
      if (!isRowExpandable) {
        classes.push(ns.is("disabled"));
      }
      return vue.h(
        "button",
        {
          type: "button",
          disabled: !isRowExpandable,
          "aria-label": store.t(
            expanded ? "el.table.collapseRowLabel" : "el.table.expandRowLabel"
          ),
          "aria-expanded": expanded,
          class: classes,
          onClick: callback
        },
        {
          default: () => {
            if (column.renderExpand) {
              return [
                column.renderExpand({
                  expanded,
                  expandable: isRowExpandable
                })
              ];
            }
            return [
              vue.h(index.ElIcon, null, {
                default: () => {
                  return [vue.h(iconsVue.ArrowRight)];
                }
              })
            ];
          }
        }
      );
    },
    sortable: false,
    resizable: false
  }
};
function defaultRenderCell({
  row,
  column,
  $index
}) {
  var _a;
  const property = column.property;
  const value = property && objects.getProp(row, property).value;
  if (column && column.formatter) {
    return column.formatter(row, column, value, $index);
  }
  return ((_a = value == null ? void 0 : value.toString) == null ? void 0 : _a.call(value)) || "";
}
function treeCellPrefix({
  row,
  treeNode,
  store
}, createPlaceholder = false) {
  const { ns } = store;
  if (!treeNode) {
    if (createPlaceholder) {
      return [
        vue.h("span", {
          class: ns.e("placeholder")
        })
      ];
    }
    return null;
  }
  const ele = [];
  const callback = function(e) {
    e.stopPropagation();
    if (treeNode.loading) {
      return;
    }
    store.loadOrToggle(row);
  };
  if (treeNode.indent) {
    ele.push(
      vue.h("span", {
        class: ns.e("indent"),
        style: { "padding-left": `${treeNode.indent}px` }
      })
    );
  }
  if (types.isBoolean(treeNode.expanded) && !treeNode.noLazyChildren) {
    const expandClasses = [
      ns.e("expand-icon"),
      treeNode.expanded ? ns.em("expand-icon", "expanded") : ""
    ];
    let icon = iconsVue.ArrowRight;
    if (treeNode.loading) {
      icon = iconsVue.Loading;
    }
    ele.push(
      vue.h(
        "button",
        {
          type: "button",
          "aria-label": store.t(
            treeNode.expanded ? "el.table.collapseRowLabel" : "el.table.expandRowLabel"
          ),
          "aria-expanded": treeNode.expanded,
          class: expandClasses,
          onClick: callback
        },
        {
          default: () => {
            return [
              vue.h(
                index.ElIcon,
                { class: ns.is("loading", treeNode.loading) },
                {
                  default: () => [vue.h(icon)]
                }
              )
            ];
          }
        }
      )
    );
  } else {
    ele.push(
      vue.h("span", {
        class: ns.e("placeholder")
      })
    );
  }
  return ele;
}

exports.cellForced = cellForced;
exports.cellStarts = cellStarts;
exports.defaultRenderCell = defaultRenderCell;
exports.getDefaultClassName = getDefaultClassName;
exports.treeCellPrefix = treeCellPrefix;
//# sourceMappingURL=config.js.map
