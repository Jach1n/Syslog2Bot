'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var skeleton_vue_vue_type_script_setup_true_lang = require('./src/skeleton.vue2.js');
var skeletonItem_vue_vue_type_script_setup_true_lang = require('./src/skeleton-item.vue2.js');
var skeleton = require('./src/skeleton.js');
var skeletonItem = require('./src/skeleton-item.js');
var install = require('../../utils/vue/install.js');

const ElSkeleton = install.withInstall(skeleton_vue_vue_type_script_setup_true_lang.default, {
  SkeletonItem: skeletonItem_vue_vue_type_script_setup_true_lang.default
});
const ElSkeletonItem = install.withNoopInstall(skeletonItem_vue_vue_type_script_setup_true_lang.default);

exports.skeletonProps = skeleton.skeletonProps;
exports.skeletonItemProps = skeletonItem.skeletonItemProps;
exports.ElSkeleton = ElSkeleton;
exports.ElSkeletonItem = ElSkeletonItem;
exports.default = ElSkeleton;
//# sourceMappingURL=index.js.map
