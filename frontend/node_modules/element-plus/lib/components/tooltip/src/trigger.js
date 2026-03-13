'use strict';

var trigger = require('../../popper/src/trigger.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var aria = require('../../../constants/aria.js');

const useTooltipTriggerPropsDefaults = {
  trigger: "hover",
  triggerKeys: () => [
    aria.EVENT_CODE.enter,
    aria.EVENT_CODE.numpadEnter,
    aria.EVENT_CODE.space
  ]
};
const useTooltipTriggerProps = runtime.buildProps({
  ...trigger.popperTriggerProps,
  /**
   * @description whether Tooltip is disabled
   */
  disabled: Boolean,
  /**
   * @description How should the tooltip be triggered (to show), not valid in controlled mode
   */
  trigger: {
    type: runtime.definePropType([String, Array]),
    default: "hover"
  },
  /**
   * @description When you click the mouse to focus on the trigger element, you can define a set of keyboard codes to control the display of tooltip through the keyboard, not valid in controlled mode
   */
  triggerKeys: {
    type: runtime.definePropType(Array),
    default: () => [aria.EVENT_CODE.enter, aria.EVENT_CODE.numpadEnter, aria.EVENT_CODE.space]
  },
  /**
   * @description when triggering tooltips through hover, whether to focus the trigger element, which improves accessibility
   */
  focusOnTarget: Boolean
});

exports.useTooltipTriggerProps = useTooltipTriggerProps;
exports.useTooltipTriggerPropsDefaults = useTooltipTriggerPropsDefaults;
//# sourceMappingURL=trigger.js.map
