'use strict';

var content = require('./content.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var icon = require('../../../utils/vue/icon.js');

const tourStepProps = runtime.buildProps({
  /**
   * @description get the element the guide card points to. empty makes it show in center of screen
   */
  target: {
    type: runtime.definePropType([String, Object, Function])
  },
  /**
   * @description the title of the tour content
   */
  title: String,
  /**
   * @description description
   */
  description: String,
  /**
   * @description whether to show a close button
   */
  showClose: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description custom close icon, default is Close
   */
  closeIcon: {
    type: icon.iconPropType
  },
  /**
   * @description whether to show the arrow
   */
  showArrow: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description position of the guide card relative to the target element
   */
  placement: content.tourContentProps.placement,
  /**
   * @description whether to enable masking, change mask style and fill color by pass custom props
   */
  mask: {
    type: runtime.definePropType([Boolean, Object]),
    default: void 0
  },
  /**
   * @description custom style for content
   */
  contentStyle: {
    type: runtime.definePropType([Object])
  },
  /**
   * @description properties of the previous button
   */
  prevButtonProps: {
    type: runtime.definePropType(Object)
  },
  /**
   * @description properties of the Next button
   */
  nextButtonProps: {
    type: runtime.definePropType(Object)
  },
  /**
   * @description support pass custom scrollIntoView options
   */
  scrollIntoViewOptions: {
    type: runtime.definePropType([Boolean, Object]),
    default: void 0
  },
  /**
   * @description type, affects the background color and text color
   */
  type: {
    type: runtime.definePropType(String)
  }
});
const tourStepEmits = {
  close: () => true
};

exports.tourStepEmits = tourStepEmits;
exports.tourStepProps = tourStepProps;
//# sourceMappingURL=step.js.map
