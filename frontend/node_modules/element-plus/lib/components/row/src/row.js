'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');

const RowJustify = [
  "start",
  "center",
  "end",
  "space-around",
  "space-between",
  "space-evenly"
];
const RowAlign = ["top", "middle", "bottom"];
const rowProps = runtime.buildProps({
  /**
   * @description custom element tag
   */
  tag: {
    type: String,
    default: "div"
  },
  /**
   * @description grid spacing
   */
  gutter: {
    type: Number,
    default: 0
  },
  /**
   * @description horizontal alignment of flex layout
   */
  justify: {
    type: String,
    values: RowJustify,
    default: "start"
  },
  /**
   * @description vertical alignment of flex layout
   */
  align: {
    type: String,
    values: RowAlign
  }
});

exports.RowAlign = RowAlign;
exports.RowJustify = RowJustify;
exports.rowProps = rowProps;
//# sourceMappingURL=row.js.map
