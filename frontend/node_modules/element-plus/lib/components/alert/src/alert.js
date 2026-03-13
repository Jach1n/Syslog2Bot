'use strict';

var icon = require('../../../utils/vue/icon.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var objects = require('../../../utils/objects.js');

const alertEffects = ["light", "dark"];
const alertProps = runtime.buildProps({
  /**
   * @description alert title.
   */
  title: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  /**
   * @description alert type.
   */
  type: {
    type: String,
    values: objects.keysOf(icon.TypeComponentsMap),
    default: "info"
  },
  /**
   * @description whether alert can be dismissed.
   */
  closable: {
    type: Boolean,
    default: true
  },
  /**
   * @description text for replacing x button
   */
  closeText: {
    type: String,
    default: ""
  },
  /**
   * @description whether show icon
   */
  showIcon: Boolean,
  /**
   * @description should content be placed in center.
   */
  center: Boolean,
  effect: {
    type: String,
    values: alertEffects,
    default: "light"
  }
});
const alertEmits = {
  close: (evt) => evt instanceof MouseEvent
};

exports.alertEffects = alertEffects;
exports.alertEmits = alertEmits;
exports.alertProps = alertProps;
//# sourceMappingURL=alert.js.map
