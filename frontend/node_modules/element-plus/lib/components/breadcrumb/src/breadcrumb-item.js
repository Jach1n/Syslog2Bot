'use strict';

var runtime = require('../../../utils/vue/props/runtime.js');

const breadcrumbItemProps = runtime.buildProps({
  /**
   * @description target route of the link, same as `to` of `vue-router`
   */
  to: {
    type: runtime.definePropType([String, Object]),
    default: ""
  },
  /**
   * @description if `true`, the navigation will not leave a history record
   */
  replace: Boolean
});

exports.breadcrumbItemProps = breadcrumbItemProps;
//# sourceMappingURL=breadcrumb-item.js.map
