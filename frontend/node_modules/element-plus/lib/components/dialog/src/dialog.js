'use strict';

var dialogContent = require('./dialog-content.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var teleport = require('../../teleport/src/teleport.js');
var types = require('../../../utils/types.js');
var event = require('../../../constants/event.js');

const dialogProps = runtime.buildProps({
  ...dialogContent.dialogContentProps,
  /**
   * @description whether to append Dialog itself to body. A nested Dialog should have this attribute set to `true`
   */
  appendToBody: Boolean,
  /**
   * @description which element the Dialog appends to
   */
  appendTo: {
    type: teleport.teleportProps.to.type,
    default: "body"
  },
  /**
   * @description callback before Dialog closes, and it will prevent Dialog from closing, use done to close the dialog
   */
  beforeClose: {
    type: runtime.definePropType(Function)
  },
  /**
   * @description destroy elements in Dialog when closed
   */
  destroyOnClose: Boolean,
  /**
   * @description whether the Dialog can be closed by clicking the mask
   */
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  /**
   * @description whether the Dialog can be closed by pressing ESC
   */
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  /**
   * @description whether scroll of body is disabled while Dialog is displayed
   */
  lockScroll: {
    type: Boolean,
    default: true
  },
  /**
   * @description whether a mask is displayed
   */
  modal: {
    type: Boolean,
    default: true
  },
  /**
   * @description whether the mask is penetrable
   */
  modalPenetrable: Boolean,
  /**
   * @description the Time(milliseconds) before open
   */
  openDelay: {
    type: Number,
    default: 0
  },
  /**
   * @description the Time(milliseconds) before close
   */
  closeDelay: {
    type: Number,
    default: 0
  },
  /**
   * @description value for `margin-top` of Dialog CSS, default is 15vh
   */
  top: {
    type: String
  },
  /**
   * @description visibility of Dialog
   */
  modelValue: Boolean,
  /**
   * @description custom class names for mask
   */
  modalClass: String,
  /**
   * @description custom class names for header wrapper
   */
  headerClass: String,
  /**
   * @description custom class names for body wrapper
   */
  bodyClass: String,
  /**
   * @description custom class names for footer wrapper
   */
  footerClass: String,
  /**
   * @description width of Dialog, default is 50%
   */
  width: {
    type: [String, Number]
  },
  /**
   * @description same as z-index in native CSS, z-order of dialog
   */
  zIndex: {
    type: Number
  },
  trapFocus: Boolean,
  /**
   * @description header's aria-level attribute
   */
  headerAriaLevel: {
    type: String,
    default: "2"
  },
  /**
   * @description custom transition configuration for dialog animation, it can be a string (transition name) or an object with Vue transition props
   */
  transition: {
    type: runtime.definePropType([String, Object]),
    default: void 0
  }
});
const dialogEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  [event.UPDATE_MODEL_EVENT]: (value) => types.isBoolean(value),
  openAutoFocus: () => true,
  closeAutoFocus: () => true
};
const dialogContextKey = /* @__PURE__ */ Symbol("dialogContextKey");
const dialogPropsDefaults = {
  ...dialogContent.dialogContentPropsDefaults,
  appendTo: "body",
  closeOnClickModal: true,
  closeOnPressEscape: true,
  lockScroll: true,
  modal: true,
  openDelay: 0,
  closeDelay: 0,
  headerAriaLevel: "2",
  transition: void 0
};

exports.dialogContextKey = dialogContextKey;
exports.dialogEmits = dialogEmits;
exports.dialogProps = dialogProps;
exports.dialogPropsDefaults = dialogPropsDefaults;
//# sourceMappingURL=dialog.js.map
