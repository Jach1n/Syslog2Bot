import type { ExtractPublicPropTypes } from 'vue';
import type { Crossorigin, ListType, UploadFile, UploadFiles, UploadHooks } from './upload';
import type UploadList from './upload-list.vue';
export interface UploadListProps {
    files?: UploadFiles;
    disabled?: boolean;
    handlePreview?: UploadHooks['onPreview'];
    listType?: ListType;
    /**
     * @description set HTML attribute: crossorigin.
     */
    crossorigin?: Crossorigin;
}
/**
 * @deprecated Removed after 3.0.0, Use `UploadListProps` instead.
 */
export declare const uploadListProps: {
    readonly files: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => UploadFiles) | (() => UploadFiles) | ((new (...args: any[]) => UploadFiles) | (() => UploadFiles))[], unknown, unknown, () => never[], boolean>;
    readonly disabled: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
    readonly handlePreview: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => (uploadFile: UploadFile) => void) | (() => (uploadFile: UploadFile) => void) | {
        (): (uploadFile: UploadFile) => void;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (uploadFile: UploadFile) => void) | (() => (uploadFile: UploadFile) => void) | {
        (): (uploadFile: UploadFile) => void;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly listType: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "picture" | "text" | "picture-card", unknown, "text", boolean>;
    readonly crossorigin: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => "" | "anonymous" | "use-credentials") | (() => "" | "anonymous" | "use-credentials") | ((new (...args: any[]) => "" | "anonymous" | "use-credentials") | (() => "" | "anonymous" | "use-credentials"))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
};
/**
 * @deprecated Removed after 3.0.0, Use `UploadListProps` instead.
 */
export type UploadListPropsPublic = ExtractPublicPropTypes<typeof uploadListProps>;
export declare const uploadListEmits: {
    remove: (file: UploadFile) => boolean;
};
export type UploadListEmits = typeof uploadListEmits;
export type UploadListInstance = InstanceType<typeof UploadList> & unknown;
