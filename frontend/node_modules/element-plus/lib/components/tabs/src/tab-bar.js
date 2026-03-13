'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var typescript = require('../../../utils/typescript.js');

const tabBarProps = runtime.buildProps({
  tabs: {
    type: runtime.definePropType(Array),
    default: () => typescript.mutable([])
  },
  tabRefs: {
    type: runtime.definePropType(Object),
    default: () => typescript.mutable({})
  }
});

exports.tabBarProps = tabBarProps;
//# sourceMappingURL=tab-bar.js.map
