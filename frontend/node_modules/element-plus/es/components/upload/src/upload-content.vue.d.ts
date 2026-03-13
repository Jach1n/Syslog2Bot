import type { UploadContentProps } from './upload-content';
import type { UploadFile, UploadHooks, UploadRawFile } from './upload';
declare var __VLS_8: {}, __VLS_10: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_8) => any;
} & {
    default?: (props: typeof __VLS_10) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<UploadContentProps>, {
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
}>, {
    abort: (file?: UploadFile) => void;
    upload: (rawFile: UploadRawFile) => Promise<void>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<UploadContentProps>, {
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
}>>>, {
    data: import("element-plus/es/utils").Awaitable<import("./upload").UploadData> | ((rawFile: UploadRawFile) => import("element-plus/es/utils").Awaitable<import("./upload").UploadData>);
    disabled: boolean;
    name: string;
    onProgress: (evt: import("./upload").UploadProgressEvent, rawFile: UploadRawFile) => void;
    onError: (err: import("./ajax.js").UploadAjaxError, rawFile: UploadRawFile) => void;
    method: string;
    action: string;
    accept: string;
    beforeUpload: UploadHooks["beforeUpload"];
    onRemove: (file: UploadFile | UploadRawFile) => void;
    onSuccess: (response: any, rawFile: UploadRawFile) => unknown;
    onExceed: UploadHooks["onExceed"];
    showFileList: boolean;
    fileList: import("./upload").UploadUserFile[];
    autoUpload: boolean;
    listType: import("./upload").ListType;
    httpRequest: import("./upload").UploadRequestHandler;
    onStart: (rawFile: UploadRawFile) => void;
}, {}>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<Required<T>[K]>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaultsLocal<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_PrettifyLocal<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
type __VLS_PrettifyLocal<T> = {
    [K in keyof T as K]: T[K];
} & {};
