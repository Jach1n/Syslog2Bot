import type { ExtractPublicPropTypes } from 'vue';
import type UploadDragger from './upload-dragger.vue';
export interface UploadDraggerProps {
    disabled?: boolean;
    directory?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `UploadDraggerProps` instead.
 */
export declare const uploadDraggerProps: {
    readonly disabled: import("element-plus/es/utils").EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
    readonly directory: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `UploadDraggerProps` instead.
 */
export type UploadDraggerPropsPublic = ExtractPublicPropTypes<typeof uploadDraggerProps>;
export declare const uploadDraggerEmits: {
    file: (file: File[]) => boolean;
};
export type UploadDraggerEmits = typeof uploadDraggerEmits;
export type UploadDraggerInstance = InstanceType<typeof UploadDragger> & unknown;
