import type { InjectionKey } from 'vue';
import type { AvatarProps } from './avatar';
export interface AvatarGroupContext {
    size?: AvatarProps['size'];
    shape?: AvatarProps['shape'];
}
export declare const avatarGroupContextKey: InjectionKey<AvatarGroupContext>;
