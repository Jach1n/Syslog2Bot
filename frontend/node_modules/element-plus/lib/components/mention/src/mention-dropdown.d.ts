import type { MentionOption } from './types';
export interface MentionDropdownProps {
    options?: MentionOption[];
    loading?: boolean;
    disabled?: boolean;
    contentId?: string;
    ariaLabel?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `MentionDropdownProps` instead.
 */
export declare const mentionDropdownProps: {
    options: import("element-plus/es/utils").EpPropFinalized<(new (...args: any[]) => MentionOption[]) | (() => MentionOption[]) | ((new (...args: any[]) => MentionOption[]) | (() => MentionOption[]))[], unknown, unknown, () => never[], boolean>;
    loading: BooleanConstructor;
    disabled: BooleanConstructor;
    contentId: StringConstructor;
    ariaLabel: StringConstructor;
};
export declare const mentionDropdownEmits: {
    select: (option: MentionOption) => boolean;
};
