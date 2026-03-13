import type { CSSProperties, PropType } from 'vue';
declare const __VLS_export: import("vue").DefineComponent<{
    item: {
        type: ObjectConstructor;
        required: true;
    };
    style: {
        type: PropType<CSSProperties>;
    };
    height: NumberConstructor;
}, {
    ns: {
        namespace: import("vue").ComputedRef<string>;
        b: (blockSuffix?: string) => string;
        e: (element?: string) => string;
        m: (modifier?: string) => string;
        be: (blockSuffix?: string, element?: string) => string;
        em: (element?: string, modifier?: string) => string;
        bm: (blockSuffix?: string, modifier?: string) => string;
        bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
        is: {
            (name: string, state: boolean | undefined): string;
            (name: string): string;
        };
        cssVar: (object: Record<string, string>) => Record<string, string>;
        cssVarName: (name: string) => string;
        cssVarBlock: (object: Record<string, string>) => Record<string, string>;
        cssVarBlockName: (name: string) => string;
    };
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    item: {
        type: ObjectConstructor;
        required: true;
    };
    style: {
        type: PropType<CSSProperties>;
    };
    height: NumberConstructor;
}>>, {}, {}>;
declare const _default: typeof __VLS_export;
export default _default;
