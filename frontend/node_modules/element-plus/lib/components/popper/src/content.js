'use strict';

var core = require('@popperjs/core');
var arrow = require('./arrow.js');
var index = require('../../../hooks/use-aria/index.js');
var runtime = require('../../../utils/vue/props/runtime.js');

const POSITIONING_STRATEGIES = ["fixed", "absolute"];
const popperCoreConfigProps = runtime.buildProps({
  boundariesPadding: {
    type: Number,
    default: 0
  },
  fallbackPlacements: {
    type: runtime.definePropType(Array),
    default: void 0
  },
  gpuAcceleration: {
    type: Boolean,
    default: true
  },
  /**
   * @description offset of the Tooltip
   */
  offset: {
    type: Number,
    default: 12
  },
  /**
   * @description position of Tooltip
   */
  placement: {
    type: String,
    values: core.placements,
    default: "bottom"
  },
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) parameters
   */
  popperOptions: {
    type: runtime.definePropType(Object),
    default: () => ({})
  },
  strategy: {
    type: String,
    values: POSITIONING_STRATEGIES,
    default: "absolute"
  }
});
const popperContentProps = runtime.buildProps({
  ...popperCoreConfigProps,
  ...arrow.popperArrowProps,
  id: String,
  style: {
    type: runtime.definePropType([String, Array, Object])
  },
  className: {
    type: runtime.definePropType([String, Array, Object])
  },
  effect: {
    type: runtime.definePropType(String),
    default: "dark"
  },
  visible: Boolean,
  enterable: {
    type: Boolean,
    default: true
  },
  pure: Boolean,
  focusOnShow: Boolean,
  trapping: Boolean,
  popperClass: {
    type: runtime.definePropType([String, Array, Object])
  },
  popperStyle: {
    type: runtime.definePropType([String, Array, Object])
  },
  referenceEl: {
    type: runtime.definePropType(Object)
  },
  triggerTargetEl: {
    type: runtime.definePropType(Object)
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: true
  },
  virtualTriggering: Boolean,
  zIndex: Number,
  ...index.useAriaProps(["ariaLabel"]),
  loop: Boolean
});
const popperCoreConfigPropsDefaults = {
  boundariesPadding: 0,
  gpuAcceleration: true,
  offset: 12,
  placement: "bottom",
  popperOptions: () => ({}),
  strategy: "absolute"
};
const popperContentPropsDefaults = {
  ...popperCoreConfigPropsDefaults,
  ...arrow.popperArrowPropsDefaults,
  effect: "dark",
  enterable: true,
  stopPopperMouseEvent: true,
  visible: false,
  pure: false,
  focusOnShow: false,
  trapping: false,
  virtualTriggering: false,
  loop: false,
  style: void 0,
  popperStyle: void 0
};
const popperContentEmits = {
  mouseenter: (evt) => evt instanceof MouseEvent,
  mouseleave: (evt) => evt instanceof MouseEvent,
  focus: () => true,
  blur: () => true,
  close: () => true
};
const usePopperCoreConfigProps = popperCoreConfigProps;
const usePopperContentProps = popperContentProps;
const usePopperContentEmits = popperContentEmits;

exports.popperContentEmits = popperContentEmits;
exports.popperContentProps = popperContentProps;
exports.popperContentPropsDefaults = popperContentPropsDefaults;
exports.popperCoreConfigProps = popperCoreConfigProps;
exports.popperCoreConfigPropsDefaults = popperCoreConfigPropsDefaults;
exports.usePopperContentEmits = usePopperContentEmits;
exports.usePopperContentProps = usePopperContentProps;
exports.usePopperCoreConfigProps = usePopperCoreConfigProps;
//# sourceMappingURL=content.js.map
