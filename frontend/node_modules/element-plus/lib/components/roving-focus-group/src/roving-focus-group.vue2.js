'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var rovingFocusGroupImpl = require('./roving-focus-group-impl.vue.js');
var rovingFocusGroup = require('./roving-focus-group.js');

var _sfc_main = vue.defineComponent({
  name: "ElRovingFocusGroup",
  components: {
    ElFocusGroupCollection: rovingFocusGroup.ElCollection,
    ElRovingFocusGroupImpl: rovingFocusGroupImpl.default
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=roving-focus-group.vue2.js.map
