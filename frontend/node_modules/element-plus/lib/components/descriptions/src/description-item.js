'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var constants = require('./constants.js');
var columnAlignment = require('../../../constants/column-alignment.js');
var runtime = require('../../../utils/vue/props/runtime.js');

const descriptionItemProps = runtime.buildProps({
  /**
   * @description label text
   */
  label: {
    type: String,
    default: ""
  },
  /**
   * @description colspan of column
   */
  span: {
    type: Number,
    default: 1
  },
  /**
   * @description the number of rows a cell should span
   */
  rowspan: {
    type: Number,
    default: 1
  },
  /**
   * @description column width, the width of the same column in different rows is set by the max value (If no `border`, width contains label and content)
   */
  width: {
    type: [String, Number],
    default: ""
  },
  /**
   * @description column minimum width, columns with `width` has a fixed width, while columns with `min-width` has a width that is distributed in proportion (If no`border`, width contains label and content)
   */
  minWidth: {
    type: [String, Number],
    default: ""
  },
  /**
   * @description column label width, if not set, it will be the same as the width of the column. Higher priority than the `label-width` of `Descriptions`
   */
  labelWidth: {
    type: [String, Number]
  },
  /**
   * @description column content alignment (If no `border`, effective for both label and content)
   */
  align: {
    type: String,
    values: columnAlignment.columnAlignment,
    default: "left"
  },
  /**
   * @description column label alignment, if omitted, the value of the above `align` attribute will be applied (If no `border`, please use `align` attribute)
   */
  labelAlign: {
    type: String,
    values: columnAlignment.columnAlignment
  },
  /**
   * @description column content custom class name
   */
  className: {
    type: String,
    default: ""
  },
  /**
   * @description column label custom class name
   */
  labelClassName: {
    type: String,
    default: ""
  }
});
const DescriptionItem = vue.defineComponent({
  name: constants.COMPONENT_NAME,
  props: descriptionItemProps
});

exports.default = DescriptionItem;
exports.descriptionItemProps = descriptionItemProps;
//# sourceMappingURL=description-item.js.map
