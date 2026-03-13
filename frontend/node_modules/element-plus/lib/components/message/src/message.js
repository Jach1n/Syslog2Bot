'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var typescript = require('../../../utils/typescript.js');
var icon = require('../../../utils/vue/icon.js');
var core = require('@vueuse/core');

const messageTypes = [
  "primary",
  "success",
  "info",
  "warning",
  "error"
];
const messagePlacement = [
  "top",
  "top-left",
  "top-right",
  "bottom",
  "bottom-left",
  "bottom-right"
];
const MESSAGE_DEFAULT_PLACEMENT = "top";
const messageDefaults = typescript.mutable({
  customClass: "",
  dangerouslyUseHTMLString: false,
  duration: 3e3,
  icon: void 0,
  id: "",
  message: "",
  onClose: void 0,
  showClose: false,
  type: "info",
  plain: false,
  offset: 16,
  placement: void 0,
  zIndex: 0,
  grouping: false,
  repeatNum: 1,
  appendTo: core.isClient ? document.body : void 0
});
const messageProps = runtime.buildProps({
  /**
   * @description custom class name for Message
   */
  customClass: {
    type: String,
    default: messageDefaults.customClass
  },
  /**
   * @description whether `message` is treated as HTML string
   */
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: messageDefaults.dangerouslyUseHTMLString
  },
  /**
   * @description display duration, millisecond. If set to 0, it will not turn off automatically
   */
  duration: {
    type: Number,
    default: messageDefaults.duration
  },
  /**
   * @description custom icon component, overrides `type`
   */
  icon: {
    type: icon.iconPropType,
    default: messageDefaults.icon
  },
  /**
   * @description message dom id
   */
  id: {
    type: String,
    default: messageDefaults.id
  },
  /**
   * @description message text
   */
  message: {
    type: runtime.definePropType([
      String,
      Object,
      Function
    ]),
    default: messageDefaults.message
  },
  /**
   * @description callback function when closed with the message instance as the parameter
   */
  onClose: {
    type: runtime.definePropType(Function),
    default: messageDefaults.onClose
  },
  /**
   * @description whether to show a close button
   */
  showClose: {
    type: Boolean,
    default: messageDefaults.showClose
  },
  /**
   * @description message type
   */
  type: {
    type: String,
    values: messageTypes,
    default: messageDefaults.type
  },
  /**
   * @description whether message is plain
   */
  plain: {
    type: Boolean,
    default: messageDefaults.plain
  },
  /**
   * @description set the distance to the top of viewport
   */
  offset: {
    type: Number,
    default: messageDefaults.offset
  },
  /**
   * @description message placement position
   */
  placement: {
    type: String,
    values: messagePlacement,
    default: messageDefaults.placement
  },
  /**
   * @description message element zIndex value
   */
  zIndex: {
    type: Number,
    default: messageDefaults.zIndex
  },
  /**
   * @description merge messages with the same content, type of VNode message is not supported
   */
  grouping: {
    type: Boolean,
    default: messageDefaults.grouping
  },
  /**
   * @description The number of repetitions, similar to badge, is used as the initial number when used with `grouping`
   */
  repeatNum: {
    type: Number,
    default: messageDefaults.repeatNum
  }
});
const messageEmits = {
  destroy: () => true
};

exports.MESSAGE_DEFAULT_PLACEMENT = MESSAGE_DEFAULT_PLACEMENT;
exports.messageDefaults = messageDefaults;
exports.messageEmits = messageEmits;
exports.messagePlacement = messagePlacement;
exports.messageProps = messageProps;
exports.messageTypes = messageTypes;
//# sourceMappingURL=message.js.map
