'use strict';

var ajax = require('./ajax.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var typescript = require('../../../utils/typescript.js');
var shared = require('@vue/shared');

const uploadListTypes = ["text", "picture", "picture-card"];
let fileId = 1;
const genFileId = () => Date.now() + fileId++;
const uploadBaseProps = runtime.buildProps({
  /**
   * @description request URL
   */
  action: {
    type: String,
    default: "#"
  },
  /**
   * @description request headers
   */
  headers: {
    type: runtime.definePropType(Object)
  },
  /**
   * @description set upload request method
   */
  method: {
    type: String,
    default: "post"
  },
  /**
   * @description additions options of request
   */
  data: {
    type: runtime.definePropType([Object, Function, Promise]),
    default: () => typescript.mutable({})
  },
  /**
   * @description whether uploading multiple files is permitted
   */
  multiple: Boolean,
  /**
   * @description key name for uploaded file
   */
  name: {
    type: String,
    default: "file"
  },
  /**
   * @description whether to activate drag and drop mode
   */
  drag: Boolean,
  /**
   * @description whether cookies are sent
   */
  withCredentials: Boolean,
  /**
   * @description whether to show the uploaded file list
   */
  showFileList: {
    type: Boolean,
    default: true
  },
  /**
   * @description accepted [file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept), will not work when `thumbnail-mode === true`
   */
  accept: {
    type: String,
    default: ""
  },
  /**
   * @description default uploaded files
   */
  fileList: {
    type: runtime.definePropType(Array),
    default: () => typescript.mutable([])
  },
  /**
   * @description whether to auto upload file
   */
  autoUpload: {
    type: Boolean,
    default: true
  },
  /**
   * @description type of file list
   */
  listType: {
    type: String,
    values: uploadListTypes,
    default: "text"
  },
  /**
   * @description override default xhr behavior, allowing you to implement your own upload-file's request
   */
  httpRequest: {
    type: runtime.definePropType(Function),
    default: ajax.ajaxUpload
  },
  /**
   * @description whether to disable upload
   */
  disabled: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description maximum number of uploads allowed
   */
  limit: Number,
  /**
   * @description whether to support uploading directory
   */
  directory: Boolean
});
const uploadProps = runtime.buildProps({
  ...uploadBaseProps,
  /**
   * @description hook function before uploading with the file to be uploaded as its parameter. If `false` is returned or a `Promise` is returned and then is rejected, uploading will be aborted
   */
  beforeUpload: {
    type: runtime.definePropType(Function),
    default: shared.NOOP
  },
  /**
   * @description hook function before removing a file with the file and file list as its parameters. If `false` is returned or a `Promise` is returned and then is rejected, removing will be aborted
   */
  beforeRemove: {
    type: runtime.definePropType(Function)
  },
  /**
   * @description hook function when files are removed
   */
  onRemove: {
    type: runtime.definePropType(Function),
    default: shared.NOOP
  },
  /**
   * @description hook function when select file or upload file success or upload file fail
   */
  onChange: {
    type: runtime.definePropType(Function),
    default: shared.NOOP
  },
  /**
   * @description hook function when clicking the uploaded files
   */
  onPreview: {
    type: runtime.definePropType(Function),
    default: shared.NOOP
  },
  /**
   * @description hook function when uploaded successfully
   */
  onSuccess: {
    type: runtime.definePropType(Function),
    default: shared.NOOP
  },
  /**
   * @description hook function when some progress occurs
   */
  onProgress: {
    type: runtime.definePropType(Function),
    default: shared.NOOP
  },
  /**
   * @description hook function when some errors occurs
   */
  onError: {
    type: runtime.definePropType(Function),
    default: shared.NOOP
  },
  /**
   * @description hook function when limit is exceeded
   */
  onExceed: {
    type: runtime.definePropType(Function),
    default: shared.NOOP
  },
  /**
   * @description set HTML attribute: crossorigin.
   */
  crossorigin: {
    type: runtime.definePropType(String)
  }
});
const uploadBasePropsDefaults = {
  action: "#",
  method: "post",
  data: () => typescript.mutable({}),
  name: "file",
  showFileList: true,
  accept: "",
  fileList: () => typescript.mutable([]),
  autoUpload: true,
  listType: "text",
  httpRequest: ajax.ajaxUpload,
  disabled: void 0
};
const uploadPropsDefaults = {
  ...uploadBasePropsDefaults,
  beforeUpload: shared.NOOP,
  onRemove: shared.NOOP,
  onChange: shared.NOOP,
  onPreview: shared.NOOP,
  onSuccess: shared.NOOP,
  onProgress: shared.NOOP,
  onError: shared.NOOP,
  onExceed: shared.NOOP
};

exports.genFileId = genFileId;
exports.uploadBaseProps = uploadBaseProps;
exports.uploadBasePropsDefaults = uploadBasePropsDefaults;
exports.uploadListTypes = uploadListTypes;
exports.uploadProps = uploadProps;
exports.uploadPropsDefaults = uploadPropsDefaults;
//# sourceMappingURL=upload.js.map
