'use strict';

var lodashUnified = require('lodash-unified');
var runtime = require('../../../utils/vue/props/runtime.js');
var typescript = require('../../../utils/typescript.js');
var shared = require('@vue/shared');
var event = require('../../../constants/event.js');

const LEFT_CHECK_CHANGE_EVENT = "left-check-change";
const RIGHT_CHECK_CHANGE_EVENT = "right-check-change";
const transferProps = runtime.buildProps({
  /**
   * @description data source
   */
  data: {
    type: runtime.definePropType(Array),
    default: () => []
  },
  /**
   * @description custom list titles
   */
  titles: {
    type: runtime.definePropType(Array),
    default: () => []
  },
  /**
   * @description custom button texts
   */
  buttonTexts: {
    type: runtime.definePropType(Array),
    default: () => []
  },
  /**
   * @description placeholder for the filter input
   */
  filterPlaceholder: String,
  /**
   * @description custom filter method
   */
  filterMethod: {
    type: runtime.definePropType(
      Function
    )
  },
  /**
   * @description key array of initially checked data items of the left list
   */
  leftDefaultChecked: {
    type: runtime.definePropType(Array),
    default: () => []
  },
  /**
   * @description key array of initially checked data items of the right list
   */
  rightDefaultChecked: {
    type: runtime.definePropType(Array),
    default: () => []
  },
  /**
   * @description custom render function for data items
   */
  renderContent: {
    type: runtime.definePropType(Function)
  },
  /**
   * @description binding value
   */
  modelValue: {
    type: runtime.definePropType(Array),
    default: () => []
  },
  /**
   * @description texts for checking status in list header
   */
  format: {
    type: runtime.definePropType(Object),
    default: () => ({})
  },
  /**
   * @description whether Transfer is filterable
   */
  filterable: Boolean,
  /**
   * @description prop aliases for data source
   */
  props: {
    type: runtime.definePropType(Object),
    default: () => typescript.mutable({
      label: "label",
      key: "key",
      disabled: "disabled"
    })
  },
  /**
   * @description order strategy for elements in the target list. If set to `original`, the elements will keep the same order as the data source. If set to `push`, the newly added elements will be pushed to the bottom. If set to `unshift`, the newly added elements will be inserted on the top
   */
  targetOrder: {
    type: String,
    values: ["original", "push", "unshift"],
    default: "original"
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true
  }
});
const transferCheckedChangeFn = (value, movedKeys) => [value, movedKeys].every(shared.isArray) || shared.isArray(value) && lodashUnified.isNil(movedKeys);
const transferEmits = {
  [event.CHANGE_EVENT]: (value, direction, movedKeys) => [value, movedKeys].every(shared.isArray) && ["left", "right"].includes(direction),
  [event.UPDATE_MODEL_EVENT]: (value) => shared.isArray(value),
  [LEFT_CHECK_CHANGE_EVENT]: transferCheckedChangeFn,
  [RIGHT_CHECK_CHANGE_EVENT]: transferCheckedChangeFn
};

exports.LEFT_CHECK_CHANGE_EVENT = LEFT_CHECK_CHANGE_EVENT;
exports.RIGHT_CHECK_CHANGE_EVENT = RIGHT_CHECK_CHANGE_EVENT;
exports.transferCheckedChangeFn = transferCheckedChangeFn;
exports.transferEmits = transferEmits;
exports.transferProps = transferProps;
//# sourceMappingURL=transfer.js.map
