import type { UploadProps } from './upload';
declare var __VLS_9: {
    file: import("./upload").UploadFile;
    index: number;
}, __VLS_18: {}, __VLS_20: {}, __VLS_28: {}, __VLS_30: {}, __VLS_32: {}, __VLS_34: {}, __VLS_44: {
    file: import("./upload").UploadFile;
    index: number;
};
type __VLS_Slots = {} & {
    file?: (props: typeof __VLS_9) => any;
} & {
    trigger?: (props: typeof __VLS_18) => any;
} & {
    default?: (props: typeof __VLS_20) => any;
} & {
    trigger?: (props: typeof __VLS_28) => any;
} & {
    default?: (props: typeof __VLS_30) => any;
} & {
    default?: (props: typeof __VLS_32) => any;
} & {
    tip?: (props: typeof __VLS_34) => any;
} & {
    file?: (props: typeof __VLS_44) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<UploadProps>, {
    readonly beforeUpload: () => void;
    readonly onRemove: () => void;
    readonly onChange: () => void;
    readonly onPreview: () => void;
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
    /** @description cancel upload request */
    abort: (file?: import("./upload").UploadFile) => void;
    /** @description upload the file list manually */
    submit: () => void;
    /** @description clear the file list  */
    clearFiles: (states?: import("./upload").UploadStatus[]) => void;
    /** @description select the file manually */
    handleStart: (rawFile: import("./upload").UploadRawFile) => void;
    /** @description remove the file manually */
    handleRemove: (file: import("./upload").UploadFile | import("./upload").UploadRawFile) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<UploadProps>, {
    readonly beforeUpload: () => void;
    readonly onRemove: () => void;
    readonly onChange: () => void;
    readonly onPreview: () => void;
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
    data: import("element-plus/es/utils").Awaitable<import("./upload").UploadData> | ((rawFile: import("./upload").UploadRawFile) => import("element-plus/es/utils").Awaitable<import("./upload").UploadData>);
    disabled: boolean;
    name: string;
    onProgress: import("./upload").UploadHooks["onProgress"];
    onChange: import("./upload").UploadHooks["onChange"];
    onError: import("./upload").UploadHooks["onError"];
    method: string;
    action: string;
    accept: string;
    beforeUpload: import("./upload").UploadHooks["beforeUpload"];
    onRemove: import("./upload").UploadHooks["onRemove"];
    onPreview: import("./upload").UploadHooks["onPreview"];
    onSuccess: import("./upload").UploadHooks["onSuccess"];
    onExceed: import("./upload").UploadHooks["onExceed"];
    showFileList: boolean;
    fileList: import("./upload").UploadUserFile[];
    autoUpload: boolean;
    listType: import("./upload").ListType;
    httpRequest: import("./upload").UploadRequestHandler;
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
