'use strict';

var upload = require('./upload.js');
var runtime = require('../../../utils/vue/props/runtime.js');
var shared = require('@vue/shared');

const uploadContentProps = runtime.buildProps({
  ...upload.uploadBaseProps,
  beforeUpload: {
    type: runtime.definePropType(Function),
    default: shared.NOOP
  },
  onRemove: {
    type: runtime.definePropType(Function),
    default: shared.NOOP
  },
  onStart: {
    type: runtime.definePropType(Function),
    default: shared.NOOP
  },
  onSuccess: {
    type: runtime.definePropType(
      Function
    ),
    default: shared.NOOP
  },
  onProgress: {
    type: runtime.definePropType(Function),
    default: shared.NOOP
  },
  onError: {
    type: runtime.definePropType(Function),
    default: shared.NOOP
  },
  onExceed: {
    type: runtime.definePropType(Function),
    default: shared.NOOP
  }
});
const uploadContentPropsDefaults = {
  ...upload.uploadBasePropsDefaults,
  beforeUpload: shared.NOOP,
  onRemove: shared.NOOP,
  onStart: shared.NOOP,
  onSuccess: shared.NOOP,
  onProgress: shared.NOOP,
  onError: shared.NOOP,
  onExceed: shared.NOOP
};

exports.uploadContentProps = uploadContentProps;
exports.uploadContentPropsDefaults = uploadContentPropsDefaults;
//# sourceMappingURL=upload-content.js.map
