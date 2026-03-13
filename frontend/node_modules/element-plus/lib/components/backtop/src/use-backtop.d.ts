import type { SetupContext } from 'vue';
import type { BacktopEmits, BacktopProps } from './backtop';
export declare const useBackTop: (props: Required<BacktopProps>, emit: SetupContext<BacktopEmits>["emit"], componentName: string) => {
    visible: import("vue").Ref<boolean>;
    handleClick: (event: MouseEvent) => void;
};
