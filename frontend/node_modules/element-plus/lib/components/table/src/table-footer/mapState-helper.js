'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var tokens = require('../tokens.js');

function useMapState() {
  const table = vue.inject(tokens.TABLE_INJECTION_KEY);
  const store = table == null ? void 0 : table.store;
  const leftFixedLeafCount = vue.computed(() => {
    var _a;
    return (_a = store == null ? void 0 : store.states.fixedLeafColumnsLength.value) != null ? _a : 0;
  });
  const rightFixedLeafCount = vue.computed(() => {
    var _a;
    return (_a = store == null ? void 0 : store.states.rightFixedColumns.value.length) != null ? _a : 0;
  });
  const columnsCount = vue.computed(() => {
    var _a;
    return (_a = store == null ? void 0 : store.states.columns.value.length) != null ? _a : 0;
  });
  const leftFixedCount = vue.computed(() => {
    var _a;
    return (_a = store == null ? void 0 : store.states.fixedColumns.value.length) != null ? _a : 0;
  });
  const rightFixedCount = vue.computed(() => {
    var _a;
    return (_a = store == null ? void 0 : store.states.rightFixedColumns.value.length) != null ? _a : 0;
  });
  return {
    leftFixedLeafCount,
    rightFixedLeafCount,
    columnsCount,
    leftFixedCount,
    rightFixedCount,
    columns: vue.computed(() => {
      var _a;
      return (_a = store == null ? void 0 : store.states.columns.value) != null ? _a : [];
    })
  };
}

exports.default = useMapState;
//# sourceMappingURL=mapState-helper.js.map
