'use strict';

var content = require('../../tooltip/src/content.js');
var input = require('../../input/src/input.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var shared = require('@vue/shared');
var types = require('../../../utils/types.js');
var event = require('../../../constants/event.js');

const autocompleteProps = runtime.buildProps({
  ...input.inputProps,
  /**
   * @description key name of the input suggestion object for display
   */
  valueKey: {
    type: String,
    default: "value"
  },
  /**
   * @description binding value
   */
  modelValue: {
    type: [String, Number],
    default: ""
  },
  /**
   * @description debounce delay when typing, in milliseconds
   */
  debounce: {
    type: Number,
    default: 300
  },
  /**
   * @description placement of the popup menu
   */
  placement: {
    type: runtime.definePropType(String),
    values: [
      "top",
      "top-start",
      "top-end",
      "bottom",
      "bottom-start",
      "bottom-end"
    ],
    default: "bottom-start"
  },
  /**
   * @description a method to fetch input suggestions. When suggestions are ready, invoke `callback(data:[])` to return them to Autocomplete
   */
  fetchSuggestions: {
    type: runtime.definePropType([Function, Array]),
    default: shared.NOOP
  },
  /**
   * @description custom class name for autocomplete's dropdown
   */
  popperClass: content.useTooltipContentProps.popperClass,
  /**
   * @description custom style for autocomplete's dropdown
   */
  popperStyle: content.useTooltipContentProps.popperStyle,
  /**
   * @description whether show suggestions when input focus
   */
  triggerOnFocus: {
    type: Boolean,
    default: true
  },
  /**
   * @description whether to emit a `select` event on enter when there is no autocomplete match
   */
  selectWhenUnmatched: Boolean,
  /**
   * @description whether to hide the loading icon in remote search
   */
  hideLoading: Boolean,
  /**
   * @description whether select dropdown is teleported to the body
   */
  teleported: content.useTooltipContentProps.teleported,
  /**
   * @description which select dropdown appends to
   */
  appendTo: content.useTooltipContentProps.appendTo,
  /**
   * @description whether to highlight first item in remote search suggestions by default
   */
  highlightFirstItem: Boolean,
  /**
   * @description whether the width of the dropdown is the same as the input
   */
  fitInputWidth: Boolean,
  /**
   * @description whether keyboard navigation loops from end to start
   */
  loopNavigation: {
    type: Boolean,
    default: true
  }
});
const autocompleteEmits = {
  [event.UPDATE_MODEL_EVENT]: (value) => shared.isString(value) || types.isNumber(value),
  [event.INPUT_EVENT]: (value) => shared.isString(value) || types.isNumber(value),
  [event.CHANGE_EVENT]: (value) => shared.isString(value) || types.isNumber(value),
  focus: (evt) => evt instanceof FocusEvent,
  blur: (evt) => evt instanceof FocusEvent,
  clear: () => true,
  select: (item) => shared.isObject(item)
};

exports.autocompleteEmits = autocompleteEmits;
exports.autocompleteProps = autocompleteProps;
//# sourceMappingURL=autocomplete.js.map
