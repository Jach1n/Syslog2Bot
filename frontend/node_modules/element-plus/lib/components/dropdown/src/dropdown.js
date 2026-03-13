'use strict';

var popper = require('../../popper/src/popper.js');
var trigger = require('../../tooltip/src/trigger.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var content = require('../../tooltip/src/content.js');
var aria = require('../../../constants/aria.js');
var icon = require('../../../utils/vue/icon.js');

const dropdownProps = runtime.buildProps({
  /**
   * @description how to trigger
   */
  trigger: {
    ...trigger.useTooltipTriggerProps.trigger,
    type: runtime.definePropType([
      String,
      Array
    ])
  },
  triggerKeys: {
    type: runtime.definePropType(Array),
    default: () => [
      aria.EVENT_CODE.enter,
      aria.EVENT_CODE.numpadEnter,
      aria.EVENT_CODE.space,
      aria.EVENT_CODE.down
    ]
  },
  /**
   * @description Indicates whether virtual triggering is enabled
   */
  virtualTriggering: trigger.useTooltipTriggerProps.virtualTriggering,
  /**
   * @description Indicates the reference element to which the dropdown is attached
   */
  virtualRef: trigger.useTooltipTriggerProps.virtualRef,
  /**
   * @description Tooltip theme, built-in theme: `dark` / `light`
   */
  effect: {
    ...content.useTooltipContentProps.effect,
    default: "light"
  },
  /**
   * @description menu button type, refer to `Button` Component, only works when `split-button` is true
   */
  type: {
    type: runtime.definePropType(String)
  },
  /**
   * @description placement of pop menu
   */
  placement: {
    type: runtime.definePropType(String),
    default: "bottom"
  },
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) parameters
   */
  popperOptions: {
    type: runtime.definePropType(Object),
    default: () => ({})
  },
  id: String,
  /**
   * @description menu size, also works on the split button
   */
  size: {
    type: String,
    default: ""
  },
  /**
   * @description whether a button group is displayed
   */
  splitButton: Boolean,
  /**
   * @description whether to hide menu after clicking menu-item
   */
  hideOnClick: {
    type: Boolean,
    default: true
  },
  loop: {
    type: Boolean,
    default: true
  },
  /**
   * @description whether the tooltip content has an arrow
   */
  showArrow: {
    type: Boolean,
    default: true
  },
  /**
   * @description delay time before show a dropdown (only works when trigger is `hover`)
   */
  showTimeout: {
    type: Number,
    default: 150
  },
  /**
   * @description delay time before hide a dropdown (only works when trigger is `hover`)
   */
  hideTimeout: {
    type: Number,
    default: 150
  },
  /**
   * @description [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of Dropdown
   */
  tabindex: {
    type: runtime.definePropType([Number, String]),
    default: 0
  },
  /**
   * @description the max height of menu
   */
  maxHeight: {
    type: runtime.definePropType([Number, String]),
    default: ""
  },
  /**
   * @description custom class name for Dropdown's dropdown
   */
  popperClass: content.useTooltipContentProps.popperClass,
  /**
   * @description custom style for Dropdown's dropdown
   */
  popperStyle: content.useTooltipContentProps.popperStyle,
  /**
   * @description whether to disable
   */
  disabled: Boolean,
  /**
   * @description the ARIA role attribute for the dropdown menu. Depending on the use case, you may want to change this to 'navigation'
   */
  role: {
    type: String,
    values: popper.roleTypes,
    default: "menu"
  },
  buttonProps: {
    type: runtime.definePropType(Object)
  },
  /**
   * @description whether the dropdown popup is teleported to the body
   */
  teleported: content.useTooltipContentProps.teleported,
  /**
   * @description which element the dropdown CONTENT appends to
   */
  appendTo: content.useTooltipContentProps.appendTo,
  /**
   * @description when dropdown inactive and `persistent` is `false` , dropdown menu will be destroyed
   */
  persistent: {
    type: Boolean,
    default: true
  }
});
const dropdownItemProps = runtime.buildProps({
  /**
   * @description a command to be dispatched to Dropdown's `command` callback
   */
  command: {
    type: [Object, String, Number],
    default: () => ({})
  },
  /**
   * @description whether the item is disabled
   */
  disabled: Boolean,
  /**
   * @description whether a divider is displayed
   */
  divided: Boolean,
  textValue: String,
  /**
   * @description custom icon
   */
  icon: {
    type: icon.iconPropType
  }
});
const dropdownMenuProps = runtime.buildProps({
  onKeydown: { type: runtime.definePropType(Function) }
});
const FIRST_KEYS = [
  aria.EVENT_CODE.down,
  aria.EVENT_CODE.pageDown,
  aria.EVENT_CODE.home
];
const LAST_KEYS = [aria.EVENT_CODE.up, aria.EVENT_CODE.pageUp, aria.EVENT_CODE.end];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];

exports.FIRST_KEYS = FIRST_KEYS;
exports.FIRST_LAST_KEYS = FIRST_LAST_KEYS;
exports.LAST_KEYS = LAST_KEYS;
exports.dropdownItemProps = dropdownItemProps;
exports.dropdownMenuProps = dropdownMenuProps;
exports.dropdownProps = dropdownProps;
//# sourceMappingURL=dropdown.js.map
