'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var avatar_vue_vue_type_script_setup_true_lang = require('./src/avatar.vue2.js');
var avatarGroup = require('./src/avatar-group.js');
var avatar = require('./src/avatar.js');
var constants = require('./src/constants.js');
var avatarGroupProps = require('./src/avatar-group-props.js');
var install = require('../../utils/vue/install.js');

const ElAvatar = install.withInstall(avatar_vue_vue_type_script_setup_true_lang.default, {
  AvatarGroup: avatarGroup.default
});
const ElAvatarGroup = install.withNoopInstall(avatarGroup.default);

exports.avatarEmits = avatar.avatarEmits;
exports.avatarProps = avatar.avatarProps;
exports.avatarGroupContextKey = constants.avatarGroupContextKey;
exports.avatarGroupProps = avatarGroupProps.avatarGroupProps;
exports.ElAvatar = ElAvatar;
exports.ElAvatarGroup = ElAvatarGroup;
exports.default = ElAvatar;
//# sourceMappingURL=index.js.map
