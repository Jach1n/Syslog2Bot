'use strict';

var runtime = require('../../../../utils/vue/props/runtime.js');
var size = require('../../../../constants/size.js');
var typescript = require('../../../../utils/typescript.js');

const paginationSizesProps = runtime.buildProps({
  pageSize: {
    type: Number,
    required: true
  },
  pageSizes: {
    type: runtime.definePropType(Array),
    default: () => typescript.mutable([10, 20, 30, 40, 50, 100])
  },
  popperClass: {
    type: String
  },
  popperStyle: {
    type: runtime.definePropType([String, Object])
  },
  disabled: Boolean,
  teleported: Boolean,
  size: {
    type: String,
    values: size.componentSizes
  },
  appendSizeTo: String
});

exports.paginationSizesProps = paginationSizesProps;
//# sourceMappingURL=sizes.js.map
