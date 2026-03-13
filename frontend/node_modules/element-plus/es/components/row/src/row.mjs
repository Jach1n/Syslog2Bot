import { buildProps } from '../../../utils/vue/props/runtime.mjs';

const RowJustify = [
  "start",
  "center",
  "end",
  "space-around",
  "space-between",
  "space-evenly"
];
const RowAlign = ["top", "middle", "bottom"];
const rowProps = buildProps({
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

export { RowAlign, RowJustify, rowProps };
//# sourceMappingURL=row.mjs.map
