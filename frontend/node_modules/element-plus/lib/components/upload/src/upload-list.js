'use strict';

var upload = require('./upload.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var shared = require('@vue/shared');
var typescript = require('../../../utils/typescript.js');

const uploadListProps = runtime.buildProps({
  files: {
    type: runtime.definePropType(Array),
    default: () => typescript.mutable([])
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  handlePreview: {
    type: runtime.definePropType(Function),
    default: shared.NOOP
  },
  listType: {
    type: String,
    values: upload.uploadListTypes,
    default: "text"
  },
  /**
   * @description set HTML attribute: crossorigin.
   */
  crossorigin: {
    type: runtime.definePropType(String)
  }
});
const uploadListEmits = {
  remove: (file) => !!file
};

exports.uploadListEmits = uploadListEmits;
exports.uploadListProps = uploadListProps;
//# sourceMappingURL=upload-list.js.map
