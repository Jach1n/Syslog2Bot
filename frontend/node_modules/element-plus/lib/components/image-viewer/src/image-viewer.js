'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var typescript = require('../../../utils/typescript.js');
var types = require('../../../utils/types.js');

const imageViewerProps = runtime.buildProps({
  /**
   * @description preview link list.
   */
  urlList: {
    type: runtime.definePropType(Array),
    default: () => typescript.mutable([])
  },
  /**
   * @description preview backdrop z-index.
   */
  zIndex: {
    type: Number
  },
  /**
   * @description the initial preview image index, less than or equal to the length of `url-list`.
   */
  initialIndex: {
    type: Number,
    default: 0
  },
  /**
   * @description whether preview is infinite.
   */
  infinite: {
    type: Boolean,
    default: true
  },
  /**
   * @description whether user can emit close event when clicking backdrop.
   */
  hideOnClickModal: Boolean,
  /**
   * @description whether to append image itself to body. A nested parent element attribute transform should have this attribute set to `true`.
   */
  teleported: Boolean,
  /**
   * @description whether the image-viewer can be closed by pressing ESC.
   */
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  /**
   * @description the zoom rate of the image viewer zoom event.
   */
  zoomRate: {
    type: Number,
    default: 1.2
  },
  /**
   * @description preview image scale.
   */
  scale: {
    type: Number,
    default: 1
  },
  /**
   * @description the min scale of the image viewer zoom event.
   */
  minScale: {
    type: Number,
    default: 0.2
  },
  /**
   * @description the max scale of the image viewer zoom event.
   */
  maxScale: {
    type: Number,
    default: 7
  },
  /**
   * @description show preview image progress content.
   */
  showProgress: Boolean,
  /**
   * @description set HTML attribute: crossorigin.
   */
  crossorigin: {
    type: runtime.definePropType(String)
  }
});
const imageViewerEmits = {
  close: () => true,
  error: (evt) => evt instanceof Event,
  switch: (index) => types.isNumber(index),
  rotate: (deg) => types.isNumber(deg)
};

exports.imageViewerEmits = imageViewerEmits;
exports.imageViewerProps = imageViewerProps;
//# sourceMappingURL=image-viewer.js.map
