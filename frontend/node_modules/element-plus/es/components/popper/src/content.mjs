import { placements } from '@popperjs/core';
import { popperArrowProps, popperArrowPropsDefaults } from './arrow.mjs';
import { useAriaProps } from '../../../hooks/use-aria/index.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';

const POSITIONING_STRATEGIES = ["fixed", "absolute"];
const popperCoreConfigProps = buildProps({
  boundariesPadding: {
    type: Number,
    default: 0
  },
  fallbackPlacements: {
    type: definePropType(Array),
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
    values: placements,
    default: "bottom"
  },
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) parameters
   */
  popperOptions: {
    type: definePropType(Object),
    default: () => ({})
  },
  strategy: {
    type: String,
    values: POSITIONING_STRATEGIES,
    default: "absolute"
  }
});
const popperContentProps = buildProps({
  ...popperCoreConfigProps,
  ...popperArrowProps,
  id: String,
  style: {
    type: definePropType([String, Array, Object])
  },
  className: {
    type: definePropType([String, Array, Object])
  },
  effect: {
    type: definePropType(String),
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
    type: definePropType([String, Array, Object])
  },
  popperStyle: {
    type: definePropType([String, Array, Object])
  },
  referenceEl: {
    type: definePropType(Object)
  },
  triggerTargetEl: {
    type: definePropType(Object)
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: true
  },
  virtualTriggering: Boolean,
  zIndex: Number,
  ...useAriaProps(["ariaLabel"]),
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
  ...popperArrowPropsDefaults,
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

export { popperContentEmits, popperContentProps, popperContentPropsDefaults, popperCoreConfigProps, popperCoreConfigPropsDefaults, usePopperContentEmits, usePopperContentProps, usePopperCoreConfigProps };
//# sourceMappingURL=content.mjs.map
