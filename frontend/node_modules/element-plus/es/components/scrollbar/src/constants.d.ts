import type { InjectionKey } from 'vue';
export interface ScrollbarContext {
    scrollbarElement: HTMLDivElement | undefined;
    wrapElement: HTMLDivElement | undefined;
}
export declare const scrollbarContextKey: InjectionKey<ScrollbarContext>;
