import { getCurrentInstance, ref } from 'vue';
import { getKeysMap, getRowIdentity, toggleRowStatus } from '../util.mjs';

function useExpand(watcherData) {
  const instance = getCurrentInstance();
  const defaultExpandAll = ref(false);
  const expandRows = ref([]);
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
      const expandRowsMap = getKeysMap(expandRows.value, rowKey);
      expandRows.value = data.filter((row, index) => {
        const rowId = getRowIdentity(row, rowKey);
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
    const changed = toggleRowStatus(
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
    const keysMap = getKeysMap(data, rowKey);
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
      const expandMap = getKeysMap(expandRows.value, rowKey);
      return !!expandMap[getRowIdentity(row, rowKey)];
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

export { useExpand as default };
//# sourceMappingURL=expand.mjs.map
