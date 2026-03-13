'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var shared = require('@vue/shared');

const menuItemProps = runtime.buildProps({
  /**
   * @description unique identification
   */
  index: {
    type: runtime.definePropType([String, null]),
    // will be required in the next major version
    // required: true,
    default: null
  },
  /**
   * @description Vue Router object
   */
  route: {
    type: runtime.definePropType([String, Object])
  },
  /**
   * @description whether disabled
   */
  disabled: Boolean
});
const menuItemEmits = {
  click: (item) => shared.isString(item.index) && shared.isArray(item.indexPath)
};

exports.menuItemEmits = menuItemEmits;
exports.menuItemProps = menuItemProps;
//# sourceMappingURL=menu-item.js.map
