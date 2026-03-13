'use strict';

var content = require('../../popper/src/content.js');
var index$1 = require('../../../hooks/use-delayed-toggle/index.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var index = require('../../../hooks/use-aria/index.js');
var teleport = require('../../teleport/src/teleport.js');

const useTooltipContentPropsDefaults = {
  ...index$1.useDelayedTogglePropsDefaults,
  ...content.popperContentPropsDefaults,
  content: "",
  visible: null,
  teleported: true
};
const useTooltipContentProps = runtime.buildProps({
  ...index$1.useDelayedToggleProps,
  ...content.popperContentProps,
  /**
   * @description which element the tooltip CONTENT appends to
   */
  appendTo: {
    type: teleport.teleportProps.to.type
  },
  /**
   * @description display content, can be overridden by `slot#content`
   */
  content: {
    type: String,
    default: ""
  },
  /**
   * @description whether `content` is treated as HTML string
   */
  rawContent: Boolean,
  /**
   * @description when tooltip inactive and `persistent` is `false` , popconfirm will be destroyed
   */
  persistent: Boolean,
  // because model toggle prop is generated dynamically
  // so the typing cannot be evaluated by typescript as type:
  // [name]: { type: Boolean, default: null }
  // so we need to declare that again for type checking.
  /**
   * @description visibility of Tooltip
   */
  visible: {
    type: runtime.definePropType(Boolean),
    default: null
  },
  /**
   * @description animation name
   */
  transition: String,
  /**
   * @description whether tooltip content is teleported, if `true` it will be teleported to where `append-to` sets
   */
  teleported: {
    type: Boolean,
    default: true
  },
  /**
   * @description whether Tooltip is disabled
   */
  disabled: Boolean,
  ...index.useAriaProps(["ariaLabel"])
});

exports.useTooltipContentProps = useTooltipContentProps;
exports.useTooltipContentPropsDefaults = useTooltipContentPropsDefaults;
//# sourceMappingURL=content.js.map
