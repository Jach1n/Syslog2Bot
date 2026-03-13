'use strict';

var content = require('./content.js');
var trigger = require('./trigger.js');
var arrow = require('../../popper/src/arrow.js');
var index = require('../../../hooks/use-model-toggle/index.js');
var popper = require('../../popper/src/popper.js');
var runtime = require('../../../utils/vue/props/runtime.js');

const {
  useModelToggleProps: useTooltipModelToggleProps,
  useModelToggleEmits: useTooltipModelToggleEmits,
  useModelToggle: useTooltipModelToggle
} = index.createModelToggleComposable("visible");
const useTooltipProps = runtime.buildProps({
  ...popper.popperProps,
  ...useTooltipModelToggleProps,
  ...content.useTooltipContentProps,
  ...trigger.useTooltipTriggerProps,
  ...arrow.popperArrowProps,
  /**
   * @description whether the tooltip content has an arrow
   */
  showArrow: {
    type: Boolean,
    default: true
  }
});
const tooltipEmits = [
  ...useTooltipModelToggleEmits,
  "before-show",
  "before-hide",
  "show",
  "hide",
  "open",
  "close"
];

exports.tooltipEmits = tooltipEmits;
exports.useTooltipModelToggle = useTooltipModelToggle;
exports.useTooltipModelToggleEmits = useTooltipModelToggleEmits;
exports.useTooltipModelToggleProps = useTooltipModelToggleProps;
exports.useTooltipProps = useTooltipProps;
//# sourceMappingURL=tooltip.js.map
