import type { ExtractPublicPropTypes } from 'vue';
import type Splitter from './splitter.vue';
import type { Layout } from './type';
export interface SplitterProps {
    layout?: Layout;
    lazy?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `SplitterProps` instead.
 */
export declare const splitterProps: {
    readonly layout: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "horizontal" | "vertical", unknown, "horizontal", boolean>;
    readonly lazy: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `SplitterProps` instead.
 */
export type SplitterPropsPublic = ExtractPublicPropTypes<typeof splitterProps>;
export type SplitterInstance = InstanceType<typeof Splitter> & unknown;
export declare const splitterEmits: {
    resizeStart: (index: number, sizes: number[]) => boolean;
    resize: (index: number, sizes: number[]) => boolean;
    resizeEnd: (index: number, sizes: number[]) => boolean;
    collapse: (index: number, type: "start" | "end", sizes: number[]) => boolean;
};
export type SplitterEmits = typeof splitterEmits;
