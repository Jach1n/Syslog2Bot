'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var shared = require('@vue/shared');

const uploadDraggerProps = runtime.buildProps({
  disabled: {
    type: Boolean,
    default: void 0
  },
  directory: Boolean
});
const uploadDraggerEmits = {
  file: (file) => shared.isArray(file)
};

exports.uploadDraggerEmits = uploadDraggerEmits;
exports.uploadDraggerProps = uploadDraggerProps;
//# sourceMappingURL=upload-dragger.js.map
