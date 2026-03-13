import type { SetupContext } from 'vue';
import type { TransferCheckedState, TransferEmits, TransferProps } from '../transfer';
export declare const useMove: (props: Required<Omit<TransferProps, "filterPlaceholder" | "filterMethod" | "renderContent">>, checkedState: TransferCheckedState, emit: SetupContext<TransferEmits>["emit"]) => {
    addToLeft: () => void;
    addToRight: () => void;
};
