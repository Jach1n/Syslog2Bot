'use strict';

var iconsVue = require('@element-plus/icons-vue');
var runtime = require('../../../utils/vue/props/runtime.js');
var index = require('../../../hooks/use-aria/index.js');
var index$1 = require('../../../hooks/use-size/index.js');
var typescript = require('../../../utils/typescript.js');
var icon = require('../../../utils/vue/icon.js');
var types = require('../../../utils/types.js');
var event = require('../../../constants/event.js');

const rateProps = runtime.buildProps({
  /**
   * @description binding value
   */
  modelValue: {
    type: Number,
    default: 0
  },
  /**
   * @description native `id` attribute
   */
  id: {
    type: String,
    default: void 0
  },
  /**
   * @description threshold value between low and medium level. The value itself will be included in low level
   */
  lowThreshold: {
    type: Number,
    default: 2
  },
  /**
   * @description threshold value between medium and high level. The value itself will be included in high level
   */
  highThreshold: {
    type: Number,
    default: 4
  },
  /**
   * @description max rating score
   */
  max: {
    type: Number,
    default: 5
  },
  /**
   * @description colors for icons. If array, it should have 3 elements, each of which corresponds with a score level, else if object, the key should be threshold value between two levels, and the value should be corresponding color
   */
  colors: {
    type: runtime.definePropType([Array, Object]),
    default: () => typescript.mutable(["", "", ""])
  },
  /**
   * @description color of unselected icons
   */
  voidColor: {
    type: String,
    default: ""
  },
  /**
   * @description color of unselected read-only icons
   */
  disabledVoidColor: {
    type: String,
    default: ""
  },
  /**
   * @description icon components. If array, it should have 3 elements, each of which corresponds with a score level, else if object, the key should be threshold value between two levels, and the value should be corresponding icon component
   */
  icons: {
    type: runtime.definePropType([Array, Object]),
    default: () => [iconsVue.StarFilled, iconsVue.StarFilled, iconsVue.StarFilled]
  },
  /**
   * @description component of unselected icons
   */
  voidIcon: {
    type: icon.iconPropType,
    default: () => iconsVue.Star
  },
  /**
   * @description component of unselected read-only icons
   */
  disabledVoidIcon: {
    type: icon.iconPropType,
    default: () => iconsVue.StarFilled
  },
  /**
   * @description whether Rate is read-only
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description whether picking half start is allowed
   */
  allowHalf: Boolean,
  /**
   * @description whether to display texts
   */
  showText: Boolean,
  /**
   * @description whether to display current score. show-score and show-text cannot be true at the same time
   */
  showScore: Boolean,
  /**
   * @description color of texts
   */
  textColor: {
    type: String,
    default: ""
  },
  /**
   * @description text array
   */
  texts: {
    type: runtime.definePropType(Array),
    default: () => typescript.mutable([
      "Extremely bad",
      "Disappointed",
      "Fair",
      "Satisfied",
      "Surprise"
    ])
  },
  /**
   * @description score template
   */
  scoreTemplate: {
    type: String,
    default: "{value}"
  },
  /**
   * @description size of Rate
   */
  size: index$1.useSizeProp,
  /**
   * @description whether value can be reset to `0`
   */
  clearable: Boolean,
  ...index.useAriaProps(["ariaLabel"])
});
const rateEmits = {
  [event.CHANGE_EVENT]: (value) => types.isNumber(value),
  [event.UPDATE_MODEL_EVENT]: (value) => types.isNumber(value)
};

exports.rateEmits = rateEmits;
exports.rateProps = rateProps;
//# sourceMappingURL=rate.js.map
