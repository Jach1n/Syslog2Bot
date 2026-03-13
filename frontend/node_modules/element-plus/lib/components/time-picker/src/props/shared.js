'use strict';

var runtime = require('../../../../utils/vue/props/runtime.js');

const disabledTimeListsProps = runtime.buildProps({
  /**
   * @description To specify the array of hours that cannot be selected
   */
  disabledHours: {
    type: runtime.definePropType(Function)
  },
  /**
   * @description To specify the array of minutes that cannot be selected
   */
  disabledMinutes: {
    type: runtime.definePropType(Function)
  },
  /**
   * @description To specify the array of seconds that cannot be selected
   */
  disabledSeconds: {
    type: runtime.definePropType(Function)
  }
});
const timePanelSharedProps = runtime.buildProps({
  visible: Boolean,
  actualVisible: {
    type: Boolean,
    default: void 0
  },
  format: {
    type: String,
    default: ""
  }
});

exports.disabledTimeListsProps = disabledTimeListsProps;
exports.timePanelSharedProps = timePanelSharedProps;
//# sourceMappingURL=shared.js.map
