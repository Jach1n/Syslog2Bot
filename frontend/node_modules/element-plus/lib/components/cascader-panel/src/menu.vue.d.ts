import type { CascaderNode } from './types';
import type { PropType } from 'vue';
declare var __VLS_28: {};
type __VLS_Slots = {} & {
    empty?: (props: typeof __VLS_28) => any;
};
declare const __VLS_base: import("vue").DefineComponent<{
    nodes: {
        type: PropType<CascaderNode[]>;
        required: true;
    };
    index: {
        type: NumberConstructor;
        required: true;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    nodes: {
        type: PropType<CascaderNode[]>;
        required: true;
    };
    index: {
        type: NumberConstructor;
        required: true;
    };
}>>, {}, {}>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
