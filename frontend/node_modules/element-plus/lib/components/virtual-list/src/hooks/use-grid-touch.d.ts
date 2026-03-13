import type { ComputedRef, Ref } from 'vue';
import type { GridScrollOptions, GridStates } from '../types';
export declare const useGridTouch: (windowRef: Ref<HTMLElement | undefined>, states: Ref<GridStates>, scrollTo: (scrollOptions: GridScrollOptions) => void, estimatedTotalWidth: ComputedRef<number>, estimatedTotalHeight: ComputedRef<number>, parsedWidth: ComputedRef<number>, parsedHeight: ComputedRef<number>) => {
    touchStartX: Ref<number>;
    touchStartY: Ref<number>;
    handleTouchStart: (event: TouchEvent) => void;
    handleTouchMove: (event: TouchEvent) => void;
};
