import type { SvPanelProps } from '../props/sv-panel';
export declare const useSvPanel: (props: SvPanelProps) => {
    cursorRef: import("vue").Ref<HTMLElement | undefined>;
    cursorTop: import("vue").Ref<number>;
    cursorLeft: import("vue").Ref<number>;
    background: import("vue").Ref<string>;
    saturation: import("vue").ComputedRef<any>;
    brightness: import("vue").ComputedRef<any>;
    hue: import("vue").ComputedRef<any>;
    handleClick: (event: MouseEvent | TouchEvent) => void;
    handleDrag: (event: MouseEvent | TouchEvent) => void;
    handleKeydown: (event: KeyboardEvent) => void;
};
export declare const useSvPanelDOM: (props: SvPanelProps, { cursorTop, cursorLeft, background, handleDrag, }: Pick<ReturnType<typeof useSvPanel>, "cursorTop" | "cursorLeft" | "background" | "handleDrag">) => {
    rootKls: import("vue").ComputedRef<string>;
    cursorKls: import("vue").ComputedRef<string>;
    rootStyle: import("vue").ComputedRef<{
        backgroundColor: string;
    }>;
    cursorStyle: import("vue").ComputedRef<{
        top: string | undefined;
        left: string | undefined;
    }>;
    update: () => void;
};
