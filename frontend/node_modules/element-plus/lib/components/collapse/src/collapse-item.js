'use strict';

var iconsVue = require('@element-plus/icons-vue');
var runtime = require('../../../utils/vue/props/runtime.js');
var icon = require('../../../utils/vue/icon.js');

const collapseItemProps = runtime.buildProps({
  /**
   * @description title of the panel
   */
  title: {
    type: String,
    default: ""
  },
  /**
   * @description unique identification of the panel
   */
  name: {
    type: runtime.definePropType([String, Number]),
    default: void 0
  },
  /**
   * @description icon of the collapse item
   */
  icon: {
    type: icon.iconPropType,
    default: iconsVue.ArrowRight
  },
  /**
   * @description disable the collapse item
   */
  disabled: Boolean
});

exports.collapseItemProps = collapseItemProps;
//# sourceMappingURL=collapse-item.js.map
