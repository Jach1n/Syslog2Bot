import type { ComponentSize } from 'element-plus/es/constants';
import type Tag from './tag.vue';
import type { ExtractPublicPropTypes } from 'vue';
export interface TagProps {
    /**
     * @description type of Tag
     */
    type?: 'primary' | 'success' | 'info' | 'warning' | 'danger';
    /**
     * @description whether Tag can be removed
     */
    closable?: boolean;
    /**
     * @description whether to disable animations
     */
    disableTransitions?: boolean;
    /**
     * @description whether Tag has a highlighted border
     */
    hit?: boolean;
    /**
     * @description background color of the Tag
     */
    color?: string;
    /**
     * @description size of Tag
     */
    size?: ComponentSize;
    /**
     * @description theme of Tag
     */
    effect?: 'dark' | 'light' | 'plain';
    /**
     * @description whether Tag is rounded
     */
    round?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `TagProps` instead.
 */
export declare const tagProps: {
    readonly type: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "primary" | "success" | "warning" | "info" | "danger", unknown, "primary", boolean>;
    readonly closable: BooleanConstructor;
    readonly disableTransitions: BooleanConstructor;
    readonly hit: BooleanConstructor;
    readonly color: StringConstructor;
    readonly size: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly effect: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "dark" | "light" | "plain", unknown, "light", boolean>;
    readonly round: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `TagProps` instead.
 */
export type TagPropsPublic = ExtractPublicPropTypes<typeof tagProps>;
export declare const tagEmits: {
    close: (evt: MouseEvent) => boolean;
    click: (evt: MouseEvent) => boolean;
};
export type TagEmits = typeof tagEmits;
export type TagInstance = InstanceType<typeof Tag> & unknown;
