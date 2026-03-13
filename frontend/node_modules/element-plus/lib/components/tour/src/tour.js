'use strict';

var content = require('./content.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var teleport = require('../../teleport/src/teleport.js');
var icon = require('../../../utils/vue/icon.js');
var types = require('../../../utils/types.js');
var event = require('../../../constants/event.js');

const tourProps = runtime.buildProps({
  /**
   * @description open tour
   */
  modelValue: Boolean,
  /**
   * @description what is the current step
   */
  current: {
    type: Number,
    default: 0
  },
  /**
   * @description whether to show the arrow
   */
  showArrow: {
    type: Boolean,
    default: true
  },
  /**
   * @description whether to show a close button
   */
  showClose: {
    type: Boolean,
    default: true
  },
  /**
   * @description custom close icon
   */
  closeIcon: {
    type: icon.iconPropType
  },
  /**
   * @description position of the guide card relative to the target element
   */
  placement: content.tourContentProps.placement,
  /**
   * @description custom style for content
   */
  contentStyle: {
    type: runtime.definePropType([Object])
  },
  /**
   * @description whether to enable masking, change mask style and fill color by pass custom props
   */
  mask: {
    type: runtime.definePropType([Boolean, Object]),
    default: true
  },
  /**
   * @description transparent gap between mask and target
   */
  gap: {
    type: runtime.definePropType(Object),
    default: () => ({
      offset: 6,
      radius: 2
    })
  },
  /**
   * @description tour's zIndex
   */
  zIndex: {
    type: Number
  },
  /**
   * @description support pass custom scrollIntoView options
   */
  scrollIntoViewOptions: {
    type: runtime.definePropType([Boolean, Object]),
    default: () => ({
      block: "center"
    })
  },
  /**
   * @description type, affects the background color and text color
   */
  type: {
    type: runtime.definePropType(String)
  },
  /**
   * @description which element the TourContent appends to
   */
  appendTo: {
    type: teleport.teleportProps.to.type,
    default: "body"
  },
  /**
   * @description whether the Tour can be closed by pressing ESC
   */
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  /**
   * @description whether the target element can be clickable, when using mask
   */
  targetAreaClickable: {
    type: Boolean,
    default: true
  }
});
const tourEmits = {
  [event.UPDATE_MODEL_EVENT]: (value) => types.isBoolean(value),
  ["update:current"]: (current) => types.isNumber(current),
  close: (current) => types.isNumber(current),
  finish: () => true,
  change: (current) => types.isNumber(current)
};

exports.tourEmits = tourEmits;
exports.tourProps = tourProps;
//# sourceMappingURL=tour.js.map
