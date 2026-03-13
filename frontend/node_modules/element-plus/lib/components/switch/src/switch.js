'use strict';

var validator = require('../../../utils/vue/validator.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var index = require('../../../hooks/use-aria/index.js');
var icon = require('../../../utils/vue/icon.js');
var types = require('../../../utils/types.js');
var shared = require('@vue/shared');
var event = require('../../../constants/event.js');

const switchProps = runtime.buildProps({
  /**
   * @description binding value, it should be equivalent to either `active-value` or `inactive-value`, by default it's `boolean` type
   */
  modelValue: {
    type: [Boolean, String, Number],
    default: false
  },
  /**
   * @description whether Switch is disabled
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description whether Switch is in loading state
   */
  loading: Boolean,
  /**
   * @description size of Switch
   */
  size: {
    type: String,
    validator: validator.isValidComponentSize
  },
  /**
   * @description width of Switch
   */
  width: {
    type: [String, Number],
    default: ""
  },
  /**
   * @description whether icon or text is displayed inside dot, only the first character will be rendered for text
   */
  inlinePrompt: Boolean,
  /**
   * @description component of the icon displayed in action when in `off` state
   */
  inactiveActionIcon: {
    type: icon.iconPropType
  },
  /**
   * @description component of the icon displayed in action when in `on` state
   */
  activeActionIcon: {
    type: icon.iconPropType
  },
  /**
   * @description component of the icon displayed when in `on` state, overrides `active-text`
   */
  activeIcon: {
    type: icon.iconPropType
  },
  /**
   * @description component of the icon displayed when in `off` state, overrides `inactive-text`
   */
  inactiveIcon: {
    type: icon.iconPropType
  },
  /**
   * @description text displayed when in `on` state
   */
  activeText: {
    type: String,
    default: ""
  },
  /**
   * @description text displayed when in `off` state
   */
  inactiveText: {
    type: String,
    default: ""
  },
  /**
   * @description switch value when in `on` state
   */
  activeValue: {
    type: [Boolean, String, Number],
    default: true
  },
  /**
   * @description switch value when in `off` state
   */
  inactiveValue: {
    type: [Boolean, String, Number],
    default: false
  },
  /**
   * @description input name of Switch
   */
  name: {
    type: String,
    default: ""
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true
  },
  /**
   * @description before-change hook before the switch state changes. If `false` is returned or a `Promise` is returned and then is rejected, will stop switching
   */
  beforeChange: {
    type: runtime.definePropType(Function)
  },
  /**
   * @description id for input
   */
  id: String,
  /**
   * @description tabindex for input
   */
  tabindex: {
    type: [String, Number]
  },
  ...index.useAriaProps(["ariaLabel"])
});
const switchEmits = {
  [event.UPDATE_MODEL_EVENT]: (val) => types.isBoolean(val) || shared.isString(val) || types.isNumber(val),
  [event.CHANGE_EVENT]: (val) => types.isBoolean(val) || shared.isString(val) || types.isNumber(val),
  [event.INPUT_EVENT]: (val) => types.isBoolean(val) || shared.isString(val) || types.isNumber(val)
};

exports.switchEmits = switchEmits;
exports.switchProps = switchProps;
//# sourceMappingURL=switch.js.map
