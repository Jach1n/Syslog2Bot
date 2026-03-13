import type { CascaderNode } from './types';
import type { PropType } from 'vue';
declare const __VLS_export: import("vue").DefineComponent<{
    node: {
        type: PropType<CascaderNode>;
        required: true;
    };
    menuId: StringConstructor;
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    expand: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    node: {
        type: PropType<CascaderNode>;
        required: true;
    };
    menuId: StringConstructor;
}>> & {
    onExpand?: ((...args: any[]) => any) | undefined;
}, {}, {}>;
declare const _default: typeof __VLS_export;
export default _default;
