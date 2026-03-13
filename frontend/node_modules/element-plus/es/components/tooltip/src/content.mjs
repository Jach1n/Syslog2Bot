import { popperContentProps, popperContentPropsDefaults } from '../../popper/src/content.mjs';
import { useDelayedToggleProps, useDelayedTogglePropsDefaults } from '../../../hooks/use-delayed-toggle/index.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';
import { useAriaProps } from '../../../hooks/use-aria/index.mjs';
import { teleportProps } from '../../teleport/src/teleport.mjs';

const useTooltipContentPropsDefaults = {
  ...useDelayedTogglePropsDefaults,
  ...popperContentPropsDefaults,
  content: "",
  visible: null,
  teleported: true
};
const useTooltipContentProps = buildProps({
  ...useDelayedToggleProps,
  ...popperContentProps,
  /**
   * @description which element the tooltip CONTENT appends to
   */
  appendTo: {
    type: teleportProps.to.type
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
    type: definePropType(Boolean),
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
  ...useAriaProps(["ariaLabel"])
});

export { useTooltipContentProps, useTooltipContentPropsDefaults };
//# sourceMappingURL=content.mjs.map
