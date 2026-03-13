import { popperTriggerProps } from '../../popper/src/trigger.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';
import { EVENT_CODE } from '../../../constants/aria.mjs';

const useTooltipTriggerPropsDefaults = {
  trigger: "hover",
  triggerKeys: () => [
    EVENT_CODE.enter,
    EVENT_CODE.numpadEnter,
    EVENT_CODE.space
  ]
};
const useTooltipTriggerProps = buildProps({
  ...popperTriggerProps,
  /**
   * @description whether Tooltip is disabled
   */
  disabled: Boolean,
  /**
   * @description How should the tooltip be triggered (to show), not valid in controlled mode
   */
  trigger: {
    type: definePropType([String, Array]),
    default: "hover"
  },
  /**
   * @description When you click the mouse to focus on the trigger element, you can define a set of keyboard codes to control the display of tooltip through the keyboard, not valid in controlled mode
   */
  triggerKeys: {
    type: definePropType(Array),
    default: () => [EVENT_CODE.enter, EVENT_CODE.numpadEnter, EVENT_CODE.space]
  },
  /**
   * @description when triggering tooltips through hover, whether to focus the trigger element, which improves accessibility
   */
  focusOnTarget: Boolean
});

export { useTooltipTriggerProps, useTooltipTriggerPropsDefaults };
//# sourceMappingURL=trigger.mjs.map
