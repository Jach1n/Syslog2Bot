'use strict';

var shared = require('./shared.js');
var runtime = require('../../../../utils/vue/props/runtime.js');

const panelDatePickProps = runtime.buildProps({
  ...shared.panelSharedProps,
  parsedValue: {
    type: runtime.definePropType([Object, Array])
  },
  visible: {
    type: Boolean,
    default: true
  },
  format: {
    type: String,
    default: ""
  }
});

exports.panelDatePickProps = panelDatePickProps;
//# sourceMappingURL=panel-date-pick.js.map
