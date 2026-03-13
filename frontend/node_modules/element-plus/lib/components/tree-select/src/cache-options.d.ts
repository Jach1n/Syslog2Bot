import type { PropType } from 'vue';
export type CacheOption = {
    value: string | number | boolean | object;
    currentLabel: string | number;
    isDisabled: boolean;
};
declare const _default: import("vue").DefineComponent<{
    data: {
        type: PropType<CacheOption[]>;
        default: () => never[];
    };
}, () => undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    data: {
        type: PropType<CacheOption[]>;
        default: () => never[];
    };
}>>, {
    data: CacheOption[];
}, {}>;
export default _default;
