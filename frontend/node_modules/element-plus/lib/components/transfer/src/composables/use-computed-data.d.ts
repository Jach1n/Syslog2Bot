import type { TransferDataItem, TransferProps } from '../transfer';
export declare const useComputedData: (props: Required<Omit<TransferProps, "filterPlaceholder" | "filterMethod" | "renderContent">>) => {
    sourceData: import("vue").ComputedRef<TransferDataItem[]>;
    targetData: import("vue").ComputedRef<TransferDataItem[]>;
};
