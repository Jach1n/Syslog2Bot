import type { StyleValue } from 'vue';
import type { TableV2RowCellRenderParam } from './row';
declare const ExpandIcon: {
    (props: TableV2RowCellRenderParam["expandIconProps"] & {
        class?: string | string[];
        style: StyleValue;
        ariaLabel?: string;
        size: number;
        expanded: boolean;
        expandable: boolean;
    }): import("vue/jsx-runtime").JSX.Element;
    inheritAttrs: boolean;
};
export default ExpandIcon;
export type ExpandIconInstance = ReturnType<typeof ExpandIcon>;
