import type { AppContext, VNode } from 'vue';
import type { LoadingOptionsResolved } from './types';
export declare function createLoadingComponent(options: LoadingOptionsResolved, appContext: AppContext | null): {
    setText: (text: string | VNode | VNode[]) => void;
    removeElLoadingChild: () => void;
    close: () => void;
    handleAfterLeave: () => void;
    vm: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}>;
    $el: HTMLElement;
    originalPosition: import("vue").Ref<string>;
    originalOverflow: import("vue").Ref<string>;
    visible: import("vue").Ref<boolean>;
    parent: import("vue").Ref<import("./types").LoadingParentElement>;
    background: import("vue").Ref<string>;
    svg: import("vue").Ref<string>;
    svgViewBox: import("vue").Ref<string>;
    spinner: import("vue").Ref<string | boolean>;
    text: import("vue").Ref<string | VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[]>;
    fullscreen: import("vue").Ref<boolean>;
    lock: import("vue").Ref<boolean>;
    customClass: import("vue").Ref<string>;
    target: import("vue").Ref<HTMLElement>;
    beforeClose?: import("vue").Ref<(() => boolean) | undefined> | undefined;
    closed?: import("vue").Ref<(() => void) | undefined> | undefined;
};
export type LoadingInstance = ReturnType<typeof createLoadingComponent>;
