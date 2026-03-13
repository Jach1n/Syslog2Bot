import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue';
export declare const timelineProps: {
    readonly mode: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "end" | "start" | "alternate" | "alternate-reverse", unknown, "start", boolean>;
    readonly reverse: BooleanConstructor;
};
export type TimelineProps = ExtractPropTypes<typeof timelineProps>;
export type TimelinePropsPublic = ExtractPublicPropTypes<typeof timelineProps>;
declare const Timeline: import("vue").DefineComponent<{
    readonly mode: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "end" | "start" | "alternate" | "alternate-reverse", unknown, "start", boolean>;
    readonly reverse: BooleanConstructor;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ExtractPropTypes<{
    readonly mode: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "end" | "start" | "alternate" | "alternate-reverse", unknown, "start", boolean>;
    readonly reverse: BooleanConstructor;
}>>, {
    readonly reverse: boolean;
    readonly mode: import("element-plus/es/utils").EpPropMergeType<StringConstructor, "end" | "start" | "alternate" | "alternate-reverse", unknown>;
}, {}>;
export default Timeline;
export type TimelineInstance = InstanceType<typeof Timeline> & unknown;
