'use strict';

var vue = require('vue');
var iconsVue = require('@element-plus/icons-vue');
var typescript = require('../../../utils/typescript.js');
var icon = require('../../../utils/vue/icon.js');
var index$1 = require('../../../hooks/use-size/index.js');
var event = require('../../../constants/event.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var index = require('../../../hooks/use-aria/index.js');
var shared = require('@vue/shared');

const inputProps = runtime.buildProps({
  /**
   * @description native input id
   */
  id: {
    type: String,
    default: void 0
  },
  /**
   * @description input box size
   */
  size: index$1.useSizeProp,
  /**
   * @description whether to disable
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description binding value
   */
  modelValue: {
    type: runtime.definePropType([
      String,
      Number,
      Object
    ]),
    default: ""
  },
  /**
   * @description v-model modifiers, reference [Vue modifiers](https://vuejs.org/guide/essentials/forms.html#modifiers)
   */
  modelModifiers: {
    type: runtime.definePropType(Object),
    default: () => ({})
  },
  /**
   * @description same as `maxlength` in native input
   */
  maxlength: {
    type: [String, Number]
  },
  /**
   * @description same as `minlength` in native input
   */
  minlength: {
    type: [String, Number]
  },
  /**
   * @description type of input, see more in [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types)
   */
  type: {
    type: runtime.definePropType(String),
    default: "text"
  },
  /**
   * @description control the resizability
   */
  resize: {
    type: String,
    values: ["none", "both", "horizontal", "vertical"]
  },
  /**
   * @description whether textarea has an adaptive height
   */
  autosize: {
    type: runtime.definePropType([Boolean, Object]),
    default: false
  },
  /**
   * @description native input autocomplete
   */
  autocomplete: {
    type: runtime.definePropType(String),
    default: "off"
  },
  /**
   * @description format content
   */
  formatter: {
    type: Function
  },
  /**
   * @description parse content
   */
  parser: {
    type: Function
  },
  /**
   * @description placeholder
   */
  placeholder: {
    type: String
  },
  /**
   * @description native input form
   */
  form: {
    type: String
  },
  /**
   * @description native input readonly
   */
  readonly: Boolean,
  /**
   * @description whether to show clear button
   */
  clearable: Boolean,
  /**
   * @description custom clear icon component
   */
  clearIcon: {
    type: icon.iconPropType,
    default: iconsVue.CircleClose
  },
  /**
   * @description toggleable password input
   */
  showPassword: Boolean,
  /**
   * @description word count
   */
  showWordLimit: Boolean,
  /**
   * @description word count position, valid when `show-word-limit` is true
   */
  wordLimitPosition: {
    type: String,
    values: ["inside", "outside"],
    default: "inside"
  },
  /**
   * @description suffix icon
   */
  suffixIcon: {
    type: icon.iconPropType
  },
  /**
   * @description prefix icon
   */
  prefixIcon: {
    type: icon.iconPropType
  },
  /**
   * @description container role, internal properties provided for use by the picker component
   */
  containerRole: {
    type: String,
    default: void 0
  },
  /**
   * @description input tabindex
   */
  tabindex: {
    type: [String, Number],
    default: 0
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true
  },
  /**
   * @description input or textarea element style
   */
  inputStyle: {
    type: runtime.definePropType([Object, Array, String]),
    default: () => typescript.mutable({})
  },
  /**
   * @description native input autofocus
   */
  autofocus: Boolean,
  rows: {
    type: Number,
    default: 2
  },
  ...index.useAriaProps(["ariaLabel"]),
  /**
   * @description native input mode for virtual keyboards
   */
  inputmode: {
    type: runtime.definePropType(String),
    default: void 0
  },
  /**
   * @description same as `name` in native input
   */
  name: String
});
const inputEmits = {
  [event.UPDATE_MODEL_EVENT]: (value) => shared.isString(value),
  input: (value) => shared.isString(value),
  change: (value, evt) => shared.isString(value) && (evt instanceof Event || evt === void 0),
  focus: (evt) => evt instanceof FocusEvent,
  blur: (evt) => evt instanceof FocusEvent,
  clear: () => true,
  mouseleave: (evt) => evt instanceof MouseEvent,
  mouseenter: (evt) => evt instanceof MouseEvent,
  // NOTE: when autofill by browser, the keydown event is instanceof Event, not KeyboardEvent
  // relative bug report https://github.com/element-plus/element-plus/issues/6665
  keydown: (evt) => evt instanceof Event,
  compositionstart: (evt) => evt instanceof CompositionEvent,
  compositionupdate: (evt) => evt instanceof CompositionEvent,
  compositionend: (evt) => evt instanceof CompositionEvent
};
const inputPropsDefaults = {
  disabled: void 0,
  modelValue: "",
  modelModifiers: () => ({}),
  type: "text",
  autocomplete: "off",
  clearIcon: vue.markRaw(iconsVue.CircleClose),
  wordLimitPosition: "inside",
  tabindex: 0,
  validateEvent: true,
  inputStyle: () => ({}),
  rows: 2
};

exports.inputEmits = inputEmits;
exports.inputProps = inputProps;
exports.inputPropsDefaults = inputPropsDefaults;
//# sourceMappingURL=input.js.map
