'use strict';

var tag = require('../../tag/src/tag.js');
var iconsVue = require('@element-plus/icons-vue');
var runtime = require('../../../utils/vue/props/runtime.js');
var icon = require('../../../utils/vue/icon.js');
var index = require('../../../hooks/use-size/index.js');
var aria = require('../../../constants/aria.js');
var types = require('../../../utils/types.js');
var shared = require('@vue/shared');
var event = require('../../../constants/event.js');

const inputTagProps = runtime.buildProps({
  /**
   * @description binding value
   */
  modelValue: {
    type: runtime.definePropType(Array)
  },
  /**
   * @description max number tags that can be enter
   */
  max: Number,
  /**
   * @description tag type
   */
  tagType: { ...tag.tagProps.type, default: "info" },
  /**
   * @description tag effect
   */
  tagEffect: tag.tagProps.effect,
  /**
   * @description tooltip theme, built-in theme: `dark` / `light`
   */
  effect: {
    type: runtime.definePropType(String),
    default: "light"
  },
  /**
   * @description the key to trigger input tag
   */
  trigger: {
    type: runtime.definePropType(String),
    default: aria.EVENT_CODE.enter
  },
  /**
   * @description whether tags can be dragged
   */
  draggable: Boolean,
  /**
   * @description add a tag when a delimiter is matched
   */
  delimiter: {
    type: [String, RegExp],
    default: ""
  },
  /**
   * @description input box size
   */
  size: index.useSizeProp,
  /**
   * @description whether to show clear button
   */
  clearable: Boolean,
  /**
   * @description custom clear icon component
   */
  clearIcon: {
    type: icon.iconPropType,
    default: iconsVue.CircleClose
  },
  /**
   * @description whether to disable input-tag
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true
  },
  /**
   * @description native input readonly
   */
  readonly: Boolean,
  /**
   * @description native input autofocus
   */
  autofocus: Boolean,
  /**
   * @description same as `id` in native input
   */
  id: {
    type: String,
    default: void 0
  },
  /**
   * @description same as `tabindex` in native input
   */
  tabindex: {
    type: [String, Number],
    default: 0
  },
  /**
   * @description same as `maxlength` in native input
   */
  maxlength: {
    type: [String, Number]
  },
  /**
   * @description same as `minlength` in native input
   */
  minlength: {
    type: [String, Number]
  },
  /**
   * @description placeholder of input
   */
  placeholder: String,
  /**
   * @description native input autocomplete
   */
  autocomplete: {
    type: runtime.definePropType(String),
    default: "off"
  },
  /**
   * @description whether to save the input value when the input loses focus
   */
  saveOnBlur: {
    type: Boolean,
    default: true
  },
  /**
   * @description whether to collapse tags to a text
   */
  collapseTags: Boolean,
  /**
   * @description whether show all selected tags when mouse hover text of collapse-tags. To use this, `collapse-tags` must be true
   */
  collapseTagsTooltip: Boolean,
  /**
   * @description the max tags number to be shown. To use this, `collapse-tags` must be true
   */
  maxCollapseTags: {
    type: Number,
    default: 1
  },
  /**
   * @description native `aria-label` attribute
   */
  ariaLabel: String
});
const inputTagEmits = {
  [event.UPDATE_MODEL_EVENT]: (value) => shared.isArray(value) || types.isUndefined(value),
  [event.CHANGE_EVENT]: (value) => shared.isArray(value) || types.isUndefined(value),
  [event.INPUT_EVENT]: (value) => shared.isString(value),
  "add-tag": (value) => shared.isString(value) || shared.isArray(value),
  "remove-tag": (value, index) => shared.isString(value) && types.isNumber(index),
  "drag-tag": (oldIndex, newIndex, value) => types.isNumber(oldIndex) && types.isNumber(newIndex) && shared.isString(value),
  focus: (evt) => evt instanceof FocusEvent,
  blur: (evt) => evt instanceof FocusEvent,
  clear: () => true
};

exports.inputTagEmits = inputTagEmits;
exports.inputTagProps = inputTagProps;
//# sourceMappingURL=input-tag.js.map
