import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue';
export declare const overlayProps: {
    readonly mask: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly customMaskEvent: BooleanConstructor;
    readonly overlayClass: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | string[] | Record<string, boolean>) | (() => string | string[] | Record<string, boolean>) | ((new (...args: any[]) => string | string[] | Record<string, boolean>) | (() => string | string[] | Record<string, boolean>))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly zIndex: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | number) | (() => import("csstype").Property.ZIndex | undefined) | ((new (...args: any[]) => string | number) | (() => import("csstype").Property.ZIndex | undefined))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
};
export type OverlayProps = ExtractPropTypes<typeof overlayProps>;
export type OverlayPropsPublic = ExtractPublicPropTypes<typeof overlayProps>;
export declare const overlayEmits: {
    click: (evt: MouseEvent) => boolean;
};
export type OverlayEmits = typeof overlayEmits;
declare const _default: import("vue").DefineComponent<{
    readonly mask: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly customMaskEvent: BooleanConstructor;
    readonly overlayClass: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | string[] | Record<string, boolean>) | (() => string | string[] | Record<string, boolean>) | ((new (...args: any[]) => string | string[] | Record<string, boolean>) | (() => string | string[] | Record<string, boolean>))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly zIndex: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | number) | (() => import("csstype").Property.ZIndex | undefined) | ((new (...args: any[]) => string | number) | (() => import("csstype").Property.ZIndex | undefined))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (evt: MouseEvent) => boolean;
}, string, import("vue").PublicProps, Readonly<ExtractPropTypes<{
    readonly mask: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly customMaskEvent: BooleanConstructor;
    readonly overlayClass: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | string[] | Record<string, boolean>) | (() => string | string[] | Record<string, boolean>) | ((new (...args: any[]) => string | string[] | Record<string, boolean>) | (() => string | string[] | Record<string, boolean>))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly zIndex: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => string | number) | (() => import("csstype").Property.ZIndex | undefined) | ((new (...args: any[]) => string | number) | (() => import("csstype").Property.ZIndex | undefined))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
}>> & {
    onClick?: ((evt: MouseEvent) => any) | undefined;
}, {
    readonly mask: import("element-plus/es/utils").EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly customMaskEvent: boolean;
}, {}>;
export default _default;
