import Avatar from './src/avatar.vue';
import AvatarGroup from './src/avatar-group';
import type { SFCWithInstall } from 'element-plus/es/utils';
export declare const ElAvatar: SFCWithInstall<typeof Avatar> & {
    AvatarGroup: typeof AvatarGroup;
};
export declare const ElAvatarGroup: SFCWithInstall<typeof AvatarGroup>;
export default ElAvatar;
export * from './src/avatar';
export * from './src/constants';
export * from './src/avatar-group-props';
export type { AvatarInstance, AvatarGroupInstance } from './src/instance';
