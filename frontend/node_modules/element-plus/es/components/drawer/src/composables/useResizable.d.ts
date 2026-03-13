import type { Ref, SetupContext } from 'vue';
import type { DrawerEmits, DrawerProps } from '../drawer';
export declare function useResizable(props: DrawerProps & Required<Pick<DrawerProps, 'direction'>>, target: Ref<HTMLElement | undefined>, emit: SetupContext<DrawerEmits>['emit']): {
    size: import("vue").ComputedRef<string | undefined>;
    isResizing: Ref<boolean>;
    isHorizontal: import("vue").ComputedRef<boolean>;
};
