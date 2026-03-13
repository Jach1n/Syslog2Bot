'use strict';

var iconsVue = require('@element-plus/icons-vue');
var runtime = require('../../../utils/vue/props/runtime.js');
var icon = require('../../../utils/vue/icon.js');

const pageHeaderProps = runtime.buildProps({
  /**
   * @description icon component of page header
   */
  icon: {
    type: icon.iconPropType,
    default: () => iconsVue.Back
  },
  /**
   * @description main title of page header
   */
  title: String,
  /**
   * @description content of page header
   */
  content: {
    type: String,
    default: ""
  }
});
const pageHeaderEmits = {
  back: () => true
};

exports.pageHeaderEmits = pageHeaderEmits;
exports.pageHeaderProps = pageHeaderProps;
//# sourceMappingURL=page-header.js.map
