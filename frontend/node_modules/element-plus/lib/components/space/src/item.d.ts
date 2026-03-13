import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue';
export declare const spaceItemProps: {
    readonly prefixCls: {
        readonly type: import("vue").PropType<string>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
};
export type SpaceItemProps = ExtractPropTypes<typeof spaceItemProps>;
export type SpaceItemPropsPublic = ExtractPublicPropTypes<typeof spaceItemProps>;
declare const SpaceItem: import("vue").DefineComponent<{
    readonly prefixCls: {
        readonly type: import("vue").PropType<string>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ExtractPropTypes<{
    readonly prefixCls: {
        readonly type: import("vue").PropType<string>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}>>, {}, {}>;
export type SpaceItemInstance = InstanceType<typeof SpaceItem> & unknown;
export default SpaceItem;
