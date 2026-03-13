import type CheckTag from './check-tag.vue';
import type { ExtractPublicPropTypes } from 'vue';
export interface CheckTagProps {
    /**
     * @description is checked
     */
    checked?: boolean;
    /**
     * @description whether the check-tag is disabled
     */
    disabled?: boolean;
    /**
     * @description type of Tag
     */
    type?: 'primary' | 'success' | 'info' | 'warning' | 'danger';
}
/**
 * @deprecated Removed after 3.0.0, Use `CheckTagProps` instead.
 */
export declare const checkTagProps: {
    readonly checked: BooleanConstructor;
    readonly disabled: BooleanConstructor;
    readonly type: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "primary" | "success" | "warning" | "info" | "danger", unknown, "primary", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `CheckTagProps` instead.
 */
export type CheckTagPropsPublic = ExtractPublicPropTypes<typeof checkTagProps>;
export declare const checkTagEmits: {
    'update:checked': (value: boolean) => boolean;
    change: (value: boolean) => boolean;
};
export type CheckTagEmits = typeof checkTagEmits;
export type CheckTagInstance = InstanceType<typeof CheckTag> & unknown;
