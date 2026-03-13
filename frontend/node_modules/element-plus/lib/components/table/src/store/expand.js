'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var util = require('../util.js');

function useExpand(watcherData) {
  const instance = vue.getCurrentInstance();
  const defaultExpandAll = vue.ref(false);
  const expandRows = vue.ref([]);
  const canRowExpand = (row, index) => {
    var _a;
    const expandableFn = instance.store.states.rowExpandable.value;
    return (_a = expandableFn == null ? void 0 : expandableFn(row, index)) != null ? _a : true;
  };
  const updateExpandRows = () => {
    const data = watcherData.data.value || [];
    const rowKey = watcherData.rowKey.value;
    if (defaultExpandAll.value) {
      expandRows.value = instance.store.states.rowExpandable.value ? data.filter(canRowExpand) : data.slice();
    } else if (rowKey) {
      const expandRowsMap = util.getKeysMap(expandRows.value, rowKey);
      expandRows.value = data.filter((row, index) => {
        const rowId = util.getRowIdentity(row, rowKey);
        return !!expandRowsMap[rowId] && canRowExpand(row, index);
      });
    } else {
      expandRows.value = [];
    }
  };
  const toggleRowExpansion = (row, expanded) => {
    const dataArr = watcherData.data.value || [];
    const rowIndex = dataArr.indexOf(row);
    if (rowIndex > -1 && !canRowExpand(row, rowIndex)) return;
    const changed = util.toggleRowStatus(
      expandRows.value,
      row,
      expanded,
      void 0,
      void 0,
      void 0,
      watcherData.rowKey.value
    );
    if (changed) {
      instance.emit("expand-change", row, expandRows.value.slice());
    }
  };
  const setExpandRowKeys = (rowKeys) => {
    instance.store.assertRowKey();
    const data = watcherData.data.value || [];
    const rowKey = watcherData.rowKey.value;
    const keysMap = util.getKeysMap(data, rowKey);
    expandRows.value = rowKeys.reduce((prev, cur) => {
      const info = keysMap[cur];
      if (info && canRowExpand(info.row, info.index)) {
        prev.push(info.row);
      }
      return prev;
    }, []);
  };
  const isRowExpanded = (row) => {
    const rowKey = watcherData.rowKey.value;
    if (rowKey) {
      const expandMap = util.getKeysMap(expandRows.value, rowKey);
      return !!expandMap[util.getRowIdentity(row, rowKey)];
    }
    return expandRows.value.includes(row);
  };
  return {
    updateExpandRows,
    toggleRowExpansion,
    setExpandRowKeys,
    isRowExpanded,
    states: {
      expandRows,
      defaultExpandAll
    }
  };
}

exports.default = useExpand;
//# sourceMappingURL=expand.js.map
