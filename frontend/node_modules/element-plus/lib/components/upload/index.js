'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var upload_vue_vue_type_script_setup_true_lang = require('./src/upload.vue2.js');
var upload = require('./src/upload.js');
var uploadContent = require('./src/upload-content.js');
var uploadList = require('./src/upload-list.js');
var uploadDragger = require('./src/upload-dragger.js');
var constants = require('./src/constants.js');
var install = require('../../utils/vue/install.js');

const ElUpload = install.withInstall(upload_vue_vue_type_script_setup_true_lang.default);

exports.genFileId = upload.genFileId;
exports.uploadBaseProps = upload.uploadBaseProps;
exports.uploadBasePropsDefaults = upload.uploadBasePropsDefaults;
exports.uploadListTypes = upload.uploadListTypes;
exports.uploadProps = upload.uploadProps;
exports.uploadPropsDefaults = upload.uploadPropsDefaults;
exports.uploadContentProps = uploadContent.uploadContentProps;
exports.uploadContentPropsDefaults = uploadContent.uploadContentPropsDefaults;
exports.uploadListEmits = uploadList.uploadListEmits;
exports.uploadListProps = uploadList.uploadListProps;
exports.uploadDraggerEmits = uploadDragger.uploadDraggerEmits;
exports.uploadDraggerProps = uploadDragger.uploadDraggerProps;
exports.uploadContextKey = constants.uploadContextKey;
exports.ElUpload = ElUpload;
exports.default = ElUpload;
//# sourceMappingURL=index.js.map
