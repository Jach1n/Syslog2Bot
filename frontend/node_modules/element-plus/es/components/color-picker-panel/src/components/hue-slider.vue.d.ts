declare const __VLS_export: import("vue").DefineComponent<{}, {
    /**
     * @description bar element ref
     */
    bar: import("vue").ShallowRef<HTMLElement | undefined>;
    /**
     * @description thumb element ref
     */
    thumb: import("vue").ShallowRef<HTMLElement | undefined>;
    /**
     * @description thumb top position, only for vertical slider
     */
    thumbTop: import("vue").Ref<number>;
    /**
     * @description update hue slider manually
     */
    update: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
declare const _default: typeof __VLS_export;
export default _default;
