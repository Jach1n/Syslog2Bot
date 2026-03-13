'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var typescript = require('../../../utils/typescript.js');

const colProps = runtime.buildProps({
  /**
   * @description custom element tag
   */
  tag: {
    type: String,
    default: "div"
  },
  /**
   * @description number of column the grid spans
   */
  span: {
    type: Number,
    default: 24
  },
  /**
   * @description number of spacing on the left side of the grid
   */
  offset: {
    type: Number,
    default: 0
  },
  /**
   * @description number of columns that grid moves to the left
   */
  pull: {
    type: Number,
    default: 0
  },
  /**
   * @description number of columns that grid moves to the right
   */
  push: {
    type: Number,
    default: 0
  },
  /**
   * @description `<768px` Responsive columns or column props object
   */
  xs: {
    type: runtime.definePropType([Number, Object]),
    default: () => typescript.mutable({})
  },
  /**
   * @description `≥768px` Responsive columns or column props object
   */
  sm: {
    type: runtime.definePropType([Number, Object]),
    default: () => typescript.mutable({})
  },
  /**
   * @description `≥992px` Responsive columns or column props object
   */
  md: {
    type: runtime.definePropType([Number, Object]),
    default: () => typescript.mutable({})
  },
  /**
   * @description `≥1200px` Responsive columns or column props object
   */
  lg: {
    type: runtime.definePropType([Number, Object]),
    default: () => typescript.mutable({})
  },
  /**
   * @description `≥1920px` Responsive columns or column props object
   */
  xl: {
    type: runtime.definePropType([Number, Object]),
    default: () => typescript.mutable({})
  }
});

exports.colProps = colProps;
//# sourceMappingURL=col.js.map
