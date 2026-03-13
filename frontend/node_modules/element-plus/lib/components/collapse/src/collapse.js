'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var typescript = require('../../../utils/typescript.js');
var types = require('../../../utils/types.js');
var shared = require('@vue/shared');
var event = require('../../../constants/event.js');

const emitChangeFn = (value) => types.isNumber(value) || shared.isString(value) || shared.isArray(value);
const collapseProps = runtime.buildProps({
  /**
   * @description whether to activate accordion mode
   */
  accordion: Boolean,
  /**
   * @description currently active panel, the type is `string` in accordion mode, otherwise it is `array`
   */
  modelValue: {
    type: runtime.definePropType([Array, String, Number]),
    default: () => typescript.mutable([])
  },
  /**
   * @description set expand icon position
   */
  expandIconPosition: {
    type: runtime.definePropType([String]),
    default: "right"
  },
  /**
   * @description before-collapse hook before the collapse state changes. If `false` is returned or a `Promise` is returned and then is rejected, will stop collapsing
   */
  beforeCollapse: {
    type: runtime.definePropType(
      Function
    )
  }
});
const collapseEmits = {
  [event.UPDATE_MODEL_EVENT]: emitChangeFn,
  [event.CHANGE_EVENT]: emitChangeFn
};

exports.collapseEmits = collapseEmits;
exports.collapseProps = collapseProps;
exports.emitChangeFn = emitChangeFn;
//# sourceMappingURL=collapse.js.map
