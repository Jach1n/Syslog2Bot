'use strict';

var iconsVue = require('@element-plus/icons-vue');
var runtime = require('../../../utils/vue/props/runtime.js');

const IconMap = {
  primary: "icon-primary",
  success: "icon-success",
  warning: "icon-warning",
  error: "icon-error",
  info: "icon-info"
};
const IconComponentMap = {
  [IconMap.primary]: iconsVue.InfoFilled,
  [IconMap.success]: iconsVue.CircleCheckFilled,
  [IconMap.warning]: iconsVue.WarningFilled,
  [IconMap.error]: iconsVue.CircleCloseFilled,
  [IconMap.info]: iconsVue.InfoFilled
};
const resultProps = runtime.buildProps({
  /**
   * @description title of result
   */
  title: {
    type: String,
    default: ""
  },
  /**
   * @description sub title of result
   */
  subTitle: {
    type: String,
    default: ""
  },
  /**
   * @description icon type of result
   */
  icon: {
    type: String,
    values: ["primary", "success", "warning", "info", "error"],
    default: "info"
  }
});

exports.IconComponentMap = IconComponentMap;
exports.IconMap = IconMap;
exports.resultProps = resultProps;
//# sourceMappingURL=result.js.map
