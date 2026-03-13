'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index = require('../../../checkbox/index.js');
var index$2 = require('../../../../hooks/use-locale/index.js');
var filterPanel = require('../filter-panel.vue.js');
var layoutObserver = require('../layout-observer.js');
var tokens = require('../tokens.js');
var eventHelper = require('./event-helper.js');
var style_helper = require('./style.helper.js');
var utilsHelper = require('./utils-helper.js');
var index$1 = require('../../../../hooks/use-namespace/index.js');

var TableHeader = vue.defineComponent({
  name: "ElTableHeader",
  components: {
    ElCheckbox: index.ElCheckbox
  },
  props: {
    fixed: {
      type: String,
      default: ""
    },
    store: {
      required: true,
      type: Object
    },
    border: Boolean,
    defaultSort: {
      type: Object,
      default: () => {
        return {
          prop: "",
          order: ""
        };
      }
    },
    appendFilterPanelTo: {
      type: String
    },
    allowDragLastColumn: {
      type: Boolean
    }
  },
  setup(props, { emit }) {
    const instance = vue.getCurrentInstance();
    const parent = vue.inject(tokens.TABLE_INJECTION_KEY);
    const ns = index$1.useNamespace("table");
    const filterPanels = vue.ref({});
    const { onColumnsChange, onScrollableChange } = layoutObserver.default(parent);
    const isTableLayoutAuto = (parent == null ? void 0 : parent.props.tableLayout) === "auto";
    const saveIndexSelection = vue.reactive(/* @__PURE__ */ new Map());
    const theadRef = vue.ref();
    let delayId;
    const updateFixedColumnStyle = () => {
      delayId = setTimeout(() => {
        if (saveIndexSelection.size > 0) {
          saveIndexSelection.forEach((column, key) => {
            const el = theadRef.value.querySelector(
              `.${key.replace(/\s/g, ".")}`
            );
            if (el) {
              const width = el.getBoundingClientRect().width;
              column.width = width || column.width;
            }
          });
          saveIndexSelection.clear();
        }
      });
    };
    vue.watch(saveIndexSelection, updateFixedColumnStyle);
    vue.onBeforeUnmount(() => {
      if (delayId) {
        clearTimeout(delayId);
        delayId = void 0;
      }
    });
    vue.onMounted(async () => {
      await vue.nextTick();
      await vue.nextTick();
      const { prop, order } = props.defaultSort;
      parent == null ? void 0 : parent.store.commit("sort", { prop, order, init: true });
      updateFixedColumnStyle();
    });
    const {
      handleHeaderClick,
      handleHeaderContextMenu,
      handleMouseDown,
      handleMouseMove,
      handleMouseOut,
      handleSortClick,
      handleFilterClick
    } = eventHelper.default(props, emit);
    const {
      getHeaderRowStyle,
      getHeaderRowClass,
      getHeaderCellStyle,
      getHeaderCellClass
    } = style_helper.default(props);
    const { isGroup, toggleAllSelection, columnRows } = utilsHelper.default(
      props
    );
    const { t } = index$2.useLocale();
    instance.state = {
      onColumnsChange,
      onScrollableChange
    };
    instance.filterPanels = filterPanels;
    return {
      ns,
      t,
      filterPanels,
      onColumnsChange,
      onScrollableChange,
      columnRows,
      getHeaderRowClass,
      getHeaderRowStyle,
      getHeaderCellClass,
      getHeaderCellStyle,
      handleHeaderClick,
      handleHeaderContextMenu,
      handleMouseDown,
      handleMouseMove,
      handleMouseOut,
      handleSortClick,
      handleFilterClick,
      isGroup,
      toggleAllSelection,
      saveIndexSelection,
      isTableLayoutAuto,
      theadRef,
      updateFixedColumnStyle
    };
  },
  render() {
    const {
      ns,
      t,
      isGroup,
      columnRows,
      getHeaderCellStyle,
      getHeaderCellClass,
      getHeaderRowClass,
      getHeaderRowStyle,
      handleHeaderClick,
      handleHeaderContextMenu,
      handleMouseDown,
      handleMouseMove,
      handleSortClick,
      handleMouseOut,
      store,
      $parent,
      saveIndexSelection,
      isTableLayoutAuto
    } = this;
    let rowSpan = 1;
    return vue.h(
      "thead",
      {
        ref: "theadRef",
        class: ns.is("group", isGroup)
      },
      columnRows.map(
        (subColumns, rowIndex) => vue.h(
          "tr",
          {
            class: getHeaderRowClass(rowIndex),
            key: rowIndex,
            style: getHeaderRowStyle(rowIndex)
          },
          subColumns.map((column, cellIndex) => {
            if (column.rowSpan > rowSpan) {
              rowSpan = column.rowSpan;
            }
            const _class = getHeaderCellClass(
              rowIndex,
              cellIndex,
              subColumns,
              column
            );
            if (isTableLayoutAuto && column.fixed) {
              saveIndexSelection.set(_class, column);
            }
            return vue.h(
              "th",
              {
                class: _class,
                colspan: column.colSpan,
                key: `${column.id}-thead`,
                rowspan: column.rowSpan,
                scope: column.colSpan > 1 ? "colgroup" : "col",
                ariaSort: column.sortable ? column.order : void 0,
                style: getHeaderCellStyle(
                  rowIndex,
                  cellIndex,
                  subColumns,
                  column
                ),
                onClick: ($event) => {
                  var _a;
                  if ((_a = $event.currentTarget) == null ? void 0 : _a.classList.contains(
                    "noclick"
                  )) {
                    return;
                  }
                  handleHeaderClick($event, column);
                },
                onContextmenu: ($event) => handleHeaderContextMenu($event, column),
                onMousedown: ($event) => handleMouseDown($event, column),
                onMousemove: ($event) => handleMouseMove($event, column),
                onMouseout: handleMouseOut
              },
              [
                vue.h(
                  "div",
                  {
                    class: [
                      "cell",
                      column.filteredValue && column.filteredValue.length > 0 ? "highlight" : ""
                    ]
                  },
                  [
                    column.renderHeader ? column.renderHeader({
                      column,
                      $index: cellIndex,
                      store,
                      _self: $parent
                    }) : column.label,
                    column.sortable && vue.h(
                      "button",
                      {
                        type: "button",
                        class: "caret-wrapper",
                        "aria-label": t("el.table.sortLabel", {
                          column: column.label || ""
                        }),
                        onClick: ($event) => handleSortClick($event, column)
                      },
                      [
                        vue.h("i", {
                          onClick: ($event) => handleSortClick($event, column, "ascending"),
                          class: "sort-caret ascending"
                        }),
                        vue.h("i", {
                          onClick: ($event) => handleSortClick($event, column, "descending"),
                          class: "sort-caret descending"
                        })
                      ]
                    ),
                    column.filterable && vue.h(
                      filterPanel.default,
                      {
                        store,
                        placement: column.filterPlacement || "bottom-start",
                        appendTo: $parent == null ? void 0 : $parent.appendFilterPanelTo,
                        column,
                        upDataColumn: (key, value) => {
                          column[key] = value;
                        }
                      },
                      {
                        "filter-icon": () => column.renderFilterIcon ? column.renderFilterIcon({
                          filterOpened: column.filterOpened
                        }) : null
                      }
                    )
                  ]
                )
              ]
            );
          })
        )
      )
    );
  }
});

exports.default = TableHeader;
//# sourceMappingURL=index.js.map
