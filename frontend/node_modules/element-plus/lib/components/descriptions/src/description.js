'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var index = require('../../../hooks/use-size/index.js');

const descriptionProps = runtime.buildProps({
  /**
   * @description with or without border
   */
  border: Boolean,
  /**
   * @description numbers of `Descriptions Item` in one line
   */
  column: {
    type: Number,
    default: 3
  },
  /**
   * @description direction of list
   */
  direction: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "horizontal"
  },
  /**
   * @description size of list
   */
  size: index.useSizeProp,
  /**
   * @description title text, display on the top left
   */
  title: {
    type: String,
    default: ""
  },
  /**
   * @description extra text, display on the top right
   */
  extra: {
    type: String,
    default: ""
  },
  /**
   * @description width of every label column
   */
  labelWidth: {
    type: [String, Number]
  }
});

exports.descriptionProps = descriptionProps;
//# sourceMappingURL=description.js.map
