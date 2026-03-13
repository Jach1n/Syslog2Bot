import { rowKey, expandColumnKey, columns } from './common.mjs';
import { virtualizedGridProps } from '../../virtual-list/src/props.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';

const tableV2RowProps = buildProps({
  class: String,
  columns,
  columnsStyles: {
    type: definePropType(Object),
    required: true
  },
  depth: Number,
  expandColumnKey,
  estimatedRowHeight: {
    ...virtualizedGridProps.estimatedRowHeight,
    default: void 0
  },
  isScrolling: Boolean,
  onRowExpand: {
    type: definePropType(Function)
  },
  onRowHover: {
    type: definePropType(Function)
  },
  onRowHeightChange: {
    type: definePropType(Function)
  },
  rowData: {
    type: definePropType(Object),
    required: true
  },
  rowEventHandlers: {
    type: definePropType(Object)
  },
  rowIndex: {
    type: Number,
    required: true
  },
  /**
   * Unique item key
   */
  rowKey,
  style: {
    type: definePropType(Object)
  }
});

export { tableV2RowProps };
//# sourceMappingURL=row.mjs.map
