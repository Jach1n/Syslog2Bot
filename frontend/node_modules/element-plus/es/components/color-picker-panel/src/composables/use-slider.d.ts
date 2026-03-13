import type { AlphaSliderProps } from '../props/slider';
interface UseSliderOptions {
    key: 'hue' | 'alpha';
    minValue: number;
    maxValue: number;
}
export declare const useSlider: (props: AlphaSliderProps, { key, minValue, maxValue }: UseSliderOptions) => {
    thumb: import("vue").ShallowRef<HTMLElement | undefined>;
    bar: import("vue").ShallowRef<HTMLElement | undefined>;
    currentValue: import("vue").ComputedRef<any>;
    handleDrag: (event: MouseEvent | TouchEvent) => void;
    handleClick: (event: MouseEvent | TouchEvent) => void;
    handleKeydown: (event: KeyboardEvent) => void;
};
interface UseSliderDOMOptions extends Pick<ReturnType<typeof useSlider>, 'bar' | 'thumb' | 'currentValue' | 'handleDrag'> {
    namespace: string;
    maxValue: number;
    getBackground?: () => string;
}
export declare const useSliderDOM: (props: AlphaSliderProps, { namespace, maxValue, bar, thumb, currentValue, handleDrag, getBackground, }: UseSliderDOMOptions) => {
    rootKls: import("vue").ComputedRef<string[]>;
    barKls: import("vue").ComputedRef<string>;
    barStyle: import("vue").ComputedRef<{
        background: string | undefined;
    }>;
    thumbKls: import("vue").ComputedRef<string>;
    thumbStyle: import("vue").ComputedRef<{
        left: string | undefined;
        top: string | undefined;
    }>;
    thumbLeft: import("vue").Ref<number>;
    thumbTop: import("vue").Ref<number>;
    update: () => void;
};
export {};
