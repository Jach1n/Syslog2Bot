import type { InjectionKey, Ref } from 'vue';
export interface UploadContext {
    accept: Ref<string>;
}
export declare const uploadContextKey: InjectionKey<UploadContext>;
