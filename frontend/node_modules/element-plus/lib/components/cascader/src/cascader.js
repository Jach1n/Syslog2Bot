'use strict';

var core = require('@popperjs/core');
var iconsVue = require('@element-plus/icons-vue');
var config = require('../../cascader-panel/src/config.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var index = require('../../../hooks/use-empty-values/index.js');
var tag = require('../../tag/src/tag.js');
var content = require('../../tooltip/src/content.js');
var icon = require('../../../utils/vue/icon.js');
var index$1 = require('../../../hooks/use-size/index.js');
var types = require('../../../utils/types.js');
var event = require('../../../constants/event.js');

const cascaderProps = runtime.buildProps({
  ...config.CommonProps,
  /**
   * @description size of input
   */
  size: index$1.useSizeProp,
  /**
   * @description placeholder of input
   */
  placeholder: String,
  /**
   * @description whether Cascader is disabled
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description whether selected value can be cleared
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
   * @description whether the options can be searched
   */
  filterable: Boolean,
  /**
   * @description customize search logic, the first parameter is `node`, the second is `keyword`, and need return a boolean value indicating whether it hits.
   */
  filterMethod: {
    type: runtime.definePropType(
      Function
    ),
    default: (node, keyword) => node.text.includes(keyword)
  },
  /**
   * @description option label separator
   */
  separator: {
    type: String,
    default: " / "
  },
  /**
   * @description whether to display all levels of the selected value in the input
   */
  showAllLevels: {
    type: Boolean,
    default: true
  },
  /**
   * @description whether to collapse tags in multiple selection mode
   */
  collapseTags: Boolean,
  /**
   * @description The max tags number to be shown. To use this, collapse-tags must be true
   */
  maxCollapseTags: {
    type: Number,
    default: 1
  },
  /**
   * @description whether show all selected tags when mouse hover text of collapse-tags. To use this, collapse-tags must be true
   */
  collapseTagsTooltip: Boolean,
  /**
   * @description The max height of collapse tags tooltip, in pixels. To use this, collapse-tags-tooltip must be true
   */
  maxCollapseTagsTooltipHeight: {
    type: [String, Number]
  },
  /**
   * @description debounce delay when typing filter keyword, in milliseconds
   */
  debounce: {
    type: Number,
    default: 300
  },
  /**
   * @description hook function before filtering with the value to be filtered as its parameter. If `false` is returned or a `Promise` is returned and then is rejected, filtering will be aborted
   */
  beforeFilter: {
    type: runtime.definePropType(Function),
    default: () => true
  },
  /**
   * @description position of dropdown
   */
  placement: {
    type: runtime.definePropType(String),
    values: core.placements,
    default: "bottom-start"
  },
  /**
   * @description list of possible positions for dropdown
   */
  fallbackPlacements: {
    type: runtime.definePropType(Array),
    default: ["bottom-start", "bottom", "top-start", "top", "right", "left"]
  },
  /**
   * @description custom class name for Cascader's dropdown
   */
  popperClass: content.useTooltipContentProps.popperClass,
  /**
   * @description custom style for Cascader's dropdown
   */
  popperStyle: content.useTooltipContentProps.popperStyle,
  /**
   * @description whether cascader popup is teleported
   */
  teleported: content.useTooltipContentProps.teleported,
  /**
   * @description tooltip theme, built-in theme: `dark` / `light`
   */
  effect: {
    type: runtime.definePropType(String),
    default: "light"
  },
  /**
   * @description tag type
   */
  tagType: { ...tag.tagProps.type, default: "info" },
  /**
   * @description tag effect
   */
  tagEffect: { ...tag.tagProps.effect, default: "light" },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true
  },
  /**
   * @description when dropdown is inactive and `persistent` is `false`, dropdown will be destroyed
   */
  persistent: {
    type: Boolean,
    default: true
  },
  /**
   * @description Use `parent` when you want things tidy (like "Entire Collection" instead of listing 100 items)
   * Use `child` when every single item matters (like important settings)
   */
  showCheckedStrategy: {
    type: String,
    values: ["parent", "child"],
    default: "child"
  },
  /**
   * @description whether to check or uncheck node when clicking on the node
   */
  checkOnClickNode: Boolean,
  /**
   * @description whether to show the radio or checkbox prefix
   */
  showPrefix: {
    type: Boolean,
    default: true
  },
  ...index.useEmptyValuesProps
});
const emitChangeFn = (value) => true;
const cascaderEmits = {
  [event.UPDATE_MODEL_EVENT]: emitChangeFn,
  [event.CHANGE_EVENT]: emitChangeFn,
  focus: (evt) => evt instanceof FocusEvent,
  blur: (evt) => evt instanceof FocusEvent,
  clear: () => true,
  visibleChange: (val) => types.isBoolean(val),
  expandChange: (val) => !!val,
  removeTag: (val) => !!val
};

exports.cascaderEmits = cascaderEmits;
exports.cascaderProps = cascaderProps;
//# sourceMappingURL=cascader.js.map
