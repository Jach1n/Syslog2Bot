'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var index$3 = require('../../checkbox/index.js');
var index = require('../../icon/index.js');
var iconsVue = require('@element-plus/icons-vue');
var index$1 = require('../../tooltip/index.js');
var index$2 = require('../../scrollbar/index.js');
var content = require('../../tooltip/src/content.js');
var index$4 = require('../../../hooks/use-locale/index.js');
var index$5 = require('../../../hooks/use-namespace/index.js');
var types = require('../../../utils/types.js');
var event = require('../../../utils/dom/event.js');
var aria = require('../../../constants/aria.js');

var _sfc_main = vue.defineComponent({
  name: "ElTableFilterPanel",
  components: {
    ElCheckbox: index$3.ElCheckbox,
    ElCheckboxGroup: index$3.ElCheckboxGroup,
    ElScrollbar: index$2.ElScrollbar,
    ElTooltip: index$1.ElTooltip,
    ElIcon: index.ElIcon,
    ArrowDown: iconsVue.ArrowDown,
    ArrowUp: iconsVue.ArrowUp
  },
  props: {
    placement: {
      type: String,
      default: "bottom-start"
    },
    store: {
      type: Object
    },
    column: {
      type: Object
    },
    upDataColumn: {
      type: Function
    },
    appendTo: content.useTooltipContentProps.appendTo
  },
  setup(props) {
    const instance = vue.getCurrentInstance();
    const { t } = index$4.useLocale();
    const ns = index$5.useNamespace("table-filter");
    const parent = instance == null ? void 0 : instance.parent;
    if (props.column && !parent.filterPanels.value[props.column.id]) {
      parent.filterPanels.value[props.column.id] = instance;
    }
    const tooltipRef = vue.ref(null);
    const rootRef = vue.ref(null);
    const checkedIndex = vue.ref(0);
    const filters = vue.computed(() => {
      return props.column && props.column.filters;
    });
    const filterClassName = vue.computed(() => {
      if (props.column && props.column.filterClassName) {
        return `${ns.b()} ${props.column.filterClassName}`;
      }
      return ns.b();
    });
    const filterValue = vue.computed({
      get: () => {
        var _a;
        return (((_a = props.column) == null ? void 0 : _a.filteredValue) || [])[0];
      },
      set: (value) => {
        if (filteredValue.value) {
          if (!types.isPropAbsent(value)) {
            filteredValue.value.splice(0, 1, value);
          } else {
            filteredValue.value.splice(0, 1);
          }
        }
      }
    });
    const filteredValue = vue.computed({
      get() {
        if (props.column) {
          return props.column.filteredValue || [];
        }
        return [];
      },
      set(value) {
        var _a;
        if (props.column) {
          (_a = props.upDataColumn) == null ? void 0 : _a.call(props, "filteredValue", value);
        }
      }
    });
    const multiple = vue.computed(() => {
      if (props.column) {
        return props.column.filterMultiple;
      }
      return true;
    });
    const isActive = (filter) => {
      return filter.value === filterValue.value;
    };
    const hidden = () => {
      var _a;
      (_a = tooltipRef.value) == null ? void 0 : _a.onClose();
    };
    const handleConfirm = () => {
      confirmFilter(filteredValue.value);
      hidden();
    };
    const handleReset = () => {
      filteredValue.value = [];
      confirmFilter(filteredValue.value);
      hidden();
    };
    const handleSelect = (_filterValue, index) => {
      filterValue.value = _filterValue;
      checkedIndex.value = index;
      if (!types.isPropAbsent(_filterValue)) {
        confirmFilter(filteredValue.value);
      } else {
        confirmFilter([]);
      }
      hidden();
    };
    const confirmFilter = (filteredValue2) => {
      var _a, _b;
      (_a = props.store) == null ? void 0 : _a.commit("filterChange", {
        column: props.column,
        values: filteredValue2
      });
      (_b = props.store) == null ? void 0 : _b.updateAllSelected();
    };
    const handleShowTooltip = () => {
      var _a, _b;
      (_a = rootRef.value) == null ? void 0 : _a.focus();
      !multiple.value && initCheckedIndex();
      if (props.column) {
        (_b = props.upDataColumn) == null ? void 0 : _b.call(props, "filterOpened", true);
      }
    };
    const handleHideTooltip = () => {
      var _a;
      if (props.column) {
        (_a = props.upDataColumn) == null ? void 0 : _a.call(props, "filterOpened", false);
      }
    };
    const initCheckedIndex = () => {
      if (types.isPropAbsent(filterValue)) {
        checkedIndex.value = 0;
        return;
      }
      const idx = (filters.value || []).findIndex((item) => {
        return item.value === filterValue.value;
      });
      checkedIndex.value = idx >= 0 ? idx + 1 : 0;
    };
    const handleKeydown = (event$1) => {
      var _a, _b;
      const code = event.getEventCode(event$1);
      const len = (filters.value ? filters.value.length : 0) + 1;
      let index = checkedIndex.value;
      let isPreventDefault = true;
      switch (code) {
        case aria.EVENT_CODE.down:
        case aria.EVENT_CODE.right:
          index = (index + 1) % len;
          break;
        case aria.EVENT_CODE.up:
        case aria.EVENT_CODE.left:
          index = (index - 1 + len) % len;
          break;
        case aria.EVENT_CODE.tab:
          hidden();
          isPreventDefault = false;
          break;
        case aria.EVENT_CODE.enter:
        case aria.EVENT_CODE.space:
          if (index === 0) {
            handleSelect(null, 0);
          } else {
            const item = (filters.value || [])[index - 1];
            item.value && handleSelect(item.value, index);
          }
          break;
        default:
          isPreventDefault = false;
          break;
      }
      isPreventDefault && event$1.preventDefault();
      checkedIndex.value = index;
      (_b = (_a = rootRef.value) == null ? void 0 : _a.querySelector(
        `.${ns.e("list-item")}:nth-child(${index + 1})`
      )) == null ? void 0 : _b.focus();
    };
    return {
      multiple,
      filterClassName,
      filteredValue,
      filterValue,
      filters,
      handleConfirm,
      handleReset,
      handleSelect,
      isPropAbsent: types.isPropAbsent,
      isActive,
      t,
      ns,
      tooltipRef,
      rootRef,
      checkedIndex,
      handleShowTooltip,
      handleHideTooltip,
      handleKeydown
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=filter-panel.vue2.js.map
