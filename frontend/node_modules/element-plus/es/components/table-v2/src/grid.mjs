import { styleType, classType, requiredNumber, fixedDataType, dataType, columns } from './common.mjs';
import { tableV2HeaderProps } from './header.mjs';
import { tableV2RowProps } from './row.mjs';
import { virtualizedGridProps, virtualizedListProps } from '../../virtual-list/src/props.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';

const tableV2GridProps = buildProps({
  columns,
  data: dataType,
  fixedData: fixedDataType,
  estimatedRowHeight: tableV2RowProps.estimatedRowHeight,
  /**
   * Size related attributes
   */
  width: requiredNumber,
  height: requiredNumber,
  headerWidth: requiredNumber,
  headerHeight: tableV2HeaderProps.headerHeight,
  bodyWidth: requiredNumber,
  rowHeight: requiredNumber,
  /**
   * Special attributes
   */
  cache: virtualizedListProps.cache,
  useIsScrolling: Boolean,
  scrollbarAlwaysOn: virtualizedGridProps.scrollbarAlwaysOn,
  scrollbarStartGap: virtualizedGridProps.scrollbarStartGap,
  scrollbarEndGap: virtualizedGridProps.scrollbarEndGap,
  /**
   * CSS attributes
   */
  class: classType,
  style: styleType,
  containerStyle: styleType,
  getRowHeight: {
    type: definePropType(Function),
    required: true
  },
  rowKey: tableV2RowProps.rowKey,
  /**
   * Event handlers
   */
  onRowsRendered: {
    type: definePropType(Function)
  },
  onScroll: {
    type: definePropType(Function)
  }
});

export { tableV2GridProps };
//# sourceMappingURL=grid.mjs.map
