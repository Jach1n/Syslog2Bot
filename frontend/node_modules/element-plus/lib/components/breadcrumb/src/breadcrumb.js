'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');
var icon = require('../../../utils/vue/icon.js');

const breadcrumbProps = runtime.buildProps({
  /**
   * @description separator character
   */
  separator: {
    type: String,
    default: "/"
  },
  /**
   * @description icon component of icon separator
   */
  separatorIcon: {
    type: icon.iconPropType
  }
});

exports.breadcrumbProps = breadcrumbProps;
//# sourceMappingURL=breadcrumb.js.map
