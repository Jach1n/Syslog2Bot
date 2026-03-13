import type { FunctionalComponent, Ref } from 'vue';
import type { TableV2GridProps } from '../grid';
import type { TableGridInstance } from '../table-grid';
type RightTableProps = TableV2GridProps & {
    rightTableRef: Ref<TableGridInstance | undefined>;
};
declare const RightTable: FunctionalComponent<RightTableProps>;
export default RightTable;
