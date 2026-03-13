'use strict';

var runtime = require('../../../../utils/vue/props/runtime.js');
var size = require('../../../../constants/size.js');

const paginationJumperProps = runtime.buildProps({
  size: {
    type: String,
    values: size.componentSizes
  }
});

exports.paginationJumperProps = paginationJumperProps;
//# sourceMappingURL=jumper.js.map
