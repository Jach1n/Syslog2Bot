'use strict';

var defaults = require('./defaults.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var typescript = require('../../../utils/typescript.js');

const itemSize = runtime.buildProp({
  type: runtime.definePropType([Number, Function]),
  required: true
});
const estimatedItemSize = runtime.buildProp({
  type: Number
});
const cache = runtime.buildProp({
  type: Number,
  default: 2
});
const direction = runtime.buildProp({
  type: String,
  values: ["ltr", "rtl"],
  default: "ltr"
});
const initScrollOffset = runtime.buildProp({
  type: Number,
  default: 0
});
const total = runtime.buildProp({
  type: Number,
  required: true
});
const layout = runtime.buildProp({
  type: String,
  values: ["horizontal", "vertical"],
  default: defaults.VERTICAL
});
const virtualizedProps = runtime.buildProps({
  className: {
    type: String,
    default: ""
  },
  containerElement: {
    type: runtime.definePropType([String, Object]),
    default: "div"
  },
  data: {
    type: runtime.definePropType(Array),
    default: () => typescript.mutable([])
  },
  /**
   * @description controls the horizontal direction.
   */
  direction,
  height: {
    type: [String, Number],
    required: true
  },
  innerElement: {
    type: [String, Object],
    default: "div"
  },
  innerProps: {
    type: runtime.definePropType(Object),
    default: () => ({})
  },
  style: {
    type: runtime.definePropType([Object, String, Array])
  },
  useIsScrolling: Boolean,
  width: {
    type: [Number, String],
    required: false
  },
  perfMode: {
    type: Boolean,
    default: true
  },
  scrollbarAlwaysOn: Boolean
});
const virtualizedListProps = runtime.buildProps({
  /**
   * @description describes how many items should be pre rendered to the head
   * and the tail of the window
   */
  cache,
  estimatedItemSize,
  /**
   * @description controls the list's orientation
   */
  layout,
  initScrollOffset,
  /**
   * @description describes the total number of the list.
   */
  total,
  itemSize,
  ...virtualizedProps
});
const scrollbarSize = {
  type: Number,
  default: 6
};
const startGap = { type: Number, default: 0 };
const endGap = { type: Number, default: 2 };
const virtualizedGridProps = runtime.buildProps({
  columnCache: cache,
  columnWidth: itemSize,
  estimatedColumnWidth: estimatedItemSize,
  estimatedRowHeight: estimatedItemSize,
  initScrollLeft: initScrollOffset,
  initScrollTop: initScrollOffset,
  itemKey: {
    type: runtime.definePropType(Function),
    default: ({
      columnIndex,
      rowIndex
    }) => `${rowIndex}:${columnIndex}`
  },
  rowCache: cache,
  rowHeight: itemSize,
  totalColumn: total,
  totalRow: total,
  hScrollbarSize: scrollbarSize,
  vScrollbarSize: scrollbarSize,
  scrollbarStartGap: startGap,
  scrollbarEndGap: endGap,
  role: String,
  ...virtualizedProps
});
const virtualizedScrollbarProps = runtime.buildProps({
  alwaysOn: Boolean,
  class: String,
  layout,
  total,
  ratio: {
    type: Number,
    required: true
  },
  clientSize: {
    type: Number,
    required: true
  },
  scrollFrom: {
    type: Number,
    required: true
  },
  scrollbarSize,
  startGap,
  endGap,
  visible: Boolean
});

exports.virtualizedGridProps = virtualizedGridProps;
exports.virtualizedListProps = virtualizedListProps;
exports.virtualizedProps = virtualizedProps;
exports.virtualizedScrollbarProps = virtualizedScrollbarProps;
//# sourceMappingURL=props.js.map
