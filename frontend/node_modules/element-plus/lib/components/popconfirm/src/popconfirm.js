'use strict';

var iconsVue = require('@element-plus/icons-vue');
var button = require('../../button/src/button.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var trigger = require('../../tooltip/src/trigger.js');
var content = require('../../tooltip/src/content.js');
var icon = require('../../../utils/vue/icon.js');

const popconfirmProps = runtime.buildProps({
  /**
   * @description Title
   */
  title: String,
  /**
   * @description Confirm button text
   */
  confirmButtonText: String,
  /**
   * @description Cancel button text
   */
  cancelButtonText: String,
  /**
   * @description Confirm button type
   */
  confirmButtonType: {
    type: String,
    values: button.buttonTypes,
    default: "primary"
  },
  /**
   * @description Cancel button type
   */
  cancelButtonType: {
    type: String,
    values: button.buttonTypes,
    default: "text"
  },
  /**
   * @description Icon Component
   */
  icon: {
    type: icon.iconPropType,
    default: () => iconsVue.QuestionFilled
  },
  /**
   * @description Icon color
   */
  iconColor: {
    type: String,
    default: "#f90"
  },
  /**
   * @description is hide Icon
   */
  hideIcon: Boolean,
  /**
   * @description delay of disappear, in millisecond
   */
  hideAfter: {
    type: Number,
    default: 200
  },
  /**
   * @description Tooltip theme, built-in theme: `dark` / `light`
   */
  effect: {
    ...content.useTooltipContentProps.effect,
    default: "light"
  },
  /**
   * @description whether popconfirm is teleported to the body
   */
  teleported: content.useTooltipContentProps.teleported,
  /**
   * @description when popconfirm inactive and `persistent` is `false` , popconfirm will be destroyed
   */
  persistent: content.useTooltipContentProps.persistent,
  /**
   * @description popconfirm width, min width 150px
   */
  width: {
    type: [String, Number],
    default: 150
  },
  virtualTriggering: trigger.useTooltipTriggerProps.virtualTriggering,
  virtualRef: trigger.useTooltipTriggerProps.virtualRef
});
const popconfirmEmits = {
  /**
   * @description triggers when click confirm button
   */
  confirm: (e) => e instanceof MouseEvent,
  /**
   * @description triggers when click cancel button
   */
  cancel: (e) => e instanceof MouseEvent
};

exports.popconfirmEmits = popconfirmEmits;
exports.popconfirmProps = popconfirmProps;
//# sourceMappingURL=popconfirm.js.map
