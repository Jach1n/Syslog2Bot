'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var util = require('../util.js');

function useCurrent(watcherData) {
  const instance = vue.getCurrentInstance();
  const _currentRowKey = vue.ref(null);
  const currentRow = vue.ref(null);
  const setCurrentRowKey = (key) => {
    instance.store.assertRowKey();
    _currentRowKey.value = key;
    setCurrentRowByKey(key);
  };
  const restoreCurrentRowKey = () => {
    _currentRowKey.value = null;
  };
  const setCurrentRowByKey = (key) => {
    var _a;
    const { data, rowKey } = watcherData;
    const oldCurrentRow = currentRow.value;
    let _currentRow = null;
    if (rowKey.value) {
      _currentRow = (_a = (vue.unref(data) || []).find(
        (item) => util.getRowIdentity(item, rowKey.value) === key
      )) != null ? _a : null;
    }
    currentRow.value = _currentRow != null ? _currentRow : null;
    instance.emit("current-change", currentRow.value, oldCurrentRow);
  };
  const updateCurrentRow = (_currentRow) => {
    const oldCurrentRow = currentRow.value;
    if (_currentRow && _currentRow !== oldCurrentRow) {
      currentRow.value = _currentRow;
      instance.emit("current-change", currentRow.value, oldCurrentRow);
      return;
    }
    if (!_currentRow && oldCurrentRow) {
      currentRow.value = null;
      instance.emit("current-change", null, oldCurrentRow);
    }
  };
  const updateCurrentRowData = () => {
    const rowKey = watcherData.rowKey.value;
    const data = watcherData.data.value || [];
    const oldCurrentRow = currentRow.value;
    if (oldCurrentRow && !data.includes(oldCurrentRow)) {
      if (rowKey) {
        const currentRowKey = util.getRowIdentity(oldCurrentRow, rowKey);
        setCurrentRowByKey(currentRowKey);
      } else {
        currentRow.value = null;
        instance.emit("current-change", null, oldCurrentRow);
      }
    } else if (_currentRowKey.value) {
      setCurrentRowByKey(_currentRowKey.value);
      restoreCurrentRowKey();
    }
  };
  return {
    setCurrentRowKey,
    restoreCurrentRowKey,
    setCurrentRowByKey,
    updateCurrentRow,
    updateCurrentRowData,
    states: {
      _currentRowKey,
      currentRow
    }
  };
}

exports.default = useCurrent;
//# sourceMappingURL=current.js.map
