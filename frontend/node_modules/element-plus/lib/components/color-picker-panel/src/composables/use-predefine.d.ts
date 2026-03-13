import { PredefineProps } from '../props/predefine';
import Color from '../utils/color';
import type { Ref } from 'vue';
export declare const usePredefine: (props: PredefineProps) => {
    rgbaColors: Ref<Color[]>;
    handleSelect: (index: number) => void;
};
export declare const usePredefineDOM: (props: PredefineProps) => {
    rootKls: import("vue").ComputedRef<string[]>;
    colorsKls: import("vue").ComputedRef<string>;
    colorSelectorKls: (item: Color) => (string | {
        selected: boolean | undefined;
    })[];
};
