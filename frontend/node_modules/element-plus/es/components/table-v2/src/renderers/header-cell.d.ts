import type { FunctionalComponent, UnwrapNestedRefs } from 'vue';
import type { Translator, UseNamespaceReturn } from 'element-plus/es/hooks';
import type { TableV2HeaderRowCellRendererParams } from '../components';
import type { UseTableReturn } from '../use-table';
import type { TableV2Props } from '../table';
export type HeaderCellRendererProps = TableV2HeaderRowCellRendererParams & UnwrapNestedRefs<Pick<UseTableReturn, 'onColumnSorted'>> & Pick<TableV2Props, 'sortBy' | 'sortState' | 'headerCellProps'> & {
    ns: UseNamespaceReturn;
    t: Translator;
};
declare const HeaderCellRenderer: FunctionalComponent<HeaderCellRendererProps>;
export default HeaderCellRenderer;
export type HeaderCellSlotProps = HeaderCellRendererProps & {
    class: string;
};
