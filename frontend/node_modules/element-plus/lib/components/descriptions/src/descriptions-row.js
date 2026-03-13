'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');

const descriptionsRowProps = runtime.buildProps({
  row: {
    type: runtime.definePropType(Array),
    default: () => []
  }
});

exports.descriptionsRowProps = descriptionsRowProps;
//# sourceMappingURL=descriptions-row.js.map
