import type { FunctionalComponent, UnwrapNestedRefs } from 'vue';
import type { TableV2RowCellRenderParam } from '../components';
import type { Translator, UseNamespaceReturn } from 'element-plus/es/hooks';
import type { UseTableReturn } from '../use-table';
import type { TableV2Props } from '../table';
type CellRendererProps = TableV2RowCellRenderParam & Pick<TableV2Props, 'cellProps' | 'expandColumnKey' | 'indentSize' | 'iconSize' | 'rowKey'> & UnwrapNestedRefs<Pick<UseTableReturn, 'expandedRowKeys'>> & {
    ns: UseNamespaceReturn;
    t: Translator;
};
declare const CellRenderer: FunctionalComponent<CellRendererProps>;
export default CellRenderer;
