import { UploadBaseProps } from './upload';
import type { ExtractPublicPropTypes } from 'vue';
import type { UploadFile, UploadHooks, UploadProgressEvent, UploadRawFile } from './upload';
import type UploadContent from './upload-content.vue';
import type { UploadAjaxError } from './ajax';
export interface UploadContentProps extends UploadBaseProps {
    beforeUpload?: UploadHooks['beforeUpload'];
    onRemove?: (file: UploadFile | UploadRawFile) => void;
    onStart?: (rawFile: UploadRawFile) => void;
    onSuccess?: (response: any, rawFile: UploadRawFile) => unknown;
    onProgress?: (evt: UploadProgressEvent, rawFile: UploadRawFile) => void;
    onError?: (err: UploadAjaxError, rawFile: UploadRawFile) => void;
    onExceed?: UploadHooks['onExceed'];
}
/**
 * @deprecated Removed after 3.0.0, Use `UploadContentProps` instead.
 */
export declare const uploadContentProps: {
    readonly beforeUpload: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => (rawFile: UploadRawFile) => import("element-plus/es/utils").Awaitable<void | undefined | null | boolean | File | Blob>) | (() => (rawFile: UploadRawFile) => import("element-plus/es/utils").Awaitable<void | undefined | null | boolean | File | Blob>) | {
        (): (rawFile: UploadRawFile) => import("element-plus/es/utils").Awaitable<void | undefined | null | boolean | File | Blob>;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (rawFile: UploadRawFile) => import("element-plus/es/utils").Awaitable<void | undefined | null | boolean | File | Blob>) | (() => (rawFile: UploadRawFile) => import("element-plus/es/utils").Awaitable<void | undefined | null | boolean | File | Blob>) | {
        (): (rawFile: UploadRawFile) => import("element-plus/es/utils").Awaitable<void | undefined | null | boolean | File | Blob>;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly onRemove: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => (file: UploadFile | UploadRawFile) => void) | (() => (file: UploadFile | UploadRawFile) => void) | {
        (): (file: UploadFile | UploadRawFile) => void;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (file: UploadFile | UploadRawFile) => void) | (() => (file: UploadFile | UploadRawFile) => void) | {
        (): (file: UploadFile | UploadRawFile) => void;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly onStart: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => (rawFile: UploadRawFile) => void) | (() => (rawFile: UploadRawFile) => void) | {
        (): (rawFile: UploadRawFile) => void;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (rawFile: UploadRawFile) => void) | (() => (rawFile: UploadRawFile) => void) | {
        (): (rawFile: UploadRawFile) => void;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly onSuccess: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => (response: any, rawFile: UploadRawFile) => unknown) | (() => (response: any, rawFile: UploadRawFile) => unknown) | {
        (): (response: any, rawFile: UploadRawFile) => unknown;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (response: any, rawFile: UploadRawFile) => unknown) | (() => (response: any, rawFile: UploadRawFile) => unknown) | {
        (): (response: any, rawFile: UploadRawFile) => unknown;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly onProgress: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => (evt: UploadProgressEvent, rawFile: UploadRawFile) => void) | (() => (evt: UploadProgressEvent, rawFile: UploadRawFile) => void) | {
        (): (evt: UploadProgressEvent, rawFile: UploadRawFile) => void;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (evt: UploadProgressEvent, rawFile: UploadRawFile) => void) | (() => (evt: UploadProgressEvent, rawFile: UploadRawFile) => void) | {
        (): (evt: UploadProgressEvent, rawFile: UploadRawFile) => void;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly onError: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => (err: UploadAjaxError, rawFile: UploadRawFile) => void) | (() => (err: UploadAjaxError, rawFile: UploadRawFile) => void) | {
        (): (err: UploadAjaxError, rawFile: UploadRawFile) => void;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (err: UploadAjaxError, rawFile: UploadRawFile) => void) | (() => (err: UploadAjaxError, rawFile: UploadRawFile) => void) | {
        (): (err: UploadAjaxError, rawFile: UploadRawFile) => void;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly onExceed: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => (files: File[], uploadFiles: import("./upload").UploadUserFile[]) => void) | (() => (files: File[], uploadFiles: import("./upload").UploadUserFile[]) => void) | {
        (): (files: File[], uploadFiles: import("./upload").UploadUserFile[]) => void;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => (files: File[], uploadFiles: import("./upload").UploadUserFile[]) => void) | (() => (files: File[], uploadFiles: import("./upload").UploadUserFile[]) => void) | {
        (): (files: File[], uploadFiles: import("./upload").UploadUserFile[]) => void;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, () => void, boolean>;
    readonly action: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "#", boolean>;
    readonly headers: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => Record<string, any> | Headers) | (() => Record<string, any> | Headers) | ((new (...args: any[]) => Record<string, any> | Headers) | (() => Record<string, any> | Headers))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly method: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "post", boolean>;
    readonly data: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("element-plus/es/utils").Mutable<Record<string, any>> | Promise<import("element-plus/es/utils").Mutable<Record<string, any>>> | ((rawFile: UploadRawFile) => import("element-plus/es/utils").Awaitable<import("./upload").UploadData>)) | (() => import("element-plus/es/utils").Awaitable<import("element-plus/es/utils").Mutable<Record<string, any>>> | ((rawFile: UploadRawFile) => import("element-plus/es/utils").Awaitable<import("./upload").UploadData>)) | ((new (...args: any[]) => import("element-plus/es/utils").Mutable<Record<string, any>> | Promise<import("element-plus/es/utils").Mutable<Record<string, any>>> | ((rawFile: UploadRawFile) => import("element-plus/es/utils").Awaitable<import("./upload").UploadData>)) | (() => import("element-plus/es/utils").Awaitable<import("element-plus/es/utils").Mutable<Record<string, any>>> | ((rawFile: UploadRawFile) => import("element-plus/es/utils").Awaitable<import("./upload").UploadData>)))[], unknown, unknown, () => import("element-plus/es/utils").Mutable<{}>, boolean>;
    readonly multiple: BooleanConstructor;
    readonly name: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "file", boolean>;
    readonly drag: BooleanConstructor;
    readonly withCredentials: BooleanConstructor;
    readonly showFileList: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly accept: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly fileList: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./upload").UploadUserFile[]) | (() => import("./upload").UploadUserFile[]) | ((new (...args: any[]) => import("./upload").UploadUserFile[]) | (() => import("./upload").UploadUserFile[]))[], unknown, unknown, () => [], boolean>;
    readonly autoUpload: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly listType: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "picture" | "text" | "picture-card", unknown, "text", boolean>;
    readonly httpRequest: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => import("./upload").UploadRequestHandler) | (() => import("./upload").UploadRequestHandler) | {
        (): import("./upload").UploadRequestHandler;
        new (): any;
        readonly prototype: any;
    } | ((new (...args: any[]) => import("./upload").UploadRequestHandler) | (() => import("./upload").UploadRequestHandler) | {
        (): import("./upload").UploadRequestHandler;
        new (): any;
        readonly prototype: any;
    })[], unknown, unknown, import("./upload").UploadRequestHandler, boolean>;
    readonly disabled: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
    readonly limit: NumberConstructor;
    readonly directory: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `UploadContentProps` instead.
 */
export type UploadContentPropsPublic = ExtractPublicPropTypes<typeof uploadContentProps>;
export type UploadContentInstance = InstanceType<typeof UploadContent> & unknown;
export declare const uploadContentPropsDefaults: {
    readonly beforeUpload: () => void;
    readonly onRemove: () => void;
    readonly onStart: () => void;
    readonly onSuccess: () => void;
    readonly onProgress: () => void;
    readonly onError: () => void;
    readonly onExceed: () => void;
    readonly action: "#";
    readonly method: "post";
    readonly data: () => import("element-plus/es/utils").Mutable<{}>;
    readonly name: "file";
    readonly showFileList: true;
    readonly accept: "";
    readonly fileList: () => never[];
    readonly autoUpload: true;
    readonly listType: "text";
    readonly httpRequest: import("./upload").UploadRequestHandler;
    readonly disabled: undefined;
};
